/* eslint-disable */
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLInterfaceType,
  GraphQLBoolean,
  GraphQLEnumType
} from 'graphql'
/* eslint-enable */

const QuoteType = new GraphQLObjectType({
  name: 'Quote',
  fields: {
    id: {
      type: GraphQLString,
      resolve: obj => obj._id
    },
    text: { type: GraphQLString },
    author: { type: GraphQLString }
  }
})

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    allQuotes: {
      type: new GraphQLList(QuoteType),
      description: 'A list of the quotes in the database',
      resolve: (_, args, { db }) =>
        db.collection('quotes').find().toArray()
    },
    usersCount: {
      description: 'Total number of users in the database',
      type: GraphQLInt,
      resolve: (_, args, { db }) => db.collection('users').count()
    }
  }
})

export const mySchema = new GraphQLSchema({
  query: queryType
})
