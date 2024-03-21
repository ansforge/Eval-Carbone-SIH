# Ca doit être la même version qu'il y a dans package.json
FROM node:20.12.2-alpine

WORKDIR /usr/src/app

ENV YARN_CACHE_FOLDER=/cache/yarn
COPY .yarn/releases/yarn-4.1.1.cjs ./.yarn/releases/yarn-4.1.1.cjs
COPY yarn.lock package.json .yarnrc.yml ./
RUN --mount=type=cache,target=/cache/yarn \
    corepack enable && corepack prepare yarn@stable --activate && yarn workspaces focus --all --production

COPY . .

RUN yarn build

RUN adduser -D evalcarbone

USER evalcarbone

CMD ["yarn", "start"]
