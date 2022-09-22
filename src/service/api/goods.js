import instance from '../axios'

export const getSkuList = (page) => {
    return instance.get(`/admin/skus/${page}`)
}
export const DeleteSku = (ids) => {
    ids = !Array.isArray(ids) ? [ids] : ids
    return instance.post(`/admin/skus/delete_all`, {
        ids
    })
}
export const editSku = (id, data) => {
    return instance.post(`/admin/skus/${id}`, data)
}
export const createSku = (data) => {
    return instance.post(`/admin/skus`, data)
}
export const updateSkuStatus = (id, status) => {
    return instance.post(`/admin/skus/${id}/update_status`, {
        status
    })
}
