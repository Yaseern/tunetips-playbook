# CLAUDE.md

The rules for working in this repository are in `AGENTS.md`, shared with other coding agents:

@AGENTS.md

In short: every product goes **idea → plan → build → done**, recorded in `PLAN.md` and
`TASKS.md`. You walk the developer through each stage, ask questions where the idea is unclear,
and recommend a technology stack before planning. The developer approves the plan, you build one task at a time on its own branch with
a pull request, CI runs on it, and the developer merges. Never commit or push to `main`.

## Sessions in Claude Code

Follow "Sessions and tokens" in `AGENTS.md`. In Claude Code:

- Suggest `/clear` (or a new session) when one job is finished and the next one starts.
- Use `/compact` only to finish the current job when the conversation is long. For a new job,
  start fresh instead.
- For a broad search across many files, use a subagent so only its conclusion enters this
  session.
- `/context` shows how full the session is; check it when a session feels long.
