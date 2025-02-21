import volunteerRouter from "./routes/volunteer.routes";
import { locationRouter } from "./routes/location.routes";
import companyRouter from "./routes/company.routes";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import contactRouter from "./routes/contact.routes";

dotenv.config();

export const app = express();

app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

app.use(express.json());
app.use("/api/volunteers", volunteerRouter);
app.use("/api/company", companyRouter);
app.use("/api/location", locationRouter);
app.use("/api/contact", contactRouter);

export default app;
