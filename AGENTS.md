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

The first line of `PLAN.md` is the stage: `Stage: idea`, `plan`, `build` or `done`. No `PLAN.md`
means the idea stage.

1. **Idea**: is it worth building? Ask what is unclear about the idea: the problem, who has it, how
   they deal with it today, and what the first version must do. Ask a few questions at a time and
   don't guess the answers. Then score it from 1 to 3 with one line of reasoning each:
   - **Need**: 3 = people need it every day, 2 = every week, 1 = now and then.
   - **Users**: 3 = many people clearly have this problem today, 2 = a clear but small group,
     1 = unclear who would use it.
   - **Effort** to a solid first release: 3 = days, 2 = weeks, 1 = months.
   - **Risk**: 3 = little can go wrong, 2 = manageable (user data, uptime, store rules),
     1 = legal, money or reputation at stake.

   10 or more: **go**. 7 to 9: **park** (revisit later). Below 7: **drop**. The verdict is advice;
   the developer decides. Create `PLAN.md` with `Stage: idea`, the scores and the verdict.
2. **Plan**: first settle the technology. Ask what the developer already knows and where the
   product must run (web, phone, desktop, command line). Recommend one stack that fits the idea:
   well known, free to start, simple to host, suited to their experience. Give one line of
   reasoning per choice and name one alternative. The developer chooses. Then, in `PLAN.md`, set
   `Stage: plan` and write the stack, the problem, who it is for, what is out of scope, and how we
   will know it worked. In `TASKS.md`, write 3 to 10 tasks in order, each a day or less, the first
   one usable on its own:

   ```
   - [ ] Task title
     Done when: how to check it
     Waits on: nothing (or the tasks it needs)
   ```

   Idea and plan go on a branch named `plan`. Its pull request is the plan: **the developer
   approves it by merging, and nothing is built before that.**
3. **Build**: take the first open task whose `Waits on:` tasks are all done and carry it through
   the workflow below. The first build task's branch sets `Stage: build`.
4. **Done**: the product meets the definition of done below and has a release. The release branch
   sets `Stage: done`.

## Branch → pull request → CI → merge

Every change, including `PLAN.md` and `TASKS.md`, reaches `main` only by a merged pull request.

1. Update `main` (`git pull`) and create a branch named after the task.
2. Make the change, with tests for new behaviour.
3. Run the checks the repository names (README, CI workflow) and fix what fails. If it names none
   yet, run the tests or the app yourself, and say plainly that no automated checks exist.
4. Review the change with fresh eyes, using the repository's reviewer agent or skill if it has
   one, or by reading the whole diff yourself if not. Look for wrong behaviour against the task,
   crashes and unhandled errors, security problems (secrets, injection, missing permission
   checks), data loss, missing tests, duplication. Judge each "Done when" as met or unmet. Fix
   and review again, at most three rounds; if still not clean, stop and tell the developer what
   is unmet.
5. Tick the task in `TASKS.md` on this branch, so it is marked done when the pull request merges.
   Commit with a plain message that says what changed.
6. Push the branch and open a pull request that names the task, ticks each "Done when" with where
   it is met, and lists anything to do on merge. If you can't push or open it (no remote, or no
   GitHub CLI), give the developer the branch name and the pull request text, and say what is
   missing.
7. CI runs on the pull request. **The developer merges** once CI passes, or, with no CI yet, after
   reading the check results you reported.

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
