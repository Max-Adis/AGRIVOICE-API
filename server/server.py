import os
import sys
import json
import urllib.request
import urllib.parse
from http.server import SimpleHTTPRequestHandler, HTTPServer

# Pointer toujours vers la racine du site web (dossier parent si dans server/)
web_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) if os.path.basename(os.path.dirname(os.path.abspath(__file__))) == 'server' else os.path.dirname(os.path.abspath(__file__))
os.chdir(web_root)

def get_env_var(key):
    try:
        with open('.env') as f:
            for line in f:
                if line.startswith(f"{key}="):
                    return line.split('=', 1)[1].strip()
    except Exception:
        pass
    return None

class AgriVoiceHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        super().do_GET()

    def do_POST(self):
        if self.path.startswith('/api/transcribe'):
            parsed_path = urllib.parse.urlparse(self.path)
            query = urllib.parse.parse_qs(parsed_path.query)
            
            model_id = query.get('model', [''])[0]
            if not model_id:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b'{"error": "Modele non specifie"}')
                return

            content_length = int(self.headers.get('Content-Length', 0))
            audio_data = self.rfile.read(content_length)

            hf_token = os.environ.get('HF_TOKEN') or get_env_var('HF_TOKEN') or ""

            api_url = f"https://api-inference.huggingface.co/models/{model_id}"
            req = urllib.request.Request(api_url, data=audio_data, method='POST')
            req.add_header('Authorization', f'Bearer {hf_token}')
            req.add_header('Content-Type', 'audio/wav')

            try:
                with urllib.request.urlopen(req) as response:
                    res_body = response.read()
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(res_body)
            except urllib.error.HTTPError as e:
                self.send_response(e.code)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(e.read())
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode())
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    port = int(sys.argv[1] if len(sys.argv) > 1 else (get_env_var('PORT') or 8000))
    server_address = ('', port)
    httpd = HTTPServer(server_address, AgriVoiceHandler)
    print(f"Serveur local AgriVoice démarré sur http://localhost:{port} (racine: {web_root})")
    httpd.serve_forever()
