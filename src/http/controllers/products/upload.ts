import { makeCreateProductUseCase } from "@/use-cases/factories/make-create-product-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError, z } from "zod";
import { fromZodError } from "zod-validation-error";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { setTimeout } from "node:timers/promises";
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs.txt" }),
  ],
});

export async function upload(request: FastifyRequest, reply: FastifyReply) {
  const createFileSchema = z.array(
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

  const readableStream = request.files();

  const saveProducts = new Transform({
    objectMode: true,
    writableObjectMode: true,
    readableObjectMode: true,
    async transform(chunk, encoding, callback) {
      const validationProducts = createFileSchema.parse(chunk);
      const createProductUseCase = makeCreateProductUseCase();

      const promises = validationProducts.map((product) =>
        createProductUseCase.execute(product)
      );

      await Promise.all(promises);
      logger.info(
        `Rota POST acionada em ${new Date().toISOString()}. Itens a serem inseridos: ${
          chunk.length
        }`
      );
      callback();

      return reply.status(201).send();
    },
  });

  try {
    await pipeline(
      readableStream,
      new Transform({
        objectMode: true,
        readableObjectMode: true,
        writableObjectMode: true,
        async transform(list, encoding, callback) {
          await setTimeout(1000);
          const toBufferFile = await list.toBuffer();
          const parsedFiles = JSON.parse(toBufferFile.toString());

          callback(null, parsedFiles);
        },
      }),
      saveProducts
    );
  } catch (err) {
    if (err as ZodError) {
      const { details, name } = fromZodError(err as ZodError);
      return reply.status(400).send({
        name,
        details,
      });
    }
    console.error("Streaming Ended with Error", err);
    reply.status(500).send();
  }
}
