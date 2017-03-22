import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'world'
    }
  }
})

export const mySchema = new GraphQLSchema({
  query: queryType
})
