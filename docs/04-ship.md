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

## Deploy: where users get it

Before releasing, know where your users will get the product: a web address, an install command
or a download link. The release asks you for it and puts it in the pull request. Each kind of
product has a free way to start; free plans change, so check the host's current limits before
you rely on one.

| Kind | Free option | Users get it from |
| --- | --- | --- |
| Static site (HTML, CSS, JavaScript, no server) | GitHub Pages | `https://<you>.github.io/<repo>/` |
| Web app with a server or database | A free plan on a host such as Render, or Vercel for Next.js | the address the host gives you |
| Command-line tool or package | npm (Node.js) or PyPI (Python), or a GitHub release | `npx <name>`, `pip install <name>`, or a download |
| Mobile app | An Android file (APK) on a GitHub release, or a web app people add to their home screen | a download link or a web address |

Whatever the kind: secrets such as API keys go into the host's settings as environment variables,
never into the repository. After deploying, open the product from where users get it, on a
device that isn't yours if you can, and do the main job once.

**Static site, on GitHub Pages**

1. GitHub Pages is free for public repositories; a private one needs a paid GitHub plan
   (Cloudflare Pages is a free alternative that works with private ones).
2. If the site has a build step (React, Vite), the agent adds a GitHub Actions workflow that
   builds it and publishes the output folder. A plain HTML site needs no build.
3. On GitHub: **Settings → Pages → Source**: pick *GitHub Actions* (with a build) or *Deploy from
   a branch*, `main`, root folder (without one).
4. After the next merge to `main`, the site is live at the address shown on that page.

**Web app with a server or database**

1. Sign up for the host's free plan and connect your GitHub repository; every merge to `main`
   then deploys. Ask the agent which settings your stack needs (start command, Node or Python
   version).
2. Know the limits: free servers often sleep when nobody uses them, so the first visit is slow,
   and Vercel's free plan is for non-commercial use only.
3. Free hosts usually wipe the disk on every deploy or restart, so a SQLite file or uploaded
   files there get lost. Keep data in a hosted database with a free plan (for example Neon for
   PostgreSQL, Turso for SQLite) and put its connection string in an environment variable.
4. Add the environment variables in the host's settings, deploy, and open the address it gives.

**Command-line tool or package**

1. Pick a name that isn't taken (search npmjs.com or pypi.org) and set it and the version in
   `package.json` or `pyproject.toml`.
2. Create a free account on the registry and turn on two-factor sign-in.
3. Publish: `npm publish` for Node.js; for Python, `python -m build` then `python -m twine upload
   dist/*`. The agent asks before publishing, since a published version can't be replaced.
4. Users run `npx <name>` or `npm install -g <name>`, or `pip install <name>`. For a single
   program file instead, attach it to the GitHub release from the checklist below.

**Mobile app**

1. Free: build an Android APK and attach it to the GitHub release; Android users download it
   and allow installing from that source. Or build a web app people can add to their home
   screen, deployed as above.
2. The app stores are not free: Google Play has a one-time registration fee and the Apple App
   Store a yearly one, and each reviews your app first. Decide on that before you plan for it.
3. A full mobile guide (builds, store listings, reviews) is planned for a later playbook
   version; `/update-playbook` brings it in when it is out.

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
      and `.env` files are in `.gitignore`.
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
- [ ] A pull request with the same review as any task, saying where users get the product (see
      [Deploy](#deploy-where-users-get-it)).

**After you merge** *(you, or ask the agent)*, using the version from the changelog, here
`0.1.0`:

- [ ] Switch to `main` and pull (`git switch main`, `git pull`), so the tag lands on the merged
      release.
- [ ] Tag the version: `git tag v0.1.0` then `git push origin v0.1.0`.
- [ ] Publish a GitHub release from the tag on the repository's **Releases** page, pasting the
      changelog entry as its notes, or with `gh release create v0.1.0 --notes "<the entry>"`.
- [ ] Deploy or publish the product where your users get it (see
      [Deploy](#deploy-where-users-get-it)), if that isn't already automatic, and check it there.
- [ ] Tell your first users, and ask them what's missing.

## After the release

- **Fixes and new features** start with `/plan-it`, which plans a next version: it keeps the
  product's name, idea and stack, files the old plan under `plans/v1/`, and writes new tasks.
  Then the build loop runs as usual.
- **Watch whether people keep using it.** The brief's "Success" line says what you hoped for. If
  it isn't happening, talk to your users before building more.
