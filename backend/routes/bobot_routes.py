# routes/bobot_routes.py

from flask import Blueprint, request, jsonify
from models.models import db, Bobot, Kriteria

bobot_bp = Blueprint('bobot_bp', __name__)

# CREATE or UPDATE bobot
@bobot_bp.route('/', methods=['POST'])
def set_bobot():
    data = request.get_json()
    kriteria_id = data['kriteria_id']
    nilai = data['nilai']

    existing = Bobot.query.filter_by(kriteria_id=kriteria_id).first()
    if existing:
        existing.nilai = nilai
    else:
        new_bobot = Bobot(kriteria_id=kriteria_id, nilai=nilai)
        db.session.add(new_bobot)
    db.session.commit()

    return jsonify({'message': 'Bobot berhasil disimpan'}), 200

# READ - Tampilkan semua bobot
@bobot_bp.route('/', methods=['GET'])
def get_bobot():
    bobot_list = Bobot.query.all()
    result = [{
        'id': b.id,
        'kriteria_id': b.kriteria_id,
        'nama_kriteria': b.kriteria.nama,
        'nilai': b.nilai
    } for b in bobot_list]
    return jsonify(result)

# DELETE - Hapus bobot
@bobot_bp.route('/<int:id>', methods=['DELETE'])
def delete_bobot(id):
    bobot = Bobot.query.get_or_404(id)
    db.session.delete(bobot)
    db.session.commit()
    return jsonify({'message': 'Bobot berhasil dihapus'})
