## DESENVOLVER API DE INSERÇÃO EM CHUNKS

### Descrição 

Desenvolva uma API que tenha duas rotas:
* *"/produtos"*:
[ ](POST) Essa rota vai receber um array de objetos (vou te mandar o modelo abaixo)

[ ](GET) Essa rota vai devolver uma lista de objetos do banco (no mesmo modelo da de cima)


* *"/"*:
[ ](GET) Essa rota vai devolver um "Hello World" e o status 200.

### REQUISITOS:

[x] Construção em node 
[ ] a rota POST de produtos vai receber acima de 100k de linhas então insira no banco em chunks de 10k.

[ ] A rota GET de produtos vai receber como parâmetro dois dados para paginação ( row_count:  quantidade a ser exibida | row_skip: quantidade a ser ignorada) 

### DESEJÁVEL 
[x] Utilização de framework Fastify ou Nestjs. 

[ ] Gerar logs contendo data de acionamento e quantidade de itens a serem inseridos (em rotas POST)

[ ] Validação dos campos antes de inserir no banco e em caso de erro de validação não inserir devolver ao usuário qual campo está errado e qual tipo de dado esperado.

### OPCIONAL:

[ ] Banco de dados (POSTGRES/MYSQL/SQLITE).

- Modelo do objeto 
{
  "key": "fa494ffb-0af7-4bee-985c-556e5e90721f",
  "data_preco": "2023-08-01",
  "cod_produto": 9999999999999,
  "sku": "PZ0912",
  "qtd_estoque": 10.0,
  "desconto": 0.0,
  "data_hora_insercao": "2023-07-01 00:00:00",
  "data_inicio": "2023-07-01",
  "data_fim": "2023-07-31"
}