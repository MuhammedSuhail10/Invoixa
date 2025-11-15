<script setup>
import { ref, onMounted } from "vue";
import { getVendor } from "~/services/customer";
import { getProduct } from "~/services/product";
import { createSale } from "~/services/sale";
const emit = defineEmits(["close", "success"]);
const customer = ref("");
const transportCharge = ref(0);
const includeTcToGst = ref(false);
const newProduct = ref("");
const newQty = ref(1);
const productsList = ref([]);
const isSubmitting = ref(false);

const customers = ref([]);
const products = ref([]);

const errors = ref({
    customer: "",
    products: "",
});

onMounted(async () => {
    try {
        const customerResult = await getVendor();
        customers.value = customerResult.data;

        const productResult = await getProduct();
        products.value = productResult.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

function addProduct() {
    if (!newProduct.value || !newQty.value) return;
    const exists = productsList.value.find(
        p => p.id === newProduct.value
    );
    if (exists) {
        exists.qty += Number(newQty.value);
    } else {
        productsList.value.push({
            item_id: newProduct.value,
            quantity: Number(newQty.value)
        });
    }
    newProduct.value = "";
    newQty.value = 1;
}

function removeProduct(index) {
    productsList.value.splice(index, 1);
}

function getProductName(id) {
    const product = products.value.find(p => p.id === id);
    return product ? product.name : id;
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

async function saleCreation() {
    if (!validateForm()) return;
    isSubmitting.value = true;

    const formData = {
        customer_id: customer.value,
        order_items: productsList.value,
        include_tc_gst: includeTcToGst.value,
        transport_charges: transportCharge.value,
        sale_type: false,
    };
    try {
        const { data, error } = await createSale(formData);
        if (error) {
            alert(error);
            return;
        }
        if (data) {
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
            <h2 class=" ">Add New Purchases</h2>
            <button @click="closeForm" class="close-btn">✕</button>
        </div>

        <form @submit.prevent="saleCreation">
            <div class="mb-2 flex flex-col gap-1">
                <label class="font-[500] text-[#6c757d] ">Vendor</label>
                <div class="flex w-[100%] gap-2">
                    <select class="w-[99%] border p-[0.7em] rounded-[0.5em] appearance-none 
                    focus:outline-none focus:border-blue-500" v-model="customer" :class="{ 'error': errors.customer }"
                        :disabled="isSubmitting">
                        <option value="" disabled>Select Vendor</option>
                        <option v-for="cust in customers" :key="cust.id" :value="cust.id">
                            {{ cust.name }}
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
                        <option v-for="prod in products" :key="prod.id" :value="prod.id">
                            {{ prod.name }}
                        </option>
                    </select>
                    <input type="number" min="1" class="w-[20%] border p-[0.7em] rounded-[0.5em]" placeholder="Qty"
                        v-model="newQty" />
                    <button type="button" @click="addProduct"
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
                            {{ getProductName(item.item_id) }} (Qty: {{ item.quantity }})
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
                    {{ isSubmitting ? 'Submitting...' : 'Submit Purchases' }}
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