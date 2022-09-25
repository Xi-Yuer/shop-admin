import instance from '../axios'

export const getSkuList = ({ page }) => {
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


// 商品列表
export const getGoodsList = ({ tab = 'all', title, category_id, page = 1, limit = 10 }) => {
    return instance.get(`/admin/goods/${page}?tab=${tab}&title=${title}`)
}

// 修改商品状态
export const changeGoodsStaus = (ids, status) => {
    return instance.post(`/ admin / goods / changestatus`, {
        ids,
        status
    })
}
// 新增商品
export const createGoods = (data) => {
    return instance.post(`/ admin / goods`, data)
}
// 修改商品
export const updateGoods = (id, data) => {
    return instance.post(`/ admin / goods / ${id}`, data)
}
// 删除商品
export const deleteGoods = (ids) => {
    return instance.post(`/ admin / goods / delete_all`, {
        ids
    })
}
