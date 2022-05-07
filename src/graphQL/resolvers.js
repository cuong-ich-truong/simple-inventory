const helloResolvers = require('../hello/hello.resolvers');
const itemsResolvers = require('../items/items.resolvers');

/**
 * Combined all resolvers
 */
const resolvers = {
  ...helloResolvers,
  ...itemsResolvers,
};

module.exports = resolvers;
