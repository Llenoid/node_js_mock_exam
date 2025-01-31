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

const dbUri = process.env.DB_URI
MongoClient.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(client=> {
    const db = client.db('myDb')
    const userCollection = db.collection('users')
  })
  .catch(err=> {
    console.error('Failed to connect to the database',err)
  })

app.get('/users',async(req,res)=> {
  // just testing out endpoint using postman
  res.send('get users')
  console.log('get users')
})

app.post('/users', async(req,res)=> {
  res.send('add new user')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`)
})
