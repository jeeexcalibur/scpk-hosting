# routes/kriteria_routes.py

from flask import Blueprint, request, jsonify
from models.models import db, Kriteria

kriteria_bp = Blueprint('kriteria_bp', __name__)

# CREATE - Tambah kriteria baru
@kriteria_bp.route('/', methods=['POST'])
def tambah_kriteria():
    data = request.get_json()
    kriteria = Kriteria(
        kode=data['kode'],
        nama=data['nama'],
        tipe=data['tipe']
    )
    db.session.add(kriteria)
    db.session.commit()
    return jsonify({'message': 'Kriteria berhasil ditambahkan'}), 201

# READ - Tampilkan semua kriteria
@kriteria_bp.route('/', methods=['GET'])
def get_kriteria():
    kriteria_list = Kriteria.query.all()
    result = [{
        'id': k.id,
        'kode': k.kode,
        'nama': k.nama,
        'tipe': k.tipe
    } for k in kriteria_list]
    return jsonify(result)

# UPDATE - Edit kriteria
@kriteria_bp.route('/<int:id>', methods=['PUT'])
def update_kriteria(id):
    data = request.get_json()
    kriteria = Kriteria.query.get_or_404(id)
    kriteria.kode = data['kode']
    kriteria.nama = data['nama']
    kriteria.tipe = data['tipe']
    db.session.commit()
    return jsonify({'message': 'Kriteria berhasil diperbarui'})

# DELETE - Hapus kriteria
@kriteria_bp.route('/<int:id>', methods=['DELETE'])
def delete_kriteria(id):
    kriteria = Kriteria.query.get_or_404(id)
    db.session.delete(kriteria)
    db.session.commit()
    return jsonify({'message': 'Kriteria berhasil dihapus'})
