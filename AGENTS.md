# Agent instructions

You are helping one developer, often a beginner, build a real product: something people use
regularly, that works end to end, and that ships. Solid and reliable before feature-rich.
These rules apply to any coding agent working in this repository. Claude Code reads them through
`CLAUDE.md`.

## How to work

- **Keep it small.** Build the smallest useful thing. Add a library, service or piece of
  infrastructure only when the current task needs it.
- **Reuse before you add.** Before adding a screen, route, table, component or helper, search the
  repository for an existing one and reuse or extend it.
- **Explain as you go.** The developer may be new to this. Say what you are about to do and why in
  plain words, and report what you did, including what failed or was skipped.
- **Ask, don't loop.** If you are stuck after two attempts at the same problem, stop and tell the
  developer what you tried.

## Sessions and tokens

Everything in a session (instructions, files read, command output) uses tokens and fills the
agent's context. Long sessions cost more and make the agent less accurate.

- **One job per session.** One stage step or one task, then finish. If you notice other work, add
  it to `TASKS.md` instead of doing it now. Start a fresh session for the next job.
- **The files are the memory.** Don't rely on earlier conversations. Start each session by
  reading the stage line in `PLAN.md` and the current task in `TASKS.md`, then tell the developer
  where things stand in two or three lines.
- **Read and print only what you need.** Search first, then read the relevant part of a file. Don't
  re-read a file you just changed. Use quiet or summary options on commands and show only the
  lines that matter.
- **Don't repeat work.** Don't re-explain what was settled, re-run a check that passed with
  nothing changed since, or retry a failing command unchanged.
- **Hand off before the session gets long.** Stop at a working point, commit and push the branch,
  and add a `Progress:` line under the task in `TASKS.md` saying what is done and what is next.
- **Keep the always-read files small.** This file, `CLAUDE.md`, `PLAN.md` and `TASKS.md` are read
  in most sessions. Write short lines, not prose. Say each thing once and point to it from
  elsewhere. Keep `PLAN.md` under about a page, and shrink each done task in `TASKS.md` to its
  checklist line; git history keeps the details.

## The four stages

Every product moves through **idea → plan → build → done**, and the developer goes through each
stage with you. At the start of a stage, tell them what it is for, what you will do, what they
need to decide, and what comes next. At the end, say what was produced.

The steps for each stage are in `.claude/skills/<name>/SKILL.md`. Claude Code runs them as
`/new-idea`, `/plan-it` and `/work-on-it`; other agents read and follow those files.

1. **Idea** (`/new-idea`): ask what is unclear, score the idea, and give a go, park or drop verdict.
   The developer decides.
2. **Plan** (`/plan-it`): agree on the technology with the developer, then write the brief in
   `PLAN.md` and the tasks in `TASKS.md`. **The developer approves the plan by merging its pull
   request, and nothing is built before that.**
3. **Build** (`/work-on-it`): one task per session, through the workflow below.
4. **Done** (`/work-on-it`, once every task is done): the product meets the definition of done
   below and has a release.

The first line of `PLAN.md` is the stage: `Stage: idea`, `plan`, `build` or `done`. No `PLAN.md`
means the idea stage. Each skill says when it changes the line.

Each task in `TASKS.md` looks like this:

```
- [ ] Task title
  Done when: how to check it
  Waits on: nothing (or the tasks it needs)
```

## Branch → pull request → CI → merge

`main` means the repository's default branch; if yours has another name, use that wherever
these files say `main`.

- Every change, including `PLAN.md` and `TASKS.md`, reaches `main` only by a merged pull request.
  The idea and the plan go on a branch named `plan`; each task goes on a branch named after it.
- Before opening a pull request, run the checks the repository names (README, CI workflow). If
  it names none yet, run the tests or the app yourself and say plainly that no automated checks
  exist. Then review the change with fresh eyes (the `reviewer` agent in `.claude/agents/`), at
  most three rounds.
- The pull request names the task, ticks each "Done when" with where it is met, and lists
  anything to do on merge. If you can't push or open it (no remote, or no GitHub CLI), give the
  developer the branch name and the pull request text, and say what is missing.
- **The developer merges** once CI passes, or, with no CI yet, after reading the check results
  you reported.

## What "done" means

A task or product is done when it:

- works end to end for a real user, not just in a demo;
- handles errors and bad input;
- is tested, and the checks pass (and CI, once the repository has it);
- can be used by someone outside the team without help.

## Ask first

Ask the developer before anything outward-facing or hard to undo: merging, publishing or
releasing, deleting files or branches, spending money, signing up for services, or contacting
people. Everything else inside the current job, do and report.

## Never

- Commit secrets (API keys, passwords, tokens) or put them in code. Use environment variables and
  keep them out of git.
- Commit or push to `main`, force push, or rewrite published history.
- Claim something works without having run it, or hide a failing check.
