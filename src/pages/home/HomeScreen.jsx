import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePokemon } from '../../hooks/usePokemon'
import gymRushLogo from '../../assets/png/GymRushLogo.png'
import femalePikachuSprite from '../../assets/png/PikachuFemale.png'
import redAvatar from '../../assets/svg/Red.svg'
import leafAvatar from '../../assets/svg/Leaf.svg'
import profesorOak from '../../assets/svg/ProfesorOak.svg'
import './HomeScreen.css'

const STARTER_PREVIEWS = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Eléctrico',
    color: 'bg-yellow-900/60 border-yellow-500 text-yellow-300',
    badge: 'bg-yellow-500 text-slate-950',
    sprite: femalePikachuSprite,
    desc: 'Alta velocidad y ataques de tipo Eléctrico.'
  },
  {
    id: 1,
    name: 'Bulbasaur',
    type: 'Planta / Veneno',
    color: 'bg-emerald-900/60 border-emerald-500 text-emerald-300',
    badge: 'bg-emerald-500 text-slate-950',
    desc: 'Equilibrado con movimientos de drenado y drenaje.'
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fuego',
    color: 'bg-orange-900/60 border-orange-500 text-orange-300',
    badge: 'bg-orange-500 text-slate-950',
    desc: 'Potente ataque especial de tipo Fuego.'
  },
  {
    id: 7,
    name: 'Squirtle',
    type: 'Agua',
    color: 'bg-cyan-900/60 border-cyan-500 text-cyan-300',
    badge: 'bg-cyan-500 text-slate-950',
    desc: 'Gran defensa física e hidráulica.'
  }
]

const UPPER_GRID = [
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
  ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'],
  ['U', 'V', 'W', 'X', 'Y', 'Z', ' ', '.', ',', '-'],
  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
]

const LOWER_GRID = [
  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
  ['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'],
  ['u', 'v', 'w', 'x', 'y', 'z', ' ', '.', ',', '-'],
  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
]

