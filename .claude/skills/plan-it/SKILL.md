---
name: plan-it
description: Agree on the technology, then turn the idea in PLAN.md into a short brief and a task list in TASKS.md, opened as a pull request for the developer to approve. Use when the developer says "plan it", "let's build this", or an idea got a go.
---

# Plan it

The plan stage: decide what to build first and with what. Follow `AGENTS.md`; these are the
steps.

1. **Check where things stand.** Read `PLAN.md`. On `main`, run `git pull` (skip if there is no
   remote), then switch to the `plan` branch, creating it from `main` if it doesn't exist.
   - No `PLAN.md`: the idea comes first. Suggest `/new-idea` and stop.
   - `Stage: build` or `Stage: done`, and the developer wants a next version: move `PLAN.md` and
     `TASKS.md` to `plans/v<N>/` (the next free number), then start a new `PLAN.md` that keeps the
     product name, the idea and the stack. The new plan builds on the code that exists.
2. **Open the stage.** Tell the developer: this is the plan stage, you will agree on the
   technology and the first tasks, they approve the plan by merging its pull request, and then
   building starts.
3. **Settle the technology.** If the repository already has code, keep its stack unless the
   developer wants to change it. Otherwise ask what they already know and where the product must
   run (web, phone, desktop, command line). Recommend one stack that fits the idea: well known,
   free to start, simple to host, suited to their experience. Give one line of reasoning per
   choice and name one alternative. They choose.
4. **Ask what is still unclear** about scope, at most three questions at a time.
5. **Draft**, small enough to finish:
   - **Brief**: the problem, who it is for, what is out of scope, and how we will know it worked
     (measurable if possible).
   - **Tasks**: 3 to 10, each a day or less, in order. The first produces something usable on its
     own; if there is no code yet, it sets the project up so it runs and has one passing test.
     Each task has a checkable `Done when:`. When a task overlaps existing code, say whether it
     reuses or replaces it, and name it.
   - **Waits on**: only real blockers, not mere order.
6. **Show the draft** (brief and numbered tasks, each with what it waits on) in one short message
   and wait for the developer's yes or changes. Don't write files before the yes.
7. **Write it.** In `PLAN.md`, set `Stage: plan` and add, below the idea and verdict:

   ```
   ## Stack
   - <choice>: <one-line reason>

   ## Brief
   - Problem: …
   - For: …
   - Out of scope: …
   - Success: …
   ```

   Write `TASKS.md` as `# Tasks` followed by the tasks in the format in `AGENTS.md`.
8. **Open the plan pull request.** Commit with the message `Plan: <name>`, push the `plan` branch
   and open a pull request titled `Plan: <name>`, with the brief and the task titles in its body.
9. **Close the stage** in at most three lines: the pull request link, that merging it approves the
   plan, and that `/work-on-it` in a fresh session starts the first task.
