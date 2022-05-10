const { gql } = require('apollo-server');

const typeDefs = gql`
  enum Sort {
    ASC
    DESC
  }

  input OrderItemBy {
    name: Sort
    price: Sort
  }

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
    getItems(orderBy: OrderItemBy): [Item]

    "Get an item by Id"
    getItemById(id: ID!): Item

    "Filter items by search criteria"
    filterItems(
      name: String
      description: String
      priceFrom: Float
      priceTo: Float
      orderBy: OrderItemBy
    ): [Item]
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
