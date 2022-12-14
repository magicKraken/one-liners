<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { fetchSnippets, languageFilter } from '@/api'
import { useSlug, useFromRoute } from '@/composables'
import SnippetList from '@/components/SnippetList'
import SnippetSearch from '@/components/SnippetSearch'

const router = useRouter()
const snippets = ref([])
const loading = ref(true)
const language = ref('')
const slugLanguage = useSlug(language)
const viewedLanguage = ref('')

const search = () => {
  router.push(`/languages/${slugLanguage.value}`)
}

const fetchLanguageSnippets = async () => {
  if (slugLanguage.value === viewedLanguage.value) return
  try {
    loading.value = true
    const fetchedSnippets = await fetchSnippets([languageFilter(slugLanguage.value)])
    snippets.value = fetchedSnippets
    viewedLanguage.value = slugLanguage.value
  } finally {
    loading.value = false
  }
}

useFromRoute((route) => {
  language.value = route.params.language
  if (language.value) {
    fetchLanguageSnippets()
  } else {
    snippets.value = []
    viewedLanguage.value = ''
  }
})
</script>

<template>
  <snippet-search placeholder="language" :disabled="! slugLanguage" :modelValue="slugLanguage" @update:modelValue="value => language = value" @search="search">
    <template #icon>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clip-rule="evenodd" />
      </svg>  
    </template>
  </snippet-search>
  <div v-if="viewedLanguage">
    <snippet-list :snippets="snippets" :loading="loading"></snippet-list>
    <div v-if="snippets.length === 0" class="p-8 text-gray-500 text-center">
      No snippets were found in this language...
    </div>
  </div>
</template>
