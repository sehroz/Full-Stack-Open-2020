import dias from "../data/diagnoses";
import { DiaEntry } from "../type";

const getDia = (): Array<DiaEntry> => {
  return dias;
};

export default {
  getDia,
};
