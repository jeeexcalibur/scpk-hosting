import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Kriteria() {
  const [kriteria, setKriteria] = useState([]);
  const [formData, setFormData] = useState({
    kode: '',
    nama: '',
    tipe: 'Benefit'
  });

  // Ambil data dari API
  const fetchKriteria = () => {
    axios.get('http://localhost:5000/api/kriteria/')
      .then(res => setKriteria(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchKriteria();
  }, []);

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/kriteria/', formData)
      .then(() => {
        setFormData({ kode: '', nama: '', tipe: 'Benefit' });
        fetchKriteria();
      })
      .catch(err => console.error(err));
  };

  // Hapus kriteria
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/kriteria/${id}`)
      .then(() => fetchKriteria())
      .catch(err => console.error(err));
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-slate-800">🧩 Kriteria</h1>
  
      {/* Form Tambah */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-4"
      >
        <h2 className="text-xl font-semibold text-slate-700">Tambah Kriteria</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Kode"
            className="border border-slate-300 rounded px-4 py-2 text-sm"
            value={formData.kode}
            onChange={(e) => setFormData({ ...formData, kode: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Nama Kriteria"
            className="border border-slate-300 rounded px-4 py-2 text-sm"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            required
          />
          <select
            className="border border-slate-300 rounded px-4 py-2 text-sm"
            value={formData.tipe}
            onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
          >
            <option value="Benefit">Benefit</option>
            <option value="Cost">Cost</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-md"
          >
            Tambah
          </button>
        </div>
      </form>
  
      {/* Tabel Data */}
      <div className="bg-white border border-slate-200 shadow-md rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm text-slate-800">
          <thead className="bg-slate-50 text-slate-600 text-[13px] uppercase border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left">Kode</th>
              <th className="px-6 py-3 text-left">Nama</th>
              <th className="px-6 py-3 text-center">Tipe</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kriteria.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50 transition"
              >
                <td className="px-6 py-3">{item.kode}</td>
                <td className="px-6 py-3">{item.nama}</td>
                <td className="px-6 py-3 text-center">{item.tipe}</td>
                <td className="px-6 py-3 text-center">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {kriteria.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center px-6 py-5 text-slate-500">
                  Belum ada data kriteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  
}
