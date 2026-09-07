import { useLocation, useNavigate } from 'react-router-dom'

export default function VictoryScreen() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const playerName = state?.playerName || 'Entrenador'

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 scanlines font-mono">
      <section className="w-full max-w-xl bg-slate-900 border-4 border-yellow-400 rounded-xl p-8 text-center space-y-6 shadow-2xl">
        <span className="text-6xl block">★</span>
        <h1 className="text-3xl font-bold text-yellow-300">¡Victoria final!</h1>
        <p className="text-sm leading-relaxed">
          ¡{playerName} ha derrotado a los ocho Líderes de Gimnasio de Kanto!
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold rounded border-2 border-yellow-200 cursor-pointer"
        >
          Volver al inicio
        </button>
      </section>
    </main>
  )
}