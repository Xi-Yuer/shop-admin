import instance from '../axios'

export const getRoleList = ({ page }) => {
    return instance.get(`/admin/role/${page}`)
}
export const DeleteRole = (id) => {
    return instance.post(`/admin/role/${id}/delete`)
}
export const editRole = (id, data) => {
    return instance.post(`/admin/role/${id}`, data)
}
export const createRole = (data) => {
    return instance.post(`/admin/role`, data)
}
export const updateStatus = (id, status) => {
    return instance.post(`/admin/role/${id}/update_status`, {
        status
    })
}
export const setRoleRule = (id, ids) => {
    return instance.post("/admin/role/set_rules", {
        id, ids
    })
}
