#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
TEMP_DIR="$(mktemp -d)"
ZIP_FILE="$ROOT_DIR/build/route_planner.zip"

trap 'rm -rf "$TEMP_DIR"' EXIT

mkdir -p "$ROOT_DIR/build"

python3 -m pip install \
  --disable-pip-version-check \
  --no-compile \
  --requirement "$ROOT_DIR/services/route_planner/requirements.txt" \
  --target "$TEMP_DIR"

cp "$ROOT_DIR/services/route_planner/handler.py" "$TEMP_DIR/handler.py"
rm -f "$ZIP_FILE"
(cd "$TEMP_DIR" && zip -qr "$ZIP_FILE" .)

echo "Created build/route_planner.zip"