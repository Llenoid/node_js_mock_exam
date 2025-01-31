const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const dotenv = require('dotenv')
const {MongoClient} = require('mongodb')
const Joi = require('joi')
const fs = require('fs')

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, 'public')))

let usersCollection

const dbUri = process.env.DB_URI
MongoClient.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(client=> {
    const db = client.db('myDb')
    usersCollection = db.collection('users')
  })
  .catch(err=> {
    console.error('Failed to connect to the database',err)
  })


// @desc Get all Users
// @route GET /users
// @access Public
app.get('/users', async(req,res)=> {
  try {
    const users = await usersCollection.find().toArray();
    console.log(users)
    res.status(200).json(users)
  } catch (err) {
    console.log(err)
    res.status(500).send('Error retrieving users')
  }
})

// @desc Create new user
// @route POST /users
// @access Public
app.post('/users', async(req,res)=> {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required()
  })

  const {error} = schema.validate(req.body)
  if (error) {
    // invalid request
    return res.status(400).send(error.details[0].message)
  }

  const {name, email} = req.body;
  try {
    const result = await usersCollection.insertOne({name, email})
    res.status(201).json(result)
  } catch(err) {
    res.status(500).send('Failed to add user')
  }
})

app.use((err, req,res, next)=> {
  res.status(500).send('Internal server error')
})

fs.writeFile('hello.txt', 'Hello, Node.js!', (err)=> {
  if (err) throw err;
  console.log('File has been saved')
})

fs.readFile('hello.txt','utf8',(err, data) => {
  if (err) throw err;
  console.log(data)
})

app.get('/test', (req,res) => {
  res.send('Test successful!')
})

const apiKey = process.env.API_KEY

app.post('/form', (req, res)=> {
  const {name, age} = req.body;
  if (!name || !age) {
    return res.status('400').send('Name and age are required')
  }
  res.send(`Form submitted with name: ${name} and age: ${age}`)
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`)
})

// export app so we can test
module.exports = app;
