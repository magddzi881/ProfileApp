const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Sample user data
const users = [
  { id: 1, name: "Alicja", email: "alicja@example.com", role: "admin", birthDate: "1990-05-12", phone: "+48 123 456 789" },
  { id: 2, name: "Bartek", email: "bartek@example.com", role: "user", birthDate: "1988-11-03", phone: "+48 987 654 321" },
  { id: 3, name: "Celina", email: "celina@example.com", role: "user", birthDate: "1995-02-20", phone: "+48 555 444 333" },
];

// Endpoint GET: users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Endpoint GET: user by ID
app.get("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// Start the server
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
