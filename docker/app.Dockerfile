FROM node:20.12-alpine3.18

# update package to the latest version
RUN apk upgrade
# add linux-pam package to have mkhomedir_helper for easier to create home directory for `bun` user
RUN apk add linux-pam
RUN npm install -g pnpm

RUN mkhomedir_helper node
RUN mkdir -p /home/node/app
RUN chown -R node:node /home/node

WORKDIR /home/node/app

USER node

COPY --chown=node:node .env.docker ./.env
COPY --chown=node:node src ./src
COPY --chown=node:node biome.json tsconfig.json drizzle.config.ts package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile
