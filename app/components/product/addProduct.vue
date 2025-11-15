<script setup>
import { ref } from "vue";
import { createProduct } from "~/services/product";
const emit = defineEmits(["close", "success"]);

const isSubmitting = ref(false);

const formData = ref({
    name: "",
    hsn_code: "",
    unit: "",
    price: "",
});

const errors = ref({
    name: "",
    hsn_code: "",
    unit: "",
    price: "",
});

function validateForm() {
    let isValid = true;
    errors.value = {
        name: "",
        hsn_code: "",
        unit: "",
        price: "",
    };

    if (!formData.value.name.trim()) {
        errors.value.name = "Name is required.";
        isValid = false;
    }
    if (!formData.value.hsn_code.trim()) {
        errors.value.hsn_code = "HSN Code is required.";
        isValid = false;
    }
    if (!formData.value.unit.trim()) {
        errors.value.unit = "Unit is required.";
        isValid = false;
    }
    if (!formData.value.price) {
        errors.value.price = "Price is required.";
        isValid = false;
    } else if (isNaN(formData.value.price) || parseFloat(formData.value.price) <= 0) {
        errors.value.price = "Please enter a valid price.";
        isValid = false;
    }
    return isValid;
}

async function productCreation() {
    if (!validateForm()) return;
    isSubmitting.value = true;

    try {
        const { data, error } = await createProduct(formData.value);
        if (error) {
            alert(error);
            return;
        }
        if (data) {
            formData.value = {
                name: "",
                hsn_code: "",
                unit: "",
                price: "",
            };
            alert("Product added successfully!");
            emit("success");
            emit("close");
        } else {
            alert("Failed to add product. Please try again.");
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
    <div class="px-[1em] overflow-y-auto">
        <div class="flex justify-between items-center font-[700] text-[15pt] mb-4 sticky top-0 bg-white py-2">
            <h2>Add New Product</h2>
            <button @click="closeForm" class="close-btn text-[20pt] hover:text-gray-600">✕</button>
        </div>

        <form @submit.prevent="productCreation">
            <!-- Product Information -->
            <div class="mb-4">

                <div class="mb-3 flex flex-col gap-1">
                    <label class="font-[500] text-[#6c757d]">Product Name *</label>
                    <input class="w-full border p-[0.7em] rounded-[0.5em]" v-model="formData.name" type="text"
                        placeholder="Product Name" :disabled="isSubmitting" :class="{ 'error': errors.name }" />
                    <span v-if="errors.name" class="text-[#ef4444] text-[10pt]">{{ errors.name }}</span>
                </div>

                <div class="mb-3 flex flex-col gap-1">
                    <label class="font-[500] text-[#6c757d]">HSN Code *</label>
                    <input class="w-full border p-[0.7em] rounded-[0.5em]" v-model="formData.hsn_code" type="text"
                        placeholder="HSN Code" :disabled="isSubmitting" :class="{ 'error': errors.hsn_code }" />
                    <span v-if="errors.hsn_code" class="text-[#ef4444] text-[10pt]">{{ errors.hsn_code }}</span>
                </div>

                <div class="mb-3 flex flex-col gap-1">
                    <label class="font-[500] text-[#6c757d]">Unit *</label>
                    <input class="w-full border p-[0.7em] rounded-[0.5em]" v-model="formData.unit" type="text"
                        placeholder="Unit (e.g., Kg, Ltr, Pcs)" :disabled="isSubmitting"
                        :class="{ 'error': errors.unit }" />
                    <span v-if="errors.unit" class="text-[#ef4444] text-[10pt]">{{ errors.unit }}</span>
                </div>

                <div class="mb-3 flex flex-col gap-1">
                    <label class="font-[500] text-[#6c757d]">Price *</label>
                    <input class="w-full border p-[0.7em] rounded-[0.5em]" v-model="formData.price" type="number"
                        step="0.01" placeholder="Price" :disabled="isSubmitting" :class="{ 'error': errors.price }" />
                    <span v-if="errors.price" class="text-[#ef4444] text-[10pt]">{{ errors.price }}</span>
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
                    {{ isSubmitting ? 'Submitting...' : 'Submit Product' }}
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
input:focus,
textarea:focus,
select:focus {
    outline: none;
    border-color: #3b82f6;
}

input.error,
textarea.error,
select.error {
    border-color: #ef4444;
}

input:disabled,
textarea:disabled,
select:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
}
</style>