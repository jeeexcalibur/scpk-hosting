import { useEffect, useState } from 'react';
import axios from 'axios';
import RankingChart from '../components/RankingChart';
import BobotDonutChart from '../components/BobotDonutChart';

export default function ProsesSAW() {
  const [hasil, setHasil] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewAll, setViewAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get('http://localhost:5000/api/saw/proses')
      .then(res => setHasil(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredData = hasil.filter((item) =>
    item.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = viewAll
    ? filteredData
    : filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const top3 = hasil.slice(0, 3);
  const top10 = hasil.slice(0, 10);

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-slate-800">📊 Proses SAW - Hasil Akhir</h1>

      {/* Ringkasan Top 3 */}
      {top3.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {top3.map((alt, i) => (
            <div
              key={alt.alternatif_id}
              className={`bg-white rounded-xl border shadow-md p-5 space-y-1 hover:shadow-xl transition ${
                i === 0 ? 'border-yellow-400' : 'border-slate-200'
              }`}
            >
              <h3 className="text-sm text-gray-500">Ranking {i + 1}</h3>
              <div className="text-xl font-bold text-slate-700">{alt.nama}</div>
              <div className="text-sm text-gray-600">
                Skor: <span className="text-blue-600 font-semibold">{alt.skor.toFixed(4)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔍 Search Bar */}
      <div className="flex items-center gap-4 px-4 md:px-6 mb-2">

        <h2 className="text-lg font-semibold text-slate-700">🔎 Cari Nama Alternatif</h2>
        <input
          type="text"
          placeholder="Cari nama..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-64 focus:outline-none focus:ring focus:border-blue-300 text-sm"
        />
      </div>

      {/* Tabel SAW */}
      <div className="bg-white border rounded-xl shadow-lg overflow-x-auto">
        <table className="min-w-full text-sm text-slate-800">
          <thead className="bg-slate-50 text-[13px] uppercase text-slate-600 border-b">
            <tr>
              <th className="px-6 py-4 text-center">#</th>
              <th className="px-6 py-4">Nama</th>
              <th className="px-6 py-4 text-center">Skor</th>
              {hasil[0] &&
                Object.keys(hasil[0].detail).map((k, i) => (
                  <th key={i} className="px-6 py-4 text-center">{k}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((alt, idx) => (
              <tr
                key={alt.alternatif_id}
                className={`transition hover:bg-slate-50 ${
                  idx === 0 && currentPage === 1 ? 'bg-yellow-50 font-semibold' : ''
                }`}
              >
                <td className="px-6 py-3 text-center">
                  {(viewAll ? filteredData : paginatedData)[idx] &&
                    ((currentPage - 1) * itemsPerPage + idx + 1)}
                </td>
                <td className="px-6 py-3">{alt.nama}</td>
                <td className="px-6 py-3 text-center font-bold text-blue-600">
                  {alt.skor.toFixed(4)}
                </td>
                {Object.values(alt.detail).map((val, i) => (
                  <td key={i} className="px-6 py-3 text-center text-slate-700">
                    {val.toFixed(4)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Control */}
        <div className="flex flex-wrap justify-between items-center px-6 py-4">
          <div className="text-sm text-slate-600">
            Menampilkan {paginatedData.length} dari {filteredData.length} data
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            {!viewAll &&
              Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    currentPage === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            <button
              onClick={() => {
                setViewAll(!viewAll);
                if (viewAll) setCurrentPage(1);
              }}
              className="ml-4 px-3 py-1 rounded text-sm font-semibold bg-gray-200 text-slate-700 hover:bg-gray-300"
            >
              {viewAll ? 'Paginate' : 'View All'}
            </button>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex flex-col md:flex-row gap-6">
        <RankingChart data={top10} />
        <BobotDonutChart />
      </div>

      {/* Catatan */}
      <p className="text-sm text-slate-500">
        * Skor dihasilkan dari proses normalisasi dan pembobotan berdasarkan kriteria yang telah ditentukan.
      </p>
    </div>
  );
}
