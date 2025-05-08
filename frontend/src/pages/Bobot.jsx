import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Bobot() {
  const [bobotList, setBobotList] = useState([]);
  const [kriteriaList, setKriteriaList] = useState([]);
  const [formData, setFormData] = useState({
    kriteria_id: '',
    nilai: ''
  });

  const fetchData = () => {
    axios.get('http://localhost:5000/api/bobot/')
      .then(res => setBobotList(res.data));
    axios.get('http://localhost:5000/api/kriteria/')
      .then(res => setKriteriaList(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/bobot/', formData)
      .then(() => {
        setFormData({ kriteria_id: '', nilai: '' });
        fetchData();
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/bobot/${id}`)
      .then(() => fetchData())
      .catch(err => console.error(err));
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-slate-800">⚖️ Bobot Kriteria</h1>
  
      {/* Form Tambah */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-4"
      >
        <h2 className="text-xl font-semibold text-slate-700">Tambah / Update Bobot</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            type="number"
            step="0.01"
            placeholder="Bobot (misal: 0.15)"
            className="border border-slate-300 rounded px-4 py-2 text-sm"
            value={formData.nilai}
            onChange={(e) => setFormData({ ...formData, nilai: e.target.value })}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-md"
          >
            Simpan
          </button>
        </div>
      </form>
  
      {/* Tabel Bobot */}
      <div className="bg-white border border-slate-200 shadow-md rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm text-slate-800">
          <thead className="bg-slate-50 text-slate-600 text-[13px] uppercase border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left">Kriteria</th>
              <th className="px-6 py-3 text-center">Bobot</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {bobotList.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-3">{b.nama_kriteria}</td>
                <td className="px-6 py-3 text-center">{b.nilai}</td>
                <td className="px-6 py-3 text-center">
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {bobotList.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center px-6 py-5 text-slate-500">
                  Belum ada data bobot.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  
}
