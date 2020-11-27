import dias from "../data/diagnoses";
import pats from "../data/patients";
import {
  DiaEntry,
  PatEntry,
  NewPatEntry,
  NonSensitivePatsEntry,
} from "../type";

const getDia = (): Array<DiaEntry> => {
  return dias;
};

const getNonSenPats = (): Array<NonSensitivePatsEntry> => {
  return pats.map(({ id, dateOfBirth, name, gender, occupation }) => ({
    id,
    dateOfBirth,
    name,
    gender,
    occupation,
  }));
};

const addEntry = (entry: NewPatEntry): PatEntry => {
  const newPatEntry = {
    id: (pats.length + 1).toString(),
    ...entry,
  };
  pats.push(newPatEntry);
  return newPatEntry;
};

export default {
  getDia,
  getNonSenPats,
  addEntry,
};
