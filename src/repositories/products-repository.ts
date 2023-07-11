import { Prisma, Product } from "@prisma/client";

export interface ProductsRepository {
  create(data: Prisma.ProductCreateManyInput[]): Promise<Product[]>;
}
