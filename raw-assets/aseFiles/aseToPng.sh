#!/bin/bash

# This script requires aseprite cli
#
# Enable nullglob to prevent literal interpretation of *.ase when no files exist
shopt -s nullglob

# Process each .ase file
for file in *.ase; do
    # Generate output filename by replacing .ase with .png
    png_file="${file%.ase}.png"
    
    # Export with 400% scaling using Aseprite CLI
    aseprite -b "$file" --scale 4 --save-as "$png_file"
done

echo "Conversion complete!"
