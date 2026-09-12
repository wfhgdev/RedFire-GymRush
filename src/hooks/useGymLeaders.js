import { useState, useCallback } from 'react'
import { GYM_LEADERS } from '../data/gymLeaders'

export function useGymLeaders(initialIndex = 0) {
  const [currentGymIndex, setCurrentGymIndex] = useState(initialIndex)

  const currentGymLeader = GYM_LEADERS[currentGymIndex] || null
  const isLastLeader = currentGymIndex === GYM_LEADERS.length - 1
  const isCompleted = currentGymIndex >= GYM_LEADERS.length

  const advanceGymLeader = useCallback(() => {
    setCurrentGymIndex((prev) => prev + 1)
  }, [])

  const resetGymProgress = useCallback(() => {
    setCurrentGymIndex(0)
  }, [])

  const badgesWon = GYM_LEADERS.slice(0, currentGymIndex).map((leader) => ({
    id: leader.id,
    name: leader.badgeName,
    leaderName: leader.name,
    city: leader.city
  }))

  return {
    gymLeaders: GYM_LEADERS,
    currentGymIndex,
    currentGymLeader,
    isLastLeader,
    isCompleted,
    badgesWon,
    advanceGymLeader,
    resetGymProgress,
    setCurrentGymIndex
  }
}
