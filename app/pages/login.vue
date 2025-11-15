<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '~/services/login.js';

const phone = ref("");
const password = ref("");
const isSubmitting = ref(false);
const router = useRouter();
const errorMsg = ref(null);

onMounted(() => {
    const access = localStorage.getItem("access")
    if (access) router.push('/')
})

const loginFn = async () => {
    errorMsg.value = null;
    if (!phone.value || !password.value) {
        errorMsg.value = "Please fill all fields";
        return;
    }

    const formData = {
        username: phone.value,
        password: password.value,
    };

    try {
        isSubmitting.value = true;
        const result = await login(formData);
        
        if (result.error) {
            errorMsg.value = result.error;
            return;
        }
        if (result.data) router.push('/');
    } catch (err) {
        console.error(err);
        errorMsg.value = "An unexpected error occurred. Please try again.";
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<template>
    <div class="flex h-[100dvh] flex-col justify-center items-center bg-[#023047] text-white">
        <img src="/icon.png" alt="" class="w-[10em] h-[10em] mx-auto" />
        <p class="text-[15pt] ">Make your billing easier</p>
        <form @submit.prevent="loginFn" class="my-[3em] px-[1em] ">
            <div>
                <label class="font-[500] text-[#6c757d]">Phone Number</label>
                <input class="w-full border p-[0.7em] py-[1em] rounded-[1em] outline-none" 
                    type="text"
                    placeholder="Phone Number" 
                    v-model="phone" 
                    :disabled="isSubmitting" />
            </div>
            <div class="mt-[1em]">
                <label class="font-[500] text-[#6c757d]">Password</label>
                <input class="w-full border p-[0.7em] py-[1em] rounded-[1em] outline-none" 
                    type="password"
                    placeholder="Password" 
                    v-model="password"
                    :disabled="isSubmitting" />
            </div>
            <div>
                <button 
                    type="submit"
                    class="mt-[2em] py-[1em] hover:bg-[#6c757d] text-[#023047] rounded-[0.5em] font-[600] w-full transition-colors"
                    :class="isSubmitting ? 'bg-[#6c757d] cursor-not-allowed' : 'bg-[#fff]'"
                    :disabled="isSubmitting">
                    {{ isSubmitting ? 'Attempting login...' : 'Login' }}
                </button>
            </div>
            <div v-if="errorMsg" class="mt-[1em]">
                <p class="text-[#ef4444] text-center">{{ errorMsg }}</p>
            </div>
        </form>
    </div>
</template>