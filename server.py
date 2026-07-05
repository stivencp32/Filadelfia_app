from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import socket
from pathlib import Path


HOST = "0.0.0.0"
PORT = 8080
ROOT = Path(__file__).resolve().parent
STATE_FILE = ROOT / "filadelfia_state.json"


def local_ip():
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
            sock.connect(("8.8.8.8", 80))
            return sock.getsockname()[0]
    except OSError:
        return "127.0.0.1"


class FiladelfiaHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def guess_type(self, path):
        content_type = super().guess_type(path)
        if content_type.startswith(("text/", "application/javascript")) and "charset=" not in content_type:
            return f"{content_type}; charset=utf-8"
        return content_type

    def send_json(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path.split("?", 1)[0] == "/api/state":
            if STATE_FILE.exists():
                try:
                    self.send_json(json.loads(STATE_FILE.read_text(encoding="utf-8")))
                    return
                except json.JSONDecodeError:
                    pass
            self.send_json({})
            return

        if self.path.split("?", 1)[0] == "/app-config.js":
            public_base_url = f"http://{local_ip()}:{PORT}"
            body = f'window.FILADELFIA_PUBLIC_BASE_URL = "{public_base_url}";\n'.encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/javascript; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        super().do_GET()

    def do_POST(self):
        if self.path.split("?", 1)[0] != "/api/state":
            self.send_error(404)
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            payload = json.loads(self.rfile.read(length).decode("utf-8") or "{}")
        except (ValueError, json.JSONDecodeError):
            self.send_json({"ok": False, "error": "JSON inválido."}, 400)
            return

        STATE_FILE.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
        self.send_json({"ok": True})


if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), FiladelfiaHandler)
    print(f"Filadelfia app em http://{local_ip()}:{PORT}/")
    server.serve_forever()

