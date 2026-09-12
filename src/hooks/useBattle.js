import { useState, useCallback, useEffect } from 'react'
import { GYM_LEADERS } from '../data/gymLeaders'
import { fetchMultiplePokemon, fetchPokemonData } from '../services/pokeApi'
import femalePikachuSprite from '../assets/png/PikachuFemale.png'

const INITIAL_STARTERS = [
  {
    id: 25,
    key: 'pikachu',
    name: 'Pikachu',
    type: 'Eléctrico',
    level: 15,
    hp: 45,
    maxHp: 45,
    sprite: femalePikachuSprite,
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
  const sprites = profile.sprites || {}
  if (spriteType === 'intro') {
    return sprites.dreamWorld || sprites.officialArtwork || sprites.front
  }
  if (spriteType === 'back') {
    return gender === 'female' && isPikachu && sprites.backFemale
      ? sprites.backFemale
      : sprites.back || sprites.front
  }
  return gender === 'female' && isPikachu && sprites.frontFemale
    ? sprites.frontFemale
    : sprites.front
}

function applyProfile(pokemon, profile, gender) {
  const isPikachu = pokemon.id === 25
  return {
    ...pokemon,
    name: profile ? profile.name : pokemon.name,
    sprites: {
      front: getProfileSprite(profile, 'front', gender, isPikachu),
      back: getProfileSprite(profile, 'back', gender, isPikachu),
      intro: getProfileSprite(profile, 'intro', gender, isPikachu)
    }
  }
}

export function useBattle({ gender = 'male' } = {}) {
  const [currentGymIndex, setCurrentGymIndex] = useState(0)
  const [playerTeam, setPlayerTeam] = useState(INITIAL_STARTERS)
  const [activePlayerIndex, setActivePlayerIndex] = useState(0)
  const [activeOpponentIndex, setActiveOpponentIndex] = useState(0)
  const [opponentTeam, setOpponentTeam] = useState([])
  const [potionsRemaining, setPotionsRemaining] = useState(6)
  const [battleStatus, setBattleStatus] = useState('intro')
  const [combatLog, setCombatLog] = useState([])

  const currentGymLeader = GYM_LEADERS[currentGymIndex]
  const activePlayerPokemon = playerTeam[activePlayerIndex]
  const activeOpponentPokemon = opponentTeam[activeOpponentIndex]

  const appendLog = useCallback((message) => {
    setCombatLog((prev) => [message, ...prev.slice(0, 8)])
  }, [])

  const loadLeaderTeam = useCallback(
    async (signal) => {
      if (!currentGymLeader) return
      const leaderIds = currentGymLeader.pokemonTeam.map((p) => p.id)
      const profiles = await fetchMultiplePokemon(leaderIds, signal)
      const profileMap = profiles.reduce((map, profile) => {
        map[profile.id] = profile
        return map
      }, {})

      const builtTeam = currentGymLeader.pokemonTeam.map((leaderPoke) => {
        const profile = profileMap[leaderPoke.id]
        const maxHp = 35 + leaderPoke.level * 3
        return {
          id: leaderPoke.id,
          name: leaderPoke.name,
          level: leaderPoke.level,
          hp: maxHp,
          maxHp,
          type: profile?.typeDisplay || 'Normal',
          sprites: {
            front: profile?.sprites?.front || null
          },
          moves: [
            { name: 'Placaje', power: 35, pp: 30, maxPp: 30, type: 'Normal' },
            { name: 'Ataque Furia', power: 45, pp: 20, maxPp: 20, type: 'Normal' }
          ]
        }
      })

      setOpponentTeam(builtTeam)
      setActiveOpponentIndex(0)
    },
    [currentGymLeader]
  )

  const syncPlayerProfiles = useCallback(
    async (signal) => {
      const idsToFetch = playerTeam.map((p) => getStarterId(p.key, currentGymIndex))
      const profiles = await fetchMultiplePokemon(idsToFetch, signal)
      const profileMap = profiles.reduce((map, profile) => {
        map[profile.id] = profile
        return map
      }, {})

      setPlayerTeam((prevTeam) =>
        prevTeam.map((p) => {
          const targetId = getStarterId(p.key, currentGymIndex)
          const profile = profileMap[targetId]
          return applyProfile(p, profile, gender)
        })
      )
    },
    [currentGymIndex, playerTeam, gender]
  )

  useEffect(() => {
    const controller = new AbortController()
    loadLeaderTeam(controller.signal)
    return () => controller.abort()
  }, [loadLeaderTeam])

  useEffect(() => {
    const controller = new AbortController()
    syncPlayerProfiles(controller.signal)
    return () => controller.abort()
  }, [currentGymIndex, syncPlayerProfiles])

  const selectLeadPokemon = useCallback((index) => {
    setActivePlayerIndex(index)
    setBattleStatus('battle')
  }, [])

  const switchPokemon = useCallback(
    (index) => {
      if (index === activePlayerIndex || playerTeam[index].hp <= 0) return
      setActivePlayerIndex(index)
      appendLog(`¡Adelante ${playerTeam[index].name}!`)
    },
    [activePlayerIndex, playerTeam, appendLog]
  )

  const usePotion = useCallback(() => {
    if (potionsRemaining <= 0 || !activePlayerPokemon || activePlayerPokemon.hp <= 0) return
    const healedHp = Math.min(activePlayerPokemon.maxHp, activePlayerPokemon.hp + 20)
    setPlayerTeam((prev) =>
      prev.map((poke, idx) =>
        idx === activePlayerIndex ? { ...poke, hp: healedHp } : poke
      )
    )
    setPotionsRemaining((prev) => prev - 1)
    appendLog(`¡${activePlayerPokemon.name} recuperó 20 PS con una Poción!`)
  }, [potionsRemaining, activePlayerPokemon, activePlayerIndex, appendLog])

  const executeMove = useCallback(
    (moveIndex) => {
      if (!activePlayerPokemon || !activeOpponentPokemon) return
      const selectedMove = activePlayerPokemon.moves[moveIndex]
      if (!selectedMove || selectedMove.pp <= 0) return

      const updatedMoves = activePlayerPokemon.moves.map((m, idx) =>
        idx === moveIndex ? { ...m, pp: m.pp - 1 } : m
      )

      const damage = Math.max(8, Math.floor(selectedMove.power * 0.4 + activePlayerPokemon.level * 0.5))
      const nextOpponentHp = Math.max(0, activeOpponentPokemon.hp - damage)

      setOpponentTeam((prev) =>
        prev.map((poke, idx) =>
          idx === activeOpponentIndex ? { ...poke, hp: nextOpponentHp } : poke
        )
      )

      setPlayerTeam((prev) =>
        prev.map((poke, idx) =>
          idx === activePlayerIndex ? { ...poke, moves: updatedMoves } : poke
        )
      )

      appendLog(`¡${activePlayerPokemon.name} usó ${selectedMove.name}! Causó ${damage} de daño.`)

      if (nextOpponentHp <= 0) {
        appendLog(`¡El ${activeOpponentPokemon.name} enemigo se debilitó!`)
        if (activeOpponentIndex < opponentTeam.length - 1) {
          setActiveOpponentIndex((prev) => prev + 1)
          appendLog(`¡${currentGymLeader.name} envía a ${opponentTeam[activeOpponentIndex + 1].name}!`)
        } else {
          setBattleStatus('leader_defeat')
        }
        return
      }

      const opponentMove = activeOpponentPokemon.moves[0]
      const opponentDamage = Math.max(6, Math.floor(opponentMove.power * 0.35 + activeOpponentPokemon.level * 0.4))
      const nextPlayerHp = Math.max(0, activePlayerPokemon.hp - opponentDamage)

      setPlayerTeam((prev) =>
        prev.map((poke, idx) =>
          idx === activePlayerIndex ? { ...poke, hp: nextPlayerHp } : poke
        )
      )

      appendLog(`¡${activeOpponentPokemon.name} enemigo usó ${opponentMove.name}! Causó ${opponentDamage} de daño.`)

      if (nextPlayerHp <= 0) {
        appendLog(`¡Tu ${activePlayerPokemon.name} se debilitó!`)
        const remainingAliveIndex = playerTeam.findIndex((p, idx) => idx !== activePlayerIndex && p.hp > 0)
        if (remainingAliveIndex !== -1) {
          setActivePlayerIndex(remainingAliveIndex)
          appendLog(`¡Adelante ${playerTeam[remainingAliveIndex].name}!`)
        } else {
          setBattleStatus('leader_victory')
        }
      }
    },
    [
      activePlayerPokemon,
      activeOpponentPokemon,
      activePlayerIndex,
      activeOpponentIndex,
      opponentTeam,
      playerTeam,
      currentGymLeader,
      appendLog
    ]
  )

  const advanceGymLeader = useCallback(() => {
    if (currentGymIndex === 7) {
      setBattleStatus('game_clear')
      return
    }

    const nextIndex = currentGymIndex + 1
    setCurrentGymIndex(nextIndex)

    setPlayerTeam((prev) =>
      prev.map((poke) => ({
        ...poke,
        hp: poke.maxHp,
        level: poke.level + 3,
        maxHp: poke.maxHp + 8,
        moves: poke.moves.map((m) => ({ ...m, pp: m.maxPp }))
      }))
    )

    if (nextIndex === 2 || nextIndex === 5) {
      setBattleStatus('evolution')
    } else {
      setBattleStatus('intro')
    }
  }, [currentGymIndex])

  const resetBattle = useCallback(() => {
    setCurrentGymIndex(0)
    setPlayerTeam(INITIAL_STARTERS)
    setActivePlayerIndex(0)
    setActiveOpponentIndex(0)
    setPotionsRemaining(6)
    setCombatLog([])
    setBattleStatus('intro')
  }, [])

  const continueIntro = useCallback(() => {
    setBattleStatus('select_lead')
  }, [])

  const dismissEvolution = useCallback(() => {
    setBattleStatus('intro')
  }, [])

  return {
    playerTeam,
    opponentTeam,
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
  }
}
