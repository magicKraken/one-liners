<script setup>
import { ref, watchEffect } from 'vue'
import { PublicKey } from '@solana/web3.js'
import { getSnippet } from '@/api'
import { useFromRoute } from '@/composables'
import SnippetCard from '@/components/SnippetCard'

const snippetAddress = ref(null)
useFromRoute((route) => snippetAddress.value = route.params.snippet)

const loading = ref(false)
const snippet = ref(null)
watchEffect(async () => {
  try {
    loading.value = true
    snippet.value = await getSnippet(new PublicKey(snippetAddress.value))
  } catch (e) {
    snippet.value = null
  } finally {
    loading.value = false
  }
})

</script>

<template>
  <div v-if="loading" class="p-8 text-gray-500 text-center">
    Loading...
  </div>
  <div v-else-if="! snippet" class="p-8 text-gray-500 text-center">
    Snippet not found
  </div>
  <snippet-card v-else :snippet="snippet"></snippet-card>
</template>
