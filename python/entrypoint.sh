#!/bin/sh
set -e
rm -rf ./defaults/**.py
cp src/py/** ./defaults
mv ./defaults/main.py .