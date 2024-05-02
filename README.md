## Descrição
Este projeto foi desenvolvido com o objetivo de ensino dos estudantes da escola de programação Arnia. Ele é uma API que visa o gerenciamento de estudantes, professores e suas respectivas matérias por um administrador do sistema, no qual ficará responsável pelo registro e manipulação de novos dados. Para informações de endpoints, acessar a [doc](http://localhost:3001/v1/docs).

## Tecnologias

- [**Nestjs**](https://nestjs.com/): Utilizado como framework do servidor rodando por debaixo dos panos Nodejs e Express.
- [**Postgresql**](https://www.postgresql.org/docs/): Banco de dados relacional utilizado no projeto.
- [**TypeORM**](https://typeorm.io/): ORM utilizado para conexão e manipulação de tabelas no banco de dados.
- [**Swagger**](https://swagger.io/): Framework utilizado para a documentação das rotas e objetos que transitam na aplicação.
- [**Jest**](https://jestjs.io/pt-BR/): Framework Nodejs voltado para a realização de testes.

## Instalando e rodando o projeto
Primeiramente será necessária instalação das dependências do projeto, rodando o comando:

```bash
npm install
```

Setar as variáveis de ambiente contidas no .env.example com aquelas configuradas em sua máquina. Após isso, rodar o comando:

```bash
npm run start:dev
```

## Testes

Para rodar e observar os testes presentes na aplicação, rodar o comando:

```bash
npm run test
```

## Diagrama de entidade e relacionamento (DER):

![DER](https://private-user-images.githubusercontent.com/90461911/327011178-f22b7c09-bbd7-4ac0-9771-7d1e1c026f4a.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTQ1MTk1NTksIm5iZiI6MTcxNDUxOTI1OSwicGF0aCI6Ii85MDQ2MTkxMS8zMjcwMTExNzgtZjIyYjdjMDktYmJkNy00YWMwLTk3NzEtN2QxZTFjMDI2ZjRhLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA0MzAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNDMwVDIzMjA1OVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTBkYjdlM2UxZGM4YjEyNTI0OGEzNWFhNTBiNjkzYmY2ODQ0NzE1Mzk1ODIzMjE0ZTk0YjZkMjYyZTQ0MWRjZjImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.U89oP9ZijyPgQe0yHaxdNiMNC53-mADO0rOFR8yS_N0)

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
