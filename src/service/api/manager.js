import instance from '../axios'


// 用户登录
export const login = async (name, password) => {
    const result = await instance.post("/admin/login", {
        username: name,
        password
    })
    return result
}

// 获取用户信息
export const getUserInfo = async () => {
    const result = await instance.post("/admin/getinfo")
    return result
}

// 用户退出登录
export const logout = async () => {
    const result = await instance.post("/admin/logout")
    return result
}

// 修改用户信息
export const changeUserInfo = async (data) => {
    const result = await instance.post("/admin/updatepassword", data)
    return result
}