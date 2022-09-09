import { defineStore } from "pinia"
import { ref } from "vue"

export const usePageAction = defineStore("pageAction", () => {
    // 面板是否折叠
    const isFold = ref(false)

    const changeFoldAction = () => {
        isFold.value = !isFold.value
    }
    return {
        isFold,
        changeFoldAction
    }
})