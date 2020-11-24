export interface DiaEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatEntry {
  id: string;
  dateOfBirth: string;
  name: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NonSensitivePatsEntry = Omit<PatEntry, "ssn">;
