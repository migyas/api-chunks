import { FastifyInstance } from "fastify";

import { filter } from "./filter";
import { upload } from "./upload";

export async function productsRoutes(app: FastifyInstance) {
  app.get("/produtos", filter);

  app.post("/produtos", upload);
}
