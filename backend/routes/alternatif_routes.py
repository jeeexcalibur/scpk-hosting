# routes/alternatif_routes.py

from flask import Blueprint, request, jsonify
from models.models import db, Alternatif, Penilaian, Crips

alternatif_bp = Blueprint('alternatif_bp', __name__)

# CREATE - Tambah alternatif (karyawan)
@alternatif_bp.route('/', methods=['POST'])
def tambah_alternatif():
    data = request.get_json()
    alt = Alternatif(nama=data['nama'])
    db.session.add(alt)
    db.session.commit()
    return jsonify({'message': 'Alternatif berhasil ditambahkan', 'id': alt.id}), 201

# READ - Tampilkan semua alternatif
@alternatif_bp.route('/', methods=['GET'])
def get_alternatif():
    alternatif_list = Alternatif.query.all()
    result = [{
        'id': a.id,
        'nama': a.nama
    } for a in alternatif_list]
    return jsonify(result)

# DELETE - Hapus alternatif (dan penilaiannya)
@alternatif_bp.route('/<int:id>', methods=['DELETE'])
def delete_alternatif(id):
    alt = Alternatif.query.get_or_404(id)
    db.session.delete(alt)
    db.session.commit()
    return jsonify({'message': 'Alternatif berhasil dihapus'})

@alternatif_bp.route('/<int:id>', methods=['PUT'])
def update_alternatif(id):
    data = request.get_json()
    alt = Alternatif.query.get_or_404(id)
    alt.nama = data['nama']
    db.session.commit()
    return jsonify({'message': 'Alternatif berhasil diperbarui'})
