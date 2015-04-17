#!/bin/bash
set -e

cd build
git init

git config user.name "Travis CI"
git config user.email "travis@travis-mail"

git add -A
git commit -m "Deploy to GitHub Pages"

# Force push from the current repo's master branch to the remote repo's gh-pages branch.
git push --force "https://${GH_TOKEN}@${GH_REF}" master > /dev/null 2>&1
