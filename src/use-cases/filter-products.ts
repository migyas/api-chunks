import { ProductsRepository } from "@/repositories/products-repository";

interface FilterProductsUseCaseRequest {
  row_count: number;
  row_skip: number;
}

export class FilterProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ row_count, row_skip }: FilterProductsUseCaseRequest) {
    const products = await this.productsRepository.findMany(
      row_count,
      row_skip
    );

    return { products };
  }
}
