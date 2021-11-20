const { Temperament, conn } = require("../../src/db.js");
const { expect } = require("chai");

const temperament = {
  name: "really happy",
};

describe("Temperament model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Temperament.sync({ force: true }));
    describe("Create", () => {
      it("should throw an error if name is repeated", (done) => {
        Temperament.create(temperament)
          .then(() => Temperament.create(temperament))
          .then(() => done(new Error("The names cant be repeated")))
          .catch(() => done());
      });
      it("should work when the names are diferents", (done) => {
        Temperament.create(temperament)
          .then(() => Temperament.create({ name: "happy but not so much" }))
          .then(() => done())
          .catch((e) => done(e));
      });
    });
  });
});
