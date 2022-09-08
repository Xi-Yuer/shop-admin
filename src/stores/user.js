import { ref } from 'vue'
import { defineStore } from 'pinia'

import { login, getUserInfo, logout } from '@/service/api/manager'
import { success, messageBox } from '@/utils/message'
import Token from '@/utils/cache'


export const useUserStore = defineStore("user", () => {
    // 用户信息
    const userInfo = ref({})

    // 用户登录
    async function loginAction(name, password, Fn) {
        const LoginResult = await login(name, password)
        if (!LoginResult.data) return

        Token.set(LoginResult.data.token)
        await getUserInfoAction()
        Fn()
        success("登录成功")
    }

    // 获取用户信息
    async function getUserInfoAction() {
        const token = Token.get()
        if (token) {
            const UserInfoResult = await getUserInfo()
            userInfo.value = UserInfoResult.data
        }
    }
    // 退出登录
    function logoutAction(Fn) {
        messageBox("是否确定退出").then(async () => {
            const result = await logout()
            // 移除token
            Token.remove()
            // 路由返回
            Fn()
            // 消息提示
            success(result.data)
            // 清空store
            userInfo.value = {}
        })
    }
    return {
        userInfo,
        loginAction,
        getUserInfoAction,
        logoutAction
    }
})