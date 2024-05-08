# ET Software Engineer Interview

## How to setup

- [Node@18](https://nodejs.org/docs/latest-v18.x/api/)
- [NPM](https://www.npmjs.com/)
- [ESM](https://nodejs.org/docs/latest-v18.x/api/esm.html)
- [Typescript](https://www.typescriptlang.org/)
- [JEST](https://jestjs.io/)
- [Docker](https://www.docker.com/)

Run the following command to install the dependencies:

```sh
npm install
```

## How to run

To build the image you can call the following command:

```sh
./docker-build.sh
```

To run the application you can call the following command:

```sh
docker compose up
```

### How to debug

If you use VSCode to debug please run the following command:

```sh
rsync -r /Applications/Visual\ Studio\ Code.app/Contents/Resources/app/extensions/ms-vscode.js-debug .
```

then add the following volume to your `docker-compose.yaml` under `rest-api-service`

```yaml
# Needed for debugging
- ./ms-vscode.js-debug:/Applications/Visual Studio
  Code.app/Contents/Resources/app/extensions/ms-vscode.js-debug
```

finally, change the command of the `rest-api-service` to `start:debug`.

## Tasks

- [ ] Implement a REST API using [TypeScript](https://www.typescriptlang.org/) and [Koa](https://koajs.com/)
- [ ] Add a new REST Endpoint to retrieve orders for a given account
- [ ] Add unit tests for the new code

### Requirements

- [ ] Request must be validated
- [ ] The orders should be presented with a list of associated products
- [ ] The orders should be presented with a total price
- [ ] The orders should be sortable by date
- [ ] The response must be in JSON
- [ ] It should run in Docker

### Extras

- [ ] The orders should be paginated
- [ ] The orders should be filtered by date
- [ ] The orders should be filtered by product
- [ ] The response format can be chosen (e.g. CSV, XML, JSON etc.)

## SQL Tables

### Account Table

| Field     | Type          | Null | Key | Default | Extra    |
| :-------- | :------------ | :--- | :-- | :------ | :------- |
| accountId | varchar(36)   | NO   | PRI |         | UUID     |
| name      | varchar(50)   | NO   |     |         |          |
| taxRate   | decimal(10,2) | NO   |     | 0       | Percent  |
| currency  | varchar(3)    | NO   |     | USD     | ISO 4217 |

### Product Table

| Field     | Type          | Null | Key | Default | Extra |
| :-------- | :------------ | :--- | :-- | :------ | :---- |
| productId | varchar(36)   | NO   | PRI |         | UUID  |
| name      | varchar(50)   | NO   |     |         |       |
| price     | decimal(10,2) | NO   |     | 0       |       |

### Order Products Table

| Field     | Type        | Null | Key | Default | Extra |
| :-------- | :---------- | :--- | :-- | :------ | :---- |
| orderId   | varchar(36) | NO   | PRI |         | UUID  |
| productId | varchar(36) | NO   | PRI |         | UUID  |
| quantity  | int         | NO   |     | 0       |       |

### Orders Table

| Field     | Type        | Null | Key | Default | Extra |
| :-------- | :---------- | :--- | :-- | :------ | :---- |
| orderId   | varchar(36) | NO   | PRI |         | UUID  |
| accountId | varchar(36) | NO   | MUL |         |       |
| date      | datetime2   | NO   |     | 0       |       |

## Repository Tree

```sh
├── .vscode
│   └── ... # vscode settings
├── coverage
│   └── ... # coverage reports
├── dist
│   └── ... # compiled code
├── docker-db-service
│   ├── assets
│   │   └── *.json # reference used to generate the queries
│   ├── queries
│   │   └── *.sql # queries ran at DB startup
│   └── *.sh # scripts ran at DB startup
├── node_modules
│   └── ... # node modules
├── src
│   ├── __mocks__
│   │   └──  *.ts # global mocks
│   ├── middleware
│   │   ├── __mocks__
│   │   │   └── *.ts # middleware mocks
│   │   └── *.{test.,spec.,}ts
│   ├── utils
│   │   ├── __mocks__
│   │   │   └── *.ts # utils mocks
│   │   └── *.{test.,spec.,}ts
│   └── *.{test.,spec.,}ts
└── ... # config
```
