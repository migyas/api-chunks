import { makeCreateProductUseCase } from "@/use-cases/factories/make-create-product-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.array(
    z.object({
      data_preco: z.coerce.date(),
      cod_produto: z.number(),
      sku: z.string(),
      qtd_estoque: z.number(),
      desconto: z.number(),
      data_inicio: z.coerce.date(),
      data_fim: z.coerce.date(),
    })
  );

  const products = createBodySchema.parse(request.body);

  try {
    const createProductUseCase = makeCreateProductUseCase();

    await createProductUseCase.execute(products);
  } catch (err) {
    console.log((err as Error).message);
    throw err;
  }

  return reply.status(201).send();
}
