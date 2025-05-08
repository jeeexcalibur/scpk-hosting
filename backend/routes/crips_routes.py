# routes/crips_routes.py

from flask import Blueprint, request, jsonify
from models.models import db, Crips, Kriteria

crips_bp = Blueprint('crips_bp', __name__)

# CREATE - Tambah crips baru
@crips_bp.route('/', methods=['POST'])
def tambah_crips():
    data = request.get_json()
    crips = Crips(
        kriteria_id=data['kriteria_id'],
        deskripsi=data.get('deskripsi'),
        nilai=data['nilai'],
        min_value=data.get('min_value'),
        max_value=data.get('max_value')
    )
    db.session.add(crips)
    db.session.commit()
    return jsonify({'message': 'Crips berhasil ditambahkan'}), 201

# READ - Tampilkan semua crips
@crips_bp.route('/', methods=['GET'])
def get_crips():
    crips_list = Crips.query.all()
    result = [{
        'id': c.id,
        'kriteria_id': c.kriteria_id,
        'nama_kriteria': c.kriteria.nama,
        'deskripsi': c.deskripsi,
        'nilai': c.nilai,
        'min_value': c.min_value,
        'max_value': c.max_value
    } for c in crips_list]
    return jsonify(result)

# UPDATE - Edit crips
@crips_bp.route('/<int:id>', methods=['PUT'])
def update_crips(id):
    data = request.get_json()
    crips = Crips.query.get_or_404(id)
    crips.deskripsi = data.get('deskripsi')
    crips.nilai = data['nilai']
    crips.min_value = data.get('min_value')
    crips.max_value = data.get('max_value')
    db.session.commit()
    return jsonify({'message': 'Crips berhasil diperbarui'})

# DELETE - Hapus crips
@crips_bp.route('/<int:id>', methods=['DELETE'])
def delete_crips(id):
    crips = Crips.query.get_or_404(id)
    db.session.delete(crips)
    db.session.commit()
    return jsonify({'message': 'Crips berhasil dihapus'})
