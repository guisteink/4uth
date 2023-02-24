#!/bin/bash

# NEED DEPLOY(uri) FOR TEST BY THIS WAY
REQUEST=$(
  curl -L \
    -H'Content-Type: application/json' \
    http://localhost:3333/health-check \
)

SUCCESS=$(echo "${REQUEST}" | jq -r '.success' )

[[ $SUCCESS = "true" ]] && echo true || echo false
