import os
import sys
import json
import urllib.request
import urllib.parse
from http.server import SimpleHTTPRequestHandler, HTTPServer

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
        if self.path.startswith('/api/tts'):
            parsed_path = urllib.parse.urlparse(self.path)
            query = urllib.parse.parse_qs(parsed_path.query)
            
            text = query.get('text', [''])[0]
            lang = query.get('lang', ['fr'])[0]
            
            if not text:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b'{"error": "Parametre text requis"}')
                return
            
            # Mapping des codes langues pour Google TTS
            lang_map = {
                'fr': 'fr',
                'yoruba': 'yo',
                'yo': 'yo',
                'ewe': 'fr',
                'fon': 'fr'
            }
            tl = lang_map.get(lang, 'fr')
            
            # Requête vers Google TTS (voix humaine naturelle illimitée)
            google_tts_url = f"https://translate.google.com/translate_tts?ie=UTF-8&tl={tl}&client=tw-ob&q={urllib.parse.quote(text[:400])}"
            req = urllib.request.Request(google_tts_url, headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            })
            
            try:
                with urllib.request.urlopen(req) as response:
                    audio_bytes = response.read()
                    self.send_response(200)
                    self.send_header('Content-Type', 'audio/mpeg')
                    self.send_header('Content-Length', str(len(audio_bytes)))
                    self.send_header('Cache-Control', 'public, max-age=86400')
                    self.end_headers()
                    self.wfile.write(audio_bytes)
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode())
        else:
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
    print(f"Serveur AgriVoice demarre sur http://localhost:{port}")
    httpd.serve_forever()
