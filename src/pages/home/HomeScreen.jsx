import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import gymRushLogo from '../../assets/svg/GymRushLogo.svg'
import redAvatar from '../../assets/svg/Red.svg'
import leafAvatar from '../../assets/svg/Leaf.svg'
import './HomeScreen.css'

export default function HomeScreen() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [gender, setGender] = useState(null)
  const [playerName, setPlayerName] = useState('')
  const [isUpper, setIsUpper] = useState(true)

  const upperGrid = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'],
    ['U', 'V', 'W', 'X', 'Y', 'Z', ' ', '.', ',', '-'],
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  ]

  const lowerGrid = [
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
    ['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'],
    ['u', 'v', 'w', 'x', 'y', 'z', ' ', '.', ',', '-'],
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  ]

  const currentGrid = isUpper ? upperGrid : lowerGrid

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
          navigate('/battle', {
            state: { playerName: playerName.trim(), gender }
          })
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
  }, [step, playerName, gender, navigate])

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
      navigate('/battle', {
        state: { playerName: playerName.trim(), gender }
      })
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4 scanlines select-none font-mono">
      <div className="w-full max-w-2xl bg-slate-800 border-4 border-slate-600 rounded-xl p-6 shadow-2xl relative overflow-hidden">
        {step === 1 && (
          <div className="flex flex-col items-center justify-center py-8 space-y-8 animate-fade-in">
            <div className="w-full max-w-md p-4 bg-slate-900/80 rounded-lg border-2 border-slate-700 flex justify-center">
              <img
                src={gymRushLogo}
                alt="GymRush Logo"
                className="max-h-64 object-contain drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]"
              />
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="mt-6 px-8 py-4 bg-gradient-to-r from-red-600 to-amber-600 text-yellow-300 font-bold text-xl rounded-lg border-4 border-yellow-400 shadow-lg hover:scale-105 active:scale-95 transition-transform animate-pulse cursor-pointer tracking-wider"
            >
              PRESIONA START
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center py-4 space-y-6">
            <div className="w-full bg-slate-900 border-4 border-slate-600 rounded-lg p-4 text-center shadow-inner">
              <h2 className="text-xl md:text-2xl text-yellow-400 font-bold tracking-wide">
                ¿Eres un chico? ¿O eres una chica?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-lg">
              <button
                type="button"
                onClick={() => handleGenderSelect('male')}
                className="group flex flex-col items-center bg-slate-700/80 hover:bg-blue-900/60 border-4 border-blue-500 hover:border-blue-300 rounded-xl p-4 transition-all duration-200 cursor-pointer shadow-md"
              >
                <div className="w-36 h-36 flex items-center justify-center bg-slate-900/60 rounded-lg p-2 border-2 border-blue-400 mb-3 group-hover:scale-105 transition-transform">
                  <img
                    src={redAvatar}
                    alt="Hombre"
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
                className="group flex flex-col items-center bg-slate-700/80 hover:bg-pink-900/60 border-4 border-pink-500 hover:border-pink-300 rounded-xl p-4 transition-all duration-200 cursor-pointer shadow-md"
              >
                <div className="w-36 h-36 flex items-center justify-center bg-slate-900/60 rounded-lg p-2 border-2 border-pink-400 mb-3 group-hover:scale-105 transition-transform">
                  <img
                    src={leafAvatar}
                    alt="Mujer"
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
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 border-2 border-slate-500 rounded-lg transition-colors cursor-pointer text-sm font-bold"
            >
              Atrás
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full bg-slate-900 border-4 border-slate-600 rounded-lg p-4 flex items-center space-x-4 shadow-inner">
              <div className="w-16 h-16 bg-slate-800 border-2 border-amber-400 rounded-lg flex items-center justify-center p-1 shrink-0">
                <img
                  src={gender === 'male' ? redAvatar : leafAvatar}
                  alt="Avatar Entrenador"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="flex-1">
                <p className="text-xs text-amber-400 font-bold mb-1">
                  ¿TU NOMBRE?
                </p>
                <div className="bg-slate-950 border-2 border-slate-700 rounded px-3 py-2 flex items-center tracking-widest text-lg font-bold text-white min-h-[44px]">
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
                    className="h-10 bg-slate-800 hover:bg-blue-600 text-white font-bold rounded border border-slate-600 hover:border-blue-300 transition-colors flex items-center justify-center text-sm active:scale-90 cursor-pointer"
                  >
                    {char === ' ' ? '␣' : char}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t-2 border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUpper(!isUpper)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-yellow-300 font-bold rounded border-2 border-slate-500 text-xs cursor-pointer"
                >
                  {isUpper ? 'minús' : 'MAYÚS'}
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleBackspace}
                    className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white font-bold rounded border-2 border-red-500 text-xs cursor-pointer"
                  >
                    BORRAR
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirmName}
                    disabled={playerName.trim().length === 0}
                    className={`px-6 py-2 font-bold rounded border-2 text-xs cursor-pointer transition-all ${
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
                className="px-4 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 border border-slate-500 rounded text-xs font-bold cursor-pointer"
              >
                Atrás
              </button>
              <span className="text-[10px] text-slate-400">
                Usa el teclado táctil o físico para escribir
              </span>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
