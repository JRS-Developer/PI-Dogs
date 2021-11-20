const { Dog, conn } = require("../../src/db.js");
const { expect } = require("chai");

const dog = {
  name: "Pug",
  height: "1 - 2",
  weight: "1 - 2",
};

describe("Dog model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe("Create", () => {
      it("should throw an error if name is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should throw an error if height is null", (done) => {
        Dog.create({ name: "Pug" })
          .then(() => done(new Error("It requires a valid height")))
          .catch(() => done());
      });
      it("should throw an error if weight is null", (done) => {
        Dog.create({ name: "Pug", height: "1 - 2" })
          .then(() => done(new Error("it requires a valid weight")))
          .catch(() => done());
      });
      it("should work when it has a valid name, height and weight", (done) => {
        Dog.create(dog)
          .then(() => done())
          .catch((e) => done(e));
      });
    });
  });
});
