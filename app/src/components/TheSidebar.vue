<script setup>
import { WalletMultiButton, useWallet } from 'solana-wallets-vue'
const { connected } = useWallet()
</script>

<template>
  <aside class="flex flex-col items-center md:items-stretch space-y-2 md:space-y-4">
    <router-link :to="{ name: 'Home' }" class="inline-block rounded-full hover:bg-gray-100 p-3 md:self-start">
      <img src="@/assets/logo.png" class="h-10 md:h-16 w-10 md:w-16" />
    </router-link>
    <div class="flex flex-col items-center md:items-stretch space-y-2">
      <p class="pl-4 mb-4 hidden md:block">
        Solana Dapp to publish one-line snippets for your favorite languages
      </p>
      <router-link :to="{ name: 'Languages' }" class="rounded-full hover:bg-gray-100 p-3 md:w-full inline-flex items-center space-x-5" active-class="font-bold" v-slot="{ isActive }">
        <svg v-if="isActive" xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 text-gray-700" viewBox="0 0 20 18" fill="currentColor">
          <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6.646 5.646a.5.5 0 1 1 .708.708L5.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zm2.708 0 2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 1 1 .708-.708z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 text-gray-700" fill="none" viewBox="0 0 20 18" stroke="currentColor">
          <path stroke-width="0.5" d="M6.646 5.646a.5.5 0 1 1 .708.708L5.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zm2.708 0a.5.5 0 1 0-.708.708L10.293 8 8.646 9.646a.5.5 0 0 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2z"/>
          <path stroke-width="0.5" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
        </svg>
        <div class="text-xl hidden md:block">Languages</div>
      </router-link>
      <router-link :to="{ name: 'Users' }" class="rounded-full hover:bg-gray-100 p-3 md:w-full inline-flex items-center space-x-4" active-class="font-bold" v-slot="{ isActive }">
        <svg v-if="isActive" xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 text-gray-700" viewBox="0 0 20 18" fill="currentColor">
          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.245z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 text-gray-700" fill="none" viewBox="0 0 20 18" stroke="currentColor">
          <path stroke-width="0.5" d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path stroke-width="0.5" d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z"/>
        </svg>
        <div class="text-xl hidden md:block">Snippers</div>
      </router-link>
      <router-link v-if="connected" :to="{ name: 'Profile' }" class="rounded-full hover:bg-gray-100 p-3 md:w-full inline-flex items-center space-x-4" active-class="font-bold" v-slot="{ isActive }">
        <svg v-if="isActive" xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 text-gray-700" viewBox="0 0 20 18" fill="currentColor">
          <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8.5 4.5v.634l.549-.317a.5.5 0 1 1 .5.866L9 6l.549.317a.5.5 0 1 1-.5.866L8.5 6.866V7.5a.5.5 0 0 1-1 0v-.634l-.549.317a.5.5 0 1 1-.5-.866L7 6l-.549-.317a.5.5 0 0 1 .5-.866l.549.317V4.5a.5.5 0 1 1 1 0zM5.5 9h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zm0 2h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 text-gray-700" fill="none" viewBox="0 0 20 18" stroke="currentColor">
          <path stroke-width="0.5" d="M8.5 4.5a.5.5 0 0 0-1 0v.634l-.549-.317a.5.5 0 1 0-.5.866L7 6l-.549.317a.5.5 0 1 0 .5.866l.549-.317V7.5a.5.5 0 1 0 1 0v-.634l.549.317a.5.5 0 1 0 .5-.866L9 6l.549-.317a.5.5 0 1 0-.5-.866l-.549.317V4.5zM5.5 9a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
          <path stroke-width="0.5" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
        </svg>
        <div class="text-xl hidden md:block">Profile</div>
      </router-link>
    </div>
    <div class="fixed bottom-8 right-8 md:static w-48 md:w-full">
      <wallet-modal-provider>
        <wallet-multi-button></wallet-multi-button>
      </wallet-modal-provider>
    </div>
  </aside>
</template>
