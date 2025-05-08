# routes/penilaian_routes.py

from flask import Blueprint, request, jsonify
from models.models import db, Penilaian, Crips

penilaian_bp = Blueprint('penilaian_bp', __name__)

# CREATE/UPDATE Penilaian untuk 1 alternatif dan 1 kriteria
@penilaian_bp.route('/', methods=['POST'])
def simpan_penilaian():
    data = request.get_json()
    alt_id = data['alternatif_id']
    krt_id = data['kriteria_id']
    nilai_input = data['nilai_input']

    # Cari nilai angka dari crips (bisa dari teks atau range numerik)
    nilai_angka = None
    crips_list = Crips.query.filter_by(kriteria_id=krt_id).all()
    try:
        nilai_input_float = float(nilai_input)
        for c in crips_list:
            if c.min_value is not None and c.max_value is not None:
                if c.min_value <= nilai_input_float <= c.max_value:
                    nilai_angka = c.nilai
    except:
        for c in crips_list:
            if c.deskripsi and nilai_input.lower() in c.deskripsi.lower():
                nilai_angka = c.nilai

    if nilai_angka is None:
        return jsonify({'error': 'Tidak ditemukan nilai crips yang sesuai'}), 400

    # Simpan atau update penilaian
    existing = Penilaian.query.filter_by(alternatif_id=alt_id, kriteria_id=krt_id).first()
    if existing:
        existing.nilai_input = nilai_input
        existing.nilai_angka = nilai_angka
    else:
        p = Penilaian(
            alternatif_id=alt_id,
            kriteria_id=krt_id,
            nilai_input=nilai_input,
            nilai_angka=nilai_angka
        )
        db.session.add(p)
    db.session.commit()
    return jsonify({'message': 'Penilaian berhasil disimpan'}), 200

# READ semua penilaian
@penilaian_bp.route('/', methods=['GET'])
def get_penilaian():
    penilaian_list = Penilaian.query.all()
    result = [{
        'id': p.id,
        'alternatif_id': p.alternatif_id,
        'kriteria_id': p.kriteria_id,
        'nilai_input': p.nilai_input,
        'nilai_angka': p.nilai_angka
    } for p in penilaian_list]
    return jsonify(result)

@penilaian_bp.route('/<int:id>', methods=['PUT'])
def update_penilaian(id):
    data = request.get_json()
    pen = Penilaian.query.get_or_404(id)
    nilai_input = data['nilai_input']

    # cari nilai_angka dari nilai_input
    crips = Crips.query.filter_by(kriteria_id=pen.kriteria_id).all()
    nilai_angka = None

    try:
        nilai_input_float = float(nilai_input)
        for c in crips:
            if c.min_value is not None and c.max_value is not None:
                if c.min_value <= nilai_input_float <= c.max_value:
                    nilai_angka = c.nilai
    except:
        for c in crips:
            if c.deskripsi and nilai_input.lower() in c.deskripsi.lower():
                nilai_angka = c.nilai

    if nilai_angka is None:
        return jsonify({'error': 'Crips tidak cocok'}), 400

    pen.nilai_input = nilai_input
    pen.nilai_angka = nilai_angka
    db.session.commit()
    return jsonify({'message': 'Penilaian berhasil diperbarui'}), 200
