# CONTRIBUTING

## Development

Install dependencies

```sh
cd mattmanzi-ui
npm i
```

Start [Rollup](https://rollupjs.org) (the dev server):

```sh
npm run dev
```

Navigate to [localhost:5555](http://localhost:5555). The app will hot-reload on file saves.

### Tools

On [VS Code](https://code.visualstudio.com/) there's an official extension: [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Deployment

### Infrastructure

Get Terraform service account GCP credentials:

```sh
gcloud iam service-accounts keys create key.json --iam-account=terraform@mattmanzi-com.iam.gserviceaccount.com
mv key.json gcp_credentials.json
export GOOGLE_APPLICATION_CREDENTIALS=./gcp_credentials.json
```

### Code

To create an optimised version of the app

```sh
npm run build
```

#### To Firebase

```sh
npx firebase login
npx firebase deploy
```

#### To Servers

To run and serve the newly built app

```sh
npm run start
```

This uses [sirv](https://github.com/lukeed/sirv), which is included in your **package.json**'s `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).
