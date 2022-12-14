<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { fetchSnippets, authorFilter } from '@/api'
import { useFromRoute } from '@/composables'
import SnippetList from '@/components/SnippetList'
import SnippetSearch from '@/components/SnippetSearch'

// Data.
const router = useRouter()
const snippets = ref([])
const loading = ref(true)
const author = ref('')
const viewedAuthor = ref('')

// Actions.
const search = () => {
    router.push(`/users/${author.value}`)
}

const fetchAuthorSnippets = async () => {
  if (author.value === viewedAuthor.value) return
  try {
    loading.value = true
    const fetchedSnippets = await fetchSnippets([authorFilter(author.value)])
    snippets.value = fetchedSnippets
    viewedAuthor.value = author.value
  } finally {
    loading.value = false
  }
}

// Router hooks.
useFromRoute((route) => {
  author.value = route.params.author
  if (author.value) {
    fetchAuthorSnippets()
  } else {
    snippets.value = []
    viewedAuthor.value = ''
  }
})
</script>

<template>
  <snippet-search placeholder="public key" :disabled="! author" v-model="author" @search="search">
    <template #icon>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    </template>
  </snippet-search>
  <div v-if="viewedAuthor">
    <snippet-list :snippets="snippets" :loading="loading"></snippet-list>
    <div v-if="snippets.length === 0" class="p-8 text-gray-500 text-center">
      User not found...
    </div>
  </div>
</template>
