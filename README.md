# simple-inventory

A Simple GraphQL server

## System Requirements

- Node.js v8.x or later
- npm v6.x or later
- Docker to run RabbitMQ in local machine or a account in CloudAMQP

---

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
---

## How To Run

From the root folder

1. To install packages, run

```bash
npm i 
```

2. Setup RabbitMQ (either run locally or on the cloud)
  
    2.1. Run locally using Docker

      - Download and install [Docker](https://docs.docker.com/desktop/windows/install)
      - In the **.env**, make sure the variable is set to local URL: `RABBITMQ_URL=amqp://localhost`
      - To start the container, run

      ```bash
      npm run start:rbmq
      ```

      (you can also run `npm run stop:rbmq` to stop the container)

    2.2 Run on cloud using CloudAMQP

      - Create a free account at [CloudAMQP](https://customer.cloudamqp.com)
      - Create an instance and obtain the AMQP URL
      - In the **.env**, change the variable to your AMQP URL: `RABBITMQ_URL=amqps://wfozdkso:{password}@armadillo.rmq.cloudamqp.com/wfozdkso`

3. With the RabbitMQ ready, now we can run both the message consumers

  Start the Action Service by opening a new terminal and run
  
  ```bash
  npm run start:action
  ```

  Start the Event Service by opening an other terminal and run
  
  ```bash
  npm run start:event
  ```

4. Finally, open a new terminal and start the inventory server using this command

```bash
npm run start:inventory
```

5. The GraphQL server will be available at <http://localhost:4000/>

---

## Queries and Mutations

### Hello

- Queries:

  - hello

Example

```js
// Check sever status
query {
  hello(name: "Cuong Truong")
}

// Response
{
  "data": {
    "hello": "This is a simple inventory. Nice to meet you, Cuong Truong."
  }
}
```

### Items

- Queries:
  - getItems
  - getItemById
  - filterItems
- Mutations:
  - addItem

 Example:

```js
// Get all Items
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

//Response:
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

// Get an item by id
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


// Get all items with price from 500 to 1000
query {
  filterItems(
    priceFrom: 500,
    priceTo: 1000
  ) {
    id
    name
    description
    price
  }
}

// Add a new item
mutation {
  addItem(
    name: "new 50\" Tv", 
    description: "This is a new TV.", 
    price: 900.98, 
    currency: "USD", 
    tags: ["New", "50\""])
}
```
