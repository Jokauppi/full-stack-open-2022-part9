import express from "express";
import { addPatient, getPatients, validatePatient } from "../services/patients";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.json(getPatients());
});

patientsRouter.post("/", (req, res) => {
  try {
    const patient = validatePatient(req.body);
    const addedPatient = addPatient(patient);
    res.json(addedPatient);
  } catch (error: unknown) {
    res.status(400).send((error as Error)["message"]);
  }
});

export default patientsRouter;
