import type { Furniture } from "../models/Furniture";

const API_URL = "http://localhost:3000/api/furniture";

/**
 * fetchAll – fetches all furniture items
 */
export const fetchAll = async (): Promise<Furniture[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error while fetching furnitures");
  return res.json();
};

/**
 * createFurniture – creates a new furniture item (requires token)
 */
export const createFurniture = async (
  item: Omit<Furniture, "id">,
  accessToken: string
): Promise<Furniture> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(item),
  });

  if (!res.ok) {
    if (res.status === 401)
      throw new Error("Unauthorized - token missing or invalid");
    if (res.status === 403) throw new Error("Forbidden - admin role required");
    throw new Error("Error while adding furniture");
  }

  return res.json();
};

/**
 * deleteFurniture – deletes a furniture item by ID (requires token)
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
