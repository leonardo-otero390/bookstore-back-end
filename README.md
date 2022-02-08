# template-nodejs-mongodb

## Motivação

Esse template diminui a burocracia de criar um server Node.js/Express com mongodb, possuindo a maior parte das configurações inicias já feitas. O template segue os padrões de projetos da Driven Education.

## Dependencias

### Produção

- express
- mongodb
- cors
- dotenv
- jest
- babel-jest
- supertest
- bcrypt
- uuid
- joi

### Dev

- eslint (airbnb base)
- husky
- nodemon
- faker-br

## Requisitos

### [npm](https://www.npmjs.com/)

<details>
    <summary>install npm</summary>

```bash
wget -qO- <https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh> | bash

## Ou esse comando
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# Feche e abra o terminal novamente
nvm install --lts
nvm use --lts
# Verificar a versão do node
node --version # Deve exibir v14.16.1
# Verificar a versão do npm
npm -v
```
</details>

### [mongodb](https://www.mongodb.com/)

<details>
    <summary>install mongodb</summary>

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
mkdir ~/.mongo
```
* Se falhar execute o seguinte comando e tente novamente o primeiro

```bash
sudo apt-get install gnupg wget
```
</details>

para inicializar o mongo:

```bash
mongod --dbpath ~/.mongo
```

## Como usar?

1- Crie um repositório utilizando esse template ao clicar no botão "use this template" acima.

2 - Dê um `git clone` em seu repositorio

3 - Na pasta do projeto, dê um `npm install`

4 - Adicione seus arquivos .env na pasta raiz

5 - De um `npx husky install`

6 - De um `npm run start:dev`

7- Opcionalmente, adicione os detalhes do seu projeto no package.json (nome, url, etc)

Há tres scripts iniciais:

    "start": "NODE_ENV=prod node src/server.js",
    "start:dev": "NODE_ENV=dev nodemon src/server.js",
    "test": "NODE_ENV=test npx jest"

### Fique a vontade para melhorar esse template ou me dar dicas de como fazer isso.
