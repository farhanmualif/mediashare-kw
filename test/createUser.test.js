import supertest from "supertest";
// import express from "express";
// const app = express();
import { app } from "../index.js";

describe("Login test", () => {
  it("should redirect to /index if username and password are valid", async () => {
    const res = await supertest(app)
      .post("/login")
      .send({ email: "paam6765@gmail.com" });
    console.log(res.status);
  });
});
