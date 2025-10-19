import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
