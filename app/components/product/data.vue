<template>
    <div class="mb-[7em] ">
        <div v-for="i in 10">
            <ProductCard>
                <template #name>Muhammed Suhail</template>
                <template #hsn>1000</template>
            </ProductCard>
        </div>
    </div>
</template>