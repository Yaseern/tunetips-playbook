# Changelog

All notable changes to this project are recorded here. Versions follow
[Semantic Versioning](https://semver.org/), and the format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- `AGENTS.md` and `CLAUDE.md`: how the agent works, keeping sessions short and token use low, the
  idea → plan → build → done stages, what "done" means, and the branch → pull request → CI →
  merge workflow.
- Skills `/new-idea`, `/plan-it` and `/work-on-it` in `.claude/skills/`, which run each stage
  from `PLAN.md` and `TASKS.md`, and a `reviewer` agent in `.claude/agents/`.
- Changing course: the idea or plan can change during planning or building through `/new-idea`
  and `/plan-it`, recorded under `## Changes` in `PLAN.md`; built work that no longer fits is
  changed or reverted by new tasks.
- Learning as you go: lessons go into Project notes in `AGENTS.md`, `PLAN.md` or the README in
  the same pull request.
- Guide for beginners in `docs/`, one page per stage: judging an idea, the plan format, the build
  loop, and a release checklist.
- CI workflow in `.github/workflows/ci.yml`: on every pull request it checks that JSON files are
  valid and that links between Markdown files resolve, with a place to add the product's tests.
- Guardrail settings in `.claude/settings.json`: the agent may read freely, asks before pushing,
  merging or publishing, and is blocked from force pushes, deleting remote branches, hard resets
  and recursive deletes; its file reader can't open the common `.env` files that hold secrets.

### Changed

- `AGENTS.md` keeps only the rules; the step-by-step for each stage moved into the skills.
- The README is the entry point, renamed to Tunetips Kit: what to install, making your own copy,
  and the path to the first task, with links into the guide.
