import instance from '../axios'

export const getMenuPermissionList = (page) => {
    return instance.get(`/admin/rule/${page}`)
}