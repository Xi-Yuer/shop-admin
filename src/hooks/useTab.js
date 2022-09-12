import { useCookies } from '@vueuse/integrations/useCookies'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'

export const useTab = () => {
    const route = useRoute()
    const path = computed(() => route.path)
    const editableTabsValue = ref()
    const editableTabs = ref([
        {
            title: "主控台",
            name: "/"
        }
    ])
    watch(path, (value) => {
        editableTabsValue.value = value
    }, {
        immediate: true,
        deep: true
    })
    const cookies = useCookies()
    const router = useRouter()

    // 初始化tabList
    const initTabList = () => {
        let tabs = cookies.get("tabList")
        if (tabs) {
            editableTabs.value = tabs._value
        }
    }
    initTabList()

    // 监听路由的变化
    onBeforeRouteUpdate((to, from) => {
        const { title } = to.meta
        const { path } = to
        editableTabsValue.value = to.path
        const hasTab = editableTabs?.value?.find(item => item.name === path)
        if (hasTab) return
        addTab({ title, name: path })
    })

    // 添加tab
    const addTab = targetName => {
        editableTabs?.value?.push(
            targetName
        )
        // tabList持久化
        cookies.set("tabList", editableTabs)
        editableTabsValue.value = targetName.name
    }
    // 删除tab
    const removeTab = targetName => {
        const tabs = editableTabs.value
        let activeName = editableTabsValue.value
        if (activeName === targetName) {
            tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        activeName = nextTab.name
                    }
                }
            })
        }

        editableTabsValue.value = activeName
        editableTabs.value = tabs.filter(tab => tab.name !== targetName)
        cookies.set("tabList", editableTabs)
    }
    // 当tab切换时的事件
    const TabChange = (tab) => {
        router.push(tab)
        editableTabsValue.value = tab
    }

    // 关闭tab
    const close = type => {
        switch (type) {
            case "closeAll":
                editableTabsValue.value = "/"
                editableTabs.value = [{
                    title: "主控台",
                    name: "/"
                }]
                break;
            case "closeOther":
                editableTabs.value = editableTabs.value.filter(tab => tab.name === "/" || tab.name === editableTabsValue.value)
                break;
            default:
                return
        }
        cookies.set("tabList", editableTabs.value)
    }

    return {
        initTabList,
        editableTabsValue,
        editableTabs,
        TabChange,
        removeTab,
        close
    }
}