import instance from '../axios'

export const getCouponList = ({ page }) => {
    return instance.get(`/admin/coupon/${page}`)
}
export const deleteCoupon = (id) => {
    return instance.post(`/admin/coupon/${id}/delete`)
}
export const editCoupon = (id, data) => {
    return instance.post(`/admin/coupon/${id}`, data)
}
export const createCoupon = (data) => {
    return instance.post(`/admin/coupon`, data)
}

export const updateCouponStatus = (id) => {
    return instance.post(`/admin/coupon/${id}/update_status`, {
        status: 0
    })
}
