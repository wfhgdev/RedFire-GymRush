import './PokemonSelector.css'

export default function PokemonSelector({
  team = [],
  onSelect,
  activePokemonIndex = -1,
  isModal = false,
  onClose = null,
  title = 'Selecciona tu Pokémon',
  subtitle = null
}) {
  const content = (
    <div className={`w-full ${isModal ? 'max-w-lg bg-slate-900 border-4 border-blue-600 rounded-xl p-5 space-y-4 shadow-2xl' : 'space-y-6'}`}>
      <div className={`flex items-center justify-between ${isModal ? 'border-b-2 border-slate-800 pb-2' : 'text-center bg-slate-900 border-2 border-slate-700 rounded-lg px-6 py-3 shadow-inner'}`}>
        <div>
          <h2 className={`${isModal ? 'text-base' : 'text-lg md:text-xl'} font-bold text-yellow-400`}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {isModal && onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana de selección"
            className="text-slate-400 hover:text-white font-bold text-xs px-2 py-1 bg-slate-800 rounded border border-slate-700 cursor-pointer focus-visible:outline-2 focus-visible:outline-yellow-400"
          >
            ✕
          </button>
        )}
      </div>

      <div className={`pokemon-selector-grid ${isModal ? 'grid-cols-1 gap-2' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'}`}>
        {team.map((poke, index) => {
          const isActive = index === activePokemonIndex
          const isFainted = poke.hp !== undefined && poke.hp <= 0
          const spriteSrc = poke.sprites?.front || poke.sprite

          if (isModal) {
            return (
              <button
                key={poke.key || `${poke.name}-${index}`}
                type="button"
                disabled={isActive || isFainted}
                onClick={() => onSelect(index)}
                className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all font-mono ${
                  isActive
                    ? 'bg-blue-950/40 border-blue-500 opacity-60 cursor-default'
                    : isFainted
                    ? 'bg-red-950/20 border-red-900/50 opacity-40 cursor-not-allowed'
                    : 'bg-slate-950 hover:bg-slate-800 border-slate-700 cursor-pointer focus-visible:outline-2 focus-visible:outline-yellow-400'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-slate-900 border border-slate-700 rounded p-1 flex items-center justify-center">
                    <img
                      src={spriteSrc}
                      alt={`Sprite de ${poke.name}`}
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
          }

          return (
            <button
              key={poke.key || `${poke.name}-${index}`}
              type="button"
              onClick={() => onSelect(index)}
              className="group flex flex-col items-center bg-slate-900 hover:bg-blue-950/80 border-4 border-slate-700 hover:border-blue-400 rounded-xl p-4 transition-all duration-200 cursor-pointer shadow-lg active:scale-95 focus-visible:outline-2 focus-visible:outline-yellow-400"
            >
              <div className="w-20 h-20 bg-slate-950 border-2 border-slate-800 rounded-lg p-1.5 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                <img
                  src={spriteSrc}
                  alt={`Sprite de ${poke.name}`}
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
          )
        })}
      </div>
    </div>
  )

  if (isModal) {
    return (
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        {content}
      </div>
    )
  }

  return (
    <section className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-950/90 border-2 border-slate-800 rounded-lg space-y-6 select-none font-mono">
      {content}
    </section>
  )
}
