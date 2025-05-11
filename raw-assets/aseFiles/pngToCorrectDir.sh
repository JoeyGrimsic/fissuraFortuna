#!/usr/bin/env bash
set -euo pipefail
shopt -s nullglob

DEST_MAIN="../main{m}"
DEST_PRELOAD="../preload{m}"

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

# Remove .aseprite files
for f in *.aseprite; do
  rm -f -- "$f"
  echo "Removed: $f"
done

echo "Files moved!"
