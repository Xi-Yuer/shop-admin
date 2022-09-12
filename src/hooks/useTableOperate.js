import { reactive, ref } from 'vue'
import { success } from '@/utils/message'
import {
    getManagerList,
    changeManagerStaus,
    createManager,
    updateManager,
    deleteManager,
} from '@/service/api/manager.js'
export const useTableOperate = () => {

    const editManagerId = ref(0)
    const newForm = reactive({
        username: '',
        password: '',
        role_id: null,
        status: 1,
        avatar: '',
    })
    const editForm = reactive({
        username: '',
        password: '',
        role_id: null,
        status: 1,
        avatar: '',
    })
    const searchForm = reactive({
        keywords: '',
    })

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
        getManagerList(currentPage.value, 10, searchForm.keywords)
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
        changeManagerStaus(row.id, status)
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
        deleteManager(id).then(() => getData(currentPage.value))

    // 修改管理员
    const Edit = item => {
        const { username, password, role_id, status, avatar, id } = item
            ; (editForm.username = username),
                (editForm.password = password),
                (editForm.role_id = role_id),
                (editForm.status = status),
                (editForm.avatar = avatar),
                ((editManagerId.value = id), (showEditModel.value = true))
    }
    // 编辑管理员Action
    const handleEditManager = () => {
        updateManager(editManagerId.value, editForm).then(res => {
            getData(currentPage.value)
            hideModel()
        })
    }

    // 新增管理
    const createNotifyAction = () => (showNewModel.value = true)
    const handleNewNotify = () => {
        createManager(newForm).then(() => {
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