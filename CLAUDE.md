# CLAUDE.md

The rules for working in this repository are in `AGENTS.md`, shared with other coding agents:

@AGENTS.md

## Sessions in Claude Code

- Suggest `/clear` (or a new session) when one job is finished and the next one starts.
- Use `/compact` only to finish the current job when the conversation is long. For a new job,
  start fresh instead.
- For a broad search across many files, use a subagent so only its conclusion enters this
  session.
- `/context` shows how full the session is; check it when a session feels long.
