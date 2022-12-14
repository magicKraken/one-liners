import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { CodeSnippets } from "../target/types/code_snippets";
import * as assert from "assert";
import * as bs58 from "bs58";

describe("code-snippets", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.CodeSnippets as Program<CodeSnippets>;

  it("can send a new snippet", async () => {
    // Call the "SendSnippet" instruction.
    const snippet = anchor.web3.Keypair.generate();

    await program.rpc.sendSnippet('Ruby', 'Check object is nil', 'my_object.nil?', {
      accounts: {
        snippet: snippet.publicKey,
        author: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [snippet],
    });

    // Fetch the account details of the created snippet.
    const snippetAccount = await program.account.snippet.fetch(snippet.publicKey);

    // Ensure it has the right data.
    assert.equal(snippetAccount.author.toBase58(), program.provider.wallet.publicKey.toBase58());
    assert.equal(snippetAccount.language, 'Ruby');
    assert.equal(snippetAccount.description, 'Check object is nil');
    assert.equal(snippetAccount.code, 'my_object.nil?');
    assert.ok(snippetAccount.timestamp);
  });

  it("can send a new snippet without a language", async () => {
    // Call the "SendSnippet" instruction.
    const snippet = anchor.web3.Keypair.generate();

    await program.rpc.sendSnippet('', 'Check object is nil', 'my_object.nil?', {
      accounts: {
        snippet: snippet.publicKey,
        author: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [snippet],
    });

    // Fetch the account details of the created snippet.
    const snippetAccount = await program.account.snippet.fetch(snippet.publicKey);

    // Ensure it has the right data.
    assert.equal(snippetAccount.author.toBase58(), program.provider.wallet.publicKey.toBase58());
    assert.equal(snippetAccount.language, '');
    assert.equal(snippetAccount.description, 'Check object is nil');
    assert.equal(snippetAccount.code, 'my_object.nil?');
    assert.ok(snippetAccount.timestamp);
  });

  it("can send a new snippet from a different author", async () => {
    // Generate another user and airdrop them some SOL.
    const otherUser = anchor.web3.Keypair.generate();
    const signature = await program.provider.connection.requestAirdrop(otherUser.publicKey, 1000000000);
    await program.provider.connection.confirmTransaction(signature);

    // Call the "SendSnippet" instruction.
    const snippet = anchor.web3.Keypair.generate();
    await program.rpc.sendSnippet('JS', 'Array length', 'myArray.length()', {
      accounts: {
        snippet: snippet.publicKey,
        author: otherUser.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [otherUser, snippet],
    });

    // Fetch the account details of the created snippet.
    const snippetAccount = await program.account.snippet.fetch(snippet.publicKey);

    // Ensure it has the right data.
    assert.equal(snippetAccount.author.toBase58(), otherUser.publicKey.toBase58());
    assert.equal(snippetAccount.language, 'JS');
    assert.equal(snippetAccount.description, 'Array length');
    assert.equal(snippetAccount.code, 'myArray.length()');
    assert.ok(snippetAccount.timestamp);
  });

  it("cannot provide a language with more than 50 characters", async () => {
    try {
      const snippet = anchor.web3.Keypair.generate();
      const languageWith51Chars = 'x'.repeat(51);
      await program.rpc.sendSnippet(languageWith51Chars, 'Array length', 'myArray.length()', {
        accounts: {
          snippet: snippet.publicKey,
          author: program.provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [snippet],
      });
    } catch (error) {
      assert.equal(error.error.errorMessage, 'The provided language should be 50 characters long maximum.');
      return;
    }

    assert.fail('The instruction should have failed with a 51-character language.');
  });

  it("cannot provide a description with more than 100 characters", async () => {
    try {
      const snippet = anchor.web3.Keypair.generate();
      const descriptionWith101Chars = 'x'.repeat(101);
      await program.rpc.sendSnippet('JS', descriptionWith101Chars, 'myArray.length()', {
        accounts: {
          snippet: snippet.publicKey,
          author: program.provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [snippet],
      });
    } catch (error) {
      assert.equal(error.error.errorMessage, 'The provided description should be 100 characters long maximum.');
      return;
    }

    assert.fail('The instruction should have failed with a 101-character description.');
  });

  it("cannot provide a code with more than 500 characters", async () => {
    try {
      const snippet = anchor.web3.Keypair.generate();
      const codeWith501Chars = 'x'.repeat(501);
      await program.rpc.sendSnippet('JS', 'Array length', codeWith501Chars, {
        accounts: {
          snippet: snippet.publicKey,
          author: program.provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [snippet],
      });
    } catch (error) {
      assert.equal(error.error.errorMessage, 'The provided code should be 500 characters long maximum.');
      return;
    }

    assert.fail('The instruction should have failed with a 501-character code.');
  });

  it('can fetch all the snippets', async () => {
    const snippetAccounts = await program.account.snippet.all();
    assert.equal(snippetAccounts.length, 3);
  });

  it('can filter snippets by author', async () => {
    const authorPublicKey = program.provider.wallet.publicKey;
    const snippetAccounts = await program.account.snippet.all([
      {
        memcmp: {
          offset: 8, // Discriminator.
          bytes: authorPublicKey.toBase58(),
        }
      }
    ]);

    assert.equal(snippetAccounts.length, 2);
    assert.ok(snippetAccounts.every(snippetAccount => {
      return snippetAccount.account.author.toBase58() === authorPublicKey.toBase58();
    }));
  });

  it('can filter snippets by language', async () => {
    const snippetAccounts = await program.account.snippet.all([
      {
        memcmp: {
          offset: 8 + // Discriminator.
            32 + // Author public key.
            8 + // Timestamp.
            4, // Language string prefix.
          bytes: bs58.encode(Buffer.from('Ruby')),
        }
      }
    ]);

    assert.equal(snippetAccounts.length, 1);
    assert.ok(snippetAccounts.every(snippetAccount => {
      return snippetAccount.account.language === 'Ruby'
    }));
  });
});
