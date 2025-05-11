#!/bin/bash

# Destination is always current directory
DEST="$(pwd)"

# Display menu for source selection
echo "Choose source directory for .aseprite files:"
echo "1. Default Directory 1 (OneDrive)"
echo "2. Default Directory 2 (Home)"
echo "3. Custom directory"
read -p "Enter your choice [1/2/3]: " choice

# Set source based on user choice
case $choice in
    1)
        SRC="/mnt/c/Users/golfp/OneDrive - The Ohio State University/Documents/Art/Aseprite"
        ;;
    2)
        SRC="$HOME/documents/aseprite"
        ;;
    3)
        read -p "Enter full path to custom directory: " SRC
        ;;
    *)
        echo "Invalid selection. Exiting."
        exit 1
        ;;
esac

# Verify source directory exists
if [ ! -d "$SRC" ]; then
    echo "Error: Source directory does not exist: $SRC"
    exit 1
fi

# Copy operation with feedback
echo -e "\nCopying .aseprite files from $SRC to current directory..."
find "$SRC" -maxdepth 1 -type f -name '*.aseprite' -print0 | while IFS= read -r -d $'\0' file; do
    filename=$(basename "$file")
    cp -- "$file" "$DEST"
    echo "Copied '$filename' from '$SRC' to '$DEST'"
done
echo -e "\nCopying .png files from $SRC to current directory..."
find "$SRC" -maxdepth 1 -type f -name '*.png' -print0 | while IFS= read -r -d $'\0' file; do
    filename=$(basename "$file")
    cp -- "$file" "$DEST"
    echo "Copied '$filename' from '$SRC' to '$DEST'"
done

# Remove execute permissions
echo -e "\nAdjusting permissions..."
find "$DEST" -type f -name '*.aseprite' -exec chmod a-x {} \;
echo -e "\nAdjusting permissions..."
find "$DEST" -type f -name '*.png' -exec chmod a-x {} \;

echo -e "\nOperation complete. Copied $(find "$DEST" -type f -name '*.aseprite' | wc -l) files."
echo -e "\nOperation complete. Copied $(find "$DEST" -type f -name '*.png' | wc -l) files."
