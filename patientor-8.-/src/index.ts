import cors from "cors";
import express from "express";
import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";
import pingRouter from "./routes/ping";
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", pingRouter);
app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

const PORT = 3001;

app.listen(PORT, () => {});
