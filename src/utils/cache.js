import { useCookies } from '@vueuse/integrations/useCookies'
const cookie = useCookies()

const TOKEN_KEY = "admin-token"

class Token {
    get() {
        return cookie.get(TOKEN_KEY)
    }
    set(token) {
        cookie.set(TOKEN_KEY, token)
    }
    remove() {
        cookie.remove(TOKEN_KEY)
    }
}

export default Token = new Token()