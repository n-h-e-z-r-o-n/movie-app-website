from flask import Flask,   request, Response, render_template, send_from_directory, redirect, abort
import os
import requests


def download_app_info():
    import requests
    import zipfile

    url1 = "https://github.com/ice-black/move-app/raw/main/Source_code/version1.zip"

    filename1 = 'data_render.zip'
    try:
        response1 = requests.get(url1)
        print(response1.status_code)
        if response1.status_code == 200:
            with open(filename1, 'wb') as f:
                f.write(response1.content)

        with zipfile.ZipFile(filename1, 'r') as zip_ref:
            zip_ref.extractall('')
    except:
        pass

app = Flask(__name__, template_folder='.', static_folder='.')

@app.route('/')
def index():
    return render_template('./x_local/index.html')


@app.route('/Home.html')
def Home_html():
    return render_template('./x_local/Home.html')
@app.route('/watch.html')
def watch_html():
    return render_template('./x_local/watch.html')
@app.route('/anime.html')
def anime_html():
    return render_template('./x_local/anime.html')
@app.route('/view-more.html')
def view_html():
    return render_template('./x_local/view-more.html')
@app.route('/profile.html')
def profile_html():
    return render_template('./x_local/profile.html')



@app.route('/shared.css')
def shared():
    return app.send_static_file('./x_local/shared.css')
@app.route('/custon.css')
def custon_css():
    return app.send_static_file('./x_local/custon.css')
@app.route('/NavBar.css')
def NavBar_css():
    return app.send_static_file('./x_local/NavBar.css')

@app.route('/watch.css')
def watch_css():
    return app.send_static_file('./x_local/watch.css')
@app.route('/anime.css')
def anime_css():
    return app.send_static_file('./x_local/anime.css')
@app.route('/view.css')
def view_css():
    return app.send_static_file('./x_local/view.css')
@app.route('/profile.css')
def profile_css():
    return app.send_static_file('./x_local/profile.css')


@app.route('/NavBar.js')
def NavBar_js():
    return app.send_static_file('./x_local/NavBar.js')
@app.route('/script.js')
def script_js():
    return app.send_static_file('./x_local/script.js')

@app.route('/watch.js')
def watch_js():
    return app.send_static_file('./x_local/watch.js')
@app.route('/anime.js')
def anime_js():
    return app.send_static_file('./x_local/anime.js')
@app.route('/view.js')
def view_js():
    return app.send_static_file('./x_local/view.js')
@app.route('/profile.js')
def profile_js():
    return app.send_static_file('./x_local/profile.js')


@app.route('/Database/database.php', methods=['POST'])
def proxy_database():
    external_url = 'https://movionyx.com/Database/database.php'
    resp = requests.post(external_url, data=request.form)
    return Response(
        resp.content,
        status=resp.status_code,
        content_type=resp.headers.get('Content-Type')
    )


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.join(BASE_DIR, './x_local/Assets')
@app.route('/Assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory(ASSETS_DIR, filename)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)