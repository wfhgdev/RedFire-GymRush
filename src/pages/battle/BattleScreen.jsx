import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GYM_LEADERS } from '../../data/gymLeaders'
import brockSprite from '../../assets/svg/Brock.svg'
import pikachuSprite from '../../assets/svg/Pikachu.svg'
import bulbasaurSprite from '../../assets/svg/Bulbasaur.svg'
import charmanderSprite from '../../assets/svg/Charmander.svg'
import squirtleSprite from '../../assets/svg/Squirtle.svg'
import redAvatar from '../../assets/svg/Red.svg'
import leafAvatar from '../../assets/svg/Leaf.svg'
import './BattleScreen.css'

export default function BattleScreen() {
  const location = useLocation()
  const navigate = useNavigate()
  const { playerName = 'Entrenador', gender = 'male' } = location.state || {}

  const currentLeader = GYM_LEADERS[0]
  const [phase, setPhase] = useState('intro')
  const [showSwitchModal, setShowSwitchModal] = useState(false)
  const [activePokemonIndex, setActivePokemonIndex] = useState(0)

  const [playerTeam, setPlayerTeam] = useState([
    {
      id: 'pikachu',
      name: 'Pikachu',
      type: 'Eléctrico',
      level: 15,
      hp: 45,
      maxHp: 45,
      sprite: pikachuSprite,
      moves: ['Impactrueno', 'Ataque Rápido', 'Onda Trueno', 'Gruñido']
    },
    {
      id: 'bulbasaur',
      name: 'Bulbasaur',
      type: 'Planta / Veneno',
      level: 15,
      hp: 45,
      maxHp: 45,
      sprite: bulbasaurSprite,
      moves: ['Látigo Cepa', 'Placaje', 'Drenadoras', 'Polvo Veneno']
    },
    {
      id: 'charmander',
      name: 'Charmander',
      type: 'Fuego',
      level: 15,
      hp: 39,
      maxHp: 39,
      sprite: charmanderSprite,
      moves: ['Ascuas', 'Arañazo', 'Gruñido', 'Furia Dragon']
    },
    {
      id: 'squirtle',
      name: 'Squirtle',
      type: 'Agua',
      level: 15,
      hp: 44,
      maxHp: 44,
      sprite: squirtleSprite,
      moves: ['Pistola Agua', 'Placaje', 'Refugio', 'Burbuja']
    }
  ])

  const activePokemon = playerTeam[activePokemonIndex]
  const opponentPokemon = currentLeader.pokemonTeam[0]

  const handleSelectLead = (index) => {
    setActivePokemonIndex(index)
    setPhase('battle')
    setShowSwitchModal(false)
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 scanlines select-none font-mono">
      <div className="w-full max-w-4xl bg-slate-900 border-4 border-slate-700 rounded-xl p-4 shadow-2xl relative overflow-hidden flex flex-col min-h-[600px]">
        <header className="flex items-center justify-between bg-slate-950 border-2 border-slate-800 rounded-lg p-3 mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-800 border border-amber-400 rounded p-0.5 flex items-center justify-center">
              <img
                src={gender === 'female' ? leafAvatar : redAvatar}
                alt={playerName}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <span className="text-xs text-slate-400 uppercase font-bold block">
                Entrenador
              </span>
              <span className="text-sm font-bold text-yellow-300">
                {playerName}
              </span>
            </div>
          </div>

          <div className="text-center">
            <span className="text-xs text-amber-400 font-bold block uppercase tracking-wider">
              Combate 1 de 8
            </span>
            <span className="text-xs text-slate-300 font-bold">
              Gimnasio de Ciudad Plateada
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 rounded text-xs font-bold cursor-pointer transition-colors"
          >
            Salir
          </button>
        </header>

        {phase === 'intro' && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-950/90 border-2 border-slate-800 rounded-lg animate-fade-in space-y-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-36 h-36 bg-slate-900 border-4 border-amber-400 rounded-xl p-2 flex items-center justify-center shadow-xl">
                <img
                  src={brockSprite}
                  alt={currentLeader.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-yellow-400">
                  {currentLeader.name}
                </h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                  {currentLeader.title}
                </p>
              </div>
            </div>

            <div className="w-full max-w-2xl bg-slate-900 border-4 border-blue-600 rounded-xl p-5 shadow-2xl relative">
              <div className="bg-slate-950 border-2 border-slate-800 rounded-lg p-4 mb-4">
                <p className="text-sm md:text-base text-white leading-relaxed font-bold">
                  "{currentLeader.dialogue}"
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setPhase('select_lead')}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg border-2 border-blue-300 shadow-md text-xs tracking-wider cursor-pointer active:scale-95 transition-transform"
                >
                  Continuar ▶
                </button>
              </div>
            </div>
          </div>
        )}

        {phase === 'select_lead' && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-950/90 border-2 border-slate-800 rounded-lg animate-fade-in space-y-6">
            <div className="text-center bg-slate-900 border-2 border-slate-700 rounded-lg px-6 py-3 shadow-inner">
              <h2 className="text-lg md:text-xl font-bold text-yellow-400">
                Selecciona tu Pokémon Inicial de Combate
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                ¿Qué Pokémon liderará el enfrentamiento contra Brock?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {playerTeam.map((poke, index) => (
                <button
                  key={poke.id}
                  type="button"
                  onClick={() => handleSelectLead(index)}
                  className="group flex flex-col items-center bg-slate-900 hover:bg-blue-950/80 border-4 border-slate-700 hover:border-blue-400 rounded-xl p-4 transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
                >
                  <div className="w-20 h-20 bg-slate-950 border-2 border-slate-800 rounded-lg p-1.5 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <img
                      src={poke.sprite}
                      alt={poke.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <span className="font-bold text-white text-sm group-hover:text-yellow-300">
                    {poke.name}
                  </span>

                  <span className="text-[10px] font-bold text-slate-400 mt-0.5">
                    Nivel {poke.level}
                  </span>

                  <span className="text-[10px] px-2 py-0.5 bg-blue-900/60 text-blue-300 rounded border border-blue-700 mt-2 font-bold">
                    {poke.type}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === 'battle' && (
          <div className="flex-1 flex flex-col justify-between space-y-4">
            <div
              className="bg-slate-950 border-4 border-slate-800 rounded-xl p-4 flex-1 flex flex-col justify-between relative min-h-[340px] bg-cover bg-center overflow-hidden"
              style={{ backgroundImage: `url(${currentLeader.backgroundImg})` }}
            >
              <div className="absolute inset-0 bg-slate-950/50 pointer-events-none"></div>

              <div className="flex items-start justify-between relative z-10">
                <div className="bg-slate-900/90 border-2 border-slate-700 rounded-lg p-3 w-56 shadow-md backdrop-blur-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-white">
                      {opponentPokemon.name}
                    </span>
                    <span className="text-[10px] font-bold text-amber-400">
                      Nv. {opponentPokemon.level}
                    </span>
                  </div>

                  <div className="w-full bg-slate-950 border border-slate-700 rounded-full h-3 p-0.5">
                    <div className="bg-emerald-500 h-full rounded-full w-full"></div>
                  </div>
                  <span className="text-[9px] text-slate-400 block text-right mt-0.5">
                    PS: 100%
                  </span>
                </div>

                <div className="w-28 h-28 bg-slate-900/80 border-2 border-slate-700 rounded-lg p-2 flex items-center justify-center shadow-lg backdrop-blur-xs">
                  <img
                    src={brockSprite}
                    alt={currentLeader.name}
                    className="max-h-full max-w-full object-contain drop-shadow"
                  />
                </div>
              </div>

              <div className="flex items-end justify-between relative z-10">

                <div className="w-28 h-28 bg-slate-900/80 border-2 border-slate-700 rounded-lg p-2 flex items-center justify-center shadow-lg">
                  <img
                    src={activePokemon.sprite}
                    alt={activePokemon.name}
                    className="max-h-full max-w-full object-contain drop-shadow"
                  />
                </div>

                <div className="bg-slate-900 border-2 border-slate-700 rounded-lg p-3 w-60 shadow-md">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-white">
                      {activePokemon.name}
                    </span>
                    <span className="text-[10px] font-bold text-amber-400">
                      Nv. {activePokemon.level}
                    </span>
                  </div>

                  <div className="w-full bg-slate-950 border border-slate-700 rounded-full h-3 p-0.5">
                    <div className="bg-emerald-500 h-full rounded-full w-full"></div>
                  </div>

                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] px-1.5 py-0.2 bg-slate-800 text-blue-300 rounded font-bold">
                      {activePokemon.type}
                    </span>
                    <span className="text-[10px] text-slate-200 font-bold">
                      {activePokemon.hp} / {activePokemon.maxHp} PS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border-4 border-blue-600 rounded-xl p-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1 bg-slate-950 border-2 border-slate-800 rounded-lg p-3 text-xs leading-relaxed text-slate-200">
                <p className="font-bold text-yellow-400">
                  ¡{activePokemon.name} entra en combate contra {currentLeader.name}!
                </p>
                <p className="text-slate-400 mt-1">
                  Selecciona una acción para continuar el turno.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 w-full md:w-72">
                <button
                  type="button"
                  className="py-3 px-3 bg-red-700 hover:bg-red-600 text-white font-bold rounded border-2 border-red-500 text-xs shadow cursor-pointer active:scale-95 transition-transform"
                >
                  LUCHAR
                </button>

                <button
                  type="button"
                  onClick={() => setShowSwitchModal(true)}
                  className="py-3 px-3 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded border-2 border-blue-500 text-xs shadow cursor-pointer active:scale-95 transition-transform"
                >
                  POKÉMON
                </button>

                <button
                  type="button"
                  className="py-3 px-3 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded border-2 border-amber-500 text-xs shadow cursor-pointer active:scale-95 transition-transform"
                >
                  MOCHILA
                </button>

                <button
                  type="button"
                  onClick={() => setPhase('intro')}
                  className="py-3 px-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold rounded border-2 border-slate-500 text-xs shadow cursor-pointer active:scale-95 transition-transform"
                >
                  INFO
                </button>
              </div>
            </div>
          </div>
        )}

        {showSwitchModal && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-slate-900 border-4 border-blue-600 rounded-xl p-5 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b-2 border-slate-800 pb-2">
                <h3 className="text-base font-bold text-yellow-400">
                  Cambiar Pokémon Activo
                </h3>
                <button
                  type="button"
                  onClick={() => setShowSwitchModal(false)}
                  className="text-slate-400 hover:text-white font-bold text-xs px-2 py-1 bg-slate-800 rounded border border-slate-700 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {playerTeam.map((poke, index) => {
                  const isActive = index === activePokemonIndex
                  return (
                    <button
                      key={poke.id}
                      type="button"
                      disabled={isActive}
                      onClick={() => handleSelectLead(index)}
                      className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                        isActive
                          ? 'bg-blue-950/40 border-blue-500 opacity-60 cursor-default'
                          : 'bg-slate-950 hover:bg-slate-800 border-slate-700 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-slate-900 border border-slate-700 rounded p-1 flex items-center justify-center">
                          <img
                            src={poke.sprite}
                            alt={poke.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-white text-sm">
                            {poke.name}
                          </p>
                          <span className="text-[10px] text-blue-300 font-bold">
                            {poke.type}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-amber-400 block">
                          Nv. {poke.level}
                        </span>
                        <span className="text-[10px] text-slate-300">
                          {poke.hp}/{poke.maxHp} PS
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
