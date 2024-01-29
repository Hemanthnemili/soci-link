import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 9696;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
