---
name: update-playbook
description: Bring a newer Tunetips Playbook release into this copy (skills, agents, guardrails, the rules in AGENTS.md, the guide in docs/) on its own branch and pull request. Use when the developer says "update the playbook", "update-playbook", or asks whether a new playbook version is out.
---

# Update the playbook

One update per session. It changes only what the playbook owns: `.claude/` (skills, agents,
settings, the version marker), `CLAUDE.md`, `AGENTS.md` above `## Project notes`, and `docs/`. It
never touches `PLAN.md`, `TASKS.md`, Project notes, the README, CI or product code. Follow
`AGENTS.md`; these are the steps.

The playbook lives at `https://github.com/Yaseern/tunetips-playbook.git` (below: the playbook
URL). Its releases are tags named `v<version>`.

1. **Check where things stand.** If the working tree has uncommitted changes, stop and ask the
   developer. Otherwise switch to `main` and run `git pull` (skip if there is no remote).
2. **Find the versions.** This copy's version is the line in `.claude/playbook-version`; no such
   file means `0.1.0`. List the releases with `git ls-remote --tags --refs <playbook URL> "v*"`
   and take the highest version, comparing the numbers (0.10.0 is above 0.9.0) and ignoring
   tags that aren't plain `v<major>.<minor>.<patch>`. If that fails, say so (no network, or no
   access to the playbook) and stop. If the copy is already on the highest version, say it is up to date and
   stop. Tell the developer in one line: "Updating the playbook from <old> to <new>."
3. **Fetch both releases** into `refs/playbook/`, not into tags, so they never mix with the
   product's own tags:

   ```
   git fetch --no-tags <playbook URL> refs/tags/v<old>:refs/playbook/v<old> refs/tags/v<new>:refs/playbook/v<new>
   ```

4. **Branch** from `main`: `git switch -c update-playbook-<new>`. If that branch already exists,
   ask the developer whether to continue on it or start over.
5. **Apply the playbook's changes** between the two releases, merging them with this copy's own
   edits. `git rev-parse --git-path playbook-update.patch` gives a path inside git's own folder
   for the patch (below: `<patch>`). Write it with `--output`, not a `>` redirect, which
   PowerShell would re-encode:

   ```
   git diff --binary --output=<patch> refs/playbook/v<old> refs/playbook/v<new> -- .claude CLAUDE.md AGENTS.md docs ":(exclude).claude/playbook-version"
   git apply --3way <patch>
   ```

   If `git diff --quiet` with the same versions and paths exits 0, there is nothing to apply:
   skip `git apply`, and only the version marker changes. `git apply --3way` stages what it
   changes. If it reports conflicts, open each conflicted file, keep the developer's own changes
   and the playbook's new ones, and remove the conflict markers. If a conflict is unclear (the
   developer rewrote a file the playbook changed), show both sides and ask which to keep. In
   `AGENTS.md`, a conflict at or below `## Project notes` always keeps the copy's side.

   If `git apply` fails with an error instead (for example "does not exist in index" for a file
   the developer deleted), it applied nothing. Tell the developer which file, ask whether to
   leave it out, and on a yes write the patch again with `":(exclude)<path>"` added to the paths
   and apply that.
6. **Protect the product's files.** In `AGENTS.md`, everything from the `## Project notes`
   heading down must stay exactly as on `main`: check `git diff main -- AGENTS.md`, and if any
   change is at or below that heading, put those lines back as they are on `main`. Then set
   `.claude/playbook-version` to `<new>` (create it if missing) and stage the rest with
   `git add -u .claude CLAUDE.md AGENTS.md docs` and `git add .claude/playbook-version`, so the
   developer's untracked files stay out.
   `git diff --cached --name-only main` must list only files under `.claude/` or `docs/`, plus
   `CLAUDE.md` and `AGENTS.md`. If anything else is there, unstage and restore it.
7. **Note what was left out.** `git diff --stat refs/playbook/v<old> refs/playbook/v<new> --
   .github` shows playbook changes to CI, which this update doesn't bring in because CI holds the
   product's own checks. List them in the pull request so the developer can copy what they want.
   Read the playbook's changelog between the two versions
   (`git show refs/playbook/v<new>:CHANGELOG.md`) for what changed.
8. **Review, at most three rounds**, as in `/work-on-it` step 5, with the `reviewer` agent
   checking that the update kept the developer's own edits, left no conflict markers, and changed
   only the files in step 6.
9. **Commit** with the message `Update the playbook to v<new>`, push the branch
   (`git push -u origin update-playbook-<new>`) and open a pull request against `main`, titled
   the same. Its body:
   - **Playbook:** from v<old> to v<new>, with the changelog entries in between, shortened.
   - **Changed:** the files changed, and each conflict and how it was resolved, or "No
     conflicts".
   - **Left out:** the CI changes from step 7 and how to copy them, or "Nothing".
   - **Untouched:** `PLAN.md`, `TASKS.md`, Project notes in `AGENTS.md`, the README, CI and
     product code.
   - **Checks** and **Review:** what you ran, the rounds, and the final verdict.
   - **On merge:** "Nothing", unless the changelog asks for a step (for example a new setting).
10. **Close.** Wait for CI (`gh pr checks <number> --watch`), then say in three lines what was
    updated, the pull request link with the CI result, and that the developer merges it.
