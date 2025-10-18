import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import jwksRsa from "jwks-rsa";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;

// JWKS client for fetching signing keys
const jwksClient = jwksRsa({
  jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
});

// Function to get the signing key
function getKey(header, callback) {
  jwksClient.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

// Middleware checking JWT
function checkJwt(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid Authorization header" });
  }

  const token = auth.split(" ")[1];

  const options = {
    audience: AUTH0_AUDIENCE,
    issuer: `https://${AUTH0_DOMAIN}/`,
    algorithms: ["RS256"],
  };

  jwt.verify(token, getKey, options, (err, decoded) => {
    if (err) {
      console.error("JWT validation failed:", err);
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
}

// Middleware checking for required role
function checkRole(requiredRole) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });

    const rolesClaimNames = [
      "https://my-api.profileapp/roles",
      "roles",
      "role",
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
    ];

    let roles = [];

    for (const claim of rolesClaimNames) {
      const val = req.user[claim];
      if (Array.isArray(val)) { roles = val; break; }
      if (typeof val === "string") { roles = [val]; break; }
    }

    // fallback
    if (!roles.length && req.user.authorization?.roles) {
      roles = req.user.authorization.roles;
    }

    if (!roles.includes(requiredRole)) {
      return res.status(403).json({ message: "Forbidden: Admin role required" });
    }

    next();
  };
}

/* ---------------------------------------- ENDPOINTS -------------------------------------------------- */

// GET all furniture
app.get("/api/furniture", async (req, res) => {
  const furniture = await prisma.furniture.findMany();
  res.json(furniture);
});

// GET furniture by id
app.get("/api/furniture/:id", async (req, res) => {
  const item = await prisma.furniture.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  if (!item) return res.status(404).json({ message: "Furniture not found" });
  res.json(item);
});

// POST new furniture (for role admin only)
app.post(
  "/api/furniture",
  checkJwt,
  checkRole("admin"),
  async (req, res) => {
    const { name, category, price, inStock } = req.body;
    try {
      const newItem = await prisma.furniture.create({
        data: { name, category, price, inStock },
      });
      res.status(201).json(newItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create furniture" });
    }
  }
);

// DELETE furniture (for role admin only)
app.delete(
  "/api/furniture/:id",
  checkJwt,
  checkRole("admin"),
  async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      await prisma.furniture.delete({ where: { id } });
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ message: "Furniture not found" });
    }
  }
);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
