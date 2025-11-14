import { ref } from 'vue'
import urls from './urls'

export function createProduct(formData) {
    const url = urls.createProduct
    const data = ref(null)
    const error = ref(null)
    const loading = ref(false)

    const execute = async () => {
        data.value = null
        error.value = null
        loading.value = true
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            data.value = await res.json()
            console.log("Values: ", data.value)
        } catch (e) {
            error.value = e
            console.error("Error:", e)
        } finally {
            loading.value = false
        }
    }

    execute()
    return { data, error, loading }
}

export function getProduct() {
    const url = urls.getProduct
    const data = ref(null)
    const error = ref(null)
    const loading = ref(false)
    const execute = async () => {
        data.value = null
        error.value = null
        loading.value = true
        try {
            const res = await fetch(url)
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            data.value = await res.json()
            console.log("Values: ", data.value)
        } catch (e) {
            error.value = e
            console.error("Error:", e)
        } finally {
            loading.value = false
        }
    }

    execute()
    return { data, error, loading }
}