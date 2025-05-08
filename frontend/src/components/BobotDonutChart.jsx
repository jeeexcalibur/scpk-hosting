import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
  } from 'chart.js';
  import { Doughnut } from 'react-chartjs-2';
  import axios from 'axios';
  import { useEffect, useState } from 'react';
  
  ChartJS.register(ArcElement, Tooltip, Legend);
  
  export default function BobotDonutChart() {
    const [bobot, setBobot] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:5000/api/bobot/')
        .then(res => setBobot(res.data));
    }, []);
  
    const labels = bobot.map(b => b.nama_kriteria);
    const values = bobot.map(b => b.nilai);
  
    const data = {
      labels,
      datasets: [
        {
          label: 'Bobot',
          data: values,
          backgroundColor: [
            '#60a5fa', '#facc15', '#4ade80', '#f472b6',
            '#a78bfa', '#f87171', '#34d399'
          ],
          borderWidth: 1
        }
      ]
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            font: { size: 12 }
          }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: ${ctx.raw}`
          }
        }
      }
    };
  
    return (
      <div className="bg-white p-4 border rounded-xl shadow-sm w-full md:w-1/2 h-[400px] flex flex-col">
        <h2 className="text-sm font-semibold text-slate-700 mb-2">📘 Distribusi Bobot Kriteria</h2>
        <div className="flex-1">
          <Doughnut data={data} options={options} height={300} />
        </div>
      </div>
    );
  }
  