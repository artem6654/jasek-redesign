#!/bin/sh
# Builds the preview with the GitHub Pages sub-folder prefix and publishes it to the gh-pages branch.
set -e
cd "$(dirname "$0")/.."
REPO_NAME=$(basename -s .git "$(git config --get remote.origin.url)")
TMP=$(mktemp -d)
BASE_PATH="/$REPO_NAME" node src/build.mjs
cp -R site/. "$TMP/"
touch "$TMP/.nojekyll"
node src/build.mjs   # restore root-relative build for local preview / Vercel
cd "$TMP"
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C "$OLDPWD" config user.name)" -c user.email="$(git -C "$OLDPWD" config user.email)" commit -q -m "Deploy preview to GitHub Pages"
git push -q -f "$(git -C "$OLDPWD" config --get remote.origin.url)" gh-pages
echo "Pushed gh-pages for /$REPO_NAME/"
