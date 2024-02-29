import express from "express";
import data, { Patient } from "../data/patients";

const patientsRouter = express.Router();

const stripSsn = (
  data: Patient[]
): (Omit<Patient, "ssn"> & Partial<{ ssn: never }>)[] =>
  data.map((patient: Patient) => ({
    ...patient,
    ssn: undefined,
  }));

patientsRouter.get("/", (_req, res) => {
  res.json(stripSsn(data));
});

export default patientsRouter;
