<template>
    <div class="mb-[7em] ">
        <div v-for="i in 10">
            <CustomerCard>
                <template #name>Muhammed Suhail</template>
                <template #gst>1000</template>
            </CustomerCard>
        </div>
    </div>
</template>