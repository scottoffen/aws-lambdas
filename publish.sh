#!/bin/bash
@echo off

# Check node version
echo "Checking current node version"
node --version

# Remove existing package.zip
rm ./package.zip

# Create setup directory
echo "Creating publish directory"
mkdir publish

# Copy files to publish directory
echo "Copying project files"
cp index.js publish/
cp package.json publish/

# Install dependencies
cd ./publish
npm install

# Prepare publish package
echo "Zipping package"
zip -r ../package.zip ./*

# Remove publish directory
echo "Removing publish directory"
cd ..
rm -rf ./publish

# Open folder containing package.zip
echo "Opening folder containg function package - 'package.zip'"
open .