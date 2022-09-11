import instance from '../axios'

export const getImageClassList = (page) => {
    return instance.get(`/admin/image_class/${page}`)
}
export const createImageClass = (data) => {
    return instance.post("/admin/image_class", data)
}
export const updateImageClass = (id, data) => {
    return instance.get(`/admin/image_class/${id}`, data)
}
export const deleteImageClass = (id) => {
    return instance.post(`/admin/image_class/${id}/delete`)
}

export const getImageListById = (id, page) => {
    return instance.get(`/admin/image_class/${id}/image/${page}`)
}

export const reNameImage = (id, name) => {
    return instance.post(`/admin/image/${id}`, { name })
}
export const deleteImage = (ids) => {
    return instance.post(`/admin/image/delete_all`, { ids })
}

export const uploadFile = (img, classId) => {
    return instance.post("/admin/image/upload", {
        img,
        image_class_id: classId,
        name: 'img'
    })
}
export const uploadFileURL = "/api/admin/image/upload"