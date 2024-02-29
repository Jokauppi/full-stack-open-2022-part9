import { v1 as uuid } from "uuid";
import data, { Gender, Patient } from "../data/patients";
import { validate } from "../utils/objectUtils";
import { isString } from "../utils/stringUtils";

export const isGender = (value: unknown): value is Gender => {
  return (
    isString(value) &&
    Object.values(Gender)
      .map((v) => v.toString())
      .includes(value)
  );
};

export const validatePatient = (patientData: unknown) => {
  const patient = validate(patientData);
  const validated = {
    name: patient.string("name"),
    dateOfBirth: patient.string("dateOfBirth"),
    ssn: patient.string("ssn"),
    gender: patient.custom("gender", isGender),
    occupation: patient.string("occupation"),
  };

  Object.entries(validated).forEach(([key, value]) => {
    if (value.toString() === "") throw new Error(`Field ${key} is empty`);
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
