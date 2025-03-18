# Teddy API

## Descrição
A **Teddy API** é uma API criada para o processo da Teddy Open Finance. A API permite realizar operações como CRUD e está documentada via Swagger, com a documentação acessível na rota `/docs`.

## Pré-requisitos

Antes de rodar a aplicação, você precisa ter os seguintes softwares instalados em seu sistema:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

Além disso, você precisará de um arquivo `.env` com as variáveis de ambiente necessárias, conforme o arquivo .env.example.

## Configurações

- Instalação das dependências:
   ```bash
   npm install
   ```
- Crie o arquivo .env (copie o conteúdo do arquivo .env.example)

## Rodando a aplicação via CLI

### Dev
Rodar PostgreSQL
```bash
docker-compose up --build -d postgres
```
Rodar API
```bash
npm run start:dev
```

### Prod
Rodar PostgreSQL
```bash
docker-compose up --build -d postgres
```
Rodar API
```bash
npm run build
npm run start:prod
```

## Rodando a aplicação com Docker e Docker Compose
```bash
docker-compose up --build -d
```

## Rodando migrations
Se a variável de ambiente `ENV` estiver definida como `production`, o TypeORM não executará as alterações automaticamente no banco de dados. Nesse caso, é necessário rodar as migrations manualmente.

Para executar as migrations em produção, utilize o seguinte comando:

```bash
npm run migration:run
```

## Acessando a documentação
A documentação da API está disponível na rota:
```bash
http://localhost:[PORT]/docs
```

## Testes
Para rodar os testes da aplicação, execute:
```bash
npm run test
```