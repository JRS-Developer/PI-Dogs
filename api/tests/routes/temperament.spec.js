const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { conn, Temperament } = require("../../src/db.js");

const agent = session(app);

describe("Temperament Routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Temperament.sync({ force: true }));
  describe("GET /temperament", () => {
    it("should get 200", async () => {
      await agent.get("/temperament");
      expect(200);
    });
    it("should return an array containing the temperaments", async () => {
      const res = await agent.get("/temperament");
      expect(res.body).to.be.an("array");
    });
    it("should return the temperaments with the properties id and name", async () => {
      const res = await agent.get("/temperament");
      expect(res.body[0]).to.have.all.keys('id', 'name')
    })
  });
});
