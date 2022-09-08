import axios from 'axios'
import { err } from '@/utils/message'
import Token from '@/utils/cache'

const BASE_URL = "/api"

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
})

instance.interceptors.request.use(
    config => {
        const token = Token.get()
        if (token) {
            config.headers["token"] = token
        }
        return config
    },
    error => {
        err('请求失败,请检查网络')
        return error
    }
)
instance.interceptors.response.use(
    data => data.data,
    error => {
        err(error.response.data.msg || "请求失败")
        return error
    }
)
export default instance