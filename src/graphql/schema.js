const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./typeDefs/typeDefs');
const resolvers = require('./resolvers/resolver');


const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

module.exports = schema;
