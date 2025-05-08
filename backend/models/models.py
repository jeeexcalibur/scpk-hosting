# ERD untuk Sistem SAW Dashboard - SQLAlchemy ORM

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Kriteria(db.Model):
    __tablename__ = 'kriteria'
    id = db.Column(db.Integer, primary_key=True)
    kode = db.Column(db.String(10), unique=True, nullable=False)
    nama = db.Column(db.String(100), nullable=False)
    tipe = db.Column(db.String(10), nullable=False)  # 'Benefit' atau 'Cost'

    crips = db.relationship('Crips', backref='kriteria', cascade="all, delete")
    bobot = db.relationship('Bobot', backref='kriteria', uselist=False, cascade="all, delete")

class Crips(db.Model):
    __tablename__ = 'crips'
    id = db.Column(db.Integer, primary_key=True)
    kriteria_id = db.Column(db.Integer, db.ForeignKey('kriteria.id'), nullable=False)
    deskripsi = db.Column(db.String(255), nullable=True)
    nilai = db.Column(db.Integer, nullable=False)
    min_value = db.Column(db.Float, nullable=True)
    max_value = db.Column(db.Float, nullable=True)

class Bobot(db.Model):
    __tablename__ = 'bobot'
    id = db.Column(db.Integer, primary_key=True)
    kriteria_id = db.Column(db.Integer, db.ForeignKey('kriteria.id'), unique=True, nullable=False)
    nilai = db.Column(db.Float, nullable=False)

class Alternatif(db.Model):
    __tablename__ = 'alternatif'
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(100), nullable=False)

    penilaian = db.relationship('Penilaian', backref='alternatif', cascade="all, delete")

class Penilaian(db.Model):
    __tablename__ = 'penilaian'
    id = db.Column(db.Integer, primary_key=True)
    alternatif_id = db.Column(db.Integer, db.ForeignKey('alternatif.id'), nullable=False)
    kriteria_id = db.Column(db.Integer, db.ForeignKey('kriteria.id'), nullable=False)
    nilai_input = db.Column(db.String(255), nullable=False)  # bisa angka atau teks seperti "Sangat Baik"
    nilai_angka = db.Column(db.Float, nullable=True)  # hasil konversi dari crips
