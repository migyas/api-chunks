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

  async execute({
    cod_produto,
    data_fim,
    data_inicio,
    data_preco,
    desconto,
    qtd_estoque,
    sku,
  }: CreateProductUseCaseRequest) {
    const product = await this.productsRepository.create({
      cod_produto,
      data_fim,
      data_inicio,
      data_preco,
      desconto,
      qtd_estoque,
      sku,
    });

    return { product };
  }
}
