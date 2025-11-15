<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(true)

onMounted(() => {
    const access = localStorage.getItem("access")

    if (!access) router.push('/login')
    loading.value = false
})
</script>

<template>
    <div v-if="loading" class="flex justify-center items-center h-screen">
        <img src="/icon.png" alt="" class="w-[10em] h-[10em] mx-auto animate-pulse" />
    </div>
    <div v-else class="px-[1em] lg:px-[15em] py-[1em]">
        <LazyLinksNavbar />
        <h1 class="text-3xl font-bold">Welcome to Invoixa</h1>
        <p class="text-lg text-[#6c757d]">Your all-in-one invoicing solution.</p>
    </div>
</template>