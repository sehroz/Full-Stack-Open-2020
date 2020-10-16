import axios from "axios";

const getAll = () => {
  const request = axios.get("http://localhost:3001/persons");
  return request.then((res) => res.data);
};

const createPerson = (newPerson) => {
  const request = axios.post(`http://localhost:3001/persons`, newPerson);
  return request.then((res) => res.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`http://localhost:3001/persons/${id}`);
  return request;
};

export default {
  getAll,
  createPerson,
  deletePerson,
};
