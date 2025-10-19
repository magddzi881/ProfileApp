import express from "express";
import cors from "cors";
import furnitureRoutes from "./furniture.js";

const app = express();
app.use(express.json());
app.use(cors());

// register routes
app.use("/api/furniture", furnitureRoutes);

export default app;
