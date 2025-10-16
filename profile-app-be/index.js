import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Sample furniture data
const furniture = [
  { id: 1, name: "Sofa Comfort", category: "Sofa", price: 1200, inStock: true },
  { id: 2, name: "Oak Dining Table", category: "Table", price: 800, inStock: true },
  { id: 3, name: "Modern Chair", category: "Chair", price: 250, inStock: false },
  { id: 4, name: "King Bed Frame", category: "Bed", price: 1500, inStock: true },
  { id: 5, name: "Nightstand Classic", category: "Nightstand", price: 200, inStock: true },
  { id: 6, name: "Bookshelf Minimalist", category: "Shelf", price: 450, inStock: false },
  { id: 7, name: "Coffee Table Round", category: "Table", price: 300, inStock: true },
  { id: 8, name: "Recliner Chair", category: "Chair", price: 700, inStock: true },
  { id: 9, name: "Wardrobe Sliding Doors", category: "Wardrobe", price: 1800, inStock: false },
  { id: 10, name: "TV Stand Modern", category: "TV Stand", price: 550, inStock: true },
  { id: 11, name: "Corner Sofa L-Shaped", category: "Sofa", price: 2200, inStock: true },
  { id: 12, name: "Dining Chair Set", category: "Chair", price: 600, inStock: false },
  { id: 13, name: "Console Table Elegant", category: "Table", price: 400, inStock: true },
];

// Endpoint GET: all furniture
app.get("/api/furniture", (req, res) => {
  res.json(furniture);
});

// Endpoint GET: furniture by ID
app.get("/api/furniture/:id", (req, res) => {
  const item = furniture.find(f => f.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: "Furniture not found" });
  res.json(item);
});

// Endpoint POST: add new furniture
app.post("/api/furniture", (req, res) => {
  const { name, category, price, inStock } = req.body;
  const newItem = {
    id: furniture.length + 1,
    name,
    category,
    price,
    inStock,
  };
  furniture.push(newItem);
  res.status(201).json(newItem);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});
