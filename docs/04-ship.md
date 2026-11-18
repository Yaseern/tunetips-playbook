# 4. Ship: done means people can use it

A product is done when someone outside your team can use it every day without your help. Not when
the last task is ticked.

**You run:** `/work-on-it` once every task in `TASKS.md` is ticked.
**You get:** a check against "done", then, on your yes, a release pull request.
**You decide:** whether it's ready, and when to publish.

## What "done" means

The product:

- **works end to end** for a real user, not just in a demo;
- **handles errors and bad input**: empty fields, wrong passwords, no network, a full disk;
- **is tested**, and the checks pass;
- **can be used by someone outside the team without help**: they can find it, install or open it,
  and do the main thing from the README alone.

The agent checks these first. If something is missing, it tells you and suggests `/plan-it` to add
tasks for it.

## Release checklist

Go through this before you say yes to a release. The agent does the parts marked *agent*.

**Before**

- [ ] Every task in `TASKS.md` is ticked and its pull request merged.
- [ ] The checks pass on `main` (CI, or the tests run by hand if there is no CI).
- [ ] You used the product yourself for its main job, from a fresh install or a new account.
- [ ] Someone who hasn't seen it before got through the main job using only the README. Note where
      they got stuck and fix it first.
- [ ] Bad input gives a clear message, not a crash or a blank screen.
- [ ] No secrets in the repository: API keys, passwords and tokens live in environment variables,
      and `.env` files are in `.gitignore`. CI's secret scan passes on `main`.
- [ ] The README says what the product is, who it is for, how to install or open it, and how to
      run the tests.
- [ ] If it stores user data: you know where it is kept, how it is backed up, and how a user can
      delete it.

**Release** *(agent, after your yes)*

- [ ] A `release` branch from `main`.
- [ ] `Stage: done` in `PLAN.md`.
- [ ] A version entry in `CHANGELOG.md`: the version number, the date and what's in it. If the
      file still holds the playbook's own history, ask the agent to replace it with your
      product's. Check the number in the pull request: `0.1.0` for a first release, then see
      [Semantic Versioning](https://semver.org/).
- [ ] A pull request with the same review as any task.

**After you merge** *(you, or ask the agent)*, using the version from the changelog, here
`0.1.0`:

- [ ] Switch to `main` and pull (`git switch main`, `git pull`), so the tag lands on the merged
      release.
- [ ] Tag the version: `git tag v0.1.0` then `git push origin v0.1.0`.
- [ ] Publish a GitHub release from the tag on the repository's **Releases** page, pasting the
      changelog entry as its notes, or with `gh release create v0.1.0 --notes "<the entry>"`.
- [ ] Deploy or publish the product where your users get it (hosting, app store, package
      registry), if that isn't already automatic.
- [ ] Tell your first users, and ask them what's missing.

## After the release

- **Fixes and new features** start with `/plan-it`, which plans a next version: it keeps the
  product's name, idea and stack, files the old plan under `plans/v1/`, and writes new tasks.
  Then the build loop runs as usual.
- **Watch whether people keep using it.** The brief's "Success" line says what you hoped for. If
  it isn't happening, talk to your users before building more.
