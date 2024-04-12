FROM node:20.12-alpine3.18

# update package to the latest version
RUN apk upgrade
# add linux-pam package to have mkhomedir_helper for easier to create home directory for `bun` user
RUN apk add linux-pam jq
RUN npm install -g pnpm

RUN mkhomedir_helper node
RUN mkdir -p /home/node/app
RUN chown -R node:node /home/node

WORKDIR /home/node/app

USER node

COPY --chown=node:node .env.example ./.env
COPY --chown=node:node drizzle ./drizzle
COPY --chown=node:node scripts ./scripts
COPY --chown=node:node drizzle.config.ts env.config.ts package.json ./

RUN jq '{"migration:up": .scripts["migration:up"], "seeder:run": .scripts["seeder:run"]}' package.json > tmp.json
RUN rm package.json

RUN pnpm init
RUN jq '.scripts=input' package.json tmp.json > temp_package.json
RUN jq '.type="module"' temp_package.json > temp_package_1.json
RUN mv temp_package_1.json package.json

RUN rm tmp.json temp_package.json

RUN pnpm add -D drizzle-kit pg drizzle-orm dotenv tsx postgres
