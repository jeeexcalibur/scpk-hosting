import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Alternatif() {
  const [alternatifList, setAlternatifList] = useState([]);
  const [penilaian, setPenilaian] = useState([]);
  const [kriteriaList, setKriteriaList] = useState([]);
  const [cripsList, setCripsList] = useState([]);

  const [formNamaBaru, setFormNamaBaru] = useState('');
  const [formCrips, setFormCrips] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editNama, setEditNama] = useState('');
  const [editCrips, setEditCrips] = useState({}); // nilai crips_id per kriteria

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [altRes, penRes, kriRes, cripsRes] = await Promise.all([
      axios.get('http://localhost:5000/api/alternatif/'),
      axios.get('http://localhost:5000/api/penilaian/'),
      axios.get('http://localhost:5000/api/kriteria/'),
      axios.get('http://localhost:5000/api/crips/')
    ]);
    setAlternatifList(altRes.data);
    setPenilaian(penRes.data);
    setKriteriaList(kriRes.data);
    setCripsList(cripsRes.data);
  };

  const getNilai = (altId, krtId) => {
    const found = penilaian.find(p => p.alternatif_id === altId && p.kriteria_id === krtId);
    return found ? found.nilai_input : '-';
  };

  const getPenilaianId = (altId, krtId) => {
    const found = penilaian.find(p => p.alternatif_id === altId && p.kriteria_id === krtId);
    return found ? found.id : null;
  };

  const handleTambah = async (e) => {
    e.preventDefault();

    const res = await axios.post('http://localhost:5000/api/alternatif/', {
      nama: formNamaBaru
    });

    const alternatifId = res.data.id;

    const promises = Object.entries(formCrips).map(([krtId, cripsId]) => {
      const crips = cripsList.find(c => c.id === parseInt(cripsId));
      if (!crips) return null;

      return axios.post('http://localhost:5000/api/penilaian/', {
        alternatif_id: alternatifId,
        kriteria_id: parseInt(krtId),
        nilai_input: crips.deskripsi || crips.min_value
      });
    }).filter(Boolean);

    await Promise.all(promises);

    setFormNamaBaru('');
    setFormCrips({});
    fetchData();
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/alternatif/${id}`).then(fetchData);
  };

  const handleEdit = (alt) => {
    setEditingId(alt.id);
    setEditNama(alt.nama);

    const cripsPerKriteria = {};
    kriteriaList.forEach(k => {
      const current = penilaian.find(p => p.alternatif_id === alt.id && p.kriteria_id === k.id);
      if (current) {
        const crips = cripsList.find(c => 
          c.kriteria_id === k.id &&
          (c.deskripsi === current.nilai_input || c.min_value?.toString() === current.nilai_input)
        );
        if (crips) cripsPerKriteria[k.id] = crips.id;
      }
    });

    setEditCrips(cripsPerKriteria);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    await axios.put(`http://localhost:5000/api/alternatif/${editingId}`, {
      nama: editNama
    });

    const updates = Object.entries(editCrips).map(([krtId, cripsId]) => {
      const crips = cripsList.find(c => c.id === parseInt(cripsId));
      const penilaianId = getPenilaianId(editingId, parseInt(krtId));
      if (!crips || !penilaianId) return null;

      return axios.put(`http://localhost:5000/api/penilaian/${penilaianId}`, {
        nilai_input: crips.deskripsi || crips.min_value
      });
    }).filter(Boolean);

    await Promise.all(updates);

    setEditingId(null);
    setEditNama('');
    setEditCrips({});
    fetchData();
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-slate-800">🧾 Alternatif & Penilaian</h1>
  
      {/* FORM TAMBAH */}
      <form onSubmit={handleTambah} className="bg-white border border-slate-200 shadow rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold text-slate-700">Tambah Alternatif + Nilai Kriteria</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Nama alternatif"
            value={formNamaBaru}
            onChange={(e) => setFormNamaBaru(e.target.value)}
            className="border border-slate-300 px-4 py-2 rounded-md text-sm w-full"
            required
          />
          {kriteriaList.map(k => (
            <select
              key={k.id}
              className="border border-slate-300 px-3 py-2 rounded-md text-sm"
              value={formCrips[k.id] || ''}
              onChange={(e) => setFormCrips({ ...formCrips, [k.id]: e.target.value })}
              required
            >
              <option value="">Pilih {k.kode}</option>
              {cripsList
                .filter(c => c.kriteria_id === k.id)
                .map(c => (
                  <option key={c.id} value={c.id}>
                    {c.deskripsi || `${c.min_value} - ${c.max_value}`} (nilai: {c.nilai})
                  </option>
                ))}
            </select>
          ))}
        </div>
        <div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-md">
            Simpan Alternatif
          </button>
        </div>
      </form>
  
      {/* TABEL ALTERNATIF */}
      <div className="bg-white border border-slate-200 shadow-md rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm text-slate-800">
          <thead className="bg-slate-50 border-b border-slate-200 uppercase text-[13px] tracking-wider text-slate-600">
            <tr>
              <th className="px-5 py-3 text-center">No</th>
              <th className="px-5 py-3">Nama</th>
              {kriteriaList.map(k => (
                <th key={k.id} className="px-5 py-3 text-center">{k.kode}</th>
              ))}
              <th className="px-5 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {alternatifList.map((alt, i) => (
              <tr key={alt.id} className="hover:bg-slate-50 transition">
                <td className="px-5 py-3 text-center">{i + 1}</td>
                <td className="px-5 py-3">
                  {editingId === alt.id ? (
                    <input
                      value={editNama}
                      onChange={(e) => setEditNama(e.target.value)}
                      className="border px-2 py-1 rounded w-full text-sm"
                      required
                    />
                  ) : (
                    alt.nama
                  )}
                </td>
                {kriteriaList.map(k => (
                  <td key={k.id} className="px-4 py-2 text-center">
                    {editingId === alt.id ? (
                      <select
                        className="border px-2 py-1 rounded text-sm"
                        value={editCrips[k.id] || ''}
                        onChange={(e) =>
                          setEditCrips({ ...editCrips, [k.id]: e.target.value })
                        }
                      >
                        <option value="">Pilih</option>
                        {cripsList
                          .filter(c => c.kriteria_id === k.id)
                          .map(c => (
                            <option key={c.id} value={c.id}>
                              {c.deskripsi || `${c.min_value} - ${c.max_value}`} (nilai: {c.nilai})
                            </option>
                          ))}
                      </select>
                    ) : (
                      getNilai(alt.id, k.id)
                    )}
                  </td>
                ))}
                <td className="px-5 py-3 text-center space-x-1">
                  {editingId === alt.id ? (
                    <>
                      <button
                        onClick={handleEditSubmit}
                        className="text-green-600 hover:text-green-700 font-bold text-lg"
                        title="Simpan"
                      >
                        ✔
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-gray-500 hover:text-red-500 font-bold text-lg"
                        title="Batal"
                      >
                        ✖
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(alt)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(alt.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                        title="Hapus"
                      >
                        🗑
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
}
