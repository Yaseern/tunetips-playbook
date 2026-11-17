# Habit Streaks

Track daily habits from the terminal and see how many days in a row you've kept each one up. No
account, no app, no internet: your habits live in one file on your computer.

This is the kit's example product. It went through every stage of the kit: the idea and verdict
are in [PLAN.md](PLAN.md), the tasks in [TASKS.md](TASKS.md). Read those two files to see what a
finished plan looks like.

## Install

You need [Node.js](https://nodejs.org/) 20 or newer (`node --version`). There is nothing else to
install. From this folder:

```
npm link
```

That adds the `streaks` command. Without it, run `node streaks.js` in place of `streaks`.

## Use

```
streaks add reading      # start tracking a habit
streaks done reading     # mark it done today
streaks                  # show every habit and its streak
streaks remove reading   # stop tracking it and delete its history
streaks help             # list the commands
```

`streaks` shows one line per habit, `[x]` if it's done today:

```
[x] reading  3 days
[ ] water    5 days
```

A streak not yet done today still counts, so you have until midnight. It drops to 0 once a whole
day is missed. Habit names are 1 to 30 letters, numbers or hyphens, and are not case sensitive.

## Your data

Habits are saved in `.habit-streaks.json` in your home folder. To use another file, set
`STREAKS_FILE` to its path. To delete all your data, delete that file. If the file is damaged,
`streaks` says so and changes nothing.

## Tests

```
npm test
```

CI runs them on every pull request.
