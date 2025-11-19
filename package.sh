#!/bin/bash

# Directory to store the built extensions
DIST_DIR="dist"
CHROME_DIR="$DIST_DIR/chrome"
FIREFOX_DIR="$DIST_DIR/firefox"

# Files to include in the package
FILES=(
  "background.js"
  "content.js"
  "popup.js"
  "popup.html"
  "options.js"
  "options.html"
  "browser-polyfill.js"
  "icons"
)

# Clean up previous builds
rm -rf "$DIST_DIR"
mkdir -p "$CHROME_DIR"
mkdir -p "$FIREFOX_DIR"

echo "Packaging for Chrome..."
# Copy shared files
for file in "${FILES[@]}"; do
  cp -r "$file" "$CHROME_DIR/"
done
# Copy Chrome manifest
cp "manifest.json" "$CHROME_DIR/manifest.json"
# Create Zip
(cd "$CHROME_DIR" && zip -r "../field-unlocker-chrome.zip" .)

echo "Packaging for Firefox..."
# Copy shared files
for file in "${FILES[@]}"; do
  cp -r "$file" "$FIREFOX_DIR/"
done
# Copy Firefox manifest and rename it
cp "manifest.firefox.json" "$FIREFOX_DIR/manifest.json"
# Create Zip
(cd "$FIREFOX_DIR" && zip -r "../field-unlocker-firefox.zip" .)

echo "Build complete! Check the '$DIST_DIR' directory."
