# syntax=docker/dockerfile:1.4-labs

FROM node:18-alpine as build

ENV NODE_ENV "development"

RUN <<EOF
  set -e
  apk add --no-cache git
EOF

USER node
WORKDIR /app

COPY --chown=node:node . ./

RUN npm clean-install
RUN npm run tscompile:docker

FROM node:18-alpine

ENV NODE_ENV "production"
ENV PORT=3000

RUN apk add --no-cache \
  bash \
  coreutils

USER node
WORKDIR /app

COPY --chown=node:node --from=build /app/package.json .
COPY --chown=node:node --from=build /app/node_modules ./node_modules/
COPY --chown=node:node --from=build /app/dist ./dist

CMD ["npm", "run", "start:prod"]
