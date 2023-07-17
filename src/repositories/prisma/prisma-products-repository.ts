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

  async create(data: Prisma.ProductCreateManyInput) {
    await prisma.product.createMany({
      data,
    });
  }
}
