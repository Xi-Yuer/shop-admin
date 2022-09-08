// loading
import nprogress from 'nprogress'
// 显示loading

export const showLoading = () => {
    nprogress.start()
}
export const hideLoading = () => {
    nprogress.done()
}