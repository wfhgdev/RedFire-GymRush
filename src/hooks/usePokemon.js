import { useState, useEffect, useCallback } from 'react'
import { fetchPokemonData, fetchMultiplePokemon } from '../services/pokeApi'

export function usePokemon(pokemonIdentifier) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const isMultiple = Array.isArray(pokemonIdentifier)

  const loadPokemon = useCallback(() => {
    if (!pokemonIdentifier || (isMultiple && pokemonIdentifier.length === 0)) {
      setData(isMultiple ? [] : null)
      setLoading(false)
      return undefined
    }

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    const request = isMultiple
      ? fetchMultiplePokemon(pokemonIdentifier, controller.signal)
      : fetchPokemonData(pokemonIdentifier, controller.signal)

    request
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch((err) => {
        if (err.name !== 'CanceledError' && err.name !== 'AbortError') {
          setError('Error al obtener datos del Pokémon')
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [pokemonIdentifier, isMultiple])

  useEffect(() => {
    const cancelEffect = loadPokemon()
    return () => {
      if (cancelEffect) cancelEffect()
    }
  }, [loadPokemon])

  return {
    pokemon: data,
    loading,
    error,
    refetch: loadPokemon
  }
}
