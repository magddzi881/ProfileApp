import type { User } from "../models/User";

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("http://localhost:3000/api/users");
  if (!res.ok) {
    throw new Error("Error while fetching users");
  }
  return res.json();
};
