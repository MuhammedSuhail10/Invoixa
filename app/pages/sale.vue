<script setup>
import { ref } from 'vue'

const isModalOpen = ref(false);

const closeModal = () => {
    isModalOpen.value = false;
}

watch(isModalOpen, (newValue) => {
    if (newValue) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

onUnmounted(() => {
    document.body.style.overflow = '';
});
</script>

<template>
    <div class="px-[1em] lg:px-[15em] py-[1em]">
        <LinksNavbar />
        <HelpersHeader>
            <template #title>Sales</template>
            <template #button>
                <button @click="isModalOpen = true"
                    class="bg-[#023047] px-[1.5em] py-[0.5em] rounded-[1em] text-[11pt] text-white hover:bg-[#034f6f] transition-colors">
                    Add Sale
                </button>
            </template>
        </HelpersHeader>
        <SaleData />
        <ClientOnly>
            <Teleport to="body">
                <div class="modal-dialog" :class="{ 'open': isModalOpen }" @click.self="closeModal">
                    <div class="modal-content">
                        <div class="form-wrapper">
                            <SaleAddSale @close="closeModal" @success="handleSuccess" />
                        </div>
                    </div>
                </div>
            </Teleport>
        </ClientOnly>
    </div>
</template>

<style scoped>
.modal-dialog {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    z-index: 1000;
    backdrop-filter: blur(4px);
}

.modal-dialog.open {
    opacity: 1;
    visibility: visible;
}

.modal-content {
    width: 100%;
    max-width: 600px;
    height: 100%;
    background: white;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    position: relative;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    overflow-y: auto;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
}

.modal-dialog.open .modal-content {
    transform: translateX(0);
}

.close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: #666;
    transition: all 0.2s ease;
    z-index: 10;
}

.close-button:hover {
    background: #f3f4f6;
    color: #000;
}

.close-button svg {
    display: block;
}

.form-wrapper {
    margin-top: 2rem;
    flex: 1;
}

/* Scrollbar styling for modal */
.modal-content::-webkit-scrollbar {
    width: 8px;
}

.modal-content::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.modal-content::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
    background: #555;
}

/* Responsive adjustments */
@media (max-width: 640px) {
    .page-container {
        padding: 1rem;
    }

    .page-header {
        padding: 1.5rem;
    }

    .page-title {
        font-size: 1.5rem;
    }

    .add-sale-btn {
        width: 100%;
        justify-content: center;
    }

    .sales-content {
        padding: 1rem;
    }

    .modal-content {
        max-width: 100%;
        padding: 1.5rem;
    }

    .form-wrapper {
        margin-top: 1.5rem;
    }
}

@media (max-width: 480px) {
    .modal-content {
        padding: 1rem;
    }

    .close-button {
        top: 0.5rem;
        right: 0.5rem;
    }
}
</style>