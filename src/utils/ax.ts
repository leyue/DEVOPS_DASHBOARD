import Axios, { AxiosInstance } from 'axios'
import { Message } from 'element-ui'

const ctx: AxiosInstance = Axios.create({
  timeout: 5000,
  /* eslint-disable */
  // @ts-ignore
  'headers.post.Content-Type': 'application/json;charset=UTF-8',
  'headers.put.Content-Type': 'application/json;charset=UTF-8',
  'headers.patch.Content-Type': 'application/json;charset=UTF-8',
})

ctx.defaults.baseURL = ''

ctx.interceptors.request.use(
  (req: any): any => {
    return req
  },
  (err: any): any => {
    throw err
  }
)

ctx.interceptors.response.use(
  (res: any): any => {
    return res.data
  },
  async (err: any) => {
    let message = `${err.response ? err.response : ''}-${
      err.message ? err.message : ''
    }`
    Message({
      message,
      type: 'error',
      duration: 3 * 1000,
    })
    console.log(err)
    return Promise.reject(err)
  }
)

function setJenkinsUrl() {
  ctx.defaults.baseURL = 'http://cmverify.unisoc.com:8080/'
}

function setDevopsUrl() {
  ctx.defaults.baseURL = 'http://cmverify.unisoc.com:8080/'
}

export { ctx, setJenkinsUrl, setDevopsUrl }
