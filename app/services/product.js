import urls from './urls'

export async function createProduct(formData) {
    const url = urls.createProduct
    const token = localStorage.getItem("access")

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
        const json = await res.json()
        if (!res.ok) {
            return {
                data: null,
                error: `Failed to create product: ${json?.message || `HTTP error! status: ${res.status}`}`
            }
        }
        return { data: json, error: null }
    } catch (e) {
        console.error("Error:", e)
        return {
            data: null,
            error: 'Network error. Please check your connection and try again.'
        }
    }
}

export async function getProduct() {
    const url = urls.getProduct
    const token = localStorage.getItem("access")

    try {
        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })

        if (!res.ok) {
            const json = await res.json()
            return {
                data: null,
                error: `Failed to fetch product: ${json?.message || `HTTP error! status: ${res.status}`}`
            }
        }
        const json = await res.json()
        return { data: json, error: null }
    } catch (e) {
        console.error("Error:", e)
        return {
            data: null,
            error: 'Network error. Please check your connection and try again.'
        }
    }
}