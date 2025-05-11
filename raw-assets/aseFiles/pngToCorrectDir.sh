#!/usr/bin/env bash
set -euo pipefail
shopt -s nullglob

DEST_MAIN="preload\{m\}/"
DEST_PRELOAD="main\{m\}/"

mkdir -p "$DEST_MAIN" "$DEST_PRELOAD"
find "$DEST_MAIN"    -maxdepth 1 -type f -name '*.png'      -delete

# Move PNGs
for file in *.png; do
  if [[ "$file" == *preload_* ]]; then
    mv -- "$file" "$DEST_PRELOAD/"
  else
    mv -- "$file" "$DEST_MAIN/"
  fi
done

# Create tmp directory if it doesn't exist
mkdir -p tmp

# Move each .aseprite file into tmp/
for f in *.aseprite; do
  mv -- "$f" tmp/ && echo "Moved: $f to subdirectory tmp"
done

echo "Files moved!"
