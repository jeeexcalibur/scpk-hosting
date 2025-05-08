import { useEffect, useState } from "react";
import axios from "axios";

export default function PodiumRanking() {
  const [top3, setTop3] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/saw/proses")
      .then(res => {
        const topThree = res.data.slice(0, 3);
        setTop3(topThree);
      });
  }, []);

  if (top3.length < 3) return null;

  return (
    <div className="w-full flex flex-col items-center gap-4 bg-white border rounded-xl shadow-sm p-6">
      <h2 className="text-sm font-semibold text-slate-700">🏆 Top 3 Ranking SAW</h2>

      <div className="flex items-end justify-center gap-4 w-full max-w-xl mt-2">
        {/* Ranking 2 */}
        <PodiumCard
          name={top3[1].nama}
          score={top3[1].skor}
          rank={2}
          height="h-40"
          color="bg-slate-300"
        />

        {/* Ranking 1 */}
        <PodiumCard
          name={top3[0].nama}
          score={top3[0].skor}
          rank={1}
          height="h-52"
          color="bg-yellow-300"
        />

        {/* Ranking 3 */}
        <PodiumCard
          name={top3[2].nama}
          score={top3[2].skor}
          rank={3}
          height="h-36"
          color="bg-orange-300"
        />
      </div>
    </div>
  );
}

function PodiumCard({ name, score, rank, height, color }) {
  return (
    <div className="flex flex-col items-center w-1/3">
      <div className={`w-full ${height} ${color} rounded-t-lg flex items-end justify-center text-xl font-bold text-slate-800`}>
        #{rank}
      </div>
      <div className="text-sm font-medium text-slate-700 mt-2 text-center">{name}</div>
      <div className="text-xs text-slate-500">Skor: {score.toFixed(4)}</div>
    </div>
  );
}
