from flask import Flask
from config import Config
from models.models import db
from routes.kriteria_routes import kriteria_bp
from routes.crips_routes import crips_bp
from routes.bobot_routes import bobot_bp
from routes.alternatif_routes import alternatif_bp
from routes.penilaian_routes import penilaian_bp
from routes.saw_routes import saw_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    db.init_app(app)
    app.register_blueprint(kriteria_bp, url_prefix='/api/kriteria')
    app.register_blueprint(crips_bp, url_prefix='/api/crips')
    app.register_blueprint(bobot_bp, url_prefix='/api/bobot')
    app.register_blueprint(alternatif_bp, url_prefix='/api/alternatif')
    app.register_blueprint(penilaian_bp, url_prefix='/api/penilaian')
    app.register_blueprint(saw_bp, url_prefix='/api/saw')
    return app

app = create_app()

# Tambahkan ini agar Railway bikin semua tabel saat app jalan
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
