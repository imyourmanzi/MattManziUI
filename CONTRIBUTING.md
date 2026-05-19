# CONTRIBUTING

## Development

Install dependencies with:

```sh
npm i
```

Then start the [Rollup](https://rollupjs.org) dev server:

```sh
npm run dev
```

The local app is hot-reloading local app is available at http://localhost:5173. Reloading happens on file saves.

### Tools

On [VS Code](https://code.visualstudio.com/) there's an official extension: [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

### PRing Changes

1. Create a branch with a short descriptive name, starting with the `mfe-**` ID
1. Commit changes early and often
1. Bump app version with `npm version <patch|minor|major>`
1. Push branch and open a PR, named after the branch `MFE-**: ...`
1. Wait for checks to pass and merge

## Building

To create a production-optimized version of the app, run:

```sh
npm run build
```

## Containerizing

The website can be built for a Docker container and shipped off as needed.

> ❗️ **Note**
>
> Ensure that your **package.json** version string is what you want so that the image gets tagged correctly!

Build the container image with:

```sh
npm run build:docker
```

You can run a temporary container for the latest image you build using:

```sh
npm run dev:docker
```

## Publishing

Once you have the image you want, push it to the container registry:

```sh
docker push ghcr.io/imyourmanzi/mattmanzi.com:latest
docker push "ghcr.io/imyourmanzi/mattmanzi.com:$(npm pkg get version | tr -d '"')"
```
