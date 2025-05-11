#!/usr/bin/env bash
set -euo pipefail

SRC="/mnt/c/Users/golfp/OneDrive - The Ohio State University/Documents/Art/Aseprite"
DEST="./aseFiles"

# Create destination directory if it doesn't exist
mkdir -p "$DEST"

# Copy all .ase files into ./aseFiles/
find "$SRC" -maxdepth 1 -type f -name '*.ase' -exec cp -- '{}' "$DEST" \;

# Remove the execute bit from every copied file
find "$DEST" -type f -name '*.ase' -exec chmod a-x '{}' \;
