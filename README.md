# MongoDB schema validation practice
**v 0.0.1**

**Modules:**
```sh
"body-parser", "celebrate", "express", "joi-objectid", 
"mongoose", "validator", "eslint", "eslint-config-airbnb-base", 
"eslint-plugin-import", "nodemon"
```
### Getting started

The project was created on the [Node.js](https://nodejs.org/) v12+.

**Start server:**
```sh
$ npm install
$ npm run start
```
**Start server with hot reload:**
```sh
$ npm install
$ npm run dev
```

**For analyzes your code to quickly find and fix problems:**
```sh
$ npm run eslint
$ npm run eslintfix
```
### Docker

**After starting the server, you can try these queries:**

```sh
GET /users
GET /users/:userId
POST /users
GET /cards
POST /cards
```
### Todos

 - Add automated testing
 - Add ObjectId validations
 
### License

MIT
