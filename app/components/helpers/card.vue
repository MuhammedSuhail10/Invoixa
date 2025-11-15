<template>
    <div>
        <div class="flex justify-between items-center text-[15pt]">
            <slot name="name"></slot>
            <div class="text-[12pt] ">
                <slot name="date"></slot>
            </div>
        </div>
        <div class="flex justify-between items-center text-[11pt] text-[#6c757d] mb-[1em]">
            <p>Total Rate</p>
            <slot name="rate"></slot>
        </div>
        <!-- <div class="flex justify-between items-center text-[11pt] mb-[1em] text-[#6c757d]">
            <p>Total Quantity</p>
            <slot name="quantity"></slot>
        </div> -->
    </div>
</template>