import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";
import { FilterProductsUseCase } from "../filter-products";

export function makeFilterProductsUseCase() {
  const productsRepository = new PrismaProductsRepository();
  const productsCase = new FilterProductsUseCase(productsRepository);

  return productsCase;
}
