import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import connectDb from "./database/db.js";

dotenv.config();
connectDb();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 9696;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

app.use("/api/auth", authRouter);
