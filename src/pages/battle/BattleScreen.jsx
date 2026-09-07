import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useBattle } from '../../hooks/useBattle'
import redAvatar from '../../assets/svg/Red.svg'
import leafAvatar from '../../assets/svg/Leaf.svg'
import brockSprite from '../../assets/svg/Brock.svg'
import mistySprite from '../../assets/svg/Misty.svg'
import surgeSprite from '../../assets/svg/Surge.svg'
import erikaSprite from '../../assets/svg/Erika.svg'
import kogaSprite from '../../assets/svg/Koga.svg'
import sabrinaSprite from '../../assets/svg/Sabrina.svg'
import blaineSprite from '../../assets/svg/Blaine.svg'
import giovanniSprite from '../../assets/svg/Giovanni.svg'
import './BattleScreen.css'

export default function BattleScreen() {
  const location = useLocation()
  const navigate = useNavigate()
  const { playerName = 'Entrenador', gender = 'male' } = location.state || {}

  const {
    playerTeam,
    currentGymIndex,
    currentGymLeader,
    activePlayerPokemon,
    activeOpponentPokemon,
    potionsRemaining,
    battleStatus,
    combatLog,
    setBattleStatus,
    executeMove,
    usePotion,
    switchPokemon,
    advanceGymLeader,
    selectLeadPokemon,
    resetBattle,
    continueIntro,
    dismissEvolution
  } = useBattle({ gender })

  const [showSwitchModal, setShowSwitchModal] = useState(false)
  const [showMovesMenu, setShowMovesMenu] = useState(false)

  const leaderSprites = {
    Brock: brockSprite,
    Misty: mistySprite,
    'Lt. Surge': surgeSprite,
    Erika: erikaSprite,
    Koga: kogaSprite,
    Sabrina: sabrinaSprite,
    Blaine: blaineSprite,
    Giovanni: giovanniSprite
  }

  const currentLeaderSprite =
    leaderSprites[currentGymLeader?.name] || brockSprite

  const handleSelectLead = (index) => {
    selectLeadPokemon(index)
    setShowSwitchModal(false)
  }

  const handleGymVictory = () => {
    if (currentGymIndex === 7) {
      navigate('/victory-screen', { state: { playerName } })
      return
    }
    advanceGymLeader()
  }

  const handleSwitchInCombat = (index) => {
    switchPokemon(index)
    setShowSwitchModal(false)
    setShowMovesMenu(false)
  }

  const handleExecuteMove = (moveIndex) => {
    executeMove(moveIndex)
    setShowMovesMenu(false)
  }

  const opponentHpPercent = activeOpponentPokemon
    ? Math.round((activeOpponentPokemon.hp / activeOpponentPokemon.maxHp) * 100)
    : 0

  const playerHpPercent = activePlayerPokemon
    ? Math.round((activePlayerPokemon.hp / activePlayerPokemon.maxHp) * 100)
    : 0

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 scanlines select-none font-mono">
      <div className="w-full max-w-4xl bg-slate-900 border-4 border-slate-700 rounded-xl p-4 shadow-2xl relative overflow-hidden flex flex-col min-h-[620px]">
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
              Combate {currentGymIndex + 1} de 8
            </span>
            <span className="text-xs text-slate-300 font-bold">
              {currentGymLeader?.title}
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

        {battleStatus === 'intro' && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-950/90 border-2 border-slate-800 rounded-lg animate-fade-in space-y-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-36 h-36 bg-slate-900 border-4 border-amber-400 rounded-xl p-2 flex items-center justify-center shadow-xl">
                <img
                  src={currentLeaderSprite}
                  alt={currentGymLeader?.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-yellow-400">
                  {currentGymLeader?.name}
                </h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                  {currentGymLeader?.title}
                </p>
              </div>
            </div>

            <div className="w-full max-w-2xl bg-slate-900 border-4 border-blue-600 rounded-xl p-5 shadow-2xl relative">
              <div className="bg-slate-950 border-2 border-slate-800 rounded-lg p-4 mb-4">
                <p className="text-sm md:text-base text-white leading-relaxed font-bold">
                  "{currentGymLeader?.dialogue}"
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={continueIntro}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg border-2 border-blue-300 shadow-md text-xs tracking-wider cursor-pointer active:scale-95 transition-transform"
                >
                  Continuar ▶
                </button>
              </div>
            </div>
          </div>
        )}

        {battleStatus === 'select_lead' && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-950/90 border-2 border-slate-800 rounded-lg animate-fade-in space-y-6">
            <div className="text-center bg-slate-900 border-2 border-slate-700 rounded-lg px-6 py-3 shadow-inner">
              <h2 className="text-lg md:text-xl font-bold text-yellow-400">
                Selecciona tu Pokémon Inicial de Combate
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                ¿Qué Pokémon liderará el enfrentamiento contra {currentGymLeader?.name}?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {playerTeam.map((poke, index) => (
                <button
                  key={poke.key}
                  type="button"
                  onClick={() => handleSelectLead(index)}
                  className="group flex flex-col items-center bg-slate-900 hover:bg-blue-950/80 border-4 border-slate-700 hover:border-blue-400 rounded-xl p-4 transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
                >
                  <div className="w-20 h-20 bg-slate-950 border-2 border-slate-800 rounded-lg p-1.5 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <img
                      src={poke.sprites?.front || poke.sprite}
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

        {battleStatus === 'evolution' && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-950/90 border-2 border-slate-800 rounded-lg animate-fade-in">
            <div className="w-full max-w-lg bg-slate-900 border-4 border-yellow-400 rounded-xl p-8 text-center space-y-6 shadow-2xl">
              <span className="text-5xl block">★</span>
              <h2 className="text-2xl font-bold text-yellow-300">¡Evolución!</h2>
              <p className="text-sm text-white font-bold">
                ¡Tu Pokémon evolucionó a Etapa {currentGymIndex === 2 ? '2' : '3'}!
              </p>
              <button
                type="button"
                onClick={dismissEvolution}
                className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold rounded border-2 border-yellow-200 cursor-pointer"
              >
                Continuar ▶
              </button>
            </div>
          </div>
        )}

        {battleStatus === 'battle' && (
          <div className="flex-1 flex flex-col justify-between space-y-4">
            <div
              className="bg-slate-950 border-4 border-slate-800 rounded-xl p-4 flex-1 flex flex-col justify-between relative min-h-[340px] bg-cover bg-center overflow-hidden"
              style={{
                backgroundImage: `url(${currentGymLeader?.backgroundImg})`
              }}
            >
              <div className="absolute inset-0 bg-slate-950/50 pointer-events-none"></div>

              <div className="flex items-start justify-between relative z-10">
                <div className="bg-slate-900/90 border-2 border-slate-700 rounded-lg p-3 w-56 shadow-md backdrop-blur-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-white">
                      {activeOpponentPokemon?.name}
                    </span>
                    <span className="text-[10px] font-bold text-amber-400">
                      Nv. {activeOpponentPokemon?.level}
                    </span>
                  </div>

                  <div className="w-full bg-slate-950 border border-slate-700 rounded-full h-3 p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        opponentHpPercent > 50
                          ? 'bg-emerald-500'
                          : opponentHpPercent > 20
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${opponentHpPercent}%` }}
                    ></div>
                  </div>
                  <span className="text-[9px] text-slate-400 block text-right mt-0.5">
                    PS: {opponentHpPercent}%
                  </span>
                </div>

                <div className="w-28 h-28 bg-transparent border-2 border-transparent rounded-lg p-2 flex items-center justify-center shadow-lg backdrop-blur-xs">
                  <img
                    src={activeOpponentPokemon?.sprites?.front || activeOpponentPokemon?.sprite || currentLeaderSprite}
                    alt={activeOpponentPokemon?.name || currentGymLeader?.name}
                    className="max-h-full max-w-full object-contain drop-shadow"
                  />
                </div>
              </div>

              <div className="flex items-end justify-between relative z-10">
                <div className="w-28 h-28 bg-transparent border-2 border-transparent rounded-lg p-2 flex items-center justify-center shadow-lg backdrop-blur-xs">
                  {activePlayerPokemon && (
                    <img
                      src={activePlayerPokemon.sprites?.back || activePlayerPokemon.sprite}
                      alt={activePlayerPokemon.name}
                      className="max-h-full max-w-full object-contain drop-shadow"
                    />
                  )}
                </div>

                <div className="bg-slate-900/90 border-2 border-slate-700 rounded-lg p-3 w-60 shadow-md backdrop-blur-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-white">
                      {activePlayerPokemon?.name}
                    </span>
                    <span className="text-[10px] font-bold text-amber-400">
                      Nv. {activePlayerPokemon?.level}
                    </span>
                  </div>

                  <div className="w-full bg-slate-950 border border-slate-700 rounded-full h-3 p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        playerHpPercent > 50
                          ? 'bg-emerald-500'
                          : playerHpPercent > 20
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${playerHpPercent}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] px-1.5 py-0.2 bg-slate-800 text-blue-300 rounded font-bold">
                      {activePlayerPokemon?.type}
                    </span>
                    <span className="text-[10px] text-slate-200 font-bold">
                      {activePlayerPokemon?.hp} / {activePlayerPokemon?.maxHp} PS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border-4 border-blue-600 rounded-xl p-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1 bg-slate-950 border-2 border-slate-800 rounded-lg p-3 text-xs leading-relaxed text-slate-200 flex flex-col justify-between min-h-[110px]">
                <div className="space-y-1 overflow-y-auto max-h-[85px] pr-1">
                  {combatLog.length > 0 ? (
                    combatLog.slice(0, 3).map((log, idx) => (
                      <p
                        key={idx}
                        className={
                          idx === 0
                            ? 'text-yellow-300 font-bold'
                            : 'text-slate-400'
                        }
                      >
                        {log}
                      </p>
                    ))
                  ) : (
                    <p className="text-yellow-400 font-bold">
                      ¡{activePlayerPokemon?.name} entra en combate contra{' '}
                      {currentGymLeader?.name}!
                    </p>
                  )}
                </div>

                <span className="text-[9px] text-amber-500/80 mt-1 block">
                  Pociones restantes: {potionsRemaining} / 6
                </span>
              </div>

              {!showMovesMenu ? (
                <div className="grid grid-cols-2 gap-2 w-full md:w-72 shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowMovesMenu(true)}
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
                    onClick={usePotion}
                    disabled={potionsRemaining <= 0}
                    className={`py-3 px-3 font-bold rounded border-2 text-xs shadow cursor-pointer active:scale-95 transition-transform ${
                      potionsRemaining > 0
                        ? 'bg-amber-700 hover:bg-amber-600 text-white border-amber-500'
                        : 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
                    }`}
                  >
                    MOCHILA ({potionsRemaining})
                  </button>

                  <button
                    type="button"
                    onClick={() => setBattleStatus('intro')}
                    className="py-3 px-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold rounded border-2 border-slate-500 text-xs shadow cursor-pointer active:scale-95 transition-transform"
                  >
                    INFO
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 w-full md:w-72 shrink-0">
                  <div className="grid grid-cols-2 gap-2">
                    {activePlayerPokemon?.moves.map((move, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleExecuteMove(idx)}
                        disabled={move.pp <= 0}
                        className={`p-2 font-bold rounded border text-[11px] text-left flex flex-col justify-between transition-transform cursor-pointer ${
                          move.pp > 0
                            ? 'bg-slate-800 hover:bg-red-900/80 text-white border-slate-600 active:scale-95'
                            : 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed'
                        }`}
                      >
                        <span className="truncate">{move.name}</span>
                        <span className="text-[9px] text-slate-400 self-end">
                          PP {move.pp}/{move.maxPp}
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowMovesMenu(false)}
                    className="py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold rounded border border-slate-600 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {battleStatus === 'leader_defeat' && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-950/90 border-2 border-slate-800 rounded-lg animate-fade-in space-y-6">
            <div className="w-full max-w-lg bg-slate-900 border-4 border-green-500 rounded-xl p-6 text-center space-y-4 shadow-2xl">
              <h2 className="text-2xl font-bold text-green-400">
                ¡Victoria de Gimnasio!
              </h2>

              <p className="text-sm text-slate-200">
                "¡{currentGymLeader?.dialogue}"
              </p>

              <button
                type="button"
                onClick={handleGymVictory}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-bold text-sm rounded-lg border-2 border-green-300 shadow-lg cursor-pointer transition-transform active:scale-95"
              >
                {currentGymIndex === 7 ? 'Ver victoria final ▶' : 'Cerrar diálogo ▶'}
              </button>
            </div>
          </div>
        )}

        {battleStatus === 'leader_victory' && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-950/90 border-2 border-slate-800 rounded-lg animate-fade-in space-y-6">
            <div className="w-full max-w-lg bg-slate-900 border-4 border-red-600 rounded-xl p-6 text-center space-y-4 shadow-2xl">
              <h2 className="text-2xl font-bold text-red-500">
                ¡{currentGymLeader?.name} ha ganado!
              </h2>

              <p className="text-sm text-slate-300">
                "¡Todos tus Pokémon se han debilitado! ¡Vuelve a entrenar y regresa más fuerte!"
              </p>

              <button
                type="button"
                onClick={() => setBattleStatus('game_over')}
                className="px-8 py-3 bg-red-700 hover:bg-red-600 text-white font-bold text-sm rounded-lg border-2 border-red-400 shadow-lg cursor-pointer transition-transform active:scale-95"
              >
                Continuar ▶
              </button>
            </div>
          </div>
        )}

        {battleStatus === 'game_over' && (
          <div className="absolute inset-0 bg-slate-950/95 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-slate-900 border-4 border-red-500 rounded-xl p-8 text-center space-y-6 shadow-2xl">
              <h2 className="text-4xl font-bold text-red-400">GAME OVER</h2>
              <p className="text-sm text-slate-200">El desafío terminó por ahora.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  type="button"
                  onClick={resetBattle}
                  className="px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-bold rounded border-2 border-red-400 cursor-pointer"
                >
                  Reiniciar desafío
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded border-2 border-slate-500 cursor-pointer"
                >
                  Volver al inicio
                </button>
              </div>
            </div>
          </div>
        )}

        {battleStatus === 'game_clear' && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-950/90 border-2 border-slate-800 rounded-lg animate-fade-in space-y-6">
            <div className="w-full max-w-lg bg-slate-900 border-4 border-yellow-400 rounded-xl p-6 text-center space-y-4 shadow-2xl">
              <span className="text-5xl block">🏆</span>
              <h2 className="text-2xl font-bold text-yellow-400">
                ¡DESAFÍO COMPLETADO!
              </h2>

              <p className="text-sm text-slate-200">
                ¡Felicidades, <span className="font-bold text-yellow-300">{playerName}</span>!
                ¡Has vencido a los 8 Líderes de Gimnasio de Kanto en el Pokémon Gym Rush!
              </p>

              <button
                type="button"
                onClick={resetBattle}
                className="px-8 py-3 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-slate-950 font-bold text-sm rounded-lg border-2 border-yellow-200 shadow-lg cursor-pointer transition-transform active:scale-95"
              >
                Jugar de Nuevo
              </button>
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
                  const isActive = index === playerTeam.indexOf(activePlayerPokemon)
                  const isFainted = poke.hp <= 0
                  return (
                    <button
                      key={poke.key}
                      type="button"
                      disabled={isActive || isFainted}
                      onClick={() =>
                        battleStatus === 'battle'
                          ? handleSwitchInCombat(index)
                          : handleSelectLead(index)
                      }
                      className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                        isActive
                          ? 'bg-blue-950/40 border-blue-500 opacity-60 cursor-default'
                          : isFainted
                          ? 'bg-red-950/20 border-red-900/50 opacity-40 cursor-not-allowed'
                          : 'bg-slate-950 hover:bg-slate-800 border-slate-700 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-slate-900 border border-slate-700 rounded p-1 flex items-center justify-center">
                          <img
                            src={poke.sprites?.front || poke.sprite}
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
                        <span
                          className={`text-[10px] font-bold ${
                            isFainted ? 'text-red-400' : 'text-slate-300'
                          }`}
                        >
                          {isFainted ? 'Debilitado' : `${poke.hp}/${poke.maxHp} PS`}
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
