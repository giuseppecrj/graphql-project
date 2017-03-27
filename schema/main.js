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

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
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
