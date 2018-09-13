#!/bin/bash

CURRENT_DIR=$( cd "$(dirname "${BASH_SOURCE}")" ; pwd -P )
cd "$CURRENT_DIR"

rm -rf build/*
yarn build

# build our own service worker and compress it
yarn sw-precache --config swconfig.js
yarn uglifyjs -c -m -o build/service-worker.js build/service-worker.js

cd build
git init
git add .
git commit -m "publish page"
git push --force git@github.com:altbdoor/forex-frontend.git master:gh-pages
