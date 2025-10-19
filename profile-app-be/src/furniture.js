import { Router } from "express";
import prisma from "./prisma.js";
import { checkJwt, checkRole } from "./auth.js";

const router = Router();

// GET all furniture
router.get("/", async (req, res) => {
  const furniture = await prisma.furniture.findMany();
  res.json(furniture);
});

// GET furniture by id
router.get("/:id", async (req, res) => {
  const item = await prisma.furniture.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  if (!item) return res.status(404).json({ message: "Furniture not found" });
  res.json(item);
});

// POST new (admin only)
router.post("/", checkJwt, checkRole("admin"), async (req, res) => {
  const { name, category, price, inStock } = req.body;
  try {
    const newItem = await prisma.furniture.create({
      data: { name, category, price, inStock },
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to create furniture" });
  }
});

// DELETE by id (admin only)
router.delete("/:id", checkJwt, checkRole("admin"), async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.furniture.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: "Furniture not found" });
  }
});

export default router;
