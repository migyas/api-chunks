import { Prisma, Product } from "@prisma/client";

export interface ProductsRepository {
  findMany(row_count: number, row_skip: number): Promise<Product[]>;
  create(data: Prisma.ProductCreateManyInput[]): Promise<Product[]>;
}
