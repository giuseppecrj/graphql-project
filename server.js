import express from 'express'
import graphqlHTTP from 'express-graphql'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { MongoClient } from 'mongodb'
import assert from 'assert'

import { mySchema } from './schema/main'

let MONGO_URL = 'mongodb://localhost:27017/test'
let PORT = 3000

MongoClient.connect(MONGO_URL, (err, db) => {
  assert.equal(null, err)
  console.log('Connected to MongoDB server')

  let app = express()

  app.use(morgan('dev'))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use('/graphql', graphqlHTTP({
    schema: mySchema,
    context: { db },
    graphiql: true
  }))

  let server = app.listen(PORT, () => {
    let port = server.address().port
    console.log(`GRAPHQL listening at http://localhost:${port}`)
  })
})
