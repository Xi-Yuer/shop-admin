import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useCookies } from '@vueuse/integrations/useCookies'
const cookie = useCookies()

const BASE_URL = "/api"

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
})

instance.interceptors.request.use(
    config => {
        const token = cookie.get("admin-token")
        if (token) {
            config.headers["token"] = token
        }
        return config
    },
    err => {
        ElMessage.error('请求失败,请检查网络')
        return err
    }
)
instance.interceptors.response.use(
    data => data.data,
    err => {
        ElMessage.error(err.response.data.msg || "请求失败")
        return err
    }
)
export default instance