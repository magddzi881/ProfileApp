import type { Furniture } from "../models/Furniture";

const API_URL = "http://localhost:3000/api/furniture";

export const fetchAll = async (): Promise<Furniture[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Error while fetching furnitures");
  }
  return res.json();
};

export const createFurniture = async (
  item: Omit<Furniture, "id">
): Promise<Furniture> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!res.ok) {
    throw new Error("Error while adding furniture");
  }

  return res.json();
};

export const deleteFurniture = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error while deleting furniture");
};