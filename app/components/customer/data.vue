<script setup>
import { ref } from 'vue'
import { getCustomer } from '~/services/customer'

const data = ref(null)
const error = ref(null)
const loading = ref(true)

const fetchCustomers = async () => {
    loading.value = true
    const result = await getCustomer()

    if (result.error) {
        error.value = result.error
        data.value = null
    } else {
        data.value = result.data
        error.value = null
    }
    loading.value = false
}

onMounted(() => {
    fetchCustomers();
})
</script>

<template>
    <div class="mb-[7em] ">
        <div v-if="loading" class="text-center py-8">
            <p>Loading customers...</p>
        </div>
        <div v-else-if="data && data.length > 0">
            <div v-for="customer in data" :key="customer.id">
                <CustomerCard>
                    <template #name>{{ customer.name }}</template>
                    <template #phone>{{ customer.phone_number }}</template>
                    <template #gst>{{ customer.gst_number }}</template>
                </CustomerCard>
            </div>
        </div>
        <div v-else class="flex items-center h-[60dvh] justify-center">
            <p>No customers found.</p>
        </div>
    </div>
</template>