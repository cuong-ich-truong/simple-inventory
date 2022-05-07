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
`;

module.exports = typeDefs;
