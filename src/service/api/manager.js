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

// 管理员列表
export const getManagerList = ({ page = 1, limit = 10, keywords = '' }) => {
    return instance.get(`/admin/manager/${page}?limit=${limit}&keyword=${keywords}`)
}

// 修改管理员状态
export const changeManagerStaus = (id, status) => {
    return instance.post(`/admin/manager/${id}/update_status`, {
        status
    })
}
// 新增管理员
export const createManager = (data) => {
    return instance.post(`/admin/manager`, data)
}
// 修改管理员
export const updateManager = (id, data) => {
    return instance.post(`/admin/manager/${id}`, data)
}
// 删除管理员
export const deleteManager = (id) => {
    return instance.post(`/admin/manager/${id}/delete`)
}