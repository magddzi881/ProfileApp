import type { Furniture } from "../models/Furniture";

const API_URL = "http://localhost:3000/api/furniture";

/**
 * fetchAll – pobiera wszystkie meble
 */
export const fetchAll = async (): Promise<Furniture[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error while fetching furnitures");
  return res.json();
};

/**
 * createFurniture – dodaje nowy mebel
 */
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

  if (!res.ok) throw new Error("Error while adding furniture");
  return res.json();
};

/**
 * deleteFurniture – usuwa mebel (wymaga tokena)
 */
export const deleteFurniture = async (
  id: number,
  accessToken: string
): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    if (res.status === 401)
      throw new Error("Unauthorized - token missing or invalid");
    if (res.status === 403) throw new Error("Forbidden - admin role required");
    throw new Error("Error while deleting furniture");
  }
};
