// Reads and writes the data file.

import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { emptyData, UserError, validateData } from "./habits.js";

export function dataFile(env = process.env) {
  return env.STREAKS_FILE || join(homedir(), ".habit-streaks.json");
}

export function load(file) {
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return emptyData();
    throw new UserError(`Can't read ${file}: ${error.message}`);
  }
  try {
    return validateData(JSON.parse(text));
  } catch {
    throw new UserError(`${file} is damaged, so nothing was changed. Fix or delete that file.`);
  }
}

// Writes to a temporary file first, so a failed write never leaves a half-written data file.
export function save(file, data) {
  const temp = `${file}.tmp`;
  try {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(temp, `${JSON.stringify(data, null, 2)}\n`);
    renameSync(temp, file);
  } catch (error) {
    throw new UserError(`Can't save ${file}: ${error.message}`);
  }
}
