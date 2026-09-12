import { useNavigate } from 'react-router-dom'
import './LeaderboardScreen.css'

const MOCK_LEADERS = [
  { rank: 1, name: 'Red', score: 8, time: '14:20', date: '2026-03-01' },
  { rank: 2, name: 'Blue', score: 8, time: '15:45', date: '2026-03-02' },
  { rank: 3, name: 'Leaf', score: 8, time: '16:10', date: '2026-03-03' },
  { rank: 4, name: 'Ash', score: 7, time: '18:30', date: '2026-03-04' },
  { rank: 5, name: 'Gary', score: 6, time: '19:15', date: '2026-03-05' }
]

export default function LeaderboardScreen() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 scanlines font-mono select-none">
      <section className="leaderboard-container bg-slate-900 border-4 border-slate-700 rounded-xl p-6 shadow-2xl space-y-6">
        <header className="text-center border-b-2 border-slate-800 pb-4">
          <h1 className="text-2xl font-bold text-yellow-400">
            Tabla de Clasificación Global
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Los mejores entrenadores que han desafiado el Gym Rush de Kanto
          </p>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-amber-400 uppercase">
              <tr>
                <th scope="col" className="p-3">Pos</th>
                <th scope="col" className="p-3">Entrenador</th>
                <th scope="col" className="p-3">Medallas</th>
                <th scope="col" className="p-3">Tiempo</th>
                <th scope="col" className="p-3">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {MOCK_LEADERS.map((entry) => (
                <tr key={entry.rank} className="hover:bg-slate-800/60 transition-colors">
                  <td className="p-3 font-bold text-yellow-300">#{entry.rank}</td>
                  <td className="p-3 font-bold text-white">{entry.name}</td>
                  <td className="p-3 text-amber-300">{entry.score} / 8</td>
                  <td className="p-3 text-slate-300">{entry.time}</td>
                  <td className="p-3 text-slate-400">{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded border-2 border-slate-600 text-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-yellow-400"
          >
            Volver al inicio
          </button>
        </div>
      </section>
    </main>
  )
}
