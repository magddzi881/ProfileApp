import { jest } from "@jest/globals";
import request from "supertest";

// Mock Prisma
const prismaMock = {
  furniture: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  },
};

jest.unstable_mockModule("../src/prisma.js", () => ({
  default: prismaMock,
}));

// Mock auth
const checkJwtMock = jest.fn((req, res, next) => next());
const checkRoleMock = (role) => jest.fn((req, res, next) => next());

jest.unstable_mockModule("../src/auth.js", () => ({
  checkJwt: checkJwtMock,
  checkRole: checkRoleMock,
}));

let app;
let prisma;
let auth;

beforeAll(async () => {
  app = (await import("../src/app.js")).default;
  prisma = (await import("../src/prisma.js")).default;
  auth = await import("../src/auth.js");

  prisma.furniture = prismaMock.furniture;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Furniture API", () => {
  describe("GET /api/furniture", () => {
    it("returns list of furniture", async () => {
      prisma.furniture.findMany.mockResolvedValue([
        { id: 1, name: "Chair", category: "Office", price: 99, inStock: true },
      ]);

      const res = await request(app).get("/api/furniture");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([
        expect.objectContaining({ name: "Chair", category: "Office" }),
      ]);
    });

    it("returns empty array if no furniture", async () => {
      prisma.furniture.findMany.mockResolvedValue([]);

      const res = await request(app).get("/api/furniture");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe("GET /api/furniture/:id", () => {
    it("returns furniture by id", async () => {
      prisma.furniture.findUnique.mockResolvedValue({
        id: 1,
        name: "Chair",
        category: "Office",
        price: 99,
        inStock: true,
      });

      const res = await request(app).get("/api/furniture/1");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("name", "Chair");
    });

    it("returns 404 if furniture not found", async () => {
      prisma.furniture.findUnique.mockResolvedValue(null);

      const res = await request(app).get("/api/furniture/999");

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "Furniture not found");
    });
  });

  describe("POST /api/furniture", () => {

    it("returns 401 if not authenticated", async () => {
      checkJwtMock.mockImplementationOnce((req, res, next) => res.sendStatus(401));

      const res = await request(app)
        .post("/api/furniture")
        .send({ name: "Table", category: "Office", price: 150, inStock: true });

      expect(res.statusCode).toBe(401);
    });
  });

  describe("DELETE /api/furniture/:id", () => {

    it("returns 401 if not authenticated", async () => {
      checkJwtMock.mockImplementationOnce((req, res, next) => res.sendStatus(401));

      const res = await request(app).delete("/api/furniture/1");

      expect(res.statusCode).toBe(401);
    });
  });
});
