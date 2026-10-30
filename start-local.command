#!/bin/zsh
# Serve the existing website directly; no install or build step is needed.
cd -- "$(dirname -- "$0")" || exit 1
exec python3 -u -m http.server 5173 --bind 127.0.0.1 --directory dist
