import { ProductsRepository } from "@/repositories/products-repository";

interface CreateProductUseCaseRequest {
  data_preco: Date;
  cod_produto: number;
  sku: string;
  qtd_estoque: number;
  desconto: number;
  data_inicio: Date;
  data_fim: Date;
}

export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(data: CreateProductUseCaseRequest) {
    const products = await this.productsRepository.create(data);

    return { products };
  }
}
