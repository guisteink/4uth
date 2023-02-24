#!/bin/bash

error_exit() {
  echo "Error exit code 1"
  exit 1
}

# NEED DEPLOY(uri) FOR TEST BY THIS WAY
REQUEST=$(
  curl -L \
    -H'Content-Type: application/json' \
    http://localhost:3333/health-check \
)

SUCCESS=$(echo "${REQUEST}" | jq -r '.success')

[[ $SUCCESS = "truee" ]] && echo true || echo $(error_exit)
