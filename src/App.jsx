import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import HomeScreen from './pages/home/HomeScreen'
import BattleScreen from './pages/battle/BattleScreen'
import LeaderboardScreen from './pages/leaderboard/LeaderboardScreen'
import VictoryScreen from './pages/victory/VictoryScreen'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout bg-slate-950 text-slate-100 font-mono">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/battle" element={<BattleScreen />} />
          <Route path="/leaderboard" element={<LeaderboardScreen />} />
          <Route path="/victory-screen" element={<VictoryScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
