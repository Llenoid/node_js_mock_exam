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

Added basic test for `/users` endpoint using `Mocha` and `supertest`  
```sh
npx mocha test/users.test.js
```
