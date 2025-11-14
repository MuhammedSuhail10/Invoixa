<script setup>
import { ref } from "vue";
const emit = defineEmits(["close", "success"]);

const isSubmitting = ref(false);
const sameAsAddress = ref(false);

// Form fields
const formData = ref({
    name: "",
    gst_number: "",
    company_name: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    shipping_address_line_1: "",
    shipping_address_line_2: "",
    shipping_city: "",
    shipping_state: "",
    shipping_pincode: "",
    shipping_country: "India",
    phone_number: "",
    email: "",
    is_vendor: false,
});

const errors = ref({
    name: "",
    gst_number: "",
    company_name: "",
    address_line_1: "",
    city: "",
    state: "",
    pincode: "",
    phone_number: "",
    email: "",
});

// When checkbox is toggled, copy/clear shipping address
function handleSameAsAddress() {
    if (sameAsAddress.value) {
        formData.value.shipping_address_line_1 = formData.value.address_line_1;
        formData.value.shipping_address_line_2 = formData.value.address_line_2;
        formData.value.shipping_city = formData.value.city;
        formData.value.shipping_state = formData.value.state;
        formData.value.shipping_pincode = formData.value.pincode;
        formData.value.shipping_country = formData.value.country;
    } else {
        formData.value.shipping_address_line_1 = "";
        formData.value.shipping_address_line_2 = "";
        formData.value.shipping_city = "";
        formData.value.shipping_state = "";
        formData.value.shipping_pincode = "";
        formData.value.shipping_country = "India";
    }
}

function validateForm() {
    let isValid = true;
    errors.value = {
        name: "",
        gst_number: "",
        company_name: "",
        address_line_1: "",
        city: "",
        state: "",
        pincode: "",
        phone_number: "",
        email: "",
    };

    if (!formData.value.name.trim()) {
        errors.value.name = "Name is required.";
        isValid = false;
    }

    if (!formData.value.gst_number.trim()) {
        errors.value.gst_number = "GST Number is required.";
        isValid = false;
    }

    if (!formData.value.company_name.trim()) {
        errors.value.company_name = "Company Name is required.";
        isValid = false;
    }

    if (!formData.value.address_line_1.trim()) {
        errors.value.address_line_1 = "Address Line 1 is required.";
        isValid = false;
    }

    if (!formData.value.city.trim()) {
        errors.value.city = "City is required.";
        isValid = false;
    }

    if (!formData.value.state.trim()) {
        errors.value.state = "State is required.";
        isValid = false;
    }

    if (!formData.value.pincode.trim()) {
        errors.value.pincode = "Pincode is required.";
        isValid = false;
    }

    if (!formData.value.phone_number.trim()) {
        errors.value.phone_number = "Phone Number is required.";
        isValid = false;
    }

    if (!formData.value.email.trim()) {
        errors.value.email = "Email is required.";
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
        errors.value.email = "Please enter a valid email address.";
        isValid = false;
    }

    return isValid;
}

