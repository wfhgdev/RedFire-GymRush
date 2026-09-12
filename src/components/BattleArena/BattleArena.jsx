import { useState } from 'react'
import './BattleArena.css'

export default function BattleArena({
  activePlayerPokemon,
  activeOpponentPokemon,
  gymLeader,
  potionsRemaining,
  combatLog = [],
  onExecuteMove,
  onUsePotion,
  onOpenSwitchModal,
  onOpenInfo
}) {
  const [showMovesMenu, setShowMovesMenu] = useState(false)

  const opponentHpPercent = activeOpponentPokemon && activeOpponentPokemon.maxHp > 0
    ? Math.round((activeOpponentPokemon.hp / activeOpponentPokemon.maxHp) * 100)
    : 0

  const playerHpPercent = activePlayerPokemon && activePlayerPokemon.maxHp > 0
    ? Math.round((activePlayerPokemon.hp / activePlayerPokemon.maxHp) * 100)
    : 0

  const handleSelectMove = (moveIndex) => {
    onExecuteMove(moveIndex)
    setShowMovesMenu(false)
  }

  const getHpColorClass = (percent) => {
    if (percent > 50) return 'bg-emerald-500'
    if (percent > 20) return 'bg-amber-500'
    return 'bg-red-500'
  }

  return (
    <div className="flex-1 flex flex-col justify-between space-y-4 font-mono select-none">
      <div
        className="battle-arena-stage bg-slate-950 border-4 border-slate-800 rounded-xl p-4 flex-1 flex flex-col justify-between relative min-h-[340px] overflow-hidden"
        style={{
          backgroundImage: gymLeader?.backgroundImg ? `url(${gymLeader.backgroundImg})` : 'none'
        }}
      >
        <div className="absolute inset-0 bg-slate-950/50 pointer-events-none" />

        <div className="flex items-start justify-between relative z-10">
          <div className="bg-slate-900/90 border-2 border-slate-700 rounded-lg p-3 w-56 shadow-md backdrop-blur-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-white">
                {activeOpponentPokemon?.name || 'Rival'}
              </span>
              <span className="text-[10px] font-bold text-amber-400">
                Nv. {activeOpponentPokemon?.level || 1}
              </span>
            </div>

            <div className="w-full bg-slate-950 border border-slate-700 rounded-full h-3 p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-300 ${getHpColorClass(opponentHpPercent)}`}
                style={{ width: `${Math.max(0, Math.min(100, opponentHpPercent))}%` }}
              />
            </div>
            <span className="text-[9px] text-slate-400 block text-right mt-0.5">
              PS: {opponentHpPercent}%
            </span>
          </div>

          <div className="w-28 h-28 bg-transparent border-2 border-transparent rounded-lg p-2 flex items-center justify-center shadow-lg backdrop-blur-xs">
            <img
              src={
                activeOpponentPokemon?.sprites?.front ||
                activeOpponentPokemon?.sprite ||
                gymLeader?.sprite
              }
              alt={`Pokémon oponente ${activeOpponentPokemon?.name || gymLeader?.name}`}
              className="max-h-full max-w-full object-contain drop-shadow"
            />
          </div>
        </div>

        <div className="flex items-end justify-between relative z-10">
          <div className="w-28 h-28 bg-transparent border-2 border-transparent rounded-lg p-2 flex items-center justify-center shadow-lg backdrop-blur-xs">
            {activePlayerPokemon && (
              <img
                src={
                  activePlayerPokemon.sprites?.back ||
                  activePlayerPokemon.sprites?.front ||
                  activePlayerPokemon.sprite
                }
                alt={`Tu Pokémon ${activePlayerPokemon.name}`}
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
                className={`h-full rounded-full transition-all duration-300 ${getHpColorClass(playerHpPercent)}`}
                style={{ width: `${Math.max(0, Math.min(100, playerHpPercent))}%` }}
              />
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
                  className={idx === 0 ? 'text-yellow-300 font-bold' : 'text-slate-400'}
                >
                  {log}
                </p>
              ))
            ) : (
              <p className="text-yellow-400 font-bold">
                ¡{activePlayerPokemon?.name} entra en combate contra {gymLeader?.name}!
              </p>
            )}
          </div>

          <span className="text-[9px] text-amber-500/80 mt-1 block font-bold">
            Pociones restantes: {potionsRemaining} / 6
          </span>
        </div>

        {!showMovesMenu ? (
          <div className="grid grid-cols-2 gap-2 w-full md:w-72 shrink-0">
            <button
              type="button"
              onClick={() => setShowMovesMenu(true)}
              className="py-3 px-3 bg-red-700 hover:bg-red-600 text-white font-bold rounded border-2 border-red-500 text-xs shadow cursor-pointer active:scale-95 transition-transform focus-visible:outline-2 focus-visible:outline-yellow-400"
            >
              LUCHAR
            </button>

            <button
              type="button"
              onClick={onOpenSwitchModal}
              className="py-3 px-3 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded border-2 border-blue-500 text-xs shadow cursor-pointer active:scale-95 transition-transform focus-visible:outline-2 focus-visible:outline-yellow-400"
            >
              POKÉMON
            </button>

            <button
              type="button"
              onClick={onUsePotion}
              disabled={potionsRemaining <= 0}
              className={`py-3 px-3 font-bold rounded border-2 text-xs shadow cursor-pointer active:scale-95 transition-transform focus-visible:outline-2 focus-visible:outline-yellow-400 ${
                potionsRemaining > 0
                  ? 'bg-amber-700 hover:bg-amber-600 text-white border-amber-500'
                  : 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
              }`}
            >
              MOCHILA ({potionsRemaining})
            </button>

            <button
              type="button"
              onClick={onOpenInfo}
              className="py-3 px-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold rounded border-2 border-slate-500 text-xs shadow cursor-pointer active:scale-95 transition-transform focus-visible:outline-2 focus-visible:outline-yellow-400"
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
                  onClick={() => handleSelectMove(idx)}
                  disabled={move.pp <= 0}
                  className={`p-2 font-bold rounded border text-[11px] text-left flex flex-col justify-between transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-yellow-400 ${
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
              className="py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold rounded border border-slate-600 cursor-pointer focus-visible:outline-2 focus-visible:outline-yellow-400"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
