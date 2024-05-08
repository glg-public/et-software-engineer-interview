#!/usr/bin/env sh

docker build -t et-software-engineer-interview:test \
  --build-arg NODE_ENV="development" \
  .