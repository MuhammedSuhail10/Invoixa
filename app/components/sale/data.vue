<script setup>
import { ref } from 'vue'
import { downloadInvoicePdf, getSale } from '~/services/sale'
const data = ref(null)
const error = ref(null)
const loading = ref(true)
const downloadingIds = ref(new Set())

const fetchSale = async () => {
    loading.value = true
    const result = await getSale()

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
    fetchSale();
})
</script>

<template>
    <div class="mb-[7em] ">
        <div v-if="loading" class="text-center py-8">
            <p>Loading sales...</p>
        </div>
        <div v-else-if="data && data.length > 0">
            <div v-for="sale in data" :key="sale.id" class="bg-[#e9ecef] my-[1em] rounded-[1em] p-[1em] shadow-2">
                <HelpersCard>
                    <template #name>{{ sale.customer }}</template>
                    <template #date>{{ sale.order_date }}</template>
                    <template #rate>{{ sale.total_amount }}</template>
                </HelpersCard>
                <hr />
                <div class="flex justify-between items-center uppercase text-[11pt] mt-[0.5em] text-[#6c757d] ">
                    {{ sale.invoice_number }}
                    <div class="flex justify-between gap-[0.5em] items-center">
                        <button @click="handleDownload(sale.id)" :disabled="downloadingIds.has(sale.id)"
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
            <p>No sales found.</p>
        </div>
    </div>
</template>