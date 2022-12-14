import { useWorkspace } from '@/composables'
import { Snippet } from '@/models'

export const getSnippet = async (publicKey) => {
  const { program } = useWorkspace()
  const account = await program.value.account.snippet.fetch(publicKey)
  return new Snippet(publicKey, account)
}
