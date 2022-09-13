import instance from '../axios'

export const getMenuPermissionList = (page) => {
    return instance.get(`/admin/rule/${page}`)
}
export const createPermission = (data) => {
    return instance.post(`/admin/rule`, data)
}
export const updatePermission = (id, data) => {
    return instance.post(`/admin/rule/${id}`, data)
}
export const deletePermission = (id) => {
    return instance.post(`/admin/rule/${id}/delete`)
}