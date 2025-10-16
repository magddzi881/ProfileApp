export type User = {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  birthDate: string;
  phone: string;
};