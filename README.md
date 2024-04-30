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

![DER]()


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
