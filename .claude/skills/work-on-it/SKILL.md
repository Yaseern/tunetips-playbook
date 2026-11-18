---
name: work-on-it
description: Take the next task from TASKS.md, build it on its own branch, get it reviewed, and open a pull request. Use when the developer says "work on it", "next task", "work on <task>", or "continue".
---

# Work on it

The build stage, one task per session. Follow `AGENTS.md`; these are the steps.

1. **Check where things stand.** If the working tree has uncommitted changes, stop and ask the
   developer. Otherwise switch to `main`, run `git pull` (skip if there is no remote) and read the
   stage line in `PLAN.md`. Only what is on `main` is approved.
   - No `TASKS.md` on `main`: the plan is not approved yet. Say so (merge the plan pull request,
     or run `/plan-it` if there is none) and stop.
   - `Stage: done` on `main`: the product is released. Say so, suggest `/plan-it` for a next
     version, and stop.
   - If a plan change is waiting (an open pull request from the `plan` branch: `gh pr list --head
     plan`, or ask the developer when unsure), ask whether to wait for it or go on with the
     current plan.
2. **Pick the task**: the one the developer named, or the first `- [ ]` task whose `Waits on:`
   tasks are all `- [x]`. If a branch for it already exists, switch to it and continue from its
   `Progress:` line. If no task is free, say which tasks are blocked and on what, and stop. If all
   are done, go to **Release** below. Tell the developer in one line which task you are taking.
3. **Branch.** Create a branch from `main` named after the task (short, lowercase, hyphens). If
   `main` says `Stage: plan`, a new plan or a changed idea starts its build: set `Stage: build` in
   `PLAN.md` and tell the developer the build stage has started: one task per session, each
   ending in a pull request they merge.
4. **Build** the task with tests for new behaviour, following `AGENTS.md` and the stack in
   `PLAN.md`. Keep to the task. If you find other work, add it to `TASKS.md` as a new task. If
   the work shows the plan or the idea is wrong, finish or pause at a working point and tell the
   developer; they decide whether to change it (see "When things change" in `AGENTS.md`).
5. **Review, at most three rounds.** Each round: run the checks (see `AGENTS.md`), then the
   `reviewer` agent with the task's title and `Done when:`. A check that changes the developer's
   machine (a global install, a system service) runs in a temporary folder, or ask first. A
   round is clean when the checks pass and the verdict is `clean`; items marked after merge
   don't count against it. If not clean, fix what it confirms and start the next round. After a
   third round that is not clean, don't fix again: add a `Progress:` line under the task saying
   what is still unmet, commit, push the branch, tell the developer, and stop without a pull
   request.
6. **Learn and commit.** Update the docs the change affects (how to install, run or use it).
   The first time the product can be run, replace the playbook's README with a short one for
   the product (how to install, run and test it, and a link to the playbook's guide in `docs/`). If
   the task taught something the next session should know, write it down as in "Learn as you go"
   in `AGENTS.md`. Tick the task (`- [x]`) in `TASKS.md`, shrink it to its checklist line, and
   commit with a plain message that says what changed.
7. **Push and open the pull request** against `main`, titled with the task. Its body:
   - **Task:** the task title.
   - **Done when:** each item as a checklist entry, ticked when met, with where it is met (file,
     test or command).
   - **Checks:** what you ran and the result, and any check left to CI.
   - **Review:** how many rounds, what was fixed, and the final verdict.
   - **Learned:** what was written down and where, or "Nothing new".
   - **On merge:** anything to do (settings, environment variables, migrations), or "Nothing".
8. **Close.** Wait for CI (`gh pr checks <number> --watch`); if it fails, fix it on the branch as
   another review round. Then say in three lines what was built, the pull request link with the
   CI result, and the next step: the developer merges, then runs `/work-on-it` in a fresh
   session.

## Release

When every task is done, check the product against "What done means" in `AGENTS.md`. If something
is missing, tell the developer and suggest `/plan-it` to add tasks for it. If nothing is missing,
ask whether to release. On their yes, create a branch named `release` from `main` (if an old
`release` branch exists, ask before deleting it), set `Stage: done` in `PLAN.md`, add a version
entry to the product's `CHANGELOG.md` (the README's "Make it yours" cleared the playbook's;
create it if missing), and open a pull request as in steps 5 to 7. After they merge it, tagging and
publishing the release are theirs to do or to ask you for. A next version starts with
`/plan-it`.
