<script setup>
import { ref } from "vue";
const emit = defineEmits(["close", "success"]);
const customer = ref("");
const transportCharge = ref(0);
const includeTcToGst = ref(false);
const newProduct = ref("");
const newQty = ref(1);
const productsList = ref([]);
const isSubmitting = ref(false);

const errors = ref({
    customer: "",
    products: "",
});

function addProduct() {
    if (!newProduct.value || !newQty.value) return;
    const exists = productsList.value.find(
        p => p.name === newProduct.value
    );
    if (exists) {
        exists.qty += Number(newQty.value);
    } else {
        productsList.value.push({
            name: newProduct.value,
            qty: Number(newQty.value)
        });
    }
    newProduct.value = "";
    newQty.value = 1;
}

function removeProduct(index) {
    productsList.value.splice(index, 1);
}

function validateForm() {
    let isValid = true;
    errors.value = {
        customer: "",
        products: "",
    };

    if (!customer.value) {
        errors.value.customer = "Customer is required.";
        isValid = false;
    }

    if (productsList.value.length === 0) {
        errors.value.products = "At least one product must be added.";
        isValid = false;
    }

    return isValid;
}

async function createSale() {
    if (!validateForm()) return;
    isSubmitting.value = true;

    const formData = {
        customer: customer.value,
        products: productsList.value,
        transportCharge: transportCharge.value,
    };

    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const success = true;
        if (success) {
            customer.value = "";
            transportCharge.value = 0;
            includeTcToGst.value = false;
            productsList.value = [];
            alert("Sale added successfully!");
            emit("success");
            emit("close");
        } else {
            alert("Failed to add sale. Please try again.");
        }
    } catch (err) {
        console.error(err);
        alert("An error occurred. Please try again.");
    } finally {
        isSubmitting.value = false;
    }
}

function closeForm() {
    emit("close");
}
</script>

<template>
    <div class="px-[1em]">
        <div class="flex justify-between items-center font-[700] text-[15pt] mb-4">
            <h2 class=" ">Add New Sale</h2>
            <button @click="closeForm" class="close-btn">✕</button>
        </div>

        <form @submit.prevent="createSale">
            <div class="mb-2 flex flex-col gap-1">
                <label class="font-[500] text-[#6c757d] ">Customer</label>
                <div class="flex w-[100%] gap-2">
                    <select class="w-[99%] border p-[0.7em] rounded-[0.5em] appearance-none 
                    focus:outline-none focus:border-blue-500" v-model="customer" :class="{ 'error': errors.customer }"
                        :disabled="isSubmitting">
                        <option value="" disabled>Select Customer</option>
                        <option v-for="customer in 10" :key="customer.id" :value="customer.id">
                            {{ customer.name }}
                        </option>
                    </select>
                    <!-- <button
                        class="bg-[#023047] px-[1em] py-[0.5em] rounded-[1em] text-[11pt] text-white hover:bg-[#034f6f] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px"
                            fill="#ffffff">
                            <path d="M440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z" />
                        </svg>
                    </button> -->
                </div>
                <span v-if="errors.customer" class="text-[#ef4444] text-[10pt] mt-[0.1em] ">{{ errors.customer }}</span>
            </div>
            <div class="mb-2 flex flex-col gap-1">
                <label class="font-[500] text-[#6c757d]">Products</label>

                <div class="flex w-full gap-2">
                    <select
                        class="w-[60%] border p-[0.7em] rounded-[0.5em] appearance-none focus:outline-none focus:border-blue-500"
                        v-model="newProduct" :disabled="isSubmitting">
                        <option value="" disabled>Select Product</option>
                        <option v-for="product in 10" :key="product" :value="product">
                            {{ product }}
                        </option>
                    </select>
                    <input type="number" min="1" class="w-[20%] border p-[0.7em] rounded-[0.5em]" placeholder="Qty"
                        v-model="newQty" />
                    <button @click="addProduct"
                        class="bg-[#023047] px-[1em] py-[0.5em] rounded-[1em] text-[11pt] text-white hover:bg-[#034f6f] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px"
                            fill="#ffffff">
                            <path d="M440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z" />
                        </svg>
                    </button>
                </div>
                <span v-if="errors.products" class="text-[#ef4444] text-[10pt]">
                    {{ errors.products }}
                </span>
                <div class="mt-3 flex flex-col gap-2">
                    <div v-for="(item, index) in productsList" :key="index"
                        class="flex justify-between items-center border p-2 px-3 rounded-lg bg-[#f8f9fa]">
                        <div class="font-medium">
                            {{ item.name }} (Qty: {{ item.qty }})
                        </div>
                        <button @click="removeProduct(index)" class="text-red-500 font-bold text-xl">×</button>
                    </div>
                </div>
            </div>
            <div class="mb-2 flex flex-col gap-1">
                <label class="font-[500] text-[#6c757d]">Transport Charge</label>
                <div class="flex w-full gap-2">
                    <input class="w-[100%] border-1 p-[0.7em] rounded-[0.5em]" v-model="transportCharge" type="text"
                        placeholder="Transport Charge" :disabled="isSubmitting" />
                </div>
                <div class="flex items-center gap-2 mt-1">
                    <input type="checkbox" v-model="includeTcToGst" class="w-[1em] h-[1em] accent-blue-500" />
                    <label class="text-[10pt] text-[#6c757d]">Include TC to GST</label>
                </div>
            </div>

            <div class="flex justify-between mt-[2em]">
                <button type="button" @click="closeForm"
                    class="px-[1em] py-[0.7em] bg-[#6c757d] text-[#fff] rounded-[0.5em] font-[600]"
                    :disabled="isSubmitting" :class="isSubmitting && 'bg-[#fff]'">
                    Cancel
                </button>
                <button type="submit" class="px-[1em] py-[0.7em] bg-[#023047] text-[#fff] rounded-[0.5em] font-[600]"
                    :disabled="isSubmitting" :class="isSubmitting && 'bg-[#fff]'">
                    {{ isSubmitting ? 'Submitting...' : 'Submit Sale' }}
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
input:focus,
textarea:focus {
    outline: none;
    border-color: #3b82f6;
}

input.error,
textarea.error {
    border-color: #ef4444;
}

input:disabled,
textarea:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
}
</style>