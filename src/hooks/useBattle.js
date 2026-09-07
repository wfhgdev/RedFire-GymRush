import { useState, useCallback, useEffect } from 'react'
import { GYM_LEADERS } from '../data/gymLeaders'
import { fetchPokemonProfiles } from '../services/pokemonService'
import pikachuSprite from '../assets/svg/Pikachu.svg'
import femalePikachuSprite from '../assets/png/PikachuFemale.png'
import bulbasaurSprite from '../assets/svg/Bulbasaur.svg'
import charmanderSprite from '../assets/svg/Charmander.svg'
import squirtleSprite from '../assets/svg/Squirtle.svg'

const INITIAL_STARTERS = [
  {
    id: 25,
    key: 'pikachu',
    name: 'Pikachu',
    type: 'Eléctrico',
    level: 15,
    hp: 45,
    maxHp: 45,
    sprite: pikachuSprite,
    moves: [
      { name: 'Impactrueno', power: 40, pp: 30, maxPp: 30, type: 'Eléctrico' },
      { name: 'Ataque Rápido', power: 40, pp: 30, maxPp: 30, type: 'Normal' },
      { name: 'Onda Trueno', power: 0, pp: 20, maxPp: 20, type: 'Eléctrico' },
      { name: 'Gruñido', power: 0, pp: 40, maxPp: 40, type: 'Normal' }
    ]
  },
  {
    id: 1,
    key: 'bulbasaur',
    name: 'Bulbasaur',
    type: 'Planta / Veneno',
    level: 15,
    hp: 45,
    maxHp: 45,
    sprite: bulbasaurSprite,
    moves: [
      { name: 'Látigo Cepa', power: 45, pp: 25, maxPp: 25, type: 'Planta' },
      { name: 'Placaje', power: 40, pp: 35, maxPp: 35, type: 'Normal' },
      { name: 'Drenadoras', power: 0, pp: 10, maxPp: 10, type: 'Planta' },
      { name: 'Polvo Veneno', power: 0, pp: 15, maxPp: 15, type: 'Veneno' }
    ]
  },
  {
    id: 4,
    key: 'charmander',
    name: 'Charmander',
    type: 'Fuego',
    level: 15,
    hp: 39,
    maxHp: 39,
    sprite: charmanderSprite,
    moves: [
      { name: 'Ascuas', power: 40, pp: 25, maxPp: 25, type: 'Fuego' },
      { name: 'Arañazo', power: 40, pp: 35, maxPp: 35, type: 'Normal' },
      { name: 'Gruñido', power: 0, pp: 40, maxPp: 40, type: 'Normal' },
      { name: 'Furia Dragón', power: 40, pp: 10, maxPp: 10, type: 'Dragón' }
    ]
  },
  {
    id: 7,
    key: 'squirtle',
    name: 'Squirtle',
    type: 'Agua',
    level: 15,
    hp: 44,
    maxHp: 44,
    sprite: squirtleSprite,
    moves: [
      { name: 'Pistola Agua', power: 40, pp: 25, maxPp: 25, type: 'Agua' },
      { name: 'Placaje', power: 40, pp: 35, maxPp: 35, type: 'Normal' },
      { name: 'Refugio', power: 0, pp: 40, maxPp: 40, type: 'Agua' },
      { name: 'Burbuja', power: 20, pp: 30, maxPp: 30, type: 'Agua' }
    ]
  }
]

const STARTER_IDS_BY_TIER = [
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9]
]

function getStarterId(key, gymIndex) {
  if (key === 'pikachu') return 25
  const starterIndex = ['bulbasaur', 'charmander', 'squirtle'].indexOf(key)
  const tier = gymIndex < 2 ? 0 : gymIndex < 5 ? 1 : 2
  return STARTER_IDS_BY_TIER[tier][starterIndex]
}

function getProfileSprite(profile, spriteType, gender, isPikachu) {
  if (!profile) return null
  const sprites = profile.sprites?.other?.showdown || {}
  if (spriteType === 'intro') return profile.sprites?.other?.dream_world?.front_default
  if (spriteType === 'back') {
    return gender === 'female' && isPikachu
      ? sprites.back_female || sprites.back_default
      : sprites.back_default
  }
  return gender === 'female' && isPikachu
    ? sprites.front_female || sprites.front_default
    : sprites.front_default
}

