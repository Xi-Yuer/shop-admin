import { ElMessage, ElMessageBox } from 'element-plus'

export const success = (message = "成功") => {
    ElMessage({
        message: message,
        type: 'success',
        dangerouslyUseHTMLString: true
    })
}
export const err = (err = "失败") => {
    ElMessage.error({
        message: err,
        dangerouslyUseHTMLString: true
    })
}

export const messageBox = (content = '', type = "warning", title = "") => {
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type,
        }
    )
}