import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Crips() {
  const [crips, setCrips] = useState([]);
  const [kriteriaList, setKriteriaList] = useState([]);
  const [formData, setFormData] = useState({
    kriteria_id: '',
    deskripsi: '',
    nilai: '',
    min_value: '',
    max_value: ''
  });

  const fetchData = () => {
    axios.get('http://localhost:5000/api/crips/')
      .then(res => setCrips(res.data));
    axios.get('http://localhost:5000/api/kriteria/')
      .then(res => setKriteriaList(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/crips/', formData)
      .then(() => {
        setFormData({
          kriteria_id: '',
          deskripsi: '',
          nilai: '',
          min_value: '',
          max_value: ''
        });
        fetchData();
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/crips/${id}`)
      .then(() => fetchData())
      .catch(err => console.error(err));
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-slate-800">🧩 Crips</h1>
  
      {/* Form Tambah */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-4"
      >
        <h2 className="text-xl font-semibold text-slate-700">Tambah Crips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <select
            className="border border-slate-300 rounded px-4 py-2 text-sm"
            value={formData.kriteria_id}
            onChange={(e) => setFormData({ ...formData, kriteria_id: e.target.value })}
            required
          >
            <option value="">Pilih Kriteria</option>
            {kriteriaList.map(k => (
              <option key={k.id} value={k.id}>
                {k.kode} - {k.nama}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Deskripsi"
            className="border border-slate-300 rounded px-4 py-2 text-sm"
            value={formData.deskripsi}
            onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Nilai (1–4)"
            className="border border-slate-300 rounded px-4 py-2 text-sm"
            value={formData.nilai}
            onChange={(e) => setFormData({ ...formData, nilai: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Min (opsional)"
            className="border border-slate-300 rounded px-4 py-2 text-sm"
            value={formData.min_value}
            onChange={(e) => setFormData({ ...formData, min_value: e.target.value })}
          />
          <input
            type="number"
            placeholder="Max (opsional)"
            className="border border-slate-300 rounded px-4 py-2 text-sm"
            value={formData.max_value}
            onChange={(e) => setFormData({ ...formData, max_value: e.target.value })}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-md"
          >
            Tambah Crips
          </button>
        </div>
      </form>
  
      {/* Tabel Crips */}
      <div className="bg-white border border-slate-200 shadow-md rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm text-slate-800">
          <thead className="bg-slate-50 text-slate-600 text-[13px] uppercase border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left">Kriteria</th>
              <th className="px-6 py-3 text-left">Deskripsi</th>
              <th className="px-6 py-3 text-center">Nilai</th>
              <th className="px-6 py-3 text-center">Min</th>
              <th className="px-6 py-3 text-center">Max</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {crips.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-3">{c.nama_kriteria}</td>
                <td className="px-6 py-3">{c.deskripsi}</td>
                <td className="px-6 py-3 text-center">{c.nilai}</td>
                <td className="px-6 py-3 text-center">{c.min_value ?? '-'}</td>
                <td className="px-6 py-3 text-center">{c.max_value ?? '-'}</td>
                <td className="px-6 py-3 text-center">
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {crips.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center px-6 py-5 text-slate-500">
                  Belum ada crips.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  
}
