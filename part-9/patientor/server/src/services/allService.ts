import dias from "../data/diagnoses";
import pats from "../data/patients.json";
import { DiaEntry } from "../type";
import { NonSensitivePatsEntry } from "../type";

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

export default {
  getDia,
  getNonSenPats,
};
