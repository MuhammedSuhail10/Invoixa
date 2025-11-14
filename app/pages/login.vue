<script setup>
import { ref } from "vue";

const phone = ref("");
const password = ref("");
const isSubmitting = ref(false);

const login = async () => {
    if (!phone.value || !password.value) {
        alert("Please fill all fields");
        return;
    }

    try {
        isSubmitting.value = true;
        console.log("Logging in with:", phone.value, password.value);
    } catch (err) {
        console.error(err);
    } finally {
        isSubmitting.value = false;
    }
};
</script>


<template>
    <div class="flex h-[100dvh] flex-col justify-center items-center bg-[#023047] text-white">
        <img src="/icon.png" alt="" class="w-[10em] h-[10em] mx-auto" />
        <p class="text-[15pt] ">Make your billing easier</p>
        <form @submit.prevent="login" class="my-[3em] ">
            <div>
                <label class="font-[500] text-[#6c757d]">Phone Number</label>
                <input class="w-full border p-[0.7em] py-[1em] rounded-[1em] outline-none" type="text"
                    placeholder="Phone Number" />
            </div>
            <div class="mt-[1em]">
                <label class="font-[500] text-[#6c757d]">Password</label>
                <input class="w-full border p-[0.7em] py-[1em] rounded-[1em] outline-none" type="text"
                    placeholder="Password" />
            </div>
            <div>
                <button
                    class="mt-[2em] py-[1em] bg-[#6c757d] hover:bg-[#fff] text-[#023047] rounded-[0.5em] font-[600] w-full">
                    Login
                </button>
            </div>
        </form>
    </div>
</template>