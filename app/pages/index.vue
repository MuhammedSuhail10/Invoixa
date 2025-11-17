<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(true)
const name = ref("")

onMounted(() => {
    const name = localStorage.getItem("name")  || ""
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
        <div class="flex justify-between items-center my-[1em]">
            <div class="flex items-center gap-2">
                <img src="/icon.png" alt="" class="w-[5em] h-[5em]" />
                <p class="text-[13pt] capitalize font-[600] ">{{ name }}</p>
            </div>
            <div class="border-1 border-[#000] rounded-full p-2 ">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
                    <path
                        d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                </svg>
            </div>
        </div>
        <h1 class="text-3xl font-bold">Welcome to Invoixa</h1>
        <p class="text-lg text-[#6c757d]">Your all-in-one invoicing solution.</p>
    </div>
</template>