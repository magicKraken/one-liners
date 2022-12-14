<script setup>
import { ref } from 'vue'
import { fetchSnippets } from '@/api'
import SnippetForm from '@/components/SnippetForm'
import SnippetList from '@/components/SnippetList'

const snippets = ref([])
const loading = ref(true)

fetchSnippets()
  .then(fetchedSnippets => snippets.value = fetchedSnippets)
  .finally(() => loading.value = false)

const addSnippet = snippet => snippets.value.push(snippet)
</script>

<template>
  <snippet-form @added="addSnippet"></snippet-form>
  <snippet-list :snippets="snippets" :loading="loading"></snippet-list>
</template>
