import express from "express";
import diagnosesRouter from "./routes/diagnoses";
import pingRouter from "./routes/ping";
const app = express();
app.use(express.json());

app.use("/api", pingRouter);
app.use("/api/diagnoses", diagnosesRouter);

const PORT = 3001;

app.listen(PORT, () => {});
