import type { Furniture } from "../models/Furniture";

export const fetchAll = async (): Promise<Furniture[]> => {
  const res = await fetch("http://localhost:3000/api/furniture");
  if (!res.ok) {
    throw new Error("Error while fetching furnitures");
  }
  return res.json();
};
