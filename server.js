import express from 'express'
import { mySchema } from './schema/main'

import { graphql } from 'graphql'
import bodyParser from 'body-parser'

import { MongoClient } from 'mongodb'
import assert from 'assert'

let MONGO_URL = 'mongodb://localhost:27017/test'
let app = express()
let PORT = 3000

// parse POST
app.use(bodyParser.text({ type: 'application/graphql' }))

app.post('/graphql', (req, res) => {
  graphql(mySchema, req.body)
    .then(result => res.json(result))
})

MongoClient.connect(MONGO_URL, (err, db) => {
  assert.equal(null, err)
  console.log('Connected to MongoDB server')

  let server = app.listen(PORT, () => {
    let port = server.address().port
    console.log(`GRAPHQL listening at http://localhost:${port}`)
  })
})
