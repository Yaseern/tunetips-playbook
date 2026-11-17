# 1. Idea: is it worth building?

Most side projects stall because the idea was never checked: nobody needed it, or it was far
bigger than it looked. The idea stage takes about fifteen minutes and saves you weeks.

**You run:** `/new-idea` (other agents: "follow `.claude/skills/new-idea/SKILL.md`").
**You get:** a `PLAN.md` on a branch named `plan` with your idea, a score and a verdict.
**You decide:** whether to go on to the plan.

## What happens

1. You describe the idea in a sentence or two.
2. The agent asks what is unclear, at most three questions at a time, over a round or two:
   - What problem does it solve?
   - Who has that problem?
   - How do they deal with it today?
   - What must the first version do?
3. It scores the idea and gives a verdict.
4. It writes `PLAN.md` on the `plan` branch and commits it. Nothing reaches `main` yet.

Answer in plain words. "Me and my five flatmates, every week, when we split the bills" is a
better answer than "users who need expense management".

## How an idea is judged

Four questions, each scored 1 to 3:

| Score | Need: how often? | Users: who? | Effort: to a solid first release | Risk: what can go wrong? |
|---|---|---|---|---|
| 3 | every day | many people clearly have this problem today | days | little |
| 2 | every week | a clear but small group | weeks | manageable: user data, uptime, app store rules |
| 1 | now and then | unclear who would use it | months | legal, money or reputation at stake |

Add them up:

- **10 to 12: go.** Plan it.
- **7 to 9: park.** Keep it, revisit later. Often it can be made smaller or more frequent.
- **Below 7: drop.** Not this one.

The verdict is advice. You decide. If you go ahead with a park, do it knowing why it scored low.

### Example

> **Idea:** a shared shopping list for a household.
>
> - Need 3: someone shops most days.
> - Users 3: every shared flat and family has this problem.
> - Effort 2: a list that syncs between phones is a few weeks for a beginner.
> - Risk 3: a lost shopping list is an annoyance, not a disaster.
> - Score 11: **go**.

> **Idea:** an app that plans my yearly holiday.
>
> - Need 1: once a year.
> - Users 2: people who like planning, but they already use travel sites.
> - Effort 1: bookings, prices and maps take months.
> - Risk 1: money and bookings go wrong in public.
> - Score 5: **drop**.

## Tips

- **Smaller is better.** "Track my gym sets" beats "a fitness platform". You can grow it after it
  ships.
- **Build for people you can reach.** You need a few real users to tell you whether it works.
  Friends, classmates, a club or your team count.
- **Changing your mind is fine.** If the problem or the users change later, run `/new-idea` again.
  The change is recorded in `PLAN.md`.

## Next

On a go, start a fresh session and read [2. Plan](02-plan.md).

On a park or drop, the idea stays on the `plan` branch to revisit and `main` is unchanged. To try
another idea instead, run `/new-idea` again and choose to replace it.
