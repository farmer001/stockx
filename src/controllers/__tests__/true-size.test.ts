import request from "supertest";
import { makeRouter } from "../true-size";
import express from "express";
import mockKnex from "mock-knex";
import knex from "knex";

// Utility constants.
const MOCK_NAME = "some name";
const MOCK_SIZE = 3;
const MOCK_AVERAGE = 2.75;

let app = express();
let tracker = mockKnex.getTracker();

describe("true-size", () => {
  beforeEach(() => {
    // Mocks connection to database.
    const connection = knex({ client: "pg" });
    mockKnex.mock(connection);

    // Creates tracker object used to mock database queries.
    tracker = mockKnex.getTracker();
    tracker.install();

    // Creates app with router to be tested.
    app = express();
    app.use(makeRouter(connection));
  });

  it("should get average value correctly.", done => {
    tracker.on("query", query => {
      query.response({ avg: MOCK_AVERAGE });
    });

    request(app)
      .get(`/${MOCK_NAME}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({ name: MOCK_NAME, avgValue: MOCK_AVERAGE });

        done();
      });
  });

  it("POST calls insert method and returns correctly.", done => {
    let validInsert = false;
    tracker.on("query", query => {
      if (query.method === "insert") {
        validInsert =
          query.sql ===
            'insert into "true_sizes" ("name", "value") values ($1, $2)' &&
          JSON.stringify(query.bindings) ===
            JSON.stringify([MOCK_NAME, MOCK_SIZE]);
      }

      query.response({ avg: MOCK_AVERAGE });
    });

    request(app)
      .post("/")
      .send({ name: MOCK_NAME, size: MOCK_SIZE })
      .expect(200)
      .then(({ body }) => {
        expect(validInsert).toBeTruthy();
        expect(body).toEqual({ name: MOCK_NAME, avgValue: MOCK_AVERAGE });
        done();
      });
  });

  it("should get 400 when invalid size is used.", done => {
    const INVALID_SIZE = 10;

    request(app)
      .post("/")
      .send({ name: MOCK_NAME, size: INVALID_SIZE })
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({
          error: expect.any(String)
        });

        done();
      });
  });

  it("should get 400 when invalid name is used.", done => {
    request(app)
      .post("/")
      .send({ name: "", size: 4 })
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({
          error: expect.any(String)
        });

        done();
      });
  });
});
