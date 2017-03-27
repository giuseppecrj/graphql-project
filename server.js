import express from 'express'
import graphqlHTTP from 'express-graphql'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { MongoClient } from 'mongodb'
import assert from 'assert'

import { mySchema } from './schema/main'

const app = express()
const MONGO_URL = 'mongodb://localhost:27017/test'
const PORT = 3000

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

MongoClient.connect(MONGO_URL, (err, db) => {
  assert.equal(null, err)
  console.log('Connected to MongoDB server')

  app.use('/graphql', graphqlHTTP({
    schema: mySchema,
    context: { db },
    graphiql: true
  }))

  const server = app.listen(PORT, () => {
    const port = server.address().port
    console.log(`GRAPHQL listening at http://localhost:${port}`)
  })
})
