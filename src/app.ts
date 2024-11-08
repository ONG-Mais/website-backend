import express from "express";

import { PrismaClient } from "@prisma/client";

import cors from "cors";
import volunteerRouter from "./routes/volunteer.router";
import companyRouter from "./routes/company";

export const app = express();
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

export const prisma = new PrismaClient();
app.use(express.json());

app.use("/api/volunteers", volunteerRouter);
app.use("/api/company", companyRouter);

export default app;
