import { makeCreateProductUseCase } from "@/use-cases/factories/make-create-product-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    data_preco: z.coerce.date(),
    cod_produto: z.number(),
    sku: z.string(),
    qtd_estoque: z.number(),
    desconto: z.number(),
    data_inicio: z.coerce.date(),
    data_fim: z.coerce.date(),
  });

  const {
    cod_produto,
    data_fim,
    data_inicio,
    data_preco,
    desconto,
    qtd_estoque,
    sku,
  } = createBodySchema.parse(request.body);

  try {
    const createProductUseCase = makeCreateProductUseCase();

    await createProductUseCase.execute({
      cod_produto,
      data_fim,
      data_inicio,
      data_preco,
      desconto,
      qtd_estoque,
      sku,
    });
  } catch (err) {
    console.log((err as Error).message);
    throw err;
  }

  return reply.status(201).send();
}
