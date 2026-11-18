# 3. Build: one task at a time

The build stage repeats one loop until every task is done. Each pass takes one task from branch to
pull request, in one session.

**You run:** `/work-on-it` (or `/work-on-it <task>` to pick one).
**You get:** a pull request for one task, with tests, a review and the task ticked in `TASKS.md`.
**You decide:** whether to merge.

## The loop

1. **Start a fresh session** and run `/work-on-it`.
2. The agent pulls `main`, picks the first open task whose "Waits on" tasks are done, and tells
   you which one.
3. It creates a branch named after the task, builds it and adds tests for the new behaviour.
4. It runs the checks and asks the `reviewer` agent for a fresh-eyes review of the change, up to
   three rounds, fixing what the review confirms.
5. It ticks the task in `TASKS.md`, commits, pushes the branch and opens a pull request that
   lists the checks it ran. It waits for CI and tells you the result.
6. **You read the pull request and merge it** once the checks pass: the green ticks on GitHub if
   your product has CI, otherwise the check results the agent reports in the pull request.
7. Back to step 1 for the next task.

The first task also moves the stage in `PLAN.md` from `plan` to `build`.

## What the agent asks you

`.claude/settings.json` sets the guardrails:

- **On its own:** reading files, switching branches, staging, committing, pulling and merging
  `main` into a branch. These local steps can be undone; `AGENTS.md` keeps its commits off
  `main`, and `.gitignore` keeps `.env` files out of a normal `git add`.
- **Asks you first:** pushing, opening a pull request, merging and publishing, plus any other
  command, such as running tests or installing packages. Read each one and say yes when it fits
  the task, for example a push or a pull request from the agent's own task branch.
- **Never:** pushes to `main` or `master` (such as `git push origin main` or
  `git push origin HEAD:main`), force pushes, deleting remote branches, hard resets and `rm -r`
  (`git rm -r`, which git can undo, is allowed after a yes). Its file reader also can't open the
  common `.env` files that hold secrets (`.env.example` stays readable).

The rules match common command forms only, so still read what the agent asks to run. A bare
`git push` or `git push origin HEAD` while on `main` names no branch, so it still only asks:
say no unless the agent is on its own task branch. A ruleset on GitHub (README, "Make it yours")
blocks those too.

## Reading a pull request

You don't need to understand every line. Check that:

- the title names the task you expected;
- each **Done when** item is ticked and says where it is met;
- the **Review** section ends with a clean verdict;
- **On merge** lists nothing you haven't done (settings, environment variables);
- the checks passed: green ticks on GitHub with CI, or the results the agent reported without it.

If something is off, say so in the session or in a pull request comment, and the agent fixes it on
the same branch. To try the change yourself before merging, switch to the branch
(`git switch <branch>`) and run the app as the README says.

## Why one task per session

Everything in a session uses tokens and fills the agent's memory. A long session costs more and
makes the agent less accurate. The files are the memory instead: `PLAN.md` says where you are,
`TASKS.md` says what is next, and git keeps the rest. So:

- **Finish one task, then start a fresh session** (`/clear` in Claude Code).
- If a session gets long before the task is done, ask the agent to hand off. It commits, pushes the
  branch and writes a `Progress:` line under the task. The next `/work-on-it` continues from it.
- If you notice other work, ask the agent to add it to `TASKS.md` instead of doing it now.

## When you get stuck

- **The agent loops on the same error.** It should stop after two attempts and tell you what it
  tried. Read that, then decide: give it a hint, split the task, or skip it for now.
- **The review is not clean after three rounds.** The agent pushes the branch with a `Progress:`
  line saying what is unmet and opens no pull request. Fix it together in a new session, or change
  the task.
- **The task turns out wrong.** Stop at a working point and change the plan (see
  [2. Plan](02-plan.md#changing-the-plan-later)).
- **You merged something that doesn't fit.** Add a task that changes or reverts it. Never rewrite
  history on `main`.

## Next

When every task in `TASKS.md` is ticked, read [4. Ship](04-ship.md).
