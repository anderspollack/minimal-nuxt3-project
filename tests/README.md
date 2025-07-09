## 2025-05-24

Visual diff testing of getty.edu is currently done ad-hoc using Chromatic + playwright snapshot testing.

### Chromatic Project

Name: getty.edu_snapshots
https://www.chromatic.com/setup?appId=65988130e380e4c782b3ca13

The current state of the `getty.edu_snapshots` project should reflect the following:

#### Build #16 (baseline)

https://www.chromatic.com/build?appId=65988130e380e4c782b3ca13&number=16

This build was made by testing a local fully static build of getty.edu, using the `main` git branch, and the `prod_frozen` ContentStack production stack branch.

In Nuxt 2 getty.edu repository:

```.env
CONTENTSTACK_BRANCH=prod_frozen
```

```sh
npm run generate
npx http-server dist
# Running Nuxt 2 version of getty.edu at http://localhost:8080
```

In this repository:

```.env.nuxt3
# Nuxt 2 baseline
CHROMATIC_BASELINE_URL=http://localhost:8080
```

```sh
mise chromatic:baseline
```

#### Build #17 (diff)

https://www.chromatic.com/build?appId=65988130e380e4c782b3ca13&number=17

This build was made by testing a local dev build of getty.edu, using the `feature/nuxt3` git branch, and the `prod_frozen` ContentStack production stack branch.

```.env.nuxt3
NUXT_PUBLIC_CONTENT_SERVICE_BRANCH=prod_frozen
# Nuxt 3 diff
CHROMATIC_DIFF_URL=http://localhost:3000
```

```sh
mise chromatic:diff
```

## Run snapshot tests on the baseline version of getty.edu

In `.env.nuxt3`, set `CHROMATIC_BASELINE_URL` to the current production site (e.g. `CHROMATIC_BASELINE_URL=https://www.getty.edu`)

```sh
mise chromatic:baseline
```

## Publish results to chromatic

```sh
mise chromatic:baseline:upload
```

## Do both in a single command

The two above steps can be accomplished with a single command:

```sh
mise chromatic:baseline
```


## Inspect results of upload

Review each baseline snapshot individually, or select "Accept Build X" from the dropdown to set a new baseline.

## Run snapshot tests on the version of getty.edu you would like to diff against the baseline

In `.env.nuxt3`, set `CHROMATIC_DIFF_URL` to the current `feature/nuxt3` branch-based site (e.g. `CHROMATIC_DIFF_URL=https://dev-www.aws.getty.edu`)

```sh
mise chromatic:diff:test
```

## Publish results to chromatic

```sh
mise chromatic:diff:upload
```

## Do both in a single command

The two above steps can be accomplished with a single command:

```sh
mise chromatic:diff
```

## Inspect the diff in chromatic
