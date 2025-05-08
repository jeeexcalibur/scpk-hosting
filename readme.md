# 📊 Sistem Pendukung Keputusan Metode SAW - Penilaian Kinerja Karyawan

Sistem berbasis web untuk membantu pengambilan keputusan menggunakan metode *Simple Additive Weighting (SAW)* dalam menilai performa karyawan. Sistem ini dirancang dengan antarmuka modern, responsif.

---

## 🚀 Fitur Utama

- ✅ **CRUD Kriteria**
- ✅ **CRUD Crips (Nilai Kualitatif/Numerik)**
- ✅ **CRUD Bobot Per Kriteria**
- ✅ **CRUD Alternatif + Penilaian Per Kriteria**
- ✅ **Proses Normalisasi & Perhitungan SAW**
- ✅ **Ranking Otomatis + Visualisasi**
- ✅ **Dashboard Interaktif & Dinamis***
- ✅ **Search, Pagination**

---

## 🧰 Teknologi yang Digunakan

### 💻 Frontend
- [React.js](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router DOM](https://reactrouter.com/)
- [Chart.js](https://www.chartjs.org/) via `react-chartjs-2`

### 🖥️ Backend
- [Flask](https://flask.palletsprojects.com/)
- [Flask SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/)
- [Flask-CORS](https://flask-cors.readthedocs.io/)
- [PostgreSQL](https://www.postgresql.org/)

---

## 🛠️ Cara Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/username/saw-spk-karyawan.git
cd saw-spk-karyawan
```

### 2. Setup Backend (Flask)
```bash
cd backend
python -m venv venv
source venv/bin/activate   # atau venv\Scripts\activate untuk Windows
pip install -r requirements.txt
```
📌 Konfigurasi database di config.py (username, password, nama DB PostgreSQL).

### 3. Setup Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

--- 
This project is created by 2025 Jein Ananda, Institut Teknologi Kalimantan.
You are free to use, modify, and distribute this software for educational or commercial purposes with proper attribution.

