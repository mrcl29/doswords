# .devcontainer/Dockerfile
FROM node:20-alpine

RUN apk add --no-cache bash git \
    && corepack enable \
    && corepack prepare pnpm@latest --activate

WORKDIR /workspace
