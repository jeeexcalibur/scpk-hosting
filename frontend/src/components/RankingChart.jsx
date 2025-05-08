import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
  
  export default function RankingChart({ data }) {
    const labels = data.map(d => d.nama);
    const scores = data.map(d => d.skor);
  
    const chartData = {
      labels,
      datasets: [
        {
          label: 'Skor SAW',
          data: scores,
          backgroundColor: (ctx) => {
            const index = ctx.dataIndex;
            return index === 0 ? '#facc15' : '#3b82f6'; // Emas untuk ranking 1
          },
          borderRadius: 6,
          barThickness: 24
        }
      ]
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `Skor: ${ctx.raw.toFixed(4)}`
          }
        }
      },
      scales: {
        x: {
          ticks: {
            autoSkip: true,
            font: { size: 11 }
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 0.05
          }
        }
      }
    };
  
    return (
      <div className="bg-white p-4 border rounded-xl shadow-sm w-full md:w-1/2 h-[400px] flex flex-col">
        <h2 className="text-sm font-semibold text-slate-700 mb-2">📊 Visualisasi Ranking SAW (Top 10)</h2>
        <div className="flex-1">
          <Bar data={chartData} options={options} height={300} />
        </div>
      </div>
    );
  }
  