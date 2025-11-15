import urls from './urls'

export async function login(formData) {
    const url = urls.login

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })

        const json = await res.json()
        if (!res.ok) {
            return {
                data: null,
                error: `Login failed: ${json?.message || 'Please check your credentials'}`
            }
        }
        localStorage.setItem("access", json.access)
        localStorage.setItem("refresh", json.refresh)
        localStorage.setItem("name", json.name)
        return { data: json, error: null }
    } catch (e) {
        console.error("Login error:", e)
        return {
            data: null,
            error: 'Network error. Please check your connection and try again.'
        }
    }
}