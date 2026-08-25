# SpringRH

API e frontend para gerenciamento de recursos humanos, com suporte ao cadastro e à administração de funcionários e candidatos.

> **Status do projeto:** a API REST está implementada e utiliza armazenamento em memória. O frontend React ainda está baseado no template inicial do Vite e não está integrado à API.

## Visão geral

O projeto é dividido em dois módulos:

- `api-rh`: backend desenvolvido com Spring Boot, responsável pelos recursos de funcionários e candidatos.
- `web`: frontend desenvolvido com React, TypeScript e Vite.

A API possui documentação interativa com Swagger/OpenAPI e disponibiliza operações de criação, consulta, atualização, alteração de status e exclusão.

## Tecnologias

### Backend

- Java 17
- Spring Boot 4.1.0
- Spring Web MVC
- Maven Wrapper
- Springdoc OpenAPI / Swagger UI
- Lombok

### Frontend

- React 19
- TypeScript
- Vite
- ESLint

## Pré-requisitos

- JDK 17 ou superior, com o compilador `javac` disponível no PATH.
- Node.js e npm.
- Git, caso o projeto seja obtido por meio do repositório.

Não é necessário configurar um banco de dados para executar a versão atual. Os dados são mantidos apenas durante a execução da API e são perdidos quando a aplicação é reiniciada.

## Executando com Docker

Com o Docker Desktop em execução, na raiz do projeto execute:

```bash
docker compose up --build
```

Depois, acesse o frontend em <http://localhost:5173>, a API em <http://localhost:8080> e a documentação Swagger em <http://localhost:8080/swagger-ui/index.html>.

Para encerrar os containers, use `docker compose down`.

### Solução de problemas

Se o comando retornar um erro semelhante a `unable to get image` ou mencionar
`dockerDesktopLinuxEngine`, o Docker Desktop não está em execução. Abra o
Docker Desktop, aguarde o status **Running** e execute novamente:

```bash
docker compose up --build
```

Se ele já estiver aberto, reinicie-o e confirme que está configurado para usar
**Linux containers**.

## Executando a API

No diretório raiz do projeto, execute:

```bash
cd api-rh
./mvnw spring-boot:run
```

No Windows, use:

```powershell
cd api-rh
.\mvnw.cmd spring-boot:run
```

Por padrão, a aplicação é iniciada na porta `8080`.

### Swagger UI

Com a API em execução, acesse:

<http://localhost:8080/swagger-ui/index.html>

O Swagger permite consultar e testar os endpoints diretamente pelo navegador.

## Executando o frontend

Em outro terminal:

```bash
cd web
npm install
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação, normalmente `http://localhost:5173`.

Atualmente, o frontend exibe a tela padrão do template React/Vite e ainda não consome os endpoints da API.

## API REST

Todos os endpoints abaixo retornam e recebem JSON.

### Funcionários

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `POST` | `/funcionarios` | Cria um funcionário |
| `GET` | `/funcionarios` | Lista os funcionários |
| `GET` | `/funcionarios/{id}` | Busca um funcionário por ID |
| `PUT` | `/funcionarios/{id}` | Atualiza um funcionário |
| `PATCH` | `/funcionarios/{id}/status?status={status}` | Atualiza somente o status |
| `DELETE` | `/funcionarios/{id}` | Exclui um funcionário |

Exemplo de criação:

```json
{
  "nome": "Ana Souza",
  "email": "ana.souza@example.com",
  "telefone": "11999999999",
  "cargo": "Desenvolvedora Java",
  "cidade": "São Paulo",
  "status": "ATIVO",
  "departamento": "Tecnologia",
  "dataAdmissao": "2026-01-15T00:00:00.000Z",
  "salario": 8500.00
}
```

### Candidatos

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `POST` | `/candidatos` | Cria um candidato |
| `GET` | `/candidatos` | Lista os candidatos |
| `GET` | `/candidatos/{id}` | Busca um candidato por ID |
| `PUT` | `/candidatos/{id}` | Atualiza um candidato |
| `PATCH` | `/candidatos/{id}/status?status={status}` | Atualiza somente o status |
| `DELETE` | `/candidatos/{id}` | Exclui um candidato |

Exemplo de criação:

```json
{
  "nome": "Carlos Lima",
  "email": "carlos.lima@example.com",
  "telefone": "21988888888",
  "cargo": "Analista de Recursos Humanos",
  "cidade": "Rio de Janeiro",
  "status": "EM_AVALIACAO",
  "departamentoVaga": "Recursos Humanos",
  "dataInscricao": "2026-02-10T00:00:00.000Z",
  "dataEntrevista": "2026-02-20T14:00:00.000Z",
  "pretencaoSalarial": 6000.00
}
```

Para alterar o status de um registro:

```bash
curl -X PATCH "http://localhost:8080/funcionarios/1/status?status=INATIVO"
```

## Regras de validação

A API valida os campos comuns de pessoas (`nome`, `email`, `telefone`, `cargo`, `cidade` e `status`) e exige um e-mail válido.

Além disso:

- Funcionários precisam informar `departamento`, `salario` maior ou igual a zero e `dataAdmissao`.
- Candidatos precisam informar `departamentoVaga`, `pretencaoSalarial` maior ou igual a zero e `dataInscricao`.
- A `dataEntrevista` do candidato, quando informada, não pode ser anterior à `dataInscricao`.
- IDs são gerados automaticamente quando não são informados.
- IDs usados em consultas, alterações e exclusões devem ser maiores que zero.

## Estrutura do projeto

```text
SpringRH/
├── api-rh/
│   ├── src/main/java/com/example/api_rh/
│   │   ├── config/       # Configuração do Swagger
│   │   ├── controller/   # Endpoints REST
│   │   ├── model/        # Funcionário, candidato e pessoa
│   │   ├── repository/   # Armazenamento em memória
│   │   └── service/      # Regras de negócio e validações
│   └── pom.xml
├── web/
│   ├── src/              # Aplicação React
│   ├── package.json
│   └── vite.config.ts
├── LICENSE
└── README.md
```

## Testes e verificações

Backend:

```bash
cd api-rh
./mvnw test
```

Frontend:

```bash
cd web
npm run lint
npm run build
```

## Roadmap

- Integrar o frontend aos endpoints da API.
- Substituir o armazenamento em memória por um banco de dados.
- Criar telas de listagem, cadastro, edição e acompanhamento de status.
- Ampliar a cobertura de testes unitários e de integração.
- Padronizar respostas de erro da API.
- Avaliar a inclusão de autenticação e autorização.

## Licença

Este projeto está disponível sob a licença definida em [LICENSE](LICENSE).
