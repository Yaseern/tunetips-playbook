---
name: plan-it
description: Agree on the technology and turn the idea in PLAN.md into a brief and a task list in TASKS.md, or change an existing plan, opened as a pull request for the developer to approve. Use when the developer says "plan it", "let's build this", "change the plan", an idea got a go, or the idea changed.
---

# Plan it

The plan stage: decide what to build and with what. Follow `AGENTS.md`; these are the steps.

1. **Check where things stand.**
   - Get onto the `plan` branch. Switch to `main` and run `git pull` (skip if there is no
     remote). If a `plan` branch exists, check whether its pull request was merged or closed
     (`gh pr list --head plan --state all`, or ask the developer). If it was, ask before
     deleting the branch, then create a fresh `plan` from `main`. If it is still open, or has no
     pull request yet (an idea not yet planned), continue on it and bring in what `main` gained
     since (`git merge --no-edit main`; on a conflict, stop and ask the developer); never
     delete it. With no `plan` branch, create it from `main`.
   - Read `PLAN.md` and `TASKS.md`, and pick the case:
     - **No `PLAN.md`**: the idea comes first. Suggest `/new-idea` and stop.
     - **No `TASKS.md` on `main`**: a first plan. Write or redraft it (steps 2 to 9).
     - **`TASKS.md` on `main` with open tasks**: a plan change. Ask what should change and why,
       unless an idea change on this branch already says. Done tasks stay as they are.
     - **`TASKS.md` on `main` with every task done**: a next version. It keeps the name, the idea
       and the stack and builds on the existing code.
2. **Open the stage.** Tell the developer which case this is, that you will agree on the
   technology and the tasks, and that they approve by merging the plan pull request.
3. **Settle the technology.** If the repository already has code, keep its stack unless the
   developer wants to change it. If `PLAN.md` already names a technology or platform, confirm it
   instead of asking again. Otherwise ask what they already know and where the product must run
   (web, phone, desktop, command line). Recommend one stack that fits the idea: well known,
   free to start, simple to host, suited to their experience. Give one line of reasoning per
   choice and name one alternative. They choose.
4. **Ask what is still unclear** about scope, at most three questions at a time, including how
   they will know it worked, unless they already said.
5. **Draft**, small enough to finish:
   - **Brief**: the problem, who it is for, what is out of scope, and how we will know it worked
     (measurable if possible).
   - **Tasks**: 3 to 10 open tasks, each a day or less, in order. The first produces something
     usable on its own; if there is no code yet, it sets the project up so it runs and has one
     passing test, and adds the test command to `.github/workflows/ci.yml`. Each task has a
     checkable `Done when:` about its own work, not about features later tasks add (check each
     one against the tasks before it: can it be met with only those?). When a task
     overlaps existing code, say whether it reuses, changes or removes it, and name it. If built
     work no longer fits the plan, add tasks to change or remove it, or to revert its pull
     request.
   - **Waits on**: only real blockers, not mere order.
6. **Show the draft** in one short message and wait for the developer's yes or changes: the brief
   and numbered tasks with what each waits on, or for a change, only what changes and why. Don't
   write files before the yes.
7. **Write it.** For a next version, first move `PLAN.md` and `TASKS.md` to `plans/v<N>/` (the
   next free number) and start a new `PLAN.md` with the name, idea and stack. Set `Stage: plan`,
   except for a plan change while `PLAN.md` says `Stage: build`, which keeps it. Write, below the
   idea and verdict:

   ```
   ## Stack
   - <choice>: <one-line reason>

   ## Brief
   - Problem: …
   - For: …
   - Out of scope: …
   - Success: …
   ```

   Write `TASKS.md` as `# Tasks` followed by the tasks in the format in `AGENTS.md`, keeping
   done tasks as they are. For a change or a next version, add a line under `## Changes` at the
   end of `PLAN.md`: `- Plan: <what changed and why>`.
8. **Open the plan pull request.** Commit with the message `Plan: <name>` (or `Plan change:
   <what>`), push the `plan` branch and open a pull request with the same title, with the brief
   and the task titles, or what changed, in its body. The plan needs no reviewer round: CI checks
   it and the developer reviews it by reading it.
9. **Close the stage** in at most three lines: the pull request link, that merging it approves the
   plan, and that `/work-on-it` in a fresh session continues with the first open task.