export default function HomeScreen() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [gender, setGender] = useState(null)
  const [playerName, setPlayerName] = useState('')
  const [isUpper, setIsUpper] = useState(true)

  const { pokemon: fetchedStarters } = usePokemon([25, 1, 4, 7])

  const currentGrid = isUpper ? UPPER_GRID : LOWER_GRID

  useEffect(() => {
    if (step !== 1) return
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        setStep(2)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [step])

  useEffect(() => {
    if (step !== 3) return
    const handleKeyDown = (event) => {
      if (event.key === 'Backspace') {
        event.preventDefault()
        setPlayerName((prev) => prev.slice(0, -1))
      } else if (event.key === 'Enter') {
        event.preventDefault()
        if (playerName.trim().length > 0 && gender) {
          setStep(4)
        }
      } else if (
        event.key.length === 1 &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        if (playerName.length < 12) {
          setPlayerName((prev) => prev + event.key)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [step, playerName, gender])

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender)
    setStep(3)
  }

  const handleCharClick = (char) => {
    if (playerName.length < 12) {
      setPlayerName((prev) => prev + char)
    }
  }

  const handleBackspace = () => {
    setPlayerName((prev) => prev.slice(0, -1))
  }

  const handleConfirmName = () => {
    if (playerName.trim().length > 0 && gender) {
      setStep(4)
    }
  }

  const handleStartBattle = () => {
    if (playerName.trim().length > 0 && gender) {
      navigate('/battle', {
        state: { playerName: playerName.trim(), gender }
      })
    }
  }

  const getStarterSprite = (starterItem) => {
    if (starterItem.name === 'Pikachu' && gender === 'female') {
      return femalePikachuSprite
    }
    if (Array.isArray(fetchedStarters)) {
      const match = fetchedStarters.find((p) => p.id === starterItem.id)
      if (match?.sprites?.dreamWorld) return match.sprites.dreamWorld
      if (match?.sprites?.front) return match.sprites.front
    }
    return starterItem.sprite
  }

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4 scanlines select-none font-mono">
      <div className="home-screen-card bg-slate-800 border-4 border-slate-600 rounded-xl p-6 shadow-2xl relative overflow-hidden">
        {step === 1 && (
          <section className="flex flex-col items-center justify-center py-8 space-y-8 animate-fade-in">
            <div className="w-full max-w-md p-4 bg-slate-900/80 rounded-lg border-2 border-slate-700 flex justify-center">
              <img
                src={gymRushLogo}
                alt="Logotipo oficial de GymRush"
                className="max-h-64 object-contain drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]"
              />
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="mt-6 px-8 py-4 bg-gradient-to-r from-red-600 to-amber-600 text-yellow-300 font-bold text-xl rounded-lg border-4 border-yellow-400 shadow-lg hover:scale-105 active:scale-95 transition-transform animate-pulse cursor-pointer tracking-wider focus-visible:outline-2 focus-visible:outline-yellow-400"
            >
              PRESIONA START
            </button>
          </section>
        )}

        {step === 2 && (
          <section className="flex flex-col items-center py-4 space-y-6">
            <div className="w-full bg-slate-900 border-4 border-slate-600 rounded-lg p-4 text-center shadow-inner">
              <h2 className="text-xl md:text-2xl text-yellow-400 font-bold tracking-wide">
                ¿Eres un chico? ¿O eres una chica?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-lg">
              <button
                type="button"
                onClick={() => handleGenderSelect('male')}
                className="group flex flex-col items-center bg-slate-700/80 hover:bg-blue-900/60 border-4 border-blue-500 hover:border-blue-300 rounded-xl p-4 transition-all duration-200 cursor-pointer shadow-md focus-visible:outline-2 focus-visible:outline-yellow-400"
              >
                <div className="w-36 h-36 flex items-center justify-center bg-slate-900/60 rounded-lg p-2 border-2 border-blue-400 mb-3 group-hover:scale-105 transition-transform">
                  <img
                    src={redAvatar}
                    alt="Entrenador Masculino"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <span className="text-lg font-bold text-blue-300 group-hover:text-white">
                  Hombre
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleGenderSelect('female')}
                className="group flex flex-col items-center bg-slate-700/80 hover:bg-pink-900/60 border-4 border-pink-500 hover:border-pink-300 rounded-xl p-4 transition-all duration-200 cursor-pointer shadow-md focus-visible:outline-2 focus-visible:outline-yellow-400"
              >
                <div className="w-36 h-36 flex items-center justify-center bg-slate-900/60 rounded-lg p-2 border-2 border-pink-400 mb-3 group-hover:scale-105 transition-transform">
                  <img
                    src={leafAvatar}
                    alt="Entrenadora Femenina"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <span className="text-lg font-bold text-pink-300 group-hover:text-white">
                  Mujer
                </span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 border-2 border-slate-500 rounded-lg transition-colors cursor-pointer text-sm font-bold focus-visible:outline-2 focus-visible:outline-yellow-400"
            >
              Atrás
            </button>
          </section>
        )}

        {step === 3 && (
          <section className="flex flex-col items-center space-y-4">
            <div className="w-full bg-slate-900 border-4 border-slate-600 rounded-lg p-4 flex items-center space-x-4 shadow-inner">
              <div className="w-16 h-16 bg-slate-800 border-2 border-amber-400 rounded-lg flex items-center justify-center p-1 shrink-0">
                <img
                  src={gender === 'male' ? redAvatar : leafAvatar}
                  alt="Avatar Seleccionado del Entrenador"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="trainer-name-display" className="text-xs text-amber-400 font-bold mb-1 block">
                  ¿TU NOMBRE?
                </label>
                <div id="trainer-name-display" className="bg-slate-950 border-2 border-slate-700 rounded px-3 py-2 flex items-center tracking-widest text-lg font-bold text-white min-h-[44px]">
                  {Array.from({ length: 12 }).map((_, index) => {
                    const char = playerName[index]
                    const isCurrent = index === playerName.length
                    return (
                      <span
                        key={index}
                        className="inline-block w-4 text-center border-b-2 border-slate-500 mx-0.5"
                      >
                        {char ? (
                          char === ' ' ? '\u00A0' : char
                        ) : isCurrent ? (
                          <span className="animate-blink text-yellow-400">_</span>
                        ) : (
                          ''
                        )}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="w-full bg-slate-900 border-4 border-blue-600 rounded-lg p-4 shadow-xl">
              <div className="grid grid-cols-10 gap-1.5 mb-4">
                {currentGrid.flat().map((char, index) => (
                  <button
                    key={`${char}-${index}`}
                    type="button"
                    onClick={() => handleCharClick(char)}
                    aria-label={`Tecla ${char === ' ' ? 'Espacio' : char}`}
                    className="h-10 bg-slate-800 hover:bg-blue-600 text-white font-bold rounded border border-slate-600 hover:border-blue-300 transition-colors flex items-center justify-center text-sm active:scale-90 cursor-pointer focus-visible:outline-2 focus-visible:outline-yellow-400"
                  >
                    {char === ' ' ? '␣' : char}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t-2 border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUpper(!isUpper)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-yellow-300 font-bold rounded border-2 border-slate-500 text-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-yellow-400"
                >
                  {isUpper ? 'minús' : 'MAYÚS'}
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleBackspace}
                    className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white font-bold rounded border-2 border-red-500 text-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-yellow-400"
                  >
                    BORRAR
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirmName}
                    disabled={playerName.trim().length === 0}
                    className={`px-6 py-2 font-bold rounded border-2 text-xs cursor-pointer transition-all focus-visible:outline-2 focus-visible:outline-yellow-400 ${
                      playerName.trim().length > 0
                        ? 'bg-green-600 hover:bg-green-500 text-white border-green-400 shadow-md'
                        : 'bg-slate-700 text-slate-500 border-slate-600 cursor-not-allowed'
                    }`}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-between items-center px-1 pt-1">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 border border-slate-500 rounded text-xs font-bold cursor-pointer focus-visible:outline-2 focus-visible:outline-yellow-400"
              >
                Atrás
              </button>
              <span className="text-[10px] text-slate-400">
                Usa el teclado táctil o físico para escribir
              </span>
            </div>
          </section>
        )}

        {step === 4 && (
          <section className="flex flex-col items-center space-y-6 animate-fade-in">
            <div className="w-full bg-slate-900 border-4 border-slate-600 rounded-xl p-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 shadow-inner">
              <div className="w-32 h-32 bg-slate-800 border-4 border-amber-400 rounded-lg p-2 flex items-center justify-center shrink-0 shadow-lg">
                <img
                  src={profesorOak}
                  alt="Profesor Oak dando instrucciones"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="flex-1 space-y-3">
                <div className="bg-slate-950 border-2 border-slate-700 rounded-lg p-3">
                  <p className="text-yellow-400 font-bold text-sm md:text-base leading-relaxed">
                    ¡Hola, <span className="text-white">{playerName}</span>!
                    ¡Te doy la bienvenida al desafío Pokémon Gym Rush!
                  </p>
                </div>

                <div className="bg-slate-950/80 border border-slate-700 rounded-lg p-3 text-xs space-y-1.5 text-slate-300">
                  <p className="font-bold text-amber-300 mb-1">
                    Reglas del Desafío:
                  </p>
                  <p>
                    • Te enfrentarás a los 8 Líderes de Gimnasio de Kanto de forma consecutiva en un Boss Rush lineal.
                  </p>
                  <p>
                    • Tu equipo inicial consta de 4 Pokémon: Pikachu, Bulbasaur, Charmander y Squirtle.
                  </p>
                  <p>
                    • Toda tu salud (PS) y tus PP se restaurarán automáticamente después de cada combate.
                  </p>
                  <p>
                    • Dispones de un suministro limitado de Pociones para curarte durante los turnos de batalla.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full space-y-3">
              <h3 className="text-sm font-bold text-amber-400 tracking-wider text-center uppercase">
                Tu Equipo de Iniciales
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STARTER_PREVIEWS.map((poke) => (
                  <div
                    key={poke.name}
                    className={`flex items-center space-x-3 border-2 rounded-lg p-3 ${poke.color} shadow-md`}
                  >
                    <div className="w-20 h-20 bg-slate-950/40 border border-slate-700 rounded-lg p-1 flex items-center justify-center shrink-0">
                      <img
                        src={getStarterSprite(poke)}
                        alt={`Sprite de ${poke.name}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white text-sm">
                          {poke.name}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${poke.badge}`}>
                          {poke.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-tight line-clamp-2">
                        {poke.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 border-2 border-slate-500 rounded-lg text-xs font-bold cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-yellow-400"
              >
                Atrás
              </button>

              <button
                type="button"
                onClick={handleStartBattle}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-bold text-sm rounded-lg border-2 border-green-300 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer tracking-wider focus-visible:outline-2 focus-visible:outline-yellow-400"
              >
                ¡Comenzar Desafío!
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
