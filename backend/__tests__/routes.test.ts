import request from "supertest";
import app from "../index";

describe("GET /api/example", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/api/example");
    expect(res.statusCode).toBe(200);
  });
});
