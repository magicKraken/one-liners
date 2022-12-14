use anchor_lang::prelude::*;

// Define the structure of the Snippet account.
#[account]
pub struct Snippet {
    pub author: Pubkey,
    pub timestamp: i64,
    pub language: String,
    pub description: String,
    pub code: String,
}

// Add a constant of the Snippet account that provides its total size.
impl Snippet {
    pub const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.
        + TIMESTAMP_LENGTH // Timestamp.
        + STRING_LENGTH_PREFIX + MAX_LANGUAGE_LENGTH // Language.
        + STRING_LENGTH_PREFIX + MAX_DESCRIPTION_LENGTH // Description.
        + STRING_LENGTH_PREFIX + MAX_CODE_LENGTH; // Code.
}

// Add some useful constants for sizing properties.
const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.
const MAX_LANGUAGE_LENGTH: usize = 50 * 4; // 50 chars max.
const MAX_DESCRIPTION_LENGTH: usize = 100 * 4; // 50 chars max.
const MAX_CODE_LENGTH: usize = 500 * 4; // 280 chars max.
