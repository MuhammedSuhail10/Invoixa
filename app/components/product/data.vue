<script setup>
import { ref } from 'vue'
import { getProduct } from '~/services/product'
const data = ref(null)
const error = ref(null)
const loading = ref(true)

const fetchProducts = async () => {
    loading.value = true
    const result = await getProduct()
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
    fetchProducts();
})
</script>

<template>
    <div class="mb-[7em] ">
        <div v-if="loading" class="text-center py-8">
            <p>Loading products...</p>
        </div>
        <div v-else-if="data && data.length > 0" class="flex flex-wrap gap-4">
            <div v-for="product in data" :key="product.id" class="w-[calc(50%-0.5rem)]">
                <ProductCard>
                    <template #name>{{ product.name }}</template>
                    <template #hsn>{{ product.hsn_code }}</template>
                </ProductCard>
            </div>
        </div>
        <div v-else class="flex items-center h-[60dvh] justify-center">
            <p>No products found.</p>
        </div>
    </div>
</template>