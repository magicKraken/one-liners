import { computed } from 'vue'
import { useAnchorWallet } from 'solana-wallets-vue'
import { Connection, PublicKey } from '@solana/web3.js'
import { Program, AnchorProvider } from '@project-serum/anchor'
import idl from '../../../target/idl/code_snippets.json'

const preflightCommitment = 'processed'
const commitment = 'processed'
const programID = new PublicKey(idl.metadata.address)
let workspace = null

export const useWorkspace = () => workspace

export const initWorkspace = () => {
  const wallet = useAnchorWallet()
  const connection = new Connection('http://127.0.0.1:8899', commitment)
  // const provider = computed(() => new Provider(connection, wallet))
  // const provider = computed(() => new AnchorProvider(connection, wallet.**publicKey**))
  // const provider = computed(() => new AnchorProvider(connection, 'Eg2SAgUB5VsNdcSMggLpyrvqcBqJBwmBUNC6e4XC7LPv'))
  const provider = computed(() => new AnchorProvider(connection, wallet.value, { preflightCommitment, commitment }))
  const program = computed(() => new Program(idl, programID, provider.value))

  workspace = {
    wallet,
    connection,
    provider,
    program,
  }
}
