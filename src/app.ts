import fastify from "fastify";
import fastifyMultipart from "@fastify/multipart";
import fastifyFormidable from "fastify-formidable";

import { mainRoutes } from "./http/controllers/main/routes";
import { ZodError } from "zod";
import { env } from "./env";
import { productsRoutes } from "./http/controllers/products/routes";

export const app = fastify({
  bodyLimit: 1024 * 1024 * 100, // Aumenta o limite do payload para 100 MB (valor em bytes)
  connectionTimeout: 60000,
});

// app.register(fastifyFormidable, { addContentTypeParser: true });
app.register(fastifyMultipart);
app.register(mainRoutes);
app.register(productsRoutes);

app.addHook("preHandler", (req, repy, done) => {
  repy.header("Content-type", "application/json");
  done();
});
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    //TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: "Internal server error." });
});
