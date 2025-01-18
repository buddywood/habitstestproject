const request = require("supertest");
const app = require("../server"); // ✅ Import the Express app

describe("API Endpoints", () => {
    test("GET /products should return a list of products", async () => {
        const response = await request(app).get("/products");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });
});