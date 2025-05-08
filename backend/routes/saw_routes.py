# routes/saw_routes.py

from flask import Blueprint, jsonify
from models.models import db, Kriteria, Alternatif, Penilaian, Bobot

saw_bp = Blueprint('saw_bp', __name__)

@saw_bp.route('/proses', methods=['GET'])
def proses_saw():
    # Ambil semua kriteria dan bobot
    kriteria_list = Kriteria.query.all()
    kriteria_map = {k.id: k for k in kriteria_list}
    bobot_map = {b.kriteria_id: b.nilai for b in Bobot.query.all()}

    # Ambil semua alternatif dan penilaian
    alternatif_list = Alternatif.query.all()
    penilaian_list = Penilaian.query.all()

    # Susun nilai penilaian: {id_alt: {id_kriteria: nilai_angka}}
    data_matrix = {}
    for alt in alternatif_list:
        data_matrix[alt.id] = {}

    for p in penilaian_list:
        data_matrix[p.alternatif_id][p.kriteria_id] = p.nilai_angka

    # Hitung nilai max dan min tiap kriteria
    nilai_per_kriteria = {k.id: [] for k in kriteria_list}
    for alt_id in data_matrix:
        for kid, val in data_matrix[alt_id].items():
            nilai_per_kriteria[kid].append(val)

    max_vals = {k: max(v) for k, v in nilai_per_kriteria.items()}
    min_vals = {k: min(v) for k, v in nilai_per_kriteria.items()}

    # Normalisasi + Pembobotan + Skor akhir
    ranking = []
    for alt in alternatif_list:
        skor_akhir = 0
        detail = {}
        for k in kriteria_list:
            nilai = data_matrix.get(alt.id, {}).get(k.id, 0)
            if k.tipe.lower() == 'benefit':
                normal = nilai / max_vals[k.id] if max_vals[k.id] else 0
            else:
                normal = min_vals[k.id] / nilai if nilai else 0

            bobot = bobot_map.get(k.id, 0)
            skor = normal * bobot
            skor_akhir += skor
            detail[k.nama] = round(skor, 4)

        ranking.append({
            'alternatif_id': alt.id,
            'nama': alt.nama,
            'skor': round(skor_akhir, 4),
            'detail': detail
        })

    # Urutkan berdasarkan skor
    ranking.sort(key=lambda x: x['skor'], reverse=True)
    return jsonify(ranking)
