ARG NODE_VERSION="lts"

## MARK: Build
FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /app

COPY package*.json .
RUN npm ci

# raise memory limit for Rollup:
# - https://github.com/sveltejs/kit/discussions/7989
# - https://rollupjs.org/troubleshooting/#error-javascript-heap-out-of-memory
ENV NODE_OPTIONS=--max-old-space-size=12288

COPY tsconfig.json vite.config.ts svelte.config.js ./

# note on copying dirs (https://stackoverflow.com/a/37715522)
COPY src src
COPY static static

RUN npm run build

# MARK: Web Server
FROM nginxinc/nginx-unprivileged:alpine-slim AS server

LABEL org.opencontainers.image.source=https://github.com/imyourmanzi/mattmanzi.com
LABEL org.opencontainers.image.description="Container image for mattmanzi.com"

# use custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -f /etc/nginx/conf.d/*

# bring over the production assets
COPY --from=build /app/build /usr/share/nginx/html/
