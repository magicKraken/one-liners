import { web3 } from '@project-serum/anchor'
import { useWorkspace } from '@/composables'
import { Snippet } from '@/models'

// 1. Define the sendTweet endpoint.
export const sendSnippet = async (language, description, code) => {
    const { wallet, program } = useWorkspace()
  
    // 2. Generate a new Keypair for our new tweet account.
    const snippet = web3.Keypair.generate()

    // 3. Send a "SendTweet" instruction with the right data and the right accounts.
    await program.value.rpc.sendSnippet(language, description, code, {
        accounts: {
            author: wallet.value.publicKey,
            snippet: snippet.publicKey,
            systemProgram: web3.SystemProgram.programId,
        },
        signers: [snippet]
    })

    // 4. Fetch the newly created account from the blockchain.
    const snippetAccount = await program.value.account.snippet.fetch(snippet.publicKey)
    
    // 5. Wrap the fetched account in a Tweet model so our frontend can display it.
    return new Snippet(snippet.publicKey, snippetAccount)
}
