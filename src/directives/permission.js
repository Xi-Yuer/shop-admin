import { useUserStore } from "../stores/user"

function hasPermission(permission) {
    const userStore = useUserStore()
    const ruleNames = userStore.userInfo.ruleNames

    if (!Array.isArray(permission)) {
        throw new Error("v-permissson=['permission1','permission2']")
    }

    const hasAuth = permission.findIndex(v => ruleNames.includes(v)) != -1

    return hasAuth
}

export default {
    install(app) {
        app.directive('permission', {
            mounted(el, binding) {
                const isAuth = hasPermission(binding.value)
                if (!isAuth && el) {
                    el.parentNode && el.parentNode.removeChild(el)
                }
                return isAuth
            }
        })
    }
}