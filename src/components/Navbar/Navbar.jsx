import { Link, useLocation } from 'react-router-dom'
import gymRushLogo from '../../assets/png/GymRushLogo.png'
import redAvatar from '../../assets/svg/Red.svg'
import leafAvatar from '../../assets/svg/Leaf.svg'
import './Navbar.css'

export default function Navbar({ playerName = null, gender = 'male' }) {
  const location = useLocation()

  return (
    <header className="w-full bg-slate-950/90 border-b-4 border-slate-800 backdrop-blur-md sticky top-0 z-40 px-4 py-2 select-none font-mono">
      <nav className="navbar-container max-w-5xl mx-auto flex items-center justify-between" aria-label="Navegación principal">
        <Link
          to="/"
          className="flex items-center space-x-3 group focus-visible:outline-2 focus-visible:outline-yellow-400 rounded"
        >
          <img
            src={gymRushLogo}
            alt="Logotipo de Pokémon Gym Rush"
            className="h-10 object-contain drop-shadow transition-transform group-hover:scale-105"
          />
          <span className="hidden sm:inline text-sm font-bold text-yellow-400 tracking-wider">
            GYM RUSH
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-yellow-400 ${
              location.pathname === '/'
                ? 'bg-red-600 text-white shadow'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            Inicio
          </Link>

          <Link
            to="/leaderboard"
            className={`px-3 py-1.5 rounded text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-yellow-400 ${
              location.pathname === '/leaderboard'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            Clasificación
          </Link>

          {playerName && (
            <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 px-2.5 py-1 rounded-lg">
              <div className="w-6 h-6 bg-slate-800 border border-amber-400 rounded p-0.5 flex items-center justify-center">
                <img
                  src={gender === 'female' ? leafAvatar : redAvatar}
                  alt={`Avatar del entrenador ${playerName}`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="text-xs font-bold text-yellow-300 truncate max-w-[100px]">
                {playerName}
              </span>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
