import fastify from "fastify";
import { mainRoutes } from "./http/controllers/main/routes";
import { ZodError } from "zod";
import { env } from "./env";
import { productsRoutes } from "./http/controllers/products/routes";

export const app = fastify();

app.register(mainRoutes);
app.register(productsRoutes);

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
