/**
 * Simple resolvers for status check
 */
const helloResolvers = {
  Query: {
    hello: (_, { name }) =>
      `This is a simple inventory. Nice to meet you, ${name}.`,
  },
};

module.exports = helloResolvers;
