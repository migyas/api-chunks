import { makeFilterProductsUseCase } from "@/use-cases/factories/make-filter-products-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function filter(request: FastifyRequest, reply: FastifyReply) {
  const filterQuerySchema = z.object({
    row_count: z.coerce.number().default(10),
    row_skip: z.coerce.number().default(0),
  });

  const { row_count, row_skip } = filterQuerySchema.parse(request.query);

  try {
    const filterProductsUseCase = makeFilterProductsUseCase();

    const data = await filterProductsUseCase.execute({
      row_count,
      row_skip,
    });

    const products = data.products.map((product) => ({
      ...product,
      cod_produto: product.cod_produto.toString(),
    }));

    return reply.status(200).send({
      products,
      skip: row_skip,
    });
  } catch (err) {
    throw (err as Error).message;
  }
}
