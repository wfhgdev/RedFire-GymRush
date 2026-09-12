import './GymLeaderCard.css'

export default function GymLeaderCard({
  leader,
  gymIndex = 0,
  onContinue = null,
  buttonText = 'Continuar ▶'
}) {
  if (!leader) return null

  return (
    <article className="gym-leader-card flex-1 flex flex-col items-center justify-center p-4 bg-slate-950/90 border-2 border-slate-800 rounded-lg space-y-6 select-none font-mono">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-36 h-36 bg-slate-900 border-4 border-amber-400 rounded-xl p-2 flex items-center justify-center shadow-xl">
          <img
            src={leader.sprite}
            alt={`Retrato oficial de ${leader.name}`}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div>
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block">
            Gimnasio {gymIndex + 1} de 8 • {leader.badgeName || 'Medalla Oficial'}
          </span>
          <h2 className="text-2xl font-bold text-yellow-400">
            {leader.name}
          </h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">
            {leader.title}
          </p>
        </div>
      </div>

      <div className="w-full max-w-2xl bg-slate-900 border-4 border-blue-600 rounded-xl p-5 shadow-2xl relative">
        <div className="bg-slate-950 border-2 border-slate-800 rounded-lg p-4 mb-4">
          <p className="text-sm md:text-base text-white leading-relaxed font-bold">
            &ldquo;{leader.dialogue}&rdquo;
          </p>
        </div>

        {leader.pokemonTeam && (
          <div className="mb-4">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2 text-center">
              Equipo del Gimnasio
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {leader.pokemonTeam.map((poke, index) => (
                <div
                  key={`${poke.name}-${index}`}
                  className="px-2.5 py-1 bg-slate-950 border border-slate-700 rounded-md text-[11px] font-bold text-slate-200"
                >
                  <span>{poke.name}</span>
                  <span className="text-amber-400 ml-1.5">Nv. {poke.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {onContinue && (
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onContinue}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg border-2 border-blue-300 shadow-md text-xs tracking-wider cursor-pointer active:scale-95 transition-transform focus-visible:outline-2 focus-visible:outline-yellow-400"
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