async function createCustomer() {
    if (!validateForm()) return;
    isSubmitting.value = true;

    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const success = true;
        if (success) {
            // Reset form
            formData.value = {
                name: "",
                gst_number: "",
                company_name: "",
                address_line_1: "",
                address_line_2: "",
                city: "",
                state: "",
                pincode: "",
                country: "India",
                shipping_address_line_1: "",
                shipping_address_line_2: "",
                shipping_city: "",
                shipping_state: "",
                shipping_pincode: "",
                shipping_country: "India",
                phone_number: "",
                email: "",
            };
            sameAsAddress.value = false;
            alert("Customer added successfully!");
            emit("success");
            emit("close");
        } else {
            alert("Failed to add customer. Please try again.");
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
        <div class="flex justify-between items-center font-[700] text-[15pt] mb-4 sticky top-0 bg-white py-1">
            <h2>Add New Customer</h2>
            <button @click="closeForm" class="close-btn text-[20pt] hover:text-gray-600">✕</button>
        </div>

        <form @submit.prevent="createCustomer">
            <div class="flex items-center gap-2 my-[1em]">
                <input type="checkbox" v-model="formData.is_vendor"
                    class="w-[1em] h-[1em] accent-blue-500" />
                <label class="text-[10pt] text-[#6c757d]">Vendor</label>
            </div>
            <!-- Basic Information -->
            <div class="mb-4">
                <h3 class="font-[600] text-[13pt] mb-3 text-[#023047]">Basic Information</h3>

                <div class="mb-3 flex flex-col gap-1">
                    <label class="font-[500] text-[#6c757d]">Name *</label>
                    <input class="w-full border p-[0.7em] rounded-[0.5em]" v-model="formData.name" type="text"
                        placeholder="Customer Name" :disabled="isSubmitting" :class="{ 'error': errors.name }" />
                    <span v-if="errors.name" class="text-[#ef4444] text-[10pt]">{{ errors.name }}</span>
                </div>

                <div class="mb-3 flex flex-col gap-1">
                    <label class="font-[500] text-[#6c757d]">Company Name *</label>
                    <input class="w-full border p-[0.7em] rounded-[0.5em]" v-model="formData.company_name" type="text"
                        placeholder="Company Name" :disabled="isSubmitting" :class="{ 'error': errors.company_name }" />
                    <span v-if="errors.company_name" class="text-[#ef4444] text-[10pt]">{{ errors.company_name }}</span>
                </div>

                <div class="mb-3 flex flex-col gap-1">
                    <label class="font-[500] text-[#6c757d]">GST Number *</label>
                    <input class="w-full border p-[0.7em] rounded-[0.5em]" v-model="formData.gst_number" type="text"
                        placeholder="GST Number" :disabled="isSubmitting" :class="{ 'error': errors.gst_number }" />
                    <span v-if="errors.gst_number" class="text-[#ef4444] text-[10pt]">{{ errors.gst_number }}</span>
                </div>

                <div class="grid grid-cols-2 gap-3 mb-3">
                    <div class="flex flex-col gap-1">
                        <label class="font-[500] text-[#6c757d]">Phone Number *</label>
                        <input class="w-full border p-[0.7em] rounded-[0.5em]" v-model="formData.phone_number"
                            type="tel" placeholder="Phone Number" :disabled="isSubmitting"
                            :class="{ 'error': errors.phone_number }" />
                        <span v-if="errors.phone_number" class="text-[#ef4444] text-[10pt]">{{ errors.phone_number
                        }}</span>
                    </div>

                    <div class="flex flex-col gap-1">
                        <label class="font-[500] text-[#6c757d]">Email *</label>
                        <input class="w-full border p-[0.7em] rounded-[0.5em]" v-model="formData.email" type="email"
                            placeholder="Email" :disabled="isSubmitting" :class="{ 'error': errors.email }" />
                        <span v-if="errors.email" class="text-[#ef4444] text-[10pt]">{{ errors.email }}</span>
                    </div>
                </div>
            </div>

            <!-- Billing Address -->
            <div class="mb-4">
                <h3 class="font-[600] text-[13pt] mb-3 text-[#023047]">Billing Address</h3>

                <div class="mb-3 flex flex-col gap-1">
                    <label class="font-[500] text-[#6c757d]">Address Line 1 *</label>
                    <input class="w-full border p-[0.7em] rounded-[0.5em]" v-model="formData.address_line_1" type="text"
                        placeholder="Address Line 1" :disabled="isSubmitting"
                        :class="{ 'error': errors.address_line_1 }" />
                    <span v-if="errors.address_line_1" class="text-[#ef4444] text-[10pt]">{{ errors.address_line_1
                    }}</span>
                </div>

                <div class="mb-3 flex flex-col gap-1">
                    <label class="font-[500] text-[#6c757d]">Address Line 2</label>
                    <input class="w-full border p-[0.7em] rounded-[0.5em]" v-model="formData.address_line_2" type="text"
                        placeholder="Address Line 2 (Optional)" :disabled="isSubmitting" />
                </div>

                <div class="grid grid-cols-2 gap-3 mb-3">
                    <div class="flex flex-col gap-1">
                        <label class="font-[500] text-[#6c757d]">City *</label>
                        <input class="w-full border p-[0.7em] rounded-[0.5em]" v-model="formData.city" type="text"
                            placeholder="City" :disabled="isSubmitting" :class="{ 'error': errors.city }" />
                        <span v-if="errors.city" class="text-[#ef4444] text-[10pt]">{{ errors.city }}</span>
                    </div>

                    <div class="flex flex-col gap-1">
                        <label class="font-[500] text-[#6c757d]">State *</label>
                        <input class="w-full border p-[0.7em] rounded-[0.5em]" v-model="formData.state" type="text"
                            placeholder="State" :disabled="isSubmitting" :class="{ 'error': errors.state }" />
                        <span v-if="errors.state" class="text-[#ef4444] text-[10pt]">{{ errors.state }}</span>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-3 mb-3">
                    <div class="flex flex-col gap-1">
                        <label class="font-[500] text-[#6c757d]">Pincode *</label>
                        <input class="w-full border p-[0.7em] rounded-[0.5em]" v-model="formData.pincode" type="text"
                            placeholder="Pincode" :disabled="isSubmitting" :class="{ 'error': errors.pincode }" />
                        <span v-if="errors.pincode" class="text-[#ef4444] text-[10pt]">{{ errors.pincode }}</span>
                    </div>

                    <div class="flex flex-col gap-1">
                        <label class="font-[500] text-[#6c757d]">Country</label>
                        <input class="w-full border p-[0.7em] rounded-[0.5em]" v-model="formData.country" type="text"
                            placeholder="Country" :disabled="isSubmitting" />
                    </div>
                </div>
            </div>

            <!-- Shipping Address -->
            <div class="mb-4">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="font-[600] text-[13pt] text-[#023047]">Shipping Address</h3>
                    <div class="flex items-center gap-2">
                        <input type="checkbox" v-model="sameAsAddress" @change="handleSameAsAddress"
                            class="w-[1em] h-[1em] accent-blue-500" />
                        <label class="text-[10pt] text-[#6c757d]">Same as Billing Address</label>
                    </div>
                </div>

                <div class="mb-3 flex flex-col gap-1">
                    <label class="font-[500] text-[#6c757d]">Address Line 1</label>
                    <input class="w-full border p-[0.7em] rounded-[0.5em]" v-model="formData.shipping_address_line_1"
                        type="text" placeholder="Shipping Address Line 1" :disabled="isSubmitting || sameAsAddress" />
                </div>

                <div class="mb-3 flex flex-col gap-1">
                    <label class="font-[500] text-[#6c757d]">Address Line 2</label>
                    <input class="w-full border p-[0.7em] rounded-[0.5em]" v-model="formData.shipping_address_line_2"
                        type="text" placeholder="Shipping Address Line 2 (Optional)"
                        :disabled="isSubmitting || sameAsAddress" />
                </div>

                <div class="grid grid-cols-2 gap-3 mb-3">
                    <div class="flex flex-col gap-1">
                        <label class="font-[500] text-[#6c757d]">City</label>
                        <input class="w-full border p-[0.7em] rounded-[0.5em]" v-model="formData.shipping_city"
                            type="text" placeholder="City" :disabled="isSubmitting || sameAsAddress" />
                    </div>

                    <div class="flex flex-col gap-1">
                        <label class="font-[500] text-[#6c757d]">State</label>
                        <input class="w-full border p-[0.7em] rounded-[0.5em]" v-model="formData.shipping_state"
                            type="text" placeholder="State" :disabled="isSubmitting || sameAsAddress" />
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-3 mb-3">
                    <div class="flex flex-col gap-1">
                        <label class="font-[500] text-[#6c757d]">Pincode</label>
                        <input class="w-full border p-[0.7em] rounded-[0.5em]" v-model="formData.shipping_pincode"
                            type="text" placeholder="Pincode" :disabled="isSubmitting || sameAsAddress" />
                    </div>

                    <div class="flex flex-col gap-1">
                        <label class="font-[500] text-[#6c757d]">Country</label>
                        <input class="w-full border p-[0.7em] rounded-[0.5em]" v-model="formData.shipping_country"
                            type="text" placeholder="Country" :disabled="isSubmitting || sameAsAddress" />
                    </div>
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
                    {{ isSubmitting ? 'Submitting...' : 'Submit Customer' }}
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