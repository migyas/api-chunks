## DESENVOLVER API DE INSERÇÃO EM CHUNKS

### Config Project in Your Setup

## Install All Dependencies

```shell
npm install
```
## Run Docker Container Without Logs

```shell
docker compose up -d
```

## Run Migrates

```shell
npx prisma migrate dev
```

## Start Project

```shell
npm run dev
```

## Run Prisma Studio for View Database

```shell
npx prisma studio
```


### Descrição 

Desenvolva uma API que tenha duas rotas:
"/produtos":
[x](POST) Essa rota vai receber um array de objetos (vou te mandar o modelo abaixo)

[x](GET) Essa rota vai devolver uma lista de objetos do banco (no mesmo modelo da de cima)


"/":
[x](GET) Essa rota vai devolver um "Hello World" e o status 200.

### REQUISITOS:

[x] Construção em node a rota POST de produtos vai receber acima de 100k de linhas então insira no banco em chunks de 10k.

[x] A rota GET de produtos vai receber como parâmetro dois dados para paginação ( row_count:  quantidade a ser exibida | row_skip: quantidade a ser ignorada) 

### DESEJÁVEL 
[x] Utilização de framework Fastify ou Nestjs. 

[x] Gerar logs contendo data de acionamento e quantidade de itens a serem inseridos (em rotas POST)

[x] Validação dos campos antes de inserir no banco e em caso de erro de validação não inserir devolver ao usuário qual campo está errado e qual tipo de dado esperado.

### OPCIONAL:

[x] Banco de dados (POSTGRES/MYSQL/SQLITE).


Thanks for the opportunity, awaiting feedback!