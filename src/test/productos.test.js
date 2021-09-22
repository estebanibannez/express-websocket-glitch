const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;
const faker = require("faker");

describe("TEST LOGIN", () => {
  it("debería retornar un status 302 redirección a home", async () => {
    let usuarioTest = {
      email: "e.ibannez.p@gmail.cl",
      password: "1234",
    };

    let response = await request
      .post("/login")
      .send(usuarioTest)
      .set("Accept", "application/json");

    expect(response.status).to.eql(302);
  });
});

describe("TEST REGISTER", () => {
  it("debería retornar un status 200", async () => {
    let response = await request.get("/register");
    //console.log(response.status)
    //console.log(response.body)
    expect(response.status).to.eql(200);
  });

  it("debería incorporar un nuevo usuario y redirigir al home status 302", async () => {
    let usuario = () => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: "1234",
    });
    console.log(usuario);

    let usuarioTest = {
      firstName: "test1@test.cl",
      lastName: "test1@test.cl",
      email: "test1@test.cl",
      password: "1234",
    };

    let response = await request.post("/register").send(usuarioTest);
    expect(response.status).to.eql(302);

    // const user = response.body;
    // expect(user).to.include.keys("firstName", "email");
    // expect(user.firstName).to.eql(usuario.firstName);
    // expect(user.email).to.eql(usuario.email);
  });
});
