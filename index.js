const express = require('express')

const app = express()

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
