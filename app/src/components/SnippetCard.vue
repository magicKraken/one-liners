<script setup>
import { toRefs, computed } from 'vue'
import { useWorkspace } from '@/composables'

const props = defineProps({
    snippet: Object,
})

const { snippet } = toRefs(props)
const { wallet } = useWorkspace()
const authorRoute = computed(() => {
  if (wallet.value && wallet.value.publicKey.toBase58() === snippet.value.author.toBase58()) {
    return { name: 'Profile' }
  } else {
    return { name: 'Users', params: { author: snippet.value.author.toBase58() } }
  }
})
</script>

<template>
  <div class="px-8 py-4">
    <div>
      <h3 class="inline" :title="snippet.author">
        <router-link :to="authorRoute" class="hover:underline">
          {{ snippet.author_display }}
        </router-link>
      </h3>
      <span class="text-gray-500"> • </span>
      <time class="text-gray-500 text-sm" :title="snippet.created_at">
        <router-link :to="{ name: 'Snippet', params: { snippet: snippet.publicKey.toBase58() } }" class="hover:underline">
          {{ snippet.created_ago }}
        </router-link>
      </time>
      <h2 class="font-semibold text-lg">{{ snippet.description }}</h2>
    </div>
    <router-link v-if="snippet.language" :to="{ name: 'Languages', params: { language: snippet.language } }" class="inline-block mt-2 text-gray-500 hover:underline">
      #{{ snippet.language }}
    </router-link>
    <div class="bg-black rounded-lg p-4 mt-4">
      <p class="text-white " v-text="snippet.code"></p>
    </div>
  </div>
</template>
