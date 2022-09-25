import instance from '../axios'

export const getNotifyList = ({ page }) => {
    return instance.get(`/admin/notice/${page}`)
}
export const DeleteNotify = (id) => {
    return instance.post(`/admin/notice/${id}/delete`)
}
export const editNotify = (id, data) => {
    return instance.post(`/admin/notice/${id}`, data)
}
export const createNotify = (data) => {
    return instance.post(`/admin/notice`, data)
}
