// Turns command-line arguments into actions and messages. Returns an exit code.

import { addHabit, markDone, normalizeName, removeHabit, summary, UserError } from "./habits.js";
import { dataFile, load, save } from "./store.js";

export const USAGE = `Usage:
  streaks                 show your habits and streaks
  streaks add <habit>     start tracking a habit
  streaks done <habit>    mark a habit done today
  streaks remove <habit>  stop tracking a habit and delete its history
  streaks help            show this help`;

function show(data, today, out) {
  const rows = summary(data, today);
  if (rows.length === 0) {
    out("No habits yet. Add one: streaks add <habit>");
    return;
  }
  const width = Math.max(...rows.map((row) => row.name.length));
  for (const row of rows) {
    const mark = row.doneToday ? "[x]" : "[ ]";
    const days = row.streak === 1 ? "1 day" : `${row.streak} days`;
    out(`${mark} ${row.name.padEnd(width)}  ${days}`);
  }
}

export function run(args, { env = process.env, today = new Date(), out = console.log, err = console.error } = {}) {
  const [command = "list", name, ...extra] = args;
  const file = dataFile(env);
  try {
    if (command === "help" || command === "--help" || command === "-h") {
      out(USAGE);
      return 0;
    }
    if (command === "list") {
      show(load(file), today, out);
      return 0;
    }
    if (!["add", "done", "remove"].includes(command)) {
      err(`Unknown command "${command}".\n\n${USAGE}`);
      return 1;
    }
    if (name === undefined || extra.length > 0) {
      err(`"${command}" takes one habit name, for example: streaks ${command} reading`);
      return 1;
    }
    const data = load(file);
    if (command === "add") {
      const added = addHabit(data, name);
      save(file, data);
      out(`Added "${added}". Mark it done with: streaks done ${added}`);
    } else if (command === "done") {
      const habit = normalizeName(name);
      const changed = markDone(data, habit, today);
      if (changed) save(file, data);
      const row = summary(data, today).find((r) => r.name === habit);
      out(`${changed ? "Done" : "Already done today"}: ${row.name}, streak ${row.streak}.`);
    } else {
      const removed = removeHabit(data, name);
      save(file, data);
      out(`Removed "${removed}".`);
    }
    return 0;
  } catch (error) {
    if (error instanceof UserError) {
      err(error.message);
      return 1;
    }
    throw error;
  }
}
