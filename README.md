## Bookstore Backend

The Bookstore is the best place to find and buy your favorite books.

This project is the backend with MongoDB for [Bookstore](bookstore-front-end.vercel.app). You can check the [frontend repository](https://github.com/JefersonBatista/bookstore-front-end) for more information.

You can use the [endpoint deployed to heroku](https://my-wallet390.herokuapp.com)
Below are the implemented features:

- Sign-up, log-in, and logout
- Get all products
- Register new user purchase

## Endpoints

<details>
    <summary>
        <strong style="color:green;">POST</strong> /sign-up
    </summary>
send body request like this:

```json
{
  "name": "joe",
  "email": "joe@live.com",
  "password": "thebestpassword"
}
```

- it returns status <strong style="color:green;">201</strong> for success

- it returns status <strong style="color:purple;">400</strong> for any entry error

- it returns status <strong style="color:purple;">409</strong> for email already in use

</details>
<details>
    <summary>
        <strong style="color:green;">POST</strong> /log-in
    </summary>
send body request like this:

```json
{
  "email": "joe@live.com",
  "password": "thebestpassword"
}
```

- it returns status <strong style="color:green;">200</strong> and an object like this:

```json
{
  "token": "1cf7cccf-48ad-4edd-8b9d-121b1199aaf4",
  "user": "joe"
}
```

- it returns status <strong style="color:purple;">400</strong> for any entry error

- it returns status <strong style="color:purple;">401</strong> for email/password error

</details>
<details>
    <summary>
        <strong style="color:green;">GET</strong> /products
    </summary>

- it returns status <strong style="color:green;">200</strong> and an array like this:

```json
[
  {
    "_id": "6207fd16200090d6e5f2d6fa",
    "title": "Nárnia",
    "author": "C.S Lewis",
    "image": "https://images-na.ssl-images-amazon.com/images/I/71yJLhQekBL.jpg",
    "price": 23.9,
    "quantity": 2
  },
  {
    "_id": "6207fd16200090d6e5f2d6fb",
    "title": "Scott Pilgrim",
    "author": "Canadian Guy",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwfrlCP_m82D26JZlU5mF-JSKAclfqHt7kvw&usqp=CAU",
    "price": 10.23,
    "quantity": 0
  }
]
```

</details>

### All following needs token authorization

<details>
    <summary>
        <strong >Authorization</strong>
    </summary>
- send a Bearer token on headers like this:

```json
{
  "headers": {
    "authorization": "Bearer 1cf7cccf-48ad-4edd-8b9d-121b1199aaf4"
  }
}
```

- it returns <strong style="color:purple;">400</strong> for empty auth, without Bearer or token not uuid

- it returns <strong style="color:purple">422</strong> for empty token with Bearer

- it returns <strong style="color:purple;">401</strong> for unauthorized

</details>

<details>
    <summary>
        <strong style="color:red;">DELETE</strong> /sessions
    </summary>

- it returns status <strong style="color:green;">200</strong>

</details>
<details>
    <summary>
        <strong style="color:green;">POST</strong> /checkout
    </summary>
send body request like this:

```json
{
  "_id": "1cf7cccf-48ad-4edd-8b9d-121b1199aaf4",
  "quantity": 2,
  "paymentWay": "credit card"
}
```

- paymentWay must be "credit card" or "billet" or "pix"

- it returns status <strong style="color:purple;">409</strong> if there isn't stock

- it returns status <strong style="color:green;">201</strong> for success

</details>

## Technologies

<div style="display: flex; gap: 10px; height: 40px;">
  <a title="JavaScript" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> 
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" height="40"/>
  </a>
  <a title="Node JS" href="https://nodejs.org" target="_blank" rel="noreferrer"> 
      <img style="background: white;" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" height="40"/> 
  </a>
  <a title="Express JS" href="https://expressjs.com/" target="_blank" rel="noreferrer"> 
      <img style="background: white;" src="https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg" alt="expressjs" height="40"/> 
  </a>
  <a title="Mongodb" href="https://mongodb.com/" target="_blank" rel="noreferrer"> 
      <img style="background: green;" src="https://webimages.mongodb.com/_com_assets/cms/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg?auto=format%252Ccompress" alt="mongodb" height="40"/> 
  </a>
</div>

## Requirements

### [npm](https://www.npmjs.com/)

<details>
    <summary>install npm</summary>

```bash
wget -qO- <https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh> | bash

## Or this command
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# Close and open terminal
nvm install --lts
nvm use --lts
# Verify node version
node --version # Must show v14.16.1
# Verify npm version
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

- If it fails execute the following command and then try again the first one

```bash
sudo apt-get install gnupg wget
```

</details>

## How to run

1. Clone this repository
2. Install dependencies

```bash
npm i
```

3. Run mongodb with

```bash
mongod --dbpath ~/.mongo
```

4. set your .env file

5. Run the project with

```bash
npm run start (mongodb deploy)
```

6. Run the project in development mode (nodemon)

```bash
npm run start:dev
```
