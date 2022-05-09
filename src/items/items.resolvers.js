/* eslint-disable no-unused-vars */
const {
  getItemsQuery,
  getItemByIdQuery,
  filterItemsQuery,
} = require('./items.queries');
const { addItemMutation } = require('./items.mutations');
const {
  sendActionMessage,
  sendEventMessage,
} = require('../services/message-producer.service');

const itemsResolvers = {
  Query: {
    /**
     * Get all items
     * @param {*} parent The return value of the resolver for this field's parent.
     * @param {*} args An object that contains all GraphQL arguments provided for this field.
     * @param {*} context An object shared across all resolvers that are executing for a particular operation. Use this to share per-operation state, including authentication information, dataloader instances, and anything else to track across resolvers.
     * @param {*} info Contains information about the operation's execution state, including the field name, the path to the field from the root, and more.
     * @returns [Item]
     */
    getItems: (parent, args, context, info) => {
      sendActionMessage({
        action: 'getItems',
        args,
      });
      return getItemsQuery(context.dataSources.inventoryDb.knex);
    },

    getItemById: (parent, args, context, info) => {
      sendActionMessage({
        action: 'getItemById',
        args,
      });
      return getItemByIdQuery(args, context.dataSources.inventoryDb.knex);
    },

    filterItems: (parent, args, context, info) => {
      sendActionMessage({
        action: 'filterItems',
        args,
      });

      return filterItemsQuery(args, context.dataSources.inventoryDb.knex);
    },
  },

  Mutation: {
    addItem: (parent, args, context, info) => {
      sendActionMessage({
        action: 'addItem',
        args,
      });

      return addItemMutation(args, context.dataSources.inventoryDb.knex);
    },
  },
};

module.exports = itemsResolvers;
