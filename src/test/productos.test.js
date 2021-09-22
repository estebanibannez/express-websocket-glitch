const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;

const faker = require("faker");

describe("TEST PRODUCTOS", () => {
  it("debe retornar status 200 producto id: 61426d9e2d1cdd36800eaa76 encontrado", async () => {
    let response = await request
      .get("/productos/listar/61426d9e2d1cdd36800eaa76")
      .set("Accept", "application/json");

    expect(response.status).to.eql(200);
  });

  it("debe retornar status OK message : 'Producto no encontrado' producto id: 613eb8182da69ed5bdb82c32", async () => {
    let response = await request
      .get("/productos/listar/613eb8182da69ed5bdb82c32")
      .set("Accept", "application/json");

    expect(response.body.message).to.eql("Producto no encontrado");
  });

  it("debe retornar status 200 , crea un producto nuevo", async () => {
    let producto = {
      nombre: faker.commerce.productName(),
      precio: faker.commerce.price(),
      stock: 2,
      thumbnail: faker.image.imageUrl(),
    };

    let response = await request
      .post("/productos/guardar")
      .send(producto)
      .set("Accept", "application/json");

    expect(response.status).equal(200);
    expect(response.body.message).to.eql("OK Producto creado");
  });
});
