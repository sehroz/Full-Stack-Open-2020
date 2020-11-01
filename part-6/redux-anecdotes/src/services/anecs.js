import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnec = async (content) => {
  const anec = { content, votes: 0 }
  const res = await axios.post(baseUrl, anec)
  return res.data
}

const addVote = async (id, updatedAnec) => {
  const res = await axios.put(`${baseUrl}/${id}`, updatedAnec)
  return res.data
}

export default { getAll, createAnec, addVote }
