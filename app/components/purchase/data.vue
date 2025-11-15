<script setup>
import { ref } from 'vue'
import { downloadInvoicePdf, getSale } from '~/services/sale'
const data = ref(null)
const error = ref(null)
const loading = ref(true)
const downloadingIds = ref(new Set())

const fetchPurchases = async () => {
    loading.value = true
    const result = await getSale({ purchase: true })

    if (result.error) {
        error.value = result.error
        data.value = null
    } else {
        data.value = result.data
        error.value = null
    }
    loading.value = false
}

const handleDownload = async (saleId) => {
    if (downloadingIds.value.has(saleId)) return
    downloadingIds.value.add(saleId)
    try {
        const result = await downloadInvoicePdf(saleId)
        if (result.error) alert('Failed to download PDF: ' + result.error)
    } finally {
        downloadingIds.value.delete(saleId)
    }
}

onMounted(() => {
    fetchPurchases();
})
</script>

<template>
    <div class="mb-[7em] ">
        <div v-if="loading" class="text-center py-8">
            <p>Loading purchases...</p>
        </div>
        <div v-else-if="data && data.length > 0">
            <div v-for="purchase in data" :key="purchase.id"
                class="bg-[#e9ecef] my-[1em] rounded-[1em] p-[1em] shadow-2">
                <HelpersCard>
                    <template #name>{{ purchase.customer }}</template>
                    <template #date>{{ purchase.order_date }}</template>
                    <template #rate>{{ purchase.total_amount }}</template>
                </HelpersCard>
                <hr />
                <div class="flex justify-between items-center text-[11pt] uppercase mt-[0.5em] text-[#6c757d] ">
                    {{ purchase.invoice_number }}
                    <div class="flex justify-between gap-[0.5em] items-center">
                        <!-- <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 -960 960 960" width="1.5em"
                            fill="currentcolor">
                            <path
                                d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z" />
                        </svg> -->
                        <button @click="handleDownload(purchase.id)" :disabled="downloadingIds.has(purchase.id)"
                            class="hover:text-[#495057] transition-colors disabled:opacity-50" title="Download Invoice">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 -960 960 960"
                                width="1.5em" fill="currentcolor">
                                <path
                                    d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="flex items-center h-[60dvh] justify-center">
            <p>No purchases found.</p>
        </div>
    </div>
</template>