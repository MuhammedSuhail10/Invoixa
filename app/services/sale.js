import { ref } from 'vue'
import urls from './urls'

export async function createSale(formData) {
    const url = urls.createSale
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
                error: `Failed to create sale: ${json?.message || `HTTP error! status: ${res.status}`}`
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

export async function getSale({ purchase } = {}) {
    console.log(purchase)
    const url = purchase ? `${urls.getPurchase}` : urls.getSale
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
                error: `Failed to fetch sale: ${json?.message || `HTTP error! status: ${res.status}`}`
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

export async function downloadInvoicePdf(orderId) {
    const api_url = urls.downloadInvoicePdf
    const token = localStorage.getItem("access")
    try {
        const response = await fetch(`${api_url}${orderId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            throw new Error('Failed to download PDF')
        }

        // Get the blob from response
        const blob = await response.blob()

        // Create a download link
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url

        // Extract filename from Content-Disposition header or use default
        const contentDisposition = response.headers.get('Content-Disposition')
        let filename = 'invoice.pdf'

        if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="?(.+)"?/)
            if (filenameMatch) {
                filename = filenameMatch[1]
            }
        }

        link.download = filename
        document.body.appendChild(link)
        link.click()

        // Cleanup
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

        return { success: true }
    } catch (error) {
        console.error('Error downloading PDF:', error)
        return { error: error.message }
    }
}