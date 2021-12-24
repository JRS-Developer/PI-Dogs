/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, conn } = require("../../src/db.js");

const agent = session(app);
const dog = {
  name: "Pug",
  height: "1 - 2",
  weight: "1 - 2",
  min_height: 1,
  max_height: 2,
  min_weight: 1,
  max_weight: 2,
  min_years: 1,
  max_years: 2,
};

const name = "bulldog";

describe("Dogs routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Dog.sync({ force: true }).then(() => Dog.create(dog)));
  describe("GET /dogs", () => {
    it("should get 200", () => agent.get("/dogs").expect(200));
    it("When success, should return an array with all the breeds", async () => {
      const res = await agent.get("/dogs");

      expect(res.body).to.be.an("array");
    });
    it("Should return with the properties id, name,image, temperament, height, and weight", async () => {
      const res = await agent.get("/dogs");

      expect(res.body[0]).to.have.all.keys(
        "name",
        "image",
        "temperament",
        "height",
        "weight",
        "id"
      );
    });
    it("Should return an array of results when searching by name", async () => {
      const res = await agent.get(`/dogs?name=${name}`);

      expect(res.body).be.an("array");
    });
    it("Should returns the results containing the searched name", async () => {
      const res = await agent.get(`/dogs?name=${name}`);

      expect(res.body[0].name.toLowerCase()).includes(name);
      expect(res.body[1].name.toLowerCase()).includes(name);
      expect(res.body[2].name.toLowerCase()).includes(name);
    });
    it("Should return a message when does not find any result", async () => {
      const res = await agent.get("/dogs?name=quebuentestche");

      expect(302);
      expect(res.body).to.deep.equal({ message: "No Results" });
    });
  });
  describe("GET /dogs/:idRaza", () => {
    it("Should get 200", async () => {
      await agent.get("/dogs/1");

      expect(200);
    });
    it("Should return an unique object containing a breed", async () => {
      const res = await agent.get("/dogs/1");

      expect(res.body).to.be.an("object");
    });
    it("should return an object containing the properties id, name, image, temperament, height, weight, and life span", async () => {
      const res = await agent.get("/dogs/1");

      expect(res.body).to.have.all.keys(
        "id",
        "name",
        "image",
        "temperament",
        "height",
        "weight",
        "life_span"
      );
    });
    it("should return a message if does not find any result that match the id", async () => {
      const res = await agent.get("/dogs/921a");

      expect(res.body).to.deep.equal({ message: "No Results" });
    });
  });
  describe("POST /dogs/", () => {
    it("should return an error with a message if the name is not provided", async () => {
      const res = await agent.post("/dogs/").send({ ...dog, name: "" });
      expect(403);

      expect(res.body).to.deep.equal({
        message: "Please provide the name of the breed",
      });
    });
    it("should return an error with a message if any of the min and max height and weight is not provided", async () => {
      const newDog = {
        ...dog,
        min_weiht: "",
        min_height: "",
        max_height: "",
        min_weight: "",
      };
      const res = await agent.post("/dogs/").send(newDog);

      expect(403);
      expect(res.body).to.deep.equal({
        message: "Please provide the min and max height and weight",
      });
    });
    it("should return an error with a message if the min height is higher that the max height", async () => {
      const res = await agent
        .post("/dogs/")
        .send({ ...dog, min_height: 3, max_height: 1 });

      expect(403);
      expect(res.body).to.deep.equal({
        message: "The min height cant be higher that max height",
      });
    });
    it("should return an error with a message if the min weight is higher that the max weight", async () => {
      const res = await agent
        .post("/dogs/")
        .send({ ...dog, min_weight: 3, max_weight: 1 });

      expect(403);
      expect(res.body).to.deep.equal({
        message: "The min weight cant be higher that max weight",
      });
    });
    it("should return an error with a message ONLY when the min years and max years are provided and the min years is higher that max years", async () => {
      const res = await agent
        .post("/dogs/")
        .send({ ...dog, min_years: 3, max_years: 1 });

      expect(403);
      expect(res.body).to.deep.equal({
        message: "The min years cant be higher that max years",
      });
    });
    it("should return 201 when the dog is created", async () => {
      await agent.post("/dogs/").send(dog);

      expect(201);
    });
    it("should return a message when there is already a breed with that name", async () => {
      const newDog = { ...dog, name: "Dug" };
      await agent.post("/dogs/").send(newDog);
      const res = await agent.post("/dogs/").send(newDog);

      expect(303);
      expect(res.body).deep.equal({
        message: "There is already a breed with that name",
      });
    });
  });
});
