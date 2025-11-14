<template>
    <div class="bg-[#e9ecef] my-[1em] rounded-[1em] p-[1em] shadow-2">
            <slot name="name"></slot>
        <div class="flex justify-between items-center text-[11pt] text-[#6c757d]">
            <p>HSN Code:</p>
            <slot name="hsn"></slot>
        </div>
    </div>
</template>