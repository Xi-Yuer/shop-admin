import instance from "../axios";

export async function getPageInfo() {
    return instance.get("/admin/statistics1")
}
export async function getEchartsInfo(type) {
    return instance.get(`/admin/statistics3?type=${type}`)
}
export async function getPageTip() {
    return instance.get("/admin/statistics2")
}