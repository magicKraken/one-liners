use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;

use crate::state::Snippet;

pub fn send_snippet(ctx: Context<SendSnippet>, language: String, description: String, code: String) -> Result<()> {
    let snippet: &mut Account<Snippet> = &mut ctx.accounts.snippet;
    let author: &Signer = &ctx.accounts.author;
    let clock: Clock = Clock::get().unwrap();

    if language.chars().count() > 50 {
        return Err(error!(ErrorCode::LanguageTooLong));
    }

    if description.chars().count() > 100 {
        return Err(error!(ErrorCode::DescriptionTooLong));
    }

    if code.chars().count() > 500 {
        return Err(error!(ErrorCode::CodeTooLong));
    }

    snippet.author = *author.key;
    snippet.timestamp = clock.unix_timestamp;
    snippet.language = language;
    snippet.description = description;
    snippet.code = code;

    Ok(())
}

#[derive(Accounts)]
pub struct SendSnippet<'info> {
    #[account(init, payer = author, space = Snippet::LEN)]
    pub snippet: Account<'info, Snippet>,
    #[account(mut)]
    pub author: Signer<'info>,
    #[account(address = system_program::ID)]
    /// CHECK: This is not dangerous as this is the system program
    pub system_program: AccountInfo<'info>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("The provided language should be 50 characters long maximum.")]
    LanguageTooLong,
    #[msg("The provided description should be 100 characters long maximum.")]
    DescriptionTooLong,
    #[msg("The provided code should be 500 characters long maximum.")]
    CodeTooLong,
}
