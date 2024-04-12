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

COPY --chown=node:node .env.example ./.env
COPY drizzle ./drizzle
COPY scripts ./scripts
COPY --chown=node:node drizzle.config.ts env.config.ts ./

RUN pnpm init
RUN pnpm add -D drizzle-kit pg drizzle-orm dotenv tsx postgres
