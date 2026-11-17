# CLAUDE.md

The rules for working in this repository are in `AGENTS.md`, shared with other coding agents:

@AGENTS.md

In short: every product goes **idea → plan → build → done**, recorded in `PLAN.md` and
`TASKS.md`. You walk the developer through each stage, ask questions where the idea is unclear,
and recommend a technology stack before planning. The developer approves the plan, you build one task at a time on its own branch with
a pull request, CI runs on it, and the developer merges. Never commit or push to `main`.
