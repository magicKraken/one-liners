<script setup>
import { ref, watchEffect } from 'vue'
import { fetchSnippets, authorFilter } from '@/api'
import SnippetList from '@/components/SnippetList'
import { useWorkspace } from '@/composables'

const snippets = ref([])
const loading = ref(true)
const { wallet } = useWorkspace()

watchEffect(() => {
  if (! wallet.value) return
  fetchSnippets([authorFilter(wallet.value.publicKey.toBase58())])
    .then(fetchedSnippets => snippets.value = fetchedSnippets)
    .finally(() => loading.value = false)
})
</script>

<template>
  <div v-if="true" class="border-b px-8 py-4 bg-gray-50">
    {{ wallet.publicKey.toBase58() }}
  </div>
  <snippet-list :snippets="snippets" :loading="loading"></snippet-list>
</template>
