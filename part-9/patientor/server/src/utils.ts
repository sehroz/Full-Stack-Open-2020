/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatEntry } from "./type";

const toNewPatEntry = (object: any): NewPatEntry => {
  return {
    dateOfBirth: parseDate(object.dateOfBirth),
    name: parseT(object.name),
    ssn: parseT(object.ssn),
    gender: parseT(object.gender),
    occupation: parseT(object.occupation),
  };
};

const parseT = (comment: any): string => {
  if (!comment || !isString(comment)) {
    throw new Error("Incorrect or missing comment: ");
  }

  return comment;
};

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date ");
  }
  return date;
};
export default toNewPatEntry;
