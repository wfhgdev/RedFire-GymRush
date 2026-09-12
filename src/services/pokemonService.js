import { fetchPokemonData, fetchMultiplePokemon } from './pokeApi'

export async function fetchPokemonProfile(id, signal) {
  return fetchPokemonData(id, signal)
}

export async function fetchPokemonProfiles(ids, signal) {
  return fetchMultiplePokemon(ids, signal)
}