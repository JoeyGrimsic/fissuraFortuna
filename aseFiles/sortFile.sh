#!/usr/bin/env bash
set -euo pipefail
shopt -s nullglob

DEST_MAIN="../raw-assets/main{m}/"
DEST_PRELOAD="../raw-assets/preload{m}/"

mkdir -p "$DEST_MAIN" "$DEST_PRELOAD"
find "$DEST_MAIN" -maxdepth 1 -type f -name '*.png' -delete

# Move PNGs with logging
for file in *.png; do
  if [[ "$file" == *preload_* ]]; then
    mv -- "$file" "$DEST_PRELOAD/" && echo "Moved '$file' to preload directory: $DEST_PRELOAD"
  else
    mv -- "$file" "$DEST_MAIN/" && echo "Moved '$file' to main directory: $DEST_MAIN"
  fi
done

# we want to move .aseprite files to tmp so they can be reused later if needed
mkdir -p tmp
for f in *.aseprite; do
  mv -- "$f" tmp/ && echo "Moved '$f' to subdirectory: tmp/"
done

echo "All files moved successfully!"
