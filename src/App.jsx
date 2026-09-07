import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeScreen from './pages/home/HomeScreen'
import BattleScreen from './pages/battle/BattleScreen'
import LeaderboardScreen from './pages/leaderboard/LeaderboardScreen'
import VictoryScreen from './pages/victory/VictoryScreen'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/battle" element={<BattleScreen />} />
        <Route path="/leaderboard" element={<LeaderboardScreen />} />
        <Route path="/victory-screen" element={<VictoryScreen />} />
      </Routes>
    </BrowserRouter>
  )
}
