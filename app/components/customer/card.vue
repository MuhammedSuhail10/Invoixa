<template>
    <div class="bg-[#e9ecef] my-[1em] rounded-[1em] p-[1em] shadow-2">
        <div class="flex justify-between items-center text-[11pt]">
            <div>
                <slot name="name"></slot>
            </div>
            <slot name="phone"></slot>  
        </div>
        <div class="flex justify-between items-center text-[11pt] text-[#6c757d]">
            <p>GST:</p>
            <slot name="gst"></slot>
        </div>
    </div>
</template>