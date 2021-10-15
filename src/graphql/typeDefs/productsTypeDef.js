const { buildSchema } = require('graphql');

const schema = buildSchema(`
  input ProductInput {
    nombre: String
    precio: String
    stock: String
    thumbnail: String
  }

  type Query {
    Product: String,
    Products: [Product],
  }
  
  extend type Query {
    "Retorna un arreglo de productos"
    getProducts: [Product],
    "Busca un producto por Id"
    getProductsById(_id: ID!): Product
  }

  type Mutation {
    "Actualiza un producto por Id"
    updateProduct(id: ID!, input: ProductInput): Product!
    "Elimina un producto por Id"
    deleteProductById(_id: ID!): Product
  }

  "Entidad que representa un producto"
  type Product {
    """Identificador único """
    _id: ID!,
    """Nombre del producto"""
    nombre: String,
    """Precio del producto"""
    precio: String,
    """Stock del producto"""
    stock: String,
    """Foto del producto"""
    thumbnail: String
  }
`);

module.exports = schema;