function applyProfile(pokemon, profile, gender) {
  const isPikachu = pokemon.id === 25
  return {
    ...pokemon,
    name: profile?.name
      ? profile.name.charAt(0).toUpperCase() + profile.name.slice(1)
      : pokemon.name,
    sprites: {
      intro: isPikachu && gender === 'female'
        ? femalePikachuSprite
        : getProfileSprite(profile, 'intro', gender, isPikachu),
      front: getProfileSprite(profile, 'front', gender, isPikachu),
      back: getProfileSprite(profile, 'back', gender, isPikachu)
    },
    cry: profile?.cries?.latest || null
  }
}

function getInitialOpponentTeam(leaderIndex) {
  const leader = GYM_LEADERS[leaderIndex]
  if (!leader) return []

  return leader.pokemonTeam.map((poke) => ({
    id: poke.id,
    name: poke.name,
    level: poke.level,
    hp: poke.level * 3 + 20,
    maxHp: poke.level * 3 + 20,
    moves: [
      { name: 'Ataque Base', power: 35, pp: 30, maxPp: 30 }
    ]
  }))
}

export function useBattle({ gender = 'male' } = {}) {
  const [currentGymIndex, setCurrentGymIndex] = useState(0)
  const [playerTeam, setPlayerTeam] = useState(INITIAL_STARTERS)
  const [activePlayerIndex, setActivePlayerIndex] = useState(0)
  const [opponentTeam, setOpponentTeam] = useState(() =>
    getInitialOpponentTeam(0)
  )
  const [activeOpponentIndex, setActiveOpponentIndex] = useState(0)
  const [potionsRemaining, setPotionsRemaining] = useState(6)
  const [battleStatus, setBattleStatus] = useState('intro')
  const [combatLog, setCombatLog] = useState([])

  const currentGymLeader = GYM_LEADERS[currentGymIndex] || GYM_LEADERS[0]
  const activePlayerPokemon = playerTeam[activePlayerIndex]
  const activeOpponentPokemon = opponentTeam[activeOpponentIndex]
  const hydrationKey = [...new Set([
    ...playerTeam.map((pokemon) => pokemon.id),
    ...opponentTeam.map((pokemon) => pokemon.id)
  ])].join(',')

  useEffect(() => {
    const controller = new AbortController()
    const ids = hydrationKey.split(',').filter(Boolean).map(Number)

    fetchPokemonProfiles(ids, controller.signal).then((profiles) => {
      const profilesById = new Map(profiles.map((profile) => [profile.id, profile]))
      setPlayerTeam((previousTeam) => previousTeam.map((pokemon) =>
        applyProfile(pokemon, profilesById.get(pokemon.id), gender)
      ))
      setOpponentTeam((previousTeam) => previousTeam.map((pokemon) =>
        applyProfile(pokemon, profilesById.get(pokemon.id), gender)
      ))
    }).catch(() => {})

    return () => controller.abort()
  }, [currentGymIndex, gender, hydrationKey])

  useEffect(() => {
    if (battleStatus !== 'battle') return
    const cry = activePlayerPokemon?.cry || activeOpponentPokemon?.cry
    if (cry) new Audio(cry).play().catch(() => {})
  }, [battleStatus, activePlayerIndex, activeOpponentIndex, activePlayerPokemon?.cry, activeOpponentPokemon?.cry])

  const restoreTeam = useCallback(() => {
    setPlayerTeam((prev) =>
      prev.map((poke) => ({
        ...poke,
        hp: poke.maxHp,
        moves: poke.moves.map((m) => ({ ...m, pp: m.maxPp }))
      }))
    )
  }, [])

  const appendLog = useCallback((message) => {
    setCombatLog((prev) => [message, ...prev.slice(0, 19)])
  }, [])

  const executeOpponentTurn = useCallback(
    (updatedPlayerTeam, playerIndex) => {
      const currentOpponent = opponentTeam[activeOpponentIndex]
      if (!currentOpponent || currentOpponent.hp <= 0) return

      const move = currentOpponent.moves[0]
      const damage = Math.floor(move.power * (currentOpponent.level / 15))

      setPlayerTeam((prev) => {
        const nextTeam = [...prev]
        const target = { ...nextTeam[playerIndex] }
        target.hp = Math.max(0, target.hp - damage)
        nextTeam[playerIndex] = target

        if (target.hp === 0) {
          appendLog(
            `¡${currentOpponent.name} de ${currentGymLeader.name} usó ${move.name}! ¡${target.name} se debilitó!`
          )

          const hasAlive = nextTeam.some((p) => p.hp > 0)
          if (!hasAlive) {
            setBattleStatus('leader_victory')
            appendLog('¡Todos tus Pokémon se han debilitado! Has sido derrotado.')
          }
        } else {
          appendLog(
            `¡${currentOpponent.name} enemigo usó ${move.name} y causó ${damage} de daño!`
          )
        }

        return nextTeam
      })
    },
    [opponentTeam, activeOpponentIndex, currentGymLeader, appendLog]
  )

  const executeMove = useCallback(
    (moveIndex) => {
      if (battleStatus !== 'battle') return
      if (!activePlayerPokemon || activePlayerPokemon.hp <= 0) return
      if (!activeOpponentPokemon || activeOpponentPokemon.hp <= 0) return

      const move = activePlayerPokemon.moves[moveIndex]
      if (!move || move.pp <= 0) {
        appendLog('¡No quedan PP para este movimiento!')
        return
      }

      setPlayerTeam((prev) => {
        const next = [...prev]
        const current = { ...next[activePlayerIndex] }
        const nextMoves = [...current.moves]
        nextMoves[moveIndex] = { ...move, pp: move.pp - 1 }
        current.moves = nextMoves
        next[activePlayerIndex] = current
        return next
      })

      const baseDamage = move.power > 0 ? Math.floor(move.power * 0.8) + 8 : 5
      const newOpponentHp = Math.max(0, activeOpponentPokemon.hp - baseDamage)

      appendLog(
        `¡${activePlayerPokemon.name} usó ${move.name}! Causó ${baseDamage} de daño.`
      )

      setOpponentTeam((prev) => {
        const nextOpponents = [...prev]
        nextOpponents[activeOpponentIndex] = {
          ...nextOpponents[activeOpponentIndex],
          hp: newOpponentHp
        }
        return nextOpponents
      })

      if (newOpponentHp <= 0) {
        appendLog(`¡${activeOpponentPokemon.name} enemigo se debilitó!`)

        const nextOpponentIdx = opponentTeam.findIndex(
          (p, idx) => idx > activeOpponentIndex && p.hp > 0
        )

        if (nextOpponentIdx !== -1) {
          setActiveOpponentIndex(nextOpponentIdx)
          appendLog(
            `¡${currentGymLeader.name} envió a ${opponentTeam[nextOpponentIdx].name}!`
          )
        } else {
          setBattleStatus('leader_defeat')
          appendLog(
            `¡Has derrotado a ${currentGymLeader.name}! ¡Victoria de gimnasio!`
          )
        }
      } else {
        setTimeout(() => {
          executeOpponentTurn(playerTeam, activePlayerIndex)
        }, 500)
      }
    },
    [
      battleStatus,
      activePlayerPokemon,
      activeOpponentPokemon,
      activePlayerIndex,
      activeOpponentIndex,
      opponentTeam,
      playerTeam,
      currentGymLeader,
      appendLog,
      executeOpponentTurn
    ]
  )

  const usePotion = useCallback(() => {
    if (potionsRemaining <= 0) {
      appendLog('¡No te quedan pociones!')
      return
    }

    if (!activePlayerPokemon || activePlayerPokemon.hp >= activePlayerPokemon.maxHp) {
      appendLog('¡El Pokémon activo ya tiene la salud al máximo!')
      return
    }

    const healAmount = 50
    const newHp = Math.min(activePlayerPokemon.maxHp, activePlayerPokemon.hp + healAmount)
    const recovered = newHp - activePlayerPokemon.hp

    setPotionsRemaining((prev) => prev - 1)
    setPlayerTeam((prev) => {
      const next = [...prev]
      next[activePlayerIndex] = {
        ...next[activePlayerIndex],
        hp: newHp
      }
      return next
    })

    appendLog(
      `Usaste una Poción en ${activePlayerPokemon.name}. ¡Recuperó ${recovered} PS!`
    )

    setTimeout(() => {
      executeOpponentTurn(playerTeam, activePlayerIndex)
    }, 500)
  }, [
    potionsRemaining,
    activePlayerPokemon,
    activePlayerIndex,
    playerTeam,
    appendLog,
    executeOpponentTurn
  ])

  const switchPokemon = useCallback(
    (targetIndex) => {
      if (targetIndex === activePlayerIndex) return
      const target = playerTeam[targetIndex]
      if (!target || target.hp <= 0) {
        appendLog('¡Ese Pokémon está debilitado y no puede combatir!')
        return
      }

      setActivePlayerIndex(targetIndex)
      appendLog(`¡Adelante, ${target.name}!`)

      setTimeout(() => {
        executeOpponentTurn(playerTeam, targetIndex)
      }, 500)
    },
    [activePlayerIndex, playerTeam, appendLog, executeOpponentTurn]
  )

  const selectLeadPokemon = useCallback(
    (targetIndex) => {
      if (playerTeam[targetIndex] && playerTeam[targetIndex].hp > 0) {
        setActivePlayerIndex(targetIndex)
        setBattleStatus('battle')
        appendLog(
          `¡Comienza la batalla! ${playerTeam[targetIndex].name} entra al combate.`
        )
      }
    },
    [playerTeam, appendLog]
  )

  const continueIntro = useCallback(() => {
    setBattleStatus(currentGymIndex === 2 || currentGymIndex === 5 ? 'evolution' : 'select_lead')
  }, [currentGymIndex])

  const dismissEvolution = useCallback(() => {
    setBattleStatus('select_lead')
  }, [])

  const advanceGymLeader = useCallback(() => {
    if (currentGymIndex >= GYM_LEADERS.length - 1) {
      setBattleStatus('game_clear')
      appendLog('¡Felicidades! ¡Has completado el desafío Pokémon Gym Rush!')
      return
    }

    const nextGymIdx = currentGymIndex + 1
    const evolvedTeam = playerTeam.map((pokemon) => ({
      ...pokemon,
      id: getStarterId(pokemon.key, nextGymIdx),
      hp: pokemon.maxHp,
      moves: pokemon.moves.map((move) => ({ ...move, pp: move.maxPp }))
    }))
    setCurrentGymIndex(nextGymIdx)
    setPlayerTeam(evolvedTeam)
    setOpponentTeam(getInitialOpponentTeam(nextGymIdx))
    setActiveOpponentIndex(0)
    restoreTeam()
    setBattleStatus('intro')
    appendLog(
      `¡Has avanzado al Gimnasio ${nextGymIdx + 1}! Tu equipo ha sido restaurado al 100%.`
    )
  }, [currentGymIndex, playerTeam, restoreTeam, appendLog])

  const resetBattle = useCallback(() => {
    setCurrentGymIndex(0)
    setPlayerTeam(INITIAL_STARTERS)
    setActivePlayerIndex(0)
    setOpponentTeam(getInitialOpponentTeam(0))
    setActiveOpponentIndex(0)
    setPotionsRemaining(6)
    setBattleStatus('intro')
    setCombatLog([])
    restoreTeam()
  }, [restoreTeam])

  return {
    playerTeam,
    currentGymIndex,
    currentGymLeader,
    activePlayerPokemon,
    activeOpponentPokemon,
    potionsRemaining,
    battleStatus,
    combatLog,
    setBattleStatus,
    continueIntro,
    dismissEvolution,
    executeMove,
    usePotion,
    switchPokemon,
    advanceGymLeader,
    selectLeadPokemon,
    resetBattle,
    restoreTeam
  }
}
