import { Prisma } from "@prisma/client";
import { ProductsRepository } from "../products-repository";
import { prisma } from "@/lib/prisma";

export class PrismaProductsRepository implements ProductsRepository {
  async findMany(row_count: number, row_skip: number) {
    const products = await prisma.product.findMany({
      skip: row_skip,
      take: row_count,
    });

    return products;
  }

  async create(data: [Prisma.ProductCreateManyInput]) {
    const products = await prisma.$transaction(
      data.map((product) => {
        return prisma.product.create({
          data: product,
        });
      })
    );

    return products;
  }
}
