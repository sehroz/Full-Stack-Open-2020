import axios from 'axios'
const baseUrl = '/api/users'

const getUserData = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getUserData }
