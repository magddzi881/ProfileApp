import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

// GET all furniture
app.get("/api/furniture", async (req, res) => {
  const furniture = await prisma.furniture.findMany();
  res.json(furniture);
});

// GET by id
app.get("/api/furniture/:id", async (req, res) => {
  const item = await prisma.furniture.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  if (!item) return res.status(404).json({ message: "Furniture not found" });
  res.json(item);
});

// POST new item
app.post("/api/furniture", async (req, res) => {
  const { name, category, price, inStock } = req.body;
  const newItem = await prisma.furniture.create({
    data: { name, category, price, inStock },
  });
  res.status(201).json(newItem);
});

// DELETE furniture by id
app.delete("/api/furniture/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.furniture.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: "Furniture not found" });
  }
});

// Start server
app.listen(3000, () => console.log("Running at http://localhost:3000"));
