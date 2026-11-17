import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { run } from "../src/cli.js";

function setup(today = new Date(2026, 0, 1, 12)) {
  const file = join(mkdtempSync(join(tmpdir(), "streaks-")), "data.json");
  const lines = { out: [], err: [] };
  const streaks = (...args) =>
    run(args, {
      env: { STREAKS_FILE: file },
      today,
      out: (line) => lines.out.push(line),
      err: (line) => lines.err.push(line),
    });
  return { file, lines, streaks };
}

test("add, done and list work end to end and persist", () => {
  const { file, lines, streaks } = setup();
  assert.equal(streaks(), 0);
  assert.match(lines.out.pop(), /No habits yet/);

  assert.equal(streaks("add", "Reading"), 0);
  assert.equal(streaks("done", "reading"), 0);
  assert.equal(lines.out.pop(), "Done: reading, streak 1.");
  assert.equal(streaks("done", "reading"), 0);
  assert.equal(lines.out.pop(), "Already done today: reading, streak 1.");

  assert.equal(streaks("add", "water"), 0);
  assert.equal(streaks("list"), 0);
  assert.deepEqual(lines.out.slice(-2), ["[x] reading  1 day", "[ ] water    0 days"]);
  assert.deepEqual(JSON.parse(readFileSync(file, "utf8")), {
    habits: { reading: ["2026-01-01"], water: [] },
  });

  assert.equal(streaks("remove", "water"), 0);
  assert.deepEqual(Object.keys(JSON.parse(readFileSync(file, "utf8")).habits), ["reading"]);
  assert.deepEqual(lines.err, []);
});

test("bad input gives a message and exit code 1, not a crash", () => {
  const { lines, streaks } = setup();
  assert.equal(streaks("jump"), 1);
  assert.match(lines.err.pop(), /Unknown command "jump"/);
  assert.equal(streaks("add"), 1);
  assert.match(lines.err.pop(), /takes one habit name/);
  assert.equal(streaks("add", "two", "words"), 1);
  assert.match(lines.err.pop(), /takes one habit name/);
  assert.equal(streaks("add", "no spaces"), 1);
  assert.match(lines.err.pop(), /habit name/);
  assert.equal(streaks("done", "missing"), 1);
  assert.match(lines.err.pop(), /No habit called "missing"/);
});

test("a damaged data file is reported and left untouched", () => {
  const { file, lines, streaks } = setup();
  writeFileSync(file, "{ not json");
  assert.equal(streaks("add", "water"), 1);
  assert.match(lines.err.pop(), /damaged, so nothing was changed/);
  assert.equal(readFileSync(file, "utf8"), "{ not json");
});

test("help prints the usage", () => {
  const { lines, streaks } = setup();
  assert.equal(streaks("help"), 0);
  assert.match(lines.out.pop(), /^Usage:/);
});

test("the streaks command runs as a program", () => {
  const { file } = setup();
  const program = fileURLToPath(new URL("../streaks.js", import.meta.url));
  const env = { ...process.env, STREAKS_FILE: file };
  const output = execFileSync(process.execPath, [program, "add", "stretch"], { env, encoding: "utf8" });
  assert.match(output, /Added "stretch"/);
  assert.throws(
    () => execFileSync(process.execPath, [program, "nope"], { env, stdio: "pipe" }),
    (error) => error.status === 1 && /Unknown command/.test(error.stderr.toString()),
  );
});
