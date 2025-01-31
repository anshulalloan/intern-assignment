import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import main from "./main";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the alloan.ai");
});

app.use("/api", main);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
