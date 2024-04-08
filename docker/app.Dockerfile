FROM oven/bun:1.1.2-alpine as base

# update package to the latest version
RUN apk upgrade
# add linux-pam package to have mkhomedir_helper for easier to create home directory for `bun` user
RUN apk add linux-pam
RUN mkhomedir_helper bun
RUN mkdir -p /home/bun/app

USER bun

WORKDIR /home/bun/app
