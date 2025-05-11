#!/usr/bin/env bash
set -euo pipefail

SRC="/mnt/c/Users/golfp/OneDrive - The Ohio State University/Documents/Art/Aseprite"
DEST="./aseFiles"

# Create destination directory if it doesn't exist
mkdir -p "$DEST"

# Copy all .aseprite files into ./aseFiles/, echoing each one
find "$SRC" -maxdepth 1 -type f -name '*.aseprite' \
  -exec cp -- '{}' "$DEST" \; \
  -exec echo "Copied: {}" \;

# Remove the execute bit from every copied file
find "$DEST" -type f -name '*.aseprite' -exec chmod a-x '{}' \;

