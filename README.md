# Open JSNAD Certification Mock Exam

A backend http server demonstrating the `express` framework and `NodeJS` standard library.  
The server comes with:
* connecting to a MongoDB database
* endpoint for getting all users in the database
* endpoint for creating new users
* error handling middleware
* use of environment keys and accessing them using `dotenv`  package
* new user validation
* writing to a file
* reading from a file
* endpoint for handling form submission

To bootstrap the project from scratch run:
```sh
npm init
cd <project folder>
npm i express body-parser cors dotenv mongodb morgan joi
npm i -D mocha chai supertest
```

Create a mongodb database cluster and copy the DB URI in an `.env` file like so:
```sh
DB_URI=<mongodb-database-cluster-uri>
```

Added basic test for `/users` endpoint using `Mocha` and `supertest`  
To start the test use:
```sh
npx mocha test/users.test.js
```
