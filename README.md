# Tunetips Playbook

A starter kit for building a real product with an AI coding agent, from your first idea to a
release that people use.

You work through four stages, and the agent walks you through each one:

1. **[Idea](docs/01-idea.md)**: decide whether it's worth building.
2. **[Plan](docs/02-plan.md)**: write a short brief and a list of small tasks.
3. **[Build](docs/03-build.md)**: one task at a time, each on a branch with a pull request and a
   review.
4. **[Ship](docs/04-ship.md)**: it works end to end, it's tested, and someone else can use it
   without your help.

> Work in progress. See [CHANGELOG.md](CHANGELOG.md) for what each version contains.

## Getting started

### 1. Install

- **[Git](https://git-scm.com/downloads)**, and a free **[GitHub](https://github.com/signup)**
  account.
- **[GitHub CLI](https://cli.github.com/)**, then sign in with `gh auth login`. The agent uses it
  to open pull requests. Without it, the agent gives you the pull request text to paste on GitHub.
- **A coding agent.** The kit is made for
  **[Claude Code](https://docs.claude.com/en/docs/claude-code/setup)**, where each stage is a
  slash command. Other agents read `AGENTS.md` and can follow the same steps from
  `.claude/skills/`.

Check that each works: `git --version`, `gh auth status`, `claude --version`.

On a new Git install, tell Git who you are once, or your first commit fails:

```
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

CI runs the repository's own checks on GitHub, so you don't need their tools (`jq`, Python)
on your computer.

### 2. Make your own copy

One copy of the kit holds one product.

1. On this repository's GitHub page, click **Use this template** → **Create a new repository**.
   Name it after your product (you can rename it later) and make it private if you like. A
   template copy starts with a clean history and can be made again for each new product, which
   a fork can't.
2. Clone your copy and go into it:

   ```
   gh repo clone <your-name>/<your-repo>
   cd <your-repo>
   ```

### 3. Open it with your agent

Run `claude` in the repository folder. The agent reads `CLAUDE.md` and `AGENTS.md` on its own,
so you don't need to explain the rules.

`.claude/settings.json` sets the guardrails: what the agent does on its own, what it asks you
about, and what it may never do. Read
[What the agent asks you](docs/03-build.md#what-the-agent-asks-you) before you start, so you
know when to say yes.

### 4. Make it yours

Your copy still holds the kit's example product, the kit's changelog and the kit's name in the
license. Clear them out in one pull request before your first idea, so the copy holds only your
product. You can ask your agent: "Do the Make it yours step in the README". Asking approves the deletions,
and it still asks before pushing. By hand:

1. Create the branch: `git switch -c make-it-yours`.
2. Delete the example: `git rm -r examples`.
3. In `.github/workflows/ci.yml`, delete the comment that starts `# Example product` and the two
   steps under it (`actions/setup-node` and `Example product tests`).
4. In this README, delete this step (`### 4. Make it yours`), renumber `### 5. Your first task`
   to 4, and delete the section `## The example product` and the `examples/` row in
   **What's inside**.
5. In `CHANGELOG.md`, keep the title, the intro and `## [Unreleased]`, and delete everything
   below it. From now on it records your product's versions.
6. In `LICENSE`, replace `Tunetips` with your name, or choose another license. An agent doing
   this step asks which name to use.
7. Commit with the message `Make the kit copy my own`, push (`git push -u origin make-it-yours`)
   and open a pull request:
   `gh pr create --fill`. No task goes with it. CI should pass; then merge it.
8. Back on your computer, return to the updated `main`: `git switch main`, then `git pull`.

Nothing else in the repository refers to `examples/`.

### 5. Your first task

1. **Idea.** Run `/new-idea` and describe what you want to build. Answer its questions; it scores
   the idea and gives a go, park or drop. See [1. Idea](docs/01-idea.md).
2. **Plan.** On a go, start a fresh session (`/clear`) and run `/plan-it`. Choose the technology
   with the agent, agree on the tasks, then **merge the plan pull request** on GitHub to approve
   it. See [2. Plan](docs/02-plan.md).
3. **Build.** Start a fresh session and run `/work-on-it`. The agent takes the first task, builds
   it on a branch and opens a pull request. Read it and merge it. That's your first task done.
   Repeat for each task. See [3. Build](docs/03-build.md).
4. **Ship.** When every task is done, `/work-on-it` checks the product against "done" and prepares
   the release. See [4. Ship](docs/04-ship.md).

With another agent, ask it to follow `.claude/skills/new-idea/SKILL.md` (then `plan-it`,
`work-on-it`) instead of the slash commands.

## The example product

[`examples/habit-streaks/`](examples/habit-streaks/) is a tiny finished product built with the
kit: a command-line habit tracker in Node.js with tests. Its `PLAN.md` and `TASKS.md` show what
your own will look like by the end, and CI runs its tests. Remove it in
[step 4, Make it yours](#4-make-it-yours).

## What's inside

| File | What it is |
|---|---|
| [`docs/`](docs/) | The guide: one page per stage. |
| [`AGENTS.md`](AGENTS.md) | The rules every coding agent follows here: stages, workflow, what "done" means. |
| [`CLAUDE.md`](CLAUDE.md) | Points Claude Code at `AGENTS.md`, plus tips for Claude Code sessions. |
| [`.claude/skills/`](.claude/skills/) | `/new-idea`, `/plan-it` and `/work-on-it`: the steps of each stage. |
| [`.claude/agents/reviewer.md`](.claude/agents/reviewer.md) | A fresh-eyes reviewer the agent runs before each pull request. |
| [`.claude/settings.json`](.claude/settings.json) | Guardrails: what Claude Code may do freely, must ask about, or may never do. |
| [`.github/workflows/ci.yml`](.github/workflows/ci.yml) | CI: checks every pull request. Add your product's tests to it. |
| [`examples/`](examples/) | The example product. Remove it before you start yours (step 4). |
| [`CHANGELOG.md`](CHANGELOG.md) | What changed in each version. |

Your product adds two files as you go: `PLAN.md` (stage, idea, stack, brief) and `TASKS.md` (the
tasks). Once your product has its own README content, replace this one with it, keeping a link
to the guide if you like.

## License

[MIT](LICENSE)
