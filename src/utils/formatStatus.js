export const formatStatus = (row) => {
    // 开始时间
    let startTime = new Date(row.start_time).getTime()
    // 结束时间
    let endTime = new Date(row.end_time).getTime()
    // 当前时间
    let now = (new Date()).getTime()

    const timeStatus = [
        '未开始',
        '已结束',
        '已失效',
        '领取中'
    ]
    if (startTime > now) {
        return timeStatus[0]
    } else if (endTime < now) {
        return timeStatus[1]
    } else if (row.status === 0) {
        return timeStatus[2]
    } else {
        return timeStatus[3]
    }
}