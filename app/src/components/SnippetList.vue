<script setup>
import { computed, toRefs } from 'vue'
import SnippetCard from '@/components/SnippetCard'

const props = defineProps({
  snippets: Array,
  loading: Boolean,
})

const { snippets, loading } = toRefs(props)
const orderedSnippets = computed(() => {
    return snippets.value.slice().sort((a, b) => b.timestamp - a.timestamp)
})
</script>

<template>
  <div v-if="loading" class="p-8 text-gray-500 text-center">
    Loading...
  </div>
  <div v-else class="divide-y">
    <snippet-card v-for="snippet in orderedSnippets" :key="snippet.key" :snippet="snippet"></snippet-card>
  </div>
</template>
