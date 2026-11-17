Stage: done

# Habit Streaks

## Idea
- Problem: daily habits slip when you can't see how long you've kept them up
- For: developers who live in a terminal and want a habit tracker with no account or app
- Today: paper calendars, phone apps with sign-ups and ads, or nothing
- First version: add habits, mark them done each day, see each habit's current streak

## Verdict
- Need 3: used every day by design
- Users 2: a clear but small group (terminal users who want this)
- Effort 3: a day or two
- Risk 3: data stays in one local file
- Score 11: go

## Stack
- Node.js 20+, no dependencies: one runtime to install, nothing to keep up to date
- Built-in test runner (`node --test`): no test library to learn
- One JSON file in the home folder: no database or server to run

## Brief
- Problem: no quick way to see habit streaks from the terminal
- For: terminal users, one person per data file
- Out of scope: reminders, sync between devices, charts, editing past days
- Success: the developer uses it every day for two weeks without opening the data file by hand
