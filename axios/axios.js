import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use((config) => {
  if (!config.params.dateFrom) throw 'Error 400 - Missing parameter'
  if (!config.params.dateTo) throw 'Error 400 - Missing parameter'
  return config
})

export default axiosInstance
