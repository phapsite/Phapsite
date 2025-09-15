
import 'dotenv/config';
//import express from "express";
import express  from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.ts";
import { fileURLToPath } from "url";
import { dirname } from "path";
dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});
// Routes
app.post("/api/auth", authRoutes);

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running!");
});

// Start server
/*
//      app.listen(PORT, () => {
//        console.log(`Server running on http://localhost:${PORT}`);
//        });
*/

/*-------------------

// Testing Deployent

--------------------- */
export default app;

// Recreate __filename and __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.argv[1] === __filename) {
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}