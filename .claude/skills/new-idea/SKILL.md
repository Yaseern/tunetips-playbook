---
name: new-idea
description: Judge a product idea, or a change to the current one, and record it in PLAN.md with a go, park or drop verdict. Use when the developer says "new idea", "I have an idea", "what about building …", describes something they could make, or says the idea or its users have changed.
---

# New idea

The idea stage: decide whether the idea is worth building. Follow `AGENTS.md`; these are the
steps.

1. **Check where things stand.** Get onto the `plan` branch as in the first bullet of `/plan-it`
   step 1, then read `PLAN.md` (`git show main:PLAN.md` tells you whether `main` has it too).
   - No `PLAN.md`: a new idea. Go on.
   - `PLAN.md` only on the `plan` branch: show the idea in two lines and ask whether to replace
     it or change it.
   - `PLAN.md` on `main`: this repository already holds a product. Ask whether this is a change
     to it (the problem or the users changed) or a different product. A different product
     belongs in a new copy of the kit: say so and stop. For a change, show the current idea and
     verdict in a few lines and ask what changed and why.
2. **Open the stage.** Tell the developer: this is the idea stage (or an idea change), you will
   ask a few questions and score the idea, they decide whether to go on, and the plan comes next.
3. **Ask what is unclear**: the problem, who has it, whether the developer can reach those people,
   how they deal with it today, and what the first version must do. At most three questions at a
   time; skip what they already said; don't guess answers. The technology is settled in
   `/plan-it`; if they mention one, note it for then.
4. **Score it** from 1 to 3, with one line of reasoning each:
   - **Need**: 3 = people need it every day, 2 = every week, 1 = now and then.
   - **Users**: 3 = many people clearly have this problem today, 2 = a clear but small group,
     1 = unclear who would use it. Count the people who would use it in the form planned (a
     command-line tool reaches fewer people than an app).
   - **Effort** to a solid first release: 3 = days, 2 = weeks, 1 = months.
   - **Risk**: 3 = little can go wrong, 2 = manageable (user data, uptime, store rules),
     1 = legal, money or reputation at stake.

   10 or more: **go**. 7 to 9: **park** (revisit later). Below 7: **drop**. The verdict is advice;
   the developer decides. Do no research beyond what you know unless they ask.
5. **Record it** on the `plan` branch. For a new idea, suggest a name and let the developer change
   it, then write `PLAN.md`:

   ```
   Stage: idea

   # <Product name, two to five words>

   ## Idea
   - Problem: …
   - For: …
   - Today: …
   - First version: …
   - Notes: … (optional: anything for later, such as a technology they want)

   ## Verdict
   - Need <n>: …
   - Users <n>: …
   - Effort <n>: …
   - Risk <n>: …
   - Score <total>: go | park | drop
   ```

   For a change, set `Stage: idea`, update the Idea and Verdict sections, and add a line under
   `## Changes` (create it at the end if missing): `- Idea: <what changed and why>`.
   Commit with the message `Add idea: <name>` or `Change idea: <what>`. Don't push; `/plan-it`
   pushes it and opens the pull request. Until then the idea is only on this computer; for a park
   or drop, offer to push the `plan` branch (no pull request) so it is kept on GitHub.
6. **Close the stage** in at most five lines: the verdict, the main reason, and the next step. For
   a go, or a change the developer wants to keep, that is `/plan-it` in a fresh session. For a
   park or drop, the idea stays on the `plan` branch to revisit, and `main` is unchanged.
