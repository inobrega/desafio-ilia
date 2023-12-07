<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Descrição

Teste técnico para validação de conhecimento de NodeJS com NestJS.
Foi utilizado NestJS com TypeORM e MongoDB, arquitetura hexagonal seguindo os padrões de Clean Code e SOLID.

A aplicação foi construída para suportar requisições REST ou GraphQL.

A collection do Postman pode ser encontrada [aqui](docs/Ília.postman_collection.json).

## Executando o Projeto

```bash
$ docker compose up --build
```

## Executando Localmente

Configurar primeiramente o arquivo .env com o apontamento correto para o MongoDB

Em seguida:

```bash
# ambiente de desenvolvimento
$ pnpm start
```

## Testes

```bash
# testes unitários
$ pnpm test
```

