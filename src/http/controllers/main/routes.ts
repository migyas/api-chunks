import { FastifyInstance } from "fastify";
import { helloWorld } from "./hello-world";

export async function mainRoutes(app: FastifyInstance) {
  app.get("/", helloWorld);
}
