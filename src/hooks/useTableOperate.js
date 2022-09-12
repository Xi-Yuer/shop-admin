import { ref } from 'vue'
import { success } from '@/utils/message'
export const useTableOperate = ({
    getList,
    changeStatus,
    create,
    update,
    del,
    newForm,
    editForm,
    searchForm = {},
}) => {

    const editManagerId = ref(0)

    const tableData = ref([])
    const indexMethod = index => (currentPage.value - 1) * 10 + index + 1
    const roleList = ref([])

    const total = ref(0)
    const currentPage = ref(1)

    const loading = ref(false)
    // 编辑
    const showEditModel = ref(false)
    // 新增
    const showNewModel = ref(false)
    // 重置
    const handleRepossess = () => {
        ; (searchForm.keywords = ''), getData()
    }
    // 页面获取数据
    const getData = () => {
        loading.value = true
        getList(currentPage.value, 10, searchForm.keywords)
            .then(res => {
                const { list, totalCount, roles } = res.data
                tableData.value = list.map(o => {
                    o.statusLoading = false
                    return o
                })
                total.value = totalCount
                roleList.value = roles
            })
            .finally(() => {
                loading.value = false
            })
    }
    getData()

    // pageChange(分页器修改)
    const pageChange = page => {
        currentPage.value = page
        getData()
    }
    // 切换用户状态
    const handleStatusChange = (status, row) => {
        row.statusLoading = true
        changeStatus(row.id, status)
            .then(res => {
                success('修改状态成功')
                row.status = status
            })
            .finally(() => {
                row.statusLoading = false
            })
    }
    // 隐藏model
    const hideModel = () => {
        showEditModel.value = false
        showNewModel.value = false
    }
    // 删除管理员
    const Delete = ({ id }) =>
        del(id).then(() => getData(currentPage.value))

    // 修改管理员
    const Edit = item => {
        const { username, password, role_id, status, avatar, id, title,
            content, } = item
            ; (editForm.username = username),
                (editForm.password = password),
                (editForm.role_id = role_id),
                (editForm.status = status),
                (editForm.avatar = avatar),
                (editForm.title = title),
                (editForm.content = content),
                ((editManagerId.value = id), (showEditModel.value = true))
    }
    // 编辑管理员Action
    const handleEditManager = () => {
        update(editManagerId.value, editForm).then(res => {
            getData(currentPage.value)
            hideModel()
        })
    }

    // 新增管理
    const createNotifyAction = () => (showNewModel.value = true)
    const handleNewNotify = () => {
        create(newForm).then(() => {
            getData(currentPage.value)
            hideModel()
        })
    }
    return {
        roleList,
        loading,
        total,
        searchForm,
        Delete,
        Edit,
        editForm,
        newForm,
        currentPage,
        getData,
        tableData,
        indexMethod,
        handleEditManager,
        createNotifyAction,
        handleNewNotify,
        handleRepossess,
        handleStatusChange,
        pageChange,
        showEditModel,
        hideModel,
        showNewModel,
        handleNewNotify
    }
}