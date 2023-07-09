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
  async execute() {}
}
