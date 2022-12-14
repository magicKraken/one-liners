use anchor_lang::prelude::*;

use instructions::*;

pub mod instructions;
pub mod state;

declare_id!("GxK3JBJA7KbczThpSAsNnqJBRFrELEctieJWRyvYhkMV");

#[program]
pub mod code_snippets {
    use super::*;

    pub fn send_snippet(
        ctx: Context<SendSnippet>,
        language: String,
        description: String,
        code: String
    ) -> Result<()> {
        instructions::snippet_actions::send_snippet(
            ctx,
            language,
            description,
            code
        )
    }
}
