# simple-inventory
A Simple GraphQL server

## System Requirements

- Node.js v8.x or later
- npm v6.x or later

## Data Sources

Apollo server supports multiple data sources out of the box:

```js
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ 
    database1,
    database2, 
   }),
});
```

This project uses knex with in-memory database. The database change be change simply by changing the knex config:

```js
const knexInstance = require('knex')({
  client: 'better-sqlite3',
  connection: {
    filename: './mydb.sqlite',
  },
});
```

## Run Project

1. Install: `npm i`
2. Start server: `npm run start`

The GraphQL server will be available at <http://localhost:4000/>

## Queries and Mutations

### Hello

**Operation:**

```gql
query {
  hello(name: "Cuong Truong")
}
```

**Response:**

```json
{
  "data": {
    "hello": "This is a simple inventory. Nice to meet you, Cuong Truong."
  }
}
```

---

### Items

**Operation:**

```gql
query GetItems {
  getItems {
    id
    name
    description
    tags
    price
    currency
  }
}
```

**Response:**

```json
{
  "data": {
    "getItems": [
      {
        "id": "1",
        "name": "Sony X85J 65\" 4K UHD HDR LED Smart Google TV",
        "description": "Experience your favourite movies, video games, and sports in true-to-life clarity with this 65\" Sony 4K UHD smart TV.",
        "tags": [],
        "price": 1097.98,
        "currency": "USD"
      },
      ...
    ]
  }
}
```

**Operation:**

```gql
query {
  getItemById(id: 1) {
    id
    name
    description
    tags
    price
    currency
  }
}

```

**Response:**

```json
{
  "data": {
    "getItemById": {
      "id": "1",
      "name": "Sony X85J 65\" 4K UHD HDR LED Smart Google TV",
      "description": "Experience your favourite movies, video games, and sports in true-to-life clarity with this 65\" Sony 4K UHD smart TV.",
      "tags": [],
      "price": 1097.98,
      "currency": "USD"
    }
  }
}
```

---
