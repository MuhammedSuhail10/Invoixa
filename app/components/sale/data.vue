<template>
    <div class="mb-[7em] ">
        <div v-for="i in 10">
            <HelpersCard>
                <template #name>Muhammed Suhail</template>
                <template #date>12/12/2023</template>
                <template #rate>1000</template>
                <template #quantity>10</template>
                <template #invoice>INV-00{{ i }}</template>
            </HelpersCard>
        </div>
    </div>
</template>