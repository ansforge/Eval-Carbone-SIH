# Ca doit être la même version qu'il y a dans package.json
ARG NODE_VERSION=20.12.2

FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /usr/src/app

ENV YARN_CACHE_FOLDER=/cache/yarn
COPY .yarn/releases ./.yarn/releases
COPY package.json yarn.lock .yarnrc.yml ./
RUN --mount=type=cache,target=/cache/yarn \
    corepack enable && yarn install --immutable
COPY . .
RUN yarn build

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

ENV HOSTNAME=0.0.0.0
COPY --from=build /usr/src/app/.next/standalone ./
COPY --from=build /usr/src/app/.next/static ./.next/static
COPY --from=build /usr/src/app/public ./public

USER node

CMD ["node", "server.js"]
