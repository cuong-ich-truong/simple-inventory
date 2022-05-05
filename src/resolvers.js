const helloResolvers = require('./hello/hello.resolvers');

/**
 * Combined all resolvers
 */
const resolvers = {
  ...helloResolvers,
};

module.exports = resolvers;
