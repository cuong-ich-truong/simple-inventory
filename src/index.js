const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphQL/schema');
const resolvers = require('./graphQL/resolvers');
const InventoryDatabase = require('./database');

const knex = require('knex')({
  client: 'better-sqlite3',
  connection: {
    filename: ':memory:',
  },
});

const inventoryDb = new InventoryDatabase(knex);
inventoryDb.runSeed();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ inventoryDb }),
});

server.listen().then(() => {
  console.log(`
    Server is running at http://localhost:4000/
  `);
});
