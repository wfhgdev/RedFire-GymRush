import api from './api'

export async function fetchPokemonProfile(id, signal) {
  try {
    const response = await api.get(`/pokemon/${id}`, { signal })
    return response.data
  } catch (error) {
    if (error.name === 'CanceledError' || error.name === 'AbortError') throw error
    return null
  }
}

export async function fetchPokemonProfiles(ids, signal) {
  const profiles = await Promise.all(
    ids.map((id) => fetchPokemonProfile(id, signal))
  )
  return profiles.filter(Boolean)
}