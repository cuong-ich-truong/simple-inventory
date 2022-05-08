const { gql } = require('apollo-server');

const typeDefs = gql`
  type Item {
    id: ID!
    name: String!
    description: String
    tags: [String]
    price: Float
    currency: String
  }

  type Query {
    "Check server status"
    hello(name: String!): String

    "Get all items"
    getItems: [Item]

    "Get an item by Id"
    getItemById(id: ID!): Item
  }

  type Mutation {
    "Add an item"
    addItem(
      name: String!
      description: String
      tags: [String]
      price: Float
      currency: String
    ): ID
  }
`;

module.exports = typeDefs;
