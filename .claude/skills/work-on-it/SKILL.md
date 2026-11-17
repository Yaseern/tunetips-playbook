---
name: work-on-it
description: Take the next task from TASKS.md, build it on its own branch, get it reviewed, and open a pull request. Use when the developer says "work on it", "next task", "work on <task>", or "continue".
---

# Work on it

The build stage, one task per session. Follow `AGENTS.md`; these are the steps.

1. **Check where things stand.** If the working tree has uncommitted changes, stop and ask the
   developer. Otherwise, on `main`, run `git pull` (skip if there is no remote) and read the
   stage line in `PLAN.md`.
   - No `PLAN.md` or `TASKS.md` on `main`, or `Stage: idea` or `Stage: plan`: the plan is not
     approved yet. Say so (merge the plan pull request, or run `/plan-it`) and stop.
2. **Pick the task**: the one the developer named, or the first `- [ ]` task whose `Waits on:`
   tasks are all `- [x]`. If a branch for it already exists, switch to it and continue from its
   `Progress:` line. If no task is free, say which tasks are blocked and on what; if all are
   done, say the product is ready for its release. Tell the developer in one line which task you
   are taking.
3. **Branch.** Create a branch from `main` named after the task (short, lowercase, hyphens). On
   the first build task, set `Stage: build` in `PLAN.md` and tell the developer the build stage
   has started: one task per session, each ending in a pull request they merge.
4. **Build** the task with tests for new behaviour, following `AGENTS.md` and the stack in
   `PLAN.md`. Keep to the task; add anything else you find to `TASKS.md` as a new task.
5. **Review, at most three rounds.** Each round: run the checks (see `AGENTS.md`), then the
   `reviewer` agent with the task's title and `Done when:`. A round is clean when the checks pass
   and the verdict is `clean`; items marked after merge don't count against it. If not clean, fix
   what it confirms and start the next round. After a third round that is not clean, don't fix
   again: add a `Progress:` line under the task saying what is still unmet, commit, push the
   branch, tell the developer, and stop without a pull request.
6. **Commit.** Tick the task (`- [x]`) in `TASKS.md`, remove its `Progress:` lines, and commit
   with a plain message that says what changed.
7. **Push and open the pull request** against `main`, titled with the task. Its body:
   - **Task:** the task title.
   - **Done when:** each item as a checklist entry, ticked when met, with where it is met (file,
     test or command).
   - **Review:** how many rounds, what was fixed, and the final verdict.
   - **On merge:** anything to do (settings, environment variables, migrations), or "Nothing".
8. **Close** in three lines: what was built, the pull request link, and the next step: the
   developer merges once CI passes, then runs `/work-on-it` in a fresh session.
