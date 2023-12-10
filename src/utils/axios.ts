import axios from 'axios'

const axiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL })

const unhandledError = {
  title: 'Something Went Wrong, Please Contact Technical Team.',
  status: 500,
}

export const post = async (url: string, data: any, auth = false) => {
  const options: any = {
    data,
    url,
    method: 'post',
    responseType: 'json',
  }

  return axiosInstance(options)
}

export const put = async (url: string, data: any) => {
  const options: any = {
    data,
    url,
    method: 'put',
    responseType: 'json',
  }

  return axiosInstance(options)
}

export const deleteReq = async (url: string, data: any) => {
  const options: any = {
    data,
    url,
    method: 'delete',
    responseType: 'json',
  }

  return axiosInstance(options)
}

export const patch = async (url: string, data: any) => {
  const options: any = {
    data,
    url,
    method: 'patch',
    responseType: 'json',
  }

  return axiosInstance(options)
}

export const get = async (url: string, auth = false) => {
  const options: any = {
    url,
    method: 'get',
    responseType: 'json',
  }

  return axiosInstance(options)
}

export const remove = async (url: string) => {
  const options: any = {
    url,
    method: 'delete',
    responseType: 'json',
  }

  return axiosInstance(options)
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 400)
    ) {
      const errorResp = {
        ...unhandledError,
        detail: error.response.data.error_description,
      }
      throw errorResp
    } else if (error.response && error.response.status === 500) {
      const errorResp = {
        ...unhandledError,
        detail: error.response.data,
      }
      throw errorResp
    } else {
      throw error.response ? error.response.data : error
    }
  }
)

export default axiosInstance
