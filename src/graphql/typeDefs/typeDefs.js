const { buildSchema } = require('graphql');

const messageTypeDef = require('./messageTypeDef');
const productsTypeDef = require('./productsTypeDef');

// const typeDefs = buildSchema(`
//     scalar Date

//     type Query {
//         _: String
//     }

//     type Mutation {
//         _: String
//     }
// `);
module.exports = [ messageTypeDef, productsTypeDef ];
