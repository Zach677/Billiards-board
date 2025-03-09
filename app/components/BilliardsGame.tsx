import { useState } from 'react'
import Player from './Player'
import GameHistory from './GameHistory'
import GameControls from './GameControls'

interface HistoryEntry {
  round: number
  player1Score: number
  player2Score: number
  activePlayer: string
}

export default function BilliardsGame() {
  // 游戏状态
  const [player1Name] = useState('玩家 1')
  const [player2Name] = useState('玩家 2')
  const [player1Score, setPlayer1Score] = useState(0)
  const [player2Score, setPlayer2Score] = useState(0)
  const [currentPlayer, setCurrentPlayer] = useState(1) // 1 表示玩家1，2 表示玩家2
  const [round, setRound] = useState(1)
  const [history, setHistory] = useState<HistoryEntry[]>([])

  // 重置游戏
  const handleResetGame = () => {
    setPlayer1Score(0)
    setPlayer2Score(0)
    setCurrentPlayer(1)
    setRound(1)
    setHistory([])
  }

  // 切换当前玩家
  const handleSwitchPlayer = () => {
    // 记录历史
    const historyEntry: HistoryEntry = {
      round,
      player1Score,
      player2Score,
      activePlayer: currentPlayer === 1 ? player1Name : player2Name,
    }
    setHistory((prev) => [...prev, historyEntry])

    // 切换玩家并增加回合数
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
    setRound((prev) => prev + 1)
  }

  // 撤销上一步操作
  const handleUndoLastAction = () => {
    if (history.length === 0) return

    const lastEntry = history[history.length - 1]
    setPlayer1Score(lastEntry.player1Score)
    setPlayer2Score(lastEntry.player2Score)
    setCurrentPlayer(lastEntry.activePlayer === player1Name ? 1 : 2)
    setRound(lastEntry.round)
    setHistory((prev) => prev.slice(0, -1))
  }

  // 处理玩家1分数变化
  const handlePlayer1ScoreChange = (newScore: number) => {
    setPlayer1Score(newScore)
  }

  // 处理玩家2分数变化
  const handlePlayer2ScoreChange = (newScore: number) => {
    setPlayer2Score(newScore)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8">九球追分记分板</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 玩家1 */}
        <div>
          <Player
            name={player1Name}
            initialScore={player1Score}
            onScoreChange={handlePlayer1ScoreChange}
            isActive={currentPlayer === 1}
          />
        </div>

        {/* 中间控制区域 */}
        <div className="flex flex-col gap-6">
          <GameControls
            onSwitchPlayer={handleSwitchPlayer}
            onUndoLastAction={handleUndoLastAction}
            onResetGame={handleResetGame}
            currentPlayerName={currentPlayer === 1 ? player1Name : player2Name}
            round={round}
          />

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">九球规则</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 犯规: +1分</li>
              <li>• 普胜: +4分</li>
              <li>• 小金: +7分</li>
              <li>• 大金: +10分</li>
              <li>• 黄金9: +4分</li>
            </ul>
          </div>

          <GameHistory
            history={history}
            player1Name={player1Name}
            player2Name={player2Name}
          />
        </div>

        {/* 玩家2 */}
        <div>
          <Player
            name={player2Name}
            initialScore={player2Score}
            onScoreChange={handlePlayer2ScoreChange}
            isActive={currentPlayer === 2}
          />
        </div>
      </div>
    </div>
  )
}
