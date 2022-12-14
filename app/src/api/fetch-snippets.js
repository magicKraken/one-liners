import { useWorkspace } from '@/composables'
import { Snippet } from '@/models'
import bs58 from 'bs58'

export const fetchSnippets = async (filters = []) => {
  const { program } = useWorkspace()
  const snippets = await program.value.account.snippet.all(filters)
  return snippets.map(snippet => new Snippet(snippet.publicKey, snippet.account))
}

export const authorFilter = authorBase58PublicKey => ({
  memcmp: {
    offset: 8, // Discriminator.
    bytes: authorBase58PublicKey,
  }
})

export const languageFilter = language => ({
  memcmp: {
    offset: 8 + // Discriminator.
      32 + // Author public key.
      8 + // Timestamp.
      4, // Language string prefix.
    bytes: bs58.encode(Buffer.from(language)),
  }
})
