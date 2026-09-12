import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useBattle } from '../../hooks/useBattle'
import GymLeaderCard from '../../components/GymLeaderCard/GymLeaderCard'
import PokemonSelector from '../../components/PokemonSelector/PokemonSelector'
import BattleArena from '../../components/BattleArena/BattleArena'
import redAvatar from '../../assets/svg/Red.svg'
import leafAvatar from '../../assets/svg/Leaf.svg'
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

  const handleSelectLead = (index) => {
    selectLeadPokemon(index)
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
  }

  const activePlayerTeamIndex = playerTeam.indexOf(activePlayerPokemon)

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 scanlines select-none font-mono">
      <div className="battle-screen-container bg-slate-900 border-4 border-slate-700 rounded-xl p-4 shadow-2xl relative overflow-hidden flex flex-col min-h-[620px]">
        <header className="flex items-center justify-between bg-slate-950 border-2 border-slate-800 rounded-lg p-3 mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-800 border border-amber-400 rounded p-0.5 flex items-center justify-center">
              <img
                src={gender === 'female' ? leafAvatar : redAvatar}
                alt={`Avatar de ${playerName}`}
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
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 rounded text-xs font-bold cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-yellow-400"
          >
            Salir
          </button>
        </header>

        {battleStatus === 'intro' && (
          <GymLeaderCard
            leader={currentGymLeader}
            gymIndex={currentGymIndex}
            onContinue={continueIntro}
            buttonText="Continuar ▶"
          />
        )}

        {battleStatus === 'select_lead' && (
          <PokemonSelector
            team={playerTeam}
            onSelect={handleSelectLead}
            title="Selecciona tu Pokémon Inicial de Combate"
            subtitle={`¿Qué Pokémon liderará el enfrentamiento contra ${currentGymLeader?.name}?`}
          />
        )}

        {battleStatus === 'evolution' && (
          <section className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-950/90 border-2 border-slate-800 rounded-lg">
            <div className="w-full max-w-lg bg-slate-900 border-4 border-yellow-400 rounded-xl p-8 text-center space-y-6 shadow-2xl">
              <span className="text-5xl block">★</span>
              <h2 className="text-2xl font-bold text-yellow-300">¡Evolución!</h2>
              <p className="text-sm text-white font-bold">
                ¡Tu equipo Pokémon ha evolucionado a su siguiente etapa!
              </p>
              <button
                type="button"
                onClick={dismissEvolution}
                className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold rounded border-2 border-yellow-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-yellow-400"
              >
                Continuar ▶
              </button>
            </div>
          </section>
        )}

        {battleStatus === 'battle' && (
          <BattleArena
            activePlayerPokemon={activePlayerPokemon}
            activeOpponentPokemon={activeOpponentPokemon}
            gymLeader={currentGymLeader}
            potionsRemaining={potionsRemaining}
            combatLog={combatLog}
            onExecuteMove={executeMove}
            onUsePotion={usePotion}
            onOpenSwitchModal={() => setShowSwitchModal(true)}
            onOpenInfo={() => setBattleStatus('intro')}
          />
        )}

        {battleStatus === 'leader_defeat' && (
          <section className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-950/90 border-2 border-slate-800 rounded-lg space-y-6">
            <div className="w-full max-w-lg bg-slate-900 border-4 border-green-500 rounded-xl p-6 text-center space-y-4 shadow-2xl">
              <h2 className="text-2xl font-bold text-green-400">
                ¡Victoria de Gimnasio!
              </h2>

              <p className="text-sm text-slate-200">
                &ldquo;¡Has demostrado tener la destreza necesaria para ganar la {currentGymLeader?.badgeName}!&rdquo;
              </p>

              <button
                type="button"
                onClick={handleGymVictory}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-bold text-sm rounded-lg border-2 border-green-300 shadow-lg cursor-pointer transition-transform active:scale-95 focus-visible:outline-2 focus-visible:outline-yellow-400"
              >
                {currentGymIndex === 7 ? 'Ver victoria final ▶' : 'Continuar al siguiente Gimnasio ▶'}
              </button>
            </div>
          </section>
        )}

        {battleStatus === 'leader_victory' && (
          <section className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-950/90 border-2 border-slate-800 rounded-lg space-y-6">
            <div className="w-full max-w-lg bg-slate-900 border-4 border-red-600 rounded-xl p-6 text-center space-y-4 shadow-2xl">
              <h2 className="text-2xl font-bold text-red-500">
                ¡{currentGymLeader?.name} ha ganado!
              </h2>

              <p className="text-sm text-slate-300">
                &ldquo;¡Todos tus Pokémon se han debilitado! ¡Vuelve a entrenar y regresa más fuerte!&rdquo;
              </p>

              <button
                type="button"
                onClick={() => setBattleStatus('game_over')}
                className="px-8 py-3 bg-red-700 hover:bg-red-600 text-white font-bold text-sm rounded-lg border-2 border-red-400 shadow-lg cursor-pointer transition-transform active:scale-95 focus-visible:outline-2 focus-visible:outline-yellow-400"
              >
                Continuar ▶
              </button>
            </div>
          </section>
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
                  className="px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-bold rounded border-2 border-red-400 cursor-pointer focus-visible:outline-2 focus-visible:outline-yellow-400"
                >
                  Reiniciar desafío
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded border-2 border-slate-500 cursor-pointer focus-visible:outline-2 focus-visible:outline-yellow-400"
                >
                  Volver al inicio
                </button>
              </div>
            </div>
          </div>
        )}

        {showSwitchModal && (
          <PokemonSelector
            team={playerTeam}
            activePokemonIndex={activePlayerTeamIndex}
            onSelect={handleSwitchInCombat}
            isModal={true}
            onClose={() => setShowSwitchModal(false)}
            title="Cambiar Pokémon Activo"
          />
        )}
      </div>
    </main>
  )
}
