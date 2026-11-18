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
- Example product in `examples/habit-streaks/`: a command-line habit tracker in Node.js with no
  dependencies, its finished `PLAN.md` and `TASKS.md`, and tests that CI runs.
- README step 4, "Make it yours": one pull request that removes the example, clears this
  changelog for the product and sets the license holder.

### Changed

- `AGENTS.md` keeps only the rules; the step-by-step for each stage moved into the skills.
- The README is the entry point, renamed to Tunetips Kit: what to install, making your own copy,
  and the path to the first task, with links into the guide.
- Gaps from a fresh-copy test run: the README sets the Git identity and says CI's checks need
  no local tools. The guardrails allow branch switching, commits and pulls, and ask before
  `gh pr create`. The skills now say:
  - `/new-idea`: ask whether the developer can reach the users, and note any technology for later.
  - `/plan-it`: merge `main` into an old `plan` branch, have the first task put its tests in CI,
    and skip the review for the plan pull request.
  - `/work-on-it`: report the checks in the pull request, wait for CI, keep global installs
    off the developer's machine, and replace the kit's README with the product's once it runs.
- What the agent may do on its own, asks about and may never do moved from the README to
  `docs/03-build.md`, so it stays once the product's README replaces the kit's. Skills and
  `AGENTS.md` refer to "Make it yours" by name, since the step removes itself.
