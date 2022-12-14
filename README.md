# One-Liners Solana Dapp
Simple Solana Dapp to publish one-line snippets for your favorite languages.

![One-Liners Preview](https://github.com/jferrer/one-liners/blob/main/app/src/assets/one-liner-preview.png?raw=true)

## How it works
Every Snippet is saved on-chain as a Solana Account.

The User connects a Wallet to pay the necessary fee to store the Account on the blockchain.

## Usage

### Clone repo
```
git clone https://github.com/jferrer/one-liners
```

### Build
```
cd one-liners
anchor build
```

### Deploy on Localhost

Config localhost:
```
solana config set --url localhost OR solana config set -rl
```

Deploy:
```
anchor deploy
```

### Run Dapp

Run Solana Test Validator in a different Terminal:
```
solana-test-validator OR solana-test-validator --reset (to reset data)
```

Run Vue app:
```
cd app
yarn serve
```

## Publish a Snippet

- Connect your wallet
- Copy Public Key and get some SOL

```
solana airdrop 1000 <your-public-key>
```

## Resources

Followed and adapted [Create a Solana dApp from scratch](https://lorisleiva.com/create-a-solana-dapp-from-scratch) tutorial.
