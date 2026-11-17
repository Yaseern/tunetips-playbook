# 2. Plan: what to build, and with what

A plan turns the idea into a short brief and a list of small tasks. Small tasks are what make
building with an agent work: each one fits in a single session, is easy to review, and leaves the
product working.

**You run:** `/plan-it`.
**You get:** a pull request from the `plan` branch with `PLAN.md` (stack and brief) and
`TASKS.md` (the tasks).
**You decide:** the technology, the scope, and whether to approve. **Merging the pull request
approves the plan.** Nothing is built before that.

## What happens

1. **Technology.** The agent asks what you already know and where the product must run (web,
   phone, desktop, command line). It recommends one stack, with a reason for each choice and one
   alternative. You choose. Prefer what you know, what is free to start and what is simple to
   host.
2. **Scope.** It asks what is still unclear about what the first version includes.
3. **Draft.** It shows you the brief and the numbered tasks in one message. Say yes, or what to
   change. It writes no files before your yes.
4. **Pull request.** It writes the files, pushes the `plan` branch and opens a pull request titled
   `Plan: <name>`. Read it on GitHub, then merge it.

## The plan format

`PLAN.md` holds everything about the product on about one page:

```
Stage: plan

# Shared Shopping List

## Idea
- Problem: flatmates buy the same things twice and forget others
- For: shared households of 2 to 6 people
- Today: a WhatsApp group and photos of the fridge
- First version: one shared list per household, synced between phones

## Verdict
- Need 3: someone shops most days
- Users 3: every shared flat has this problem
- Effort 2: a few weeks
- Risk 3: little can go wrong
- Score 11: go

## Stack
- Web app with Next.js: runs on any phone browser, one codebase, free hosting
- SQLite: one file, no database server to run

## Brief
- Problem: duplicate and forgotten shopping
- For: shared households
- Out of scope: prices, recipes, store maps, native apps
- Success: our flat uses it instead of WhatsApp for two weeks
```

The first line is the **stage**: `idea`, `plan`, `build` or `done`. The skills read it to know
where you are, and change it as you move on.

`TASKS.md` holds the tasks, in order:

```
# Tasks

- [ ] Set up the project so it runs and has one passing test
  Done when: the app starts locally and the test command passes
  Waits on: nothing
- [ ] Add and tick off items on one list
  Done when: items added on one phone show on another after a refresh; a test covers adding
  Waits on: Set up the project so it runs and has one passing test
```

## What makes a good task

- **A day or less.** If it feels bigger, split it.
- **Usable on its own.** After the first task, the product runs. After each later one, it still
  runs and does a little more.
- **A checkable "Done when".** "Login works" is vague. "A new user can sign up, log out and log
  back in; tests cover each" can be checked.
- **Real blockers only.** "Waits on" lists a task only if this one can't start without it.
- **3 to 10 tasks.** More than that means the first version is too big. Cut scope, not quality.

## Changing the plan later

What you learn while building can change the plan. That's normal. For one task, edit `TASKS.md`
on the current branch. For a bigger change (scope, stack, several tasks), run `/plan-it` again:
done tasks stay done, open tasks are rewritten, and the change is recorded under `## Changes` in
`PLAN.md`.

## Next

Merge the plan pull request, start a fresh session and read [3. Build](03-build.md).
