import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 5001;

dotenv.config();

// ? Middleware - IN MIDDLEWARE CORS NEEDS TO BE FIRST BEFORE RATELIMIT
app.use(cors({ origin: "http://localhost:5173" })); // ? It is used to control which frontend/client can access your backend API.
app.use(express.json()); // ? This middleware will parse JSON bodies(req.body)
app.use(rateLimiter);

// ? Simple Custom Middleware
// app.use((req, res, next) => {
//   console.log(`Req Method is ${req.method} & Req URL is ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server Started at PORT :", PORT);
  });
});
