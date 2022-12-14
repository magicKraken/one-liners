<script setup>
import { computed, ref, toRefs } from 'vue'
import { useAutoresizeTextarea, useCountCharacterLimit, useSlug } from '@/composables'
import { sendSnippet } from '@/api'
import { useWallet } from 'solana-wallets-vue'

// Props.
const props = defineProps({
  forcedLanguage: String,
})
const { forcedLanguage } = toRefs(props)

// Form data.
const language = ref('')
const description = ref('')
const code = ref('')
const slugLanguage = useSlug(language)
const effectiveLanguage = computed(() => forcedLanguage.value ?? slugLanguage.value)

// Auto-resize the content's textarea.
const textarea = ref()
useAutoresizeTextarea(textarea)

// Character limit / count-down.
const characterLimit = useCountCharacterLimit(code, 500)
const characterLimitColour = computed(() => {
  if (characterLimit.value < 0) return 'text-red-500'
  if (characterLimit.value <= 10) return 'text-yellow-500'
  return 'text-gray-400'
})

// Permissions.
const { connected } = useWallet()
const canSnippet = computed(() => code.value && characterLimit.value > 0)

// Actions.
const emit = defineEmits(['added'])
const send = async () => {
  if (! canSnippet.value) return
  const snippet = await sendSnippet(effectiveLanguage.value, description.value, code.value)
  emit('added', snippet)
  language.value = ''
  description.value = ''
  code.value = ''
}
</script>

<template>
  <div v-if="connected" class="px-8 py-4 border-b">
    <textarea
      ref="textarea"
      rows="1"
      class="text-lg w-full focus:outline-none resize-none mb-3"
      placeholder="Enter description..."
      v-model="description"
    ></textarea>
  </div>
  <div v-if="connected" class="px-8 py-4 border-b">
    <textarea
      ref="textarea"
      rows="1"
      class="text-lg w-full focus:outline-none resize-none mb-3"
      placeholder="Write your one-liner snippet..."
      v-model="code"
    ></textarea>
    <div class="flex flex-wrap items-center justify-between -m-2">
      <div class="relative m-2 mr-4">
        <input
          type="text"
          placeholder="language"
          class="text-gray-500 rounded-full pl-10 pr-4 py-2 bg-gray-100"
          :value="effectiveLanguage"
          :disabled="forcedLanguage"
          @input="language = $event.target.value"
        >
        <div class="absolute left-0 inset-y-0 flex pl-3 pr-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 m-auto" :class="effectiveTopic ? 'text-gray-500' : 'text-gray-400'" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
      <div class="flex items-center space-x-6 m-2 ml-auto">
        <div :class="characterLimitColour">
          {{ characterLimit }} left
        </div>
        <button
          class="text-white px-4 py-2 rounded-full font-semibold" :disabled="! canSnippet"
          :class="canSnippet ? 'bg-black' : 'bg-gray-300 cursor-not-allowed'"
          @click="send"
        >
          Snip!
        </button>
      </div>
    </div>
  </div>

  <div v-else class="px-8 py-4 bg-gray-50 text-gray-500 text-center border-b">
    Connect your wallet to start snipping...
  </div>
</template>
