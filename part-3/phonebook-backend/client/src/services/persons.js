import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(`${baseUrl}`);
  return request.then((res) => res.data);
};

const createPerson = (newPerson) => {
  const request = axios.post(`${baseUrl}`, newPerson);
  return request.then((res) => res.data);
};

const updatePerson = (newPerson) => {
  const request = axios.put(`${baseUrl}/${newPerson.id}`, newPerson);
  return request.then((res) => res.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request;
};

export default {
  getAll,
  createPerson,
  updatePerson,
  deletePerson,
};
