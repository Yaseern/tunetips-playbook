import assert from "node:assert/strict";
import { test } from "node:test";
import {
  addHabit,
  dayKey,
  emptyData,
  markDone,
  normalizeName,
  removeHabit,
  streak,
  summary,
  validateData,
} from "../src/habits.js";

const day = (y, m, d) => new Date(y, m - 1, d, 12);

test("dayKey uses the local date", () => {
  assert.equal(dayKey(day(2026, 3, 5)), "2026-03-05");
});

test("habit names are trimmed, lowercased and checked", () => {
  assert.equal(normalizeName("  Reading "), "reading");
  assert.equal(normalizeName("walk-10k"), "walk-10k");
  for (const bad of ["", "   ", "-run", "two words", "a".repeat(31), "émoji", undefined]) {
    assert.throws(() => normalizeName(bad), /habit name/, `should reject ${JSON.stringify(bad)}`);
  }
});

test("adding a habit twice is refused", () => {
  const data = emptyData();
  assert.equal(addHabit(data, "Water"), "water");
  assert.throws(() => addHabit(data, "water"), /already a habit/);
});

test("names like __proto__ or toString can't break the data", () => {
  const data = emptyData();
  assert.throws(() => markDone(data, "toString", day(2026, 1, 1)), /No habit called/);
  assert.throws(() => addHabit(data, "__proto__"), /habit name/);
});

test("marking done needs an existing habit and counts once per day", () => {
  const data = emptyData();
  assert.throws(() => markDone(data, "run", day(2026, 1, 1)), /No habit called "run"/);
  addHabit(data, "run");
  assert.equal(markDone(data, "run", day(2026, 1, 1)), true);
  assert.equal(markDone(data, "run", day(2026, 1, 1)), false);
  assert.deepEqual(data.habits.run, ["2026-01-01"]);
});

test("removing a habit deletes it, and unknown habits are refused", () => {
  const data = emptyData();
  addHabit(data, "run");
  assert.equal(removeHabit(data, "RUN"), "run");
  assert.deepEqual(data.habits, {});
  assert.throws(() => removeHabit(data, "run"), /No habit called/);
});

test("streak counts consecutive days, across months and years", () => {
  const days = ["2025-12-30", "2025-12-31", "2026-01-01"];
  assert.equal(streak(days, day(2026, 1, 1)), 3);
  assert.equal(streak(["2026-02-28", "2026-03-01"], day(2026, 3, 1)), 2);
});

test("a streak not done today still counts until a whole day is missed", () => {
  const days = ["2026-01-01", "2026-01-02"];
  assert.equal(streak(days, day(2026, 1, 3)), 2);
  assert.equal(streak(days, day(2026, 1, 4)), 0);
});

test("a gap resets the streak", () => {
  assert.equal(streak(["2026-01-01", "2026-01-03"], day(2026, 1, 3)), 1);
  assert.equal(streak([], day(2026, 1, 3)), 0);
});

test("summary lists habits by name with today's state", () => {
  const data = emptyData();
  addHabit(data, "water");
  addHabit(data, "read");
  markDone(data, "water", day(2026, 1, 1));
  assert.deepEqual(summary(data, day(2026, 1, 1)), [
    { name: "read", streak: 0, doneToday: false },
    { name: "water", streak: 1, doneToday: true },
  ]);
});

test("validateData rejects files in the wrong shape", () => {
  assert.deepEqual(validateData({ habits: { a: ["2026-01-01"] } }), { habits: { a: ["2026-01-01"] } });
  for (const bad of [null, [], {}, { habits: [] }, { habits: { a: "x" } }, { habits: { a: [1] } }]) {
    assert.throws(() => validateData(bad), /expected format/);
  }
});
