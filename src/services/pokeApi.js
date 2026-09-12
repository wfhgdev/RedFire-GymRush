import api from './api'

const TYPE_TRANSLATIONS = {
  normal: 'Normal',
  fire: 'Fuego',
  water: 'Agua',
  electric: 'Eléctrico',
  grass: 'Planta',
  ice: 'Hielo',
  fighting: 'Lucha',
  poison: 'Veneno',
  ground: 'Tierra',
  flying: 'Volador',
  psychic: 'Psíquico',
  bug: 'Bicho',
  rock: 'Roca',
  ghost: 'Fantasma',
  dragon: 'Dragón',
  dark: 'Siniestro',
  steel: 'Acero',
  fairy: 'Hada'
}

function transformPokemonData(rawPokemon) {
  if (!rawPokemon) return null

  const types = rawPokemon.types.map(
    (typeInfo) => TYPE_TRANSLATIONS[typeInfo.type.name] || typeInfo.type.name
  )

  const statsMap = rawPokemon.stats.reduce((accumulator, statItem) => {
    accumulator[statItem.stat.name] = statItem.base_stat
    return accumulator
  }, {})

  const showdownSprites = rawPokemon.sprites?.other?.showdown || {}
  const dreamWorldSprite = rawPokemon.sprites?.other?.dream_world?.front_default || null

  return {
    id: rawPokemon.id,
    name: rawPokemon.name.charAt(0).toUpperCase() + rawPokemon.name.slice(1),
    baseName: rawPokemon.name,
    height: rawPokemon.height,
    weight: rawPokemon.weight,
    types,
    typeDisplay: types.join(' / '),
    stats: {
      hp: statsMap.hp || 45,
      attack: statsMap.attack || 49,
      defense: statsMap.defense || 49,
      specialAttack: statsMap['special-attack'] || 65,
      specialDefense: statsMap['special-defense'] || 65,
      speed: statsMap.speed || 45
    },
    sprites: {
      front: showdownSprites.front_default || rawPokemon.sprites?.front_default || null,
      back: showdownSprites.back_default || rawPokemon.sprites?.back_default || null,
      frontFemale: showdownSprites.front_female || rawPokemon.sprites?.front_female || null,
      backFemale: showdownSprites.back_female || rawPokemon.sprites?.back_female || null,
      dreamWorld: dreamWorldSprite,
      officialArtwork: rawPokemon.sprites?.other?.['official-artwork']?.front_default || null
    }
  }
}

export async function fetchPokemonData(idOrName, signal) {
  try {
    const response = await api.get(`/pokemon/${idOrName}`, { signal })
    return transformPokemonData(response.data)
  } catch (error) {
    if (error.name === 'CanceledError' || error.name === 'AbortError') {
      throw error
    }
    return null
  }
}

export async function fetchMultiplePokemon(idList, signal) {
  try {
    const fetchPromises = idList.map((id) => fetchPokemonData(id, signal))
    const results = await Promise.all(fetchPromises)
    return results.filter(Boolean)
  } catch (error) {
    if (error.name === 'CanceledError' || error.name === 'AbortError') {
      throw error
    }
    return []
  }
}

export async function fetchStarterShowcase(signal) {
  const starterIds = [25, 1, 4, 7]
  const starters = await fetchMultiplePokemon(starterIds, signal)
  return starters.reduce((map, pokemon) => {
    map[pokemon.id] = pokemon
    return map
  }, {})
}
