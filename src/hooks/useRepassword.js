import { ref, reactive } from 'vue'
import { changeUserInfo } from '@/service/api/manager'
import Token from '@/utils/cache'
import { err, success } from '@/utils/message'

export const useRepasswrod = () => {
    // 修改用户信息
    const formRef = ref(null)
    const loading = ref(false)
    const form = reactive({
        oldpassword: '',
        newpassword: '',
        repassword: '',
    })
    const confirmHandleChangeInfo = () => {
        formRef.value.validate(async valid => {
            if (!valid) return
            try {
                loading.value = true
                await changeUserInfo(form)
                loading.value = false
                dialogTableVisible.value = false
                // 修改密码成功需要退出重新登录
                success('修改密码成功，请重新登录')
                Token.remove()
                location.reload()
            } catch (error) {
                err('修改密码失败')
            }
        })
    }

    // 表单规则
    const rules = {
        oldpassword: [
            {
                required: true,
                message: '密码不能为空',
                trigger: 'blur',
            },
        ],
        newpassword: [
            {
                required: true,
                message: '密码不能为空',
                trigger: 'blur',
            },
        ],
        repassword: [
            {
                required: true,
                message: '密码不能为空',
                trigger: 'blur',
            },
            {
                min: 3,
                message: '密码不能低于3位数',
                trigger: 'blur',
            },
        ],
    }
    const inputConfig = [
        {
            type: 'text',
            label: '旧密码',
            dataText: 'oldpassword',
            prop: 'oldpassword',
            width: 'w-[300px]',
        },
        {
            type: 'text',
            label: '新密码',
            dataText: 'newpassword',
            prop: 'newpassword',
            width: 'w-[300px]',
        },
        {
            type: 'text',
            label: '确认密码密码',
            dataText: 'repassword',
            prop: 'repassword',
            width: 'w-[300px]',
        },
    ]
    return {
        formRef,
        loading,
        form,
        confirmHandleChangeInfo,
        rules,
        inputConfig,
    }
}