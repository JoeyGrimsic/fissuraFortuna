#!/usr/bin/env bash
# copy_pngs.sh
# Copies every *.png (case‑insensitive) from your Aseprite folder
# into the directory where this script is executed.

set -eu  # exit on error or undefined variable

# Absolute source path – keep it inside quotes so the spaces don’t break anything
src="/mnt/c/Users/golfp/OneDrive - The Ohio State University/Documents/Art/Aseprite"

# Use find so it works even if you add sub‑folders later
find "$src" -type f -iname '*.png' \
  -exec cp -vn "{}" . \;

find "$src" -type f -iname '*.json' \
  -exec cp -vn "{}" . \;

rm aseprite.png

echo "✅  All PNGs and JSONs copied to $(pwd)"
