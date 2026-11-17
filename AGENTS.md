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

## Sessions and tokens

Everything in a session (instructions, files read, command output) uses tokens and fills the
agent's context. Long sessions cost more and make the agent less accurate. Keep them short:

- **One job per session.** One stage step or one task, then finish. Start a fresh session for the
  next one; the files carry everything over.
- **Start from the files.** At the start of a session, read the stage line in `PLAN.md` and the
  current task in `TASKS.md`, not the whole history. Tell the developer where things stand in
  two or three lines.
- **Read only what you need.** Search for what you need, then read the relevant parts of a file
  instead of whole folders or large files. Don't re-read a file you just changed.
- **Keep output small.** Run commands with options that keep their output short (for example
  quiet or summary modes), and only show the developer the lines that matter.
- **Don't repeat work.** Don't re-explain what was settled, re-run a check that already passed
  with nothing changed since, or retry a failing command unchanged. Find the cause first.
- **Hand off before the session gets long.** If a task is too big for one session, or the session
  is getting long, stop at a working point. Commit and push the branch, and add a `Progress:` line
  under the task in `TASKS.md` saying what is done and what comes next. The next session continues
  from there.
- **Ask, don't loop.** If you are stuck after two attempts at the same problem, stop and tell the
  developer what you tried, instead of using up the session.
- **Keep the always-read files small.** `AGENTS.md` and `CLAUDE.md` load into every session, and
  `PLAN.md` and `TASKS.md` are read in most. Write them as short lines, not prose. Don't repeat
  one file in another; point to it. Keep `PLAN.md` under about a page. In `TASKS.md`, shrink each
  done task to its one checklist line; git history keeps the details.

## The four stages

Every product moves through **idea → plan → build → done**, and the developer goes through each
stage with you. At the start of each stage, tell them which stage they are in, what it is for,
what you will do, what they need to decide, and what comes next. At the end, say what was
produced and how to move on.

The first line of `PLAN.md` says which stage the product is in: `Stage: idea`, `Stage: plan`,
`Stage: build` or `Stage: done`. If there is no `PLAN.md` yet, the product is at the idea stage.
The stage line changes like this:

- `Stage: idea` when you create `PLAN.md` for the idea, on the `plan` branch.
- `Stage: plan` when you write the plan and `TASKS.md`, on the same branch. Its pull request is
  the plan the developer approves.
- `Stage: build` on the first build task's branch.
- `Stage: done` on the branch that makes the release.

In `TASKS.md`, each task is a checklist item (`- [ ]` open, `- [x]` done) with its title,
followed by `Done when:` and `Waits on:` lines (`Waits on: nothing` if it can start at once).

1. **Idea**: decide whether it is worth building. First ask the developer the questions you need
   to understand the idea: what problem it solves, who has that problem, how they deal with it
   today, and what the first version must do. Ask only what is unclear, a few questions at a
   time, and don't guess the answers. Then score it from 1 to 3 on each of these, with one line
   of reasoning per score, and record the scores and verdict in `PLAN.md`:
   - **Need**: 3 = people need it every day, 2 = every week, 1 = now and then.
   - **Users**: 3 = many people clearly have this problem today, 2 = a clear but small group,
     1 = unclear who would use it.
   - **Effort** to a solid first release: 3 = days, 2 = weeks, 1 = months.
   - **Risk**: 3 = little can go wrong, 2 = manageable (user data, uptime, store rules),
     1 = legal, money or reputation at stake.

   10 or more: **go**. 7 to 9: **park** (keep it, revisit later). Below 7: **drop**. The verdict
   is advice; the developer decides.
2. **Plan**: before writing the plan, settle the technology. Ask what the developer already
   knows and where the product must run (web, phone, desktop, command line). Then recommend one
   stack that fits the idea best: well known, free to start, simple to host, and suited to the
   developer's experience. Give one line of reasoning for each choice and name one alternative.
   Ask any remaining questions about scope. The developer chooses; record the stack and the
   reasons in `PLAN.md`. Then write the brief in `PLAN.md` (the problem, who it is for, what is
   out of scope, and how we will know it worked), and 3 to 10 tasks in `TASKS.md`, each a day or
   less, in order.
   Each task says how to check it is done ("Done when …") and which tasks it waits on. The first
   task should produce something usable on its own. **The developer approves the plan before any
   building starts.**
3. **Build**: take the first open task in `TASKS.md` whose `Waits on:` tasks are all done, and
   carry it through the workflow below. One task per session is a good rhythm.
4. **Done**: the product meets the definition of done below and has a release.

## Branch → pull request → CI → merge

`main` changes only by merging a pull request. Never commit or push to `main`. This includes
`PLAN.md` and `TASKS.md`: write the idea and the plan on a branch named `plan` and open a pull
request that the developer merges once they approve the plan. Make later stage changes and new
tasks on the current task's branch.

1. Update `main` (`git pull`) and create a branch named after the task.
2. Make the change, with tests for new behaviour.
3. Run the checks the repository names (README, CI workflow) and fix what fails. If it names none
   yet, run the tests or the app yourself, and say plainly that no automated checks exist.
4. Review the change with fresh eyes, using the repository's reviewer agent or skill if it has
   one, or by reading the whole diff yourself if not. Look for wrong behaviour against the task,
   crashes and unhandled errors, security problems (secrets, injection, missing permission
   checks), data loss, missing tests, duplication. Judge each "Done when" item as met or unmet.
   Fix what you find and review again, at most three rounds; if it is still not clean, stop and
   tell the developer what is unmet.
5. Tick the task in `TASKS.md` on this branch, so it is marked done when the pull request merges.
   Commit with a plain message that says what changed.
6. Push the branch and open a pull request that names the task, ticks each "Done when" item with
   where it is met, and lists anything to do on merge. If you can't push or open the pull request
   (no remote, or no GitHub CLI), give the developer the branch name and the pull request text,
   and tell them what is missing.
7. CI runs on the pull request. **The developer merges**, after CI passes. If the repository has
   no CI yet, the developer merges after reading the check results you reported.

## What "done" means

A task or product is done when it:

- works end to end for a real user, not just in a demo;
- handles errors and bad input;
- is tested, and the checks pass (and CI, once the repository has it);
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
