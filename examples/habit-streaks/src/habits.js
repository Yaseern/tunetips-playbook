// Habit data and streak logic. Pure functions, no file access, so the tests can run them directly.

const NAME = /^[a-z0-9][a-z0-9-]{0,29}$/;

export class UserError extends Error {}

// A local calendar date as YYYY-MM-DD (not UTC, so "today" matches the user's clock).
export function dayKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function previousDay(key) {
  const [y, m, d] = key.split("-").map(Number);
  return dayKey(new Date(y, m - 1, d - 1));
}

export function emptyData() {
  return { habits: {} };
}

// Checks data read from disk, so a hand-edited or broken file gives a clear message.
export function validateData(data) {
  const ok =
    data !== null &&
    typeof data === "object" &&
    data.habits !== null &&
    typeof data.habits === "object" &&
    !Array.isArray(data.habits) &&
    Object.values(data.habits).every(
      (days) => Array.isArray(days) && days.every((day) => typeof day === "string"),
    );
  if (!ok) throw new UserError("The data file is not in the expected format.");
  return data;
}

export function normalizeName(raw) {
  const name = String(raw ?? "").trim().toLowerCase();
  if (!NAME.test(name)) {
    throw new UserError(
      "A habit name is 1 to 30 characters: letters, numbers and hyphens, starting with a letter or number.",
    );
  }
  return name;
}

function requireHabit(data, name) {
  if (!Object.hasOwn(data.habits, name)) {
    throw new UserError(`No habit called "${name}". Add it first: streaks add ${name}`);
  }
}

export function addHabit(data, rawName) {
  const name = normalizeName(rawName);
  if (Object.hasOwn(data.habits, name)) throw new UserError(`"${name}" is already a habit.`);
  data.habits[name] = [];
  return name;
}

export function removeHabit(data, rawName) {
  const name = normalizeName(rawName);
  requireHabit(data, name);
  delete data.habits[name];
  return name;
}

// Marks the habit done today. Returns false if it was already done today.
export function markDone(data, rawName, today) {
  const name = normalizeName(rawName);
  requireHabit(data, name);
  const days = data.habits[name];
  const key = dayKey(today);
  if (days.includes(key)) return false;
  days.push(key);
  days.sort();
  return true;
}

// Consecutive days up to today. A streak not yet done today still counts from yesterday,
// so it only breaks once a whole day is missed.
export function streak(days, today) {
  const done = new Set(days);
  let key = dayKey(today);
  if (!done.has(key)) key = previousDay(key);
  let count = 0;
  while (done.has(key)) {
    count += 1;
    key = previousDay(key);
  }
  return count;
}

export function summary(data, today) {
  const key = dayKey(today);
  return Object.keys(data.habits)
    .sort()
    .map((name) => ({
      name,
      streak: streak(data.habits[name], today),
      doneToday: data.habits[name].includes(key),
    }));
}
