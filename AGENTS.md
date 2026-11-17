# Agent instructions

You are helping one developer, often a beginner, build a real product: something people use
regularly, that works end to end, and that ships. Solid and reliable before feature-rich.
These rules apply to any coding agent working in this repository. Claude Code reads them through
`CLAUDE.md`.

## How to work

- **Keep it small.** Build the smallest useful thing. Add a library, service or piece of
  infrastructure only when a real need in the current task calls for it.
- **One task at a time.** Finish, review and open a pull request for one task before starting the
  next. If you notice other work, add it to `TASKS.md` as a new task instead of doing it now.
- **Reuse before you add.** Before adding a screen, route, table, component or helper, search the
  repository for an existing one and reuse or extend it.
- **The files are the memory.** `PLAN.md` and `TASKS.md` record the project. Read what the task
  needs from them, update them when something changes, and don't rely on earlier conversations.
- **Explain as you go.** The developer may be new to this. Say what you are about to do and why in
  plain words, and report what you did, including what failed or was skipped.

## The four stages

Every product moves through **idea → plan → build → done**. `PLAN.md` says which stage it is in.
If there is no `PLAN.md` yet, the product is at the idea stage: create `PLAN.md` when the
developer describes their idea, and `TASKS.md` when the plan is written.

1. **Idea**: decide whether it is worth building. Score it from 1 to 3 on each of these, with one
   line of reasoning per score:
   - **Need**: 3 = people need it every day, 2 = every week, 1 = now and then.
   - **Users**: 3 = many people clearly have this problem today, 2 = a clear but small group,
     1 = unclear who would use it.
   - **Effort** to a solid first release: 3 = days, 2 = weeks, 1 = months.
   - **Risk**: 3 = little can go wrong, 2 = manageable (user data, uptime, store rules),
     1 = legal, money or reputation at stake.

   10 or more: **go**. 7 to 9: **park** (keep it, revisit later). Below 7: **drop**. The verdict
   is advice; the developer decides.
2. **Plan**: write the brief in `PLAN.md` (the problem, who it is for, what is out of scope, and
   how we will know it worked), then 3 to 10 tasks in `TASKS.md`, each a day or less, in order.
   Each task says how to check it is done ("Done when …") and which tasks it waits on. The first
   task should produce something usable on its own. **The developer approves the plan before any
   building starts.**
3. **Build**: take the first task in `TASKS.md` that is ready and whose dependencies are done, and
   carry it through the workflow below. One task per session is a good rhythm.
4. **Done**: the product meets the definition of done below and has a release.

## Branch → pull request → CI → merge

`main` changes only by merging a pull request. Never commit or push to `main`.

1. Update `main` (`git pull`) and create a branch named after the task.
2. Make the change, with tests for new behaviour.
3. Run the checks the repository names (README, CI workflow) and fix what fails.
4. Review the change with fresh eyes: wrong behaviour against the task, crashes and unhandled
   errors, security problems (secrets, injection, missing permission checks), data loss, missing
   tests, duplication. Judge each "Done when" item as met or unmet. Fix what you find and review
   again, at most three rounds; if it is still not clean, stop and tell the developer what is
   unmet.
5. Commit with a plain message that says what changed.
6. Push the branch and open a pull request that names the task, ticks each "Done when" item with
   where it is met, and lists anything to do on merge.
7. CI runs on the pull request. **The developer merges**, after CI passes. Then mark the task done
   in `TASKS.md`.

## What "done" means

A task or product is done when it:

- works end to end for a real user, not just in a demo;
- handles errors and bad input;
- is tested, and the checks and CI pass;
- can be used by someone outside the team without help.

## Ask first

Ask the developer before anything outward-facing or hard to undo: merging, publishing or releasing,
deleting files or branches, force pushing, spending money, signing up for services, or contacting
people. Everything else inside the current task, do and report.

## Never

- Commit secrets (API keys, passwords, tokens) or put them in code. Use environment variables and
  keep them out of git.
- Commit or push to `main`, force push, or rewrite published history.
- Claim something works without having run it, or hide a failing check.
