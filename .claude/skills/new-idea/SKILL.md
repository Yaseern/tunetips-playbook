---
name: new-idea
description: Judge a product idea and record it in PLAN.md with a go, park or drop verdict. Use when the developer says "new idea", "I have an idea", "what about building …", or describes something they could make.
---

# New idea

The idea stage: decide whether the idea is worth building. Follow `AGENTS.md`; these are the
steps.

1. **Check where things stand.** If `PLAN.md` exists with `Stage: build` or `Stage: done`, this
   repository already holds a product: tell the developer a new product belongs in a new copy of
   the kit, and stop. If it exists with `Stage: idea` or `Stage: plan`, show its idea in two lines
   and ask whether to replace it.
2. **Open the stage.** Tell the developer: this is the idea stage, you will ask a few questions and
   score the idea, they decide whether to go on, and the next stage is the plan.
3. **Ask what is unclear**: the problem, who has it, how they deal with it today, and what the
   first version must do. At most three questions at a time; skip what they already said; don't
   guess answers.
4. **Score it** from 1 to 3, with one line of reasoning each:
   - **Need**: 3 = people need it every day, 2 = every week, 1 = now and then.
   - **Users**: 3 = many people clearly have this problem today, 2 = a clear but small group,
     1 = unclear who would use it.
   - **Effort** to a solid first release: 3 = days, 2 = weeks, 1 = months.
   - **Risk**: 3 = little can go wrong, 2 = manageable (user data, uptime, store rules),
     1 = legal, money or reputation at stake.

   10 or more: **go**. 7 to 9: **park** (revisit later). Below 7: **drop**. The verdict is advice;
   the developer decides. Do no research beyond what you know unless they ask.
5. **Record it.** Update `main` (`git pull`, skip if there is no remote) and switch to the `plan`
   branch, creating it from `main` if it doesn't exist. Write `PLAN.md`:

   ```
   Stage: idea

   # <Product name, two to five words>

   ## Idea
   - Problem: …
   - For: …
   - Today: …
   - First version: …

   ## Verdict
   - Need <n>: …
   - Users <n>: …
   - Effort <n>: …
   - Risk <n>: …
   - Score <total>: go | park | drop
   ```

   Commit it with the message `Add idea: <name>`. Don't push; `/plan-it` opens the pull request.
6. **Close the stage** in at most five lines: the verdict, the main reason, and the next step. For
   a go, that is `/plan-it` in a fresh session. For a park or drop, the idea stays on the `plan`
   branch to revisit.
