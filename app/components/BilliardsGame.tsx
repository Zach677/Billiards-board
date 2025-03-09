import { useState, useEffect } from 'react'
import Player, { ScoreType } from './Player'

// 定义统计类型
interface Stats {
  犯规: number
  普胜: number
  小金: number
  大金: number
  黄金9: number
}

// 创建空统计对象
const createEmptyStats = (): Stats => ({
  犯规: 0,
  普胜: 0,
  小金: 0,
  大金: 0,
  黄金9: 0,
})

// 玩家数据接口
interface PlayerData {
  name: string
  score: number
  stats: Stats
}

interface HistoryEntry {
  players: PlayerData[]
}

// 游戏模式类型
type GameMode = '两人' | '三人'

export default function BilliardsGame() {
  // 屏幕方向状态
  const [isLandscape, setIsLandscape] = useState(false)

  // 游戏模式
  const [gameMode, setGameMode] = useState<GameMode>('两人')

  // 玩家数据
  const [players, setPlayers] = useState<PlayerData[]>([
    { name: '玩家 1', score: 0, stats: createEmptyStats() },
    { name: '玩家 2', score: 0, stats: createEmptyStats() },
    { name: '玩家 3', score: 0, stats: createEmptyStats() },
  ])

  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [editingName, setEditingName] = useState<number | null>(null)
  const [showModeSelector, setShowModeSelector] = useState(false)

  // 检测屏幕方向
  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight)
    }

    // 初始检查
    checkOrientation()

    // 监听窗口大小变化
    window.addEventListener('resize', checkOrientation)

    // 清理监听器
    return () => window.removeEventListener('resize', checkOrientation)
  }, [])

  // 获取当前活跃玩家
  const getActivePlayers = () => {
    return gameMode === '两人' ? players.slice(0, 2) : players
  }

  // 切换游戏模式
  const switchGameMode = (mode: GameMode) => {
    if (mode === gameMode) return

    // 确认是否有分数，如果有则提示重置
    const hasScores = players.some((p) => p.score > 0)
    if (hasScores) {
      if (!confirm(`切换模式将重置所有分数，确定要切换到${mode}模式吗？`)) {
        return
      }
    }

    // 重置所有分数
    setPlayers(
      players.map((p) => ({
        ...p,
        score: 0,
        stats: createEmptyStats(),
      })),
    )
    setHistory([])
    setGameMode(mode)
    setShowModeSelector(false)
  }

  // 重置游戏
  const handleResetGame = () => {
    if (players.every((p) => p.score === 0)) return

    setPlayers(
      players.map((p) => ({
        ...p,
        score: 0,
        stats: createEmptyStats(),
      })),
    )
    setHistory([])
    setShowResetConfirm(false)
  }

  // 撤销上一步操作
  const handleUndoLastAction = () => {
    if (history.length === 0) return

    const previous = history[history.length - 1]
    setPlayers(previous.players)
    setHistory((prev) => prev.slice(0, -1))
  }

  // 处理玩家分数变化
  const handlePlayerScoreChange = (
    playerIndex: number,
    newScore: number,
    scoreType: ScoreType,
  ) => {
    // 保存当前状态到历史
    setHistory((prev) => [
      ...prev,
      {
        players: [...players],
      },
    ])

    // 更新分数和统计
    setPlayers((prev) => {
      const newPlayers = [...prev]
      const player = { ...newPlayers[playerIndex] }
      player.score = newScore
      player.stats = {
        ...player.stats,
        [scoreType]: player.stats[scoreType] + 1,
      }
      newPlayers[playerIndex] = player
      return newPlayers
    })
  }

  // 处理玩家名字变更
  const handleNameChange = (playerIndex: number, newName: string) => {
    if (newName.trim() === '') return

    setPlayers((prev) => {
      const newPlayers = [...prev]
      newPlayers[playerIndex] = {
        ...newPlayers[playerIndex],
        name: newName,
      }
      return newPlayers
    })
    setEditingName(null)
  }

  // 渲染统计信息
  const renderStats = (stats: Stats) => {
    return (
      <div className="bg-gray-50 p-2 sm:p-3 rounded-lg text-sm">
        <div className="grid grid-cols-5 gap-1 text-center">
          <div>
            <div className="font-medium text-red-600 text-xs sm:text-sm">
              犯规
            </div>
            <div className="text-base sm:text-lg font-bold">{stats.犯规}</div>
          </div>
          <div>
            <div className="font-medium text-green-600 text-xs sm:text-sm">
              普胜
            </div>
            <div className="text-base sm:text-lg font-bold">{stats.普胜}</div>
          </div>
          <div>
            <div className="font-medium text-blue-600 text-xs sm:text-sm">
              小金
            </div>
            <div className="text-base sm:text-lg font-bold">{stats.小金}</div>
          </div>
          <div>
            <div className="font-medium text-purple-600 text-xs sm:text-sm">
              大金
            </div>
            <div className="text-base sm:text-lg font-bold">{stats.大金}</div>
          </div>
          <div>
            <div className="font-medium text-yellow-600 text-xs sm:text-sm">
              黄金9
            </div>
            <div className="text-base sm:text-lg font-bold">{stats.黄金9}</div>
          </div>
        </div>
      </div>
    )
  }

  // 渲染重置确认对话框
  const renderResetConfirm = () => {
    if (!showResetConfirm) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-xl font-bold mb-4">确认重置</h3>
          <p className="mb-6">
            确定要重置所有分数和统计数据吗？此操作无法撤销。
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowResetConfirm(false)}
              className="px-5 py-3 bg-gray-200 rounded-md hover:bg-gray-300 transition text-base font-medium"
            >
              取消
            </button>
            <button
              onClick={handleResetGame}
              className="px-5 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-base font-medium"
            >
              确认重置
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 渲染名字编辑对话框
  const renderNameEditDialog = () => {
    if (editingName === null) return null

    const currentName = players[editingName].name
    let inputRef: HTMLInputElement | null = null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-xl font-bold mb-4">修改玩家名称</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (inputRef) handleNameChange(editingName, inputRef.value)
            }}
            className="mb-4"
          >
            <input
              type="text"
              ref={(el) => {
                inputRef = el
              }}
              defaultValue={currentName}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5 text-base"
              onFocus={(e) => e.target.select()}
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingName(null)}
                className="px-5 py-3 bg-gray-200 rounded-md hover:bg-gray-300 transition text-base font-medium"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-5 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-base font-medium"
              >
                保存
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // 渲染模式选择对话框
  const renderModeSelector = () => {
    if (!showModeSelector) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-xl font-bold mb-4">选择游戏模式</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => switchGameMode('两人')}
              className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                gameMode === '两人'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className="flex gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                  2
                </div>
              </div>
              <span className="font-medium">两人模式</span>
            </button>
            <button
              onClick={() => switchGameMode('三人')}
              className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                gameMode === '三人'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className="flex gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                  3
                </div>
              </div>
              <span className="font-medium">三人模式</span>
            </button>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setShowModeSelector(false)}
              className="px-5 py-3 bg-gray-200 rounded-md hover:bg-gray-300 transition text-base font-medium"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 渲染玩家名字和编辑按钮
  const renderPlayerName = (name: string, playerIndex: number) => {
    return (
      <div className="flex items-center gap-2">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">{name}</h2>
        <button
          onClick={() => setEditingName(playerIndex)}
          className="text-gray-500 hover:text-blue-500 transition p-1"
          title="编辑名称"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
      </div>
    )
  }

  // 渲染控制按钮
  const renderControls = () => {
    return (
      <div className="grid grid-cols-2 gap-3 sm:flex sm:justify-center sm:gap-4">
        <button
          onClick={handleUndoLastAction}
          disabled={history.length === 0}
          className={`py-3 px-4 sm:px-6 rounded-lg flex items-center justify-center font-medium transition text-sm sm:text-base ${
            history.length === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1 sm:mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          撤销
        </button>
        <button
          onClick={() => setShowResetConfirm(true)}
          disabled={players.every((p) => p.score === 0)}
          className={`py-3 px-4 sm:px-6 rounded-lg flex items-center justify-center font-medium transition text-sm sm:text-base ${
            players.every((p) => p.score === 0)
              ? 'bg-red-100 text-red-300 cursor-not-allowed'
              : 'bg-red-100 text-red-600 hover:bg-red-200'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1 sm:mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          重置
        </button>
      </div>
    )
  }

  // 渲染标题和模式切换按钮
  const renderHeader = () => {
    return (
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
          九球追分记分板
        </h1>
        <button
          onClick={() => setShowModeSelector(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition w-full sm:w-auto"
        >
          <span>{gameMode}模式</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    )
  }

  // 横屏布局
  const renderLandscapeLayout = () => {
    const activePlayers = getActivePlayers()

    return (
      <div className="flex flex-col h-full">
        {renderHeader()}

        <div className="flex flex-1 gap-4">
          {/* 左侧：玩家记分板 */}
          <div className="flex-1 grid grid-cols-1 gap-3 auto-rows-min">
            {activePlayers.map((player, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-1">
                  <Player
                    name={player.name}
                    initialScore={player.score}
                    onScoreChange={(newScore, scoreType) =>
                      handlePlayerScoreChange(index, newScore, scoreType)
                    }
                    renderNameSection={() =>
                      renderPlayerName(player.name, index)
                    }
                    isCompact={true}
                  />
                </div>
                <div className="w-24 sm:w-32">{renderStats(player.stats)}</div>
              </div>
            ))}
          </div>

          {/* 右侧：控制按钮 */}
          <div className="w-24 sm:w-32 flex flex-col justify-start gap-3">
            {renderControls()}
          </div>
        </div>
      </div>
    )
  }

  // 竖屏布局
  const renderPortraitLayout = () => {
    return (
      <>
        {renderHeader()}

        {/* 记分板区域 */}
        <div
          className={`grid grid-cols-1 ${
            gameMode === '两人' ? 'sm:grid-cols-2' : 'sm:grid-cols-3'
          } gap-4 sm:gap-6 mb-6`}
        >
          {getActivePlayers().map((player, index) => (
            <div key={index}>
              <Player
                name={player.name}
                initialScore={player.score}
                onScoreChange={(newScore, scoreType) =>
                  handlePlayerScoreChange(index, newScore, scoreType)
                }
                renderNameSection={() => renderPlayerName(player.name, index)}
              />
              <div className="mt-2 sm:mt-3">{renderStats(player.stats)}</div>
            </div>
          ))}
        </div>

        {/* 控制按钮 */}
        {renderControls()}
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 px-3 sm:px-4">
      <div className="container mx-auto max-w-6xl h-full">
        {isLandscape ? renderLandscapeLayout() : renderPortraitLayout()}

        {/* 对话框 */}
        {renderResetConfirm()}
        {renderNameEditDialog()}
        {renderModeSelector()}
      </div>
    </div>
  )
}
