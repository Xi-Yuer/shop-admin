import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { login, getUserInfo } from '@/service/api/manager'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'


export const useUserStore = defineStore("user", () => {
    const router = useRouter()
    const cookie = useCookies()
    const userInfo = ref({})

    // 用户登录
    async function loginAction(name, password) {
        const LoginResult = await login(name, password)
        if (!LoginResult.data) return
        ElMessage({
            message: '登录成功',
            type: 'success',
        })
        cookie.set('admin-token', LoginResult.data.token)

        // 获取用户信息
        const UserInfoResult = await getUserInfo()
        userInfo.value = UserInfoResult.data
        router.push('/')
    }
    return {
        userInfo,
        loginAction
    }
})