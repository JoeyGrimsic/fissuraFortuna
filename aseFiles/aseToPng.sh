#!/bin/bash

# This script requires aseprite cli
shopt -s nullglob

read -p "Enter the scale factor (positive integer): " scale_factor

if ! [[ "$scale_factor" =~ ^[1-9][0-9]*$ ]]; then
    echo "Error: Invalid scale factor. Must be a positive integer."
    exit 1
fi

for file in *.aseprite; do
    png_file="${file%.aseprite}.png"
    aseprite -b "$file" --scale "$scale_factor" --save-as "$png_file"
    echo "Converted $file to $png_file ${scale_factor}x scale"
done

