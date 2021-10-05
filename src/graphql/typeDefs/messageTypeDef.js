const { buildSchema } = require('graphql');

const schema = buildSchema(`
  "Entidad que representa un mensaje de entrada"
  input MessageInput {
    email: String
    mensaje: String
    autor: String
  }

  "Entidad que representa un mensaje"
  type Message {
    timestamp: String
    email: String
    mensaje: String
    autor: String
  }

  type Query {
    message: String,
    messages: [String],
    "Retorna un arreglo de mensajes"
    getMessages: [Message],
    "Retorna un mensaje por Id"
    getMessagesById(_id: ID!): Message
   
  }
 
  type Mutation {
    "Elimina un mensaje por Id"
    deleteMessagesById(_id: ID!): Message
    "Crea un mensaje nuevo"
    createMessage(input: MessageInput): Message
  }
 
`);

module.exports = schema;
