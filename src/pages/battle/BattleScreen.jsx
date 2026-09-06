import { useLocation } from 'react-router-dom'
import redAvatar from '../../assets/svg/Red.svg'
import leafAvatar from '../../assets/svg/Leaf.svg'
import './BattleScreen.css'

export default function BattleScreen() {
  const location = useLocation()
  const { playerName, gender } = location.state || {}

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4 scanlines font-mono">
      <div className="w-full max-w-xl bg-slate-800 border-4 border-slate-600 rounded-xl p-6 shadow-2xl text-center">
        <h1 className="text-2xl md:text-3xl text-yellow-400 font-bold mb-4">
          Arena de Batalla
        </h1>

        {playerName && (
          <div className="flex flex-col items-center justify-center space-y-3 bg-slate-900 border-2 border-slate-700 rounded-lg p-4 mb-4">
            <div className="w-24 h-24 bg-slate-800 border-2 border-amber-400 rounded-lg p-2 flex items-center justify-center">
              <img
                src={gender === 'female' ? leafAvatar : redAvatar}
                alt={playerName}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <p className="text-lg font-bold text-white">
              Entrenador: <span className="text-yellow-300">{playerName}</span>
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
