<template>
  <div 
    v-if="showInstallPrompt" 
    class="fixed bottom-4 right-4 bg-white shadow-xl rounded-lg p-6 max-w-sm z-50 border border-gray-200"
  >
    <div class="flex items-start gap-3">
      <div class="flex-shrink-0">
        <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>
      <div class="flex-1">
        <h3 class="font-semibold text-lg mb-1">Install Invoixa</h3>
        <p class="text-sm text-gray-600 mb-4">
          Install our app for quick access and a better experience!
        </p>
        <div class="flex gap-2">
          <button 
            @click="install" 
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
          >
            Install
          </button>
          <button 
            @click="dismiss" 
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
          >
            Not now
          </button>
        </div>
      </div>
      <button 
        @click="dismiss" 
        class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
const showInstallPrompt = ref(false)
let deferredPrompt = null

onMounted(() => {
  // Listen for the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault()
    // Stash the event so it can be triggered later
    deferredPrompt = e
    // Show the install prompt
    showInstallPrompt.value = true
  })

  // Listen for successful installation
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed')
    showInstallPrompt.value = false
    deferredPrompt = null
  })
})

const install = async () => {
  if (!deferredPrompt) return
  
  // Show the install prompt
  deferredPrompt.prompt()
  
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice
  
  console.log(`User response to the install prompt: ${outcome}`)
  
  // Clear the deferredPrompt
  deferredPrompt = null
  showInstallPrompt.value = false
}

const dismiss = () => {
  showInstallPrompt.value = false
  // Optional: Store in localStorage to not show again for a while
  localStorage.setItem('pwa-install-dismissed', Date.now().toString())
}

// Optional: Check if user dismissed recently (e.g., within last 7 days)
onMounted(() => {
  const dismissed = localStorage.getItem('pwa-install-dismissed')
  if (dismissed) {
    const dismissedTime = parseInt(dismissed)
    const sevenDays = 7 * 24 * 60 * 60 * 1000
    if (Date.now() - dismissedTime < sevenDays) {
      showInstallPrompt.value = false
    }
  }
})
</script>