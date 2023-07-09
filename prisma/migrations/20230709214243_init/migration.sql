-- CreateTable
CREATE TABLE "Product" (
    "key" TEXT NOT NULL,
    "data_preco" TIMESTAMP(3) NOT NULL,
    "cod_produto" INTEGER NOT NULL,
    "sku" TEXT NOT NULL,
    "qtd_estoque" DECIMAL(65,30) NOT NULL,
    "desconto" DECIMAL(65,30) NOT NULL,
    "data_hora_insercao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("key")
);
