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

export type NewPatEntry = Omit<PatEntry, "id">;

export enum Gend {
  Male = "male",
  Female = "female",
  Other = "other",
}
