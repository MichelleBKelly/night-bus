#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
TEMP_DIR="$(mktemp -d)"
ZIP_FILE="$ROOT_DIR/build/route_planner.zip"

trap 'rm -rf "$TEMP_DIR"' EXIT

# Use the first Python that actually runs. On Windows Git Bash this is often
# "py", and "python3" / "python" can be Microsoft Store stubs that don't work.
PYTHON=""
for candidate in python3 python py; do
  if command -v "$candidate" >/dev/null 2>&1 && "$candidate" -c "import sys" >/dev/null 2>&1; then
    PYTHON="$candidate"
    break
  fi
done

if [ -z "$PYTHON" ]; then
  echo "Error: no working Python found (tried python3, python, py)." >&2
  exit 1
fi

mkdir -p "$ROOT_DIR/build"

"$PYTHON" -m pip install \
  --disable-pip-version-check \
  --no-compile \
  --requirement "$ROOT_DIR/services/route_planner/requirements.txt" \
  --target "$TEMP_DIR"

cp "$ROOT_DIR/services/route_planner/handler.py" "$TEMP_DIR/handler.py"
rm -f "$ZIP_FILE"

if command -v zip >/dev/null 2>&1; then
  (cd "$TEMP_DIR" && zip -qr "$ZIP_FILE" .)
else
  # No zip command (e.g. Git Bash on Windows): same archive via Python's zipfile,
  # with paths relative to the package folder like "zip -r ." gives.
  "$PYTHON" - "$TEMP_DIR" "$ZIP_FILE" <<'PY'
import os
import sys
import zipfile

source, target = sys.argv[1], sys.argv[2]

with zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED) as archive:
    for folder, dirs, files in os.walk(source):
        dirs.sort()
        relative = os.path.relpath(folder, source)
        if relative != ".":
            archive.write(folder, relative.replace(os.sep, "/") + "/")
        for name in sorted(files):
            path = os.path.join(folder, name)
            archive.write(path, os.path.relpath(path, source).replace(os.sep, "/"))
PY
fi

echo "Created build/route_planner.zip"
