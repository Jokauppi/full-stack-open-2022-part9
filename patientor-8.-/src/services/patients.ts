import { v1 as uuid } from "uuid";
import data, { Patient } from "../data/patients";
import { validate } from "../utils/objectUtils";

export const validatePatient = (patientData: unknown) => {
  const patient = validate(patientData);
  const validated = {
    name: patient.string("name"),
    dateOfBirth: patient.string("dateOfBirth"),
    ssn: patient.string("ssn"),
    gender: patient.string("gender"),
    occupation: patient.string("occupation"),
  };
  Object.entries(validated).forEach(([key, value]) => {
    if (value === "") throw new Error(`Field ${key} is empty`);
  });
  return validated;
};

type NoSsnPatient = Omit<Patient, "ssn"> & Partial<{ ssn: never }>;

const stripSsn = (patient: Patient): NoSsnPatient => ({
  ...patient,
  ssn: undefined,
});

export const getPatients = () => data.map((patient) => stripSsn(patient));

export const addPatient = (patient: Omit<Patient, "id">): Patient => {
  const id: string = uuid();
  const newPatient: Patient = {
    id,
    ...patient,
  };
  data.push(newPatient);
  return newPatient;
};
