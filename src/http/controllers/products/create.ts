import { makeCreateProductUseCase } from "@/use-cases/factories/make-create-product-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError, z } from "zod";
import { fromZodError } from "zod-validation-error";
import { WriteStream, createReadStream } from "node:fs";
import csv from "csvtojson";
import { Transform, Readable, PassThrough } from "node:stream";
import { pipeline } from "node:stream/promises";
import BJSON from "buffer-json";
import formidable from "formidable";

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

  // for await (const file of request.files()) {
  //   const toBufferFile = await file.toBuffer();
  //   const parsedFiles = JSON.parse(toBufferFile.toString());

  //   try {
  //     const products = createBodySchema.parse(parsedFiles);
  //     const createProductUseCase = makeCreateProductUseCase();

  //     await createProductUseCase.execute(products);
  //     return reply.status(201).send();
  //   } catch (err) {
  //     const { details, name } = fromZodError(err as ZodError);

  //     return reply.status(400).send({
  //       name,
  //       details,
  //     });
  //   }
  // }

  // readableStreamTest
  //   .pipe(csv({ delimiter: "," }, { objectMode: true }))
  //   .on("data", (data) => console.log(data));

  // const readableStreamTest = createReadStream("tasks.csv");
  const readableStream = request.raw;
  const writeableStream = reply.raw;

  // readableStream.setEncoding("utf8");

  // console.log("TO AQUI", readTest);
  try {
    await pipeline(
      readableStream,
      new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
          console.log("chunk", chunk.toString());
          callback(null, JSON.stringify(chunk));
        },
      })
    );
    console.log("Streaming Ended =)");
  } catch (error) {
    console.log("Streaming Ended with Error", error);
  }

  // readableStream

  //   .on("data", (data) => {
  //     const parsedChunk = JSON.parse(data.toString());
  //     console.log(parsedChunk);
  //   })
  //   .on("error", (err) => console.error(err))
  //   .on("end", () => console.log("Streaming Ended"));

  // readableStream.pipe();
  // readableStream.on("data", (buffer) => console.log(buffer));
  // readableStream.pipe(writeableStream);

  // const writeableStream = request.multipart(
  //   (handler) => console.log("multpart", handler),
  //   (err) => console.error(err),
  //   { highWaterMark: 1000 }
  // );

  // request.raw.on("data", (buffer) => writeableStream.write(buffer.toString()));

  // request.raw.on("end", () => {
  //   console.log("Ended");
  //   writeableStream.end();
  // });

  // writeableStream.on("file", (_, file) => console.log(file));
  // console.log();
  // type ProductSchema = z.infer<typeof createBodySchema>;
  // await request.file({ highWaterMark: 10 }).then((data) => {
  //   data?.file.on("data", async (chunk) => {
  //     console.log(chunk);
  //   });

  //   data?.file.on("end", () => {});
  // });

  // stream?.file.on("data", (chunk) => products.push(chunk.toString()));

  // stream?.file.on("end", () => {
  //   const parsedBuffers = JSON.parse(products.toString());

  //   console.log(parsedBuffers);
  //   request.file().
  // });

  // const products = createBodySchema.parse(
  //   JSON.parse((request.body as any).products[0].data.toString())
  // );

  // const mp = request.multipart(handler, (err) => {
  //   console.log(err);
  // });
  // console.log(mp);

  // async function handler(field, file, filename, encoding, mimetype) {
  //   // Lida com o arquivo enquanto está sendo transmitido
  //   const writeStream = createWriteStream(`uploads/${filename}`);

  //   file.on("data", (chunk) => {
  //     // Faz algo com os dados do arquivo chunk a chunk
  //     writeStream.write(chunk);
  //   });

  //   file.on("end", () => {
  //     // Finaliza o processamento do arquivo
  //     writeStream.end();
  //   });
  // }

  // const data = request.parts();
  // const products = createBodySchema.parse(request.body);
  // if (data) {
  //   // TEMOS OS DADOS DO ARQUIVO SENDO LIDO DE FORMA CORRETA
  //   data.file; // stream
  //   data.fields; // other parsed parts
  //   data.fieldname;
  //   data.filename;
  //   data.encoding;
  //   data.mimetype;

  //   console.log(JSON.parse(data.file.read().toString()));

  //   // await pump(data.file, fs.createWriteStream(data.filename));
  // }

  // request.raw.on("end", async () => {
  //   const concated = JSON.parse(Buffer.concat(buffers).toString());
  //   // const string = concated.toString();
  //   // const jsonString = JSON.parse(string);
  //   console.log("TO AQUII", await processJSON(concated));

  //   // products.push(JSON.parse(resultString));
  // });

  // try {
  //   const createProductUseCase = makeCreateProductUseCase();
  //   // console.log(products);
  //   // await createProductUseCase.execute(products);
  // } catch (err) {
  //   const { details, name } = fromZodError(err as ZodError);

  //   return reply.status(400).send({
  //     name,
  //     details,
  //   });
  // }
}
