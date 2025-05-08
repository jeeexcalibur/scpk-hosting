import { useEffect, useState } from "react";
import axios from "axios";
import { FaListUl, FaUserAlt, FaStream, FaPercentage } from "react-icons/fa";
import PodiumRanking from "../components/PodiumRanking";



export default function Dashboard() {
  const [jumlahKriteria, setJumlahKriteria] = useState(0);
  const [jumlahAlternatif, setJumlahAlternatif] = useState(0);
  const [jumlahCrips, setJumlahCrips] = useState(0);
  const [totalBobot, setTotalBobot] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/kriteria/')
      .then(res => setJumlahKriteria(res.data.length));

    axios.get('http://localhost:5000/api/alternatif/')
      .then(res => setJumlahAlternatif(res.data.length));

    axios.get('http://localhost:5000/api/crips/')
      .then(res => setJumlahCrips(res.data.length));

    axios.get('http://localhost:5000/api/bobot/')
      .then(res => {
        const total = res.data.reduce((sum, b) => sum + parseFloat(b.nilai), 0);
        setTotalBobot(total);
      });
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">📊 Dashboard SAW</h1>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard
          title="Alternatif"
          value={jumlahAlternatif}
          icon={<FaUserAlt />}
          color="bg-blue-100"
        />
        <DashboardCard
          title="Kriteria"
          value={jumlahKriteria}
          icon={<FaListUl />}
          color="bg-yellow-100"
        />
        <DashboardCard
          title="Crips"
          value={jumlahCrips}
          icon={<FaStream />}
          color="bg-green-100"
        />
        <DashboardCard
          title="Total Bobot"
          value={totalBobot.toFixed(2)}
          icon={<FaPercentage />}
          color={totalBobot === 1 ? "bg-pink-100" : "bg-red-100"}
        />
      </div>
      
 </div>

 
  );
}




function DashboardCard({ title, value, icon, color }) {
  return (
    <div className={`flex items-center p-4 rounded-lg ${color} shadow`}>
      <div className="text-3xl mr-4 text-slate-700">{icon}</div>
      <div>
        <div className="text-sm text-slate-600">{title}</div>
        <div className="text-xl font-bold text-slate-800">{value}</div>
      </div>
    </div>
  );
}
