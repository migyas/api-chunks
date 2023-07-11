import { FastifyInstance } from "fastify";

import { filter } from "./filter";
import { create } from "./create";

export async function productsRoutes(app: FastifyInstance) {
  app.get("/produtos", filter);

  app.post("/produtos", create);
}
