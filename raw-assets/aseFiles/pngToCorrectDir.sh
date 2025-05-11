#!/usr/bin/env bash
set -euo pipefail

DEST_MAIN="../main{m}"
DEST_PRELOAD="../preload{m}"

mkdir -p "$DEST_MAIN" "$DEST_PRELOAD"

# Remove existing PNGs from ../main{m}
find "$DEST_MAIN" -maxdepth 1 -type f -name '*.png' -delete

# Move PNGs from the current directory
shopt -s nullglob                # avoid literal *.png if none exist
for file in *.png; do
  if [[ "$file" == *preload_* ]]; then   # contains 'preload_'
    mv -- "$file" "$DEST_PRELOAD/"
  else
    mv -- "$file" "$DEST_MAIN/"
  fi
done

echo "Files moved!"
