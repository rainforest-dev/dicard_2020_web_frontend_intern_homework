#!/usr/bin/env sh

set -e

yarn build

cd ./build/

git init
git add -A
timestamp="`date +'%Y-%m-%dT%T.%3N%z'`"
git commit -m "deploy @ $timestamp"

git push -f git@github.com:r08521610/dicard_2020_web_frontend_intern_homework.git master:gh-pages

cd -
