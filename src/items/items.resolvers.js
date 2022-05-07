const { getItemsQuery, getItemByIdQuery } = require('./items.queries');

const itemsResolvers = {
  Query: {
    getItems: (parent, args, context, info) =>
      getItemsQuery(context.dataSources.inventoryDb.knex),
    getItemById: (parent, args, context, info) =>
      getItemByIdQuery(args, context.dataSources.inventoryDb.knex),
  },
};

module.exports = itemsResolvers;
