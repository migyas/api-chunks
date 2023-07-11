import { makeCreateProductUseCase } from "@/use-cases/factories/make-create-product-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError, z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.array(
    z.object({
      data_preco: z.coerce.date(),
      cod_produto: z.number().int(),
      sku: z.string(),
      qtd_estoque: z.number().int().positive(),
      desconto: z.number(),
      data_inicio: z.coerce.date(),
      data_fim: z.coerce.date(),
    })
  );

  try {
    const products = createBodySchema.parse(request.body);
    const createProductUseCase = makeCreateProductUseCase();

    await createProductUseCase.execute(products);
  } catch (err) {
    const { details, name } = fromZodError(err as ZodError);

    return reply.status(400).send({
      name,
      details,
    });
  }

  return reply.status(201).send();
}
