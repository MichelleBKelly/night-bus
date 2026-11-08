import json
import subprocess
import tempfile
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
WEBSITE = ROOT / "frontend" / "route-planner"


class PreviewHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(WEBSITE), **kwargs)

    def send_json(self, status, data):
        content = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(content)))
        self.end_headers()
        self.wfile.write(content)

    def do_POST(self):
        if self.path != "/calculate-route":
            self.send_json(404, {"error": "Unknown endpoint"})
            return

        origin = self.headers.get("Origin")
        if origin and origin != "http://localhost:8000":
            self.send_json(403, {"error": "Unexpected website origin"})
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            if not 0 < length <= 65536:
                self.send_json(400, {"error": "Invalid request size"})
                return

            payload = json.loads(self.rfile.read(length))
            if not isinstance(payload, dict):
                raise ValueError("Request must be a JSON object")

            with tempfile.TemporaryDirectory() as folder:
                output = Path(folder) / "response.json"

                result = subprocess.run(
                    [
                        "aws", "lambda", "invoke",
                        "--function-name", "night-bus-dev-route-planner",
                        "--region", "ca-central-1",
                        "--profile", "night-bus-dev",
                        "--cli-binary-format", "raw-in-base64-out",
                        "--payload", json.dumps(payload),
                        "--no-cli-pager",
                        str(output),
                    ],
                    capture_output=True,
                    text=True,
                    timeout=60,
                )

                if result.returncode != 0:
                    self.send_json(502, {
                        "error": "AWS invocation failed. Check your AWS login."
                    })
                    return

                response = json.loads(output.read_text())

            if "statusCode" not in response:
                self.send_json(502, {"error": "Lambda execution failed"})
                return

            self.send_json(
                response["statusCode"],
                json.loads(response["body"]),
            )

        except (ValueError, TypeError):
            self.send_json(400, {"error": "Invalid JSON request"})
        except subprocess.TimeoutExpired:
            self.send_json(504, {"error": "Route calculation timed out"})
        except Exception:
            self.send_json(500, {"error": "Local server error"})


print("Open http://localhost:8000")
HTTPServer(("localhost", 8000), PreviewHandler).serve_forever()
