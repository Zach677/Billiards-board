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

// 本地存储键
const STORAGE_KEY = 'billiardsGameData'

export default function BilliardsGame() {
  // 屏幕方向状态
  const [isLandscape, setIsLandscape] = useState(false)

  // 设备类型状态
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>(
    'desktop',
  )

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

  // 从本地存储加载数据
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY)
      if (savedData) {
        const { players: savedPlayers, gameMode: savedGameMode } =
          JSON.parse(savedData)
        setPlayers(savedPlayers)
        setGameMode(savedGameMode)
      }
    } catch (error) {
      console.error('Failed to load data from localStorage:', error)
    }
  }, [])

  // 保存数据到本地存储
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          players,
          gameMode,
        }),
      )
    } catch (error) {
      console.error('Failed to save data to localStorage:', error)
    }
  }, [players, gameMode])

  // 检测屏幕方向和设备类型
  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      // 检测横屏/竖屏
      setIsLandscape(width > height)

      // 检测设备类型
      if (width < 640) {
        setDeviceType('mobile') // iPhone或小型手机
      } else if (width < 1024) {
        setDeviceType('tablet') // iPad或平板设备
      } else {
        setDeviceType('desktop') // 桌面或大屏设备
      }
    }

    // 初始检查
    checkScreen()

    // 监听窗口大小变化
    window.addEventListener('resize', checkScreen)

    // 清理监听器
    return () => window.removeEventListener('resize', checkScreen)
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
  const renderStats = (stats: Stats, mini = false) => {
    // 根据设备类型调整样式
    const getStatsStyles = () => {
      if (deviceType === 'mobile') {
        return {
          container: 'p-1.5',
          title: 'text-xs mb-1',
          item: 'text-xs py-0.5',
        }
      } else if (deviceType === 'tablet') {
        return {
          container: 'p-2',
          title: 'text-sm mb-1.5',
          item: 'text-xs py-0.75',
        }
      } else {
        return {
          container: 'p-2 sm:p-3',
          title: 'text-sm sm:text-base mb-2',
          item: 'text-xs sm:text-sm py-1',
        }
      }
    }

    const styles = getStatsStyles()

    if (mini) {
      return (
        <div className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-md text-center">
          <div className="grid grid-cols-1 gap-0.5">
            <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded text-xs py-0.5">
              {stats.犯规}
            </div>
            <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs py-0.5">
              {stats.普胜}
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs py-0.5">
              {stats.小金}
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs py-0.5">
              {stats.大金}
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs py-0.5">
              {stats.黄金9}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div
        className={`bg-white dark:bg-gray-800 ${styles.container} rounded-lg shadow-md`}
      >
        <h3
          className={`${styles.title} font-bold text-gray-700 dark:text-gray-300 text-center`}
        >
          统计
        </h3>
        <div className="grid grid-cols-1 gap-1">
          <div
            className={`bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded ${styles.item} px-2 flex justify-between`}
          >
            <span>犯规</span>
            <span>{stats.犯规}</span>
          </div>
          <div
            className={`bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded ${styles.item} px-2 flex justify-between`}
          >
            <span>普胜</span>
            <span>{stats.普胜}</span>
          </div>
          <div
            className={`bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded ${styles.item} px-2 flex justify-between`}
          >
            <span>小金</span>
            <span>{stats.小金}</span>
          </div>
          <div
            className={`bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded ${styles.item} px-2 flex justify-between`}
          >
            <span>大金</span>
            <span>{stats.大金}</span>
          </div>
          <div
            className={`bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded ${styles.item} px-2 flex justify-between`}
          >
            <span>黄金9</span>
            <span>{stats.黄金9}</span>
          </div>
        </div>
      </div>
    )
  }

  // 渲染重置确认对话框
  const renderResetConfirm = () => {
    if (!showResetConfirm) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-md w-full mx-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            重置游戏
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            确定要重置游戏吗？所有玩家的分数将归零。
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => setShowResetConfirm(false)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition mr-2"
            >
              取消
            </button>
            <button
              onClick={handleResetGame}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 dark:hover:bg-red-700 transition"
            >
              确定重置
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

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-md w-full mx-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            编辑玩家名称
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const form = e.currentTarget
              const nameInput = form.elements.namedItem(
                'playerName',
              ) as HTMLInputElement
              if (nameInput && nameInput.value.trim()) {
                handleNameChange(editingName, nameInput.value.trim())
                setEditingName(null)
              }
            }}
          >
            <div className="mb-4">
              <input
                type="text"
                name="playerName"
                id="playerName"
                autoComplete="off"
                defaultValue={currentName}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 text-sm dark:bg-gray-700 dark:text-white"
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setEditingName(null)}
                className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm font-medium mr-2"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition text-sm font-medium"
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
      <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-md w-full mx-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            选择游戏模式
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              onClick={() => switchGameMode('两人')}
              className={`p-4 rounded-lg border-2 ${
                gameMode === '两人'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 dark:border-blue-400'
                  : 'border-gray-200 dark:border-gray-700'
              } flex flex-col items-center justify-center`}
            >
              <span
                className={`text-lg font-bold ${
                  gameMode === '两人'
                    ? 'text-blue-600 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                两人模式
              </span>
              <span
                className={`text-sm ${
                  gameMode === '两人'
                    ? 'text-blue-500 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                两名玩家对战
              </span>
            </button>
            <button
              onClick={() => switchGameMode('三人')}
              className={`p-4 rounded-lg border-2 ${
                gameMode === '三人'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 dark:border-blue-400'
                  : 'border-gray-200 dark:border-gray-700'
              } flex flex-col items-center justify-center`}
            >
              <span
                className={`text-lg font-bold ${
                  gameMode === '三人'
                    ? 'text-blue-600 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                三人模式
              </span>
              <span
                className={`text-sm ${
                  gameMode === '三人'
                    ? 'text-blue-500 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                三名玩家对战
              </span>
            </button>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setShowModeSelector(false)}
              className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
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
      <div className="flex items-center gap-1">
        <h2 className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-100 truncate">
          {name}
        </h2>
        <button
          onClick={() => setEditingName(playerIndex)}
          className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs"
          title="编辑名称"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
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
    // 根据设备类型调整样式
    const getControlStyles = () => {
      if (deviceType === 'mobile') {
        return {
          button: 'text-xs py-1',
          icon: 'h-3 w-3',
        }
      } else if (deviceType === 'tablet') {
        return {
          button: 'text-xs py-1.5',
          icon: 'h-3.5 w-3.5',
        }
      } else {
        return {
          button: 'text-sm py-2',
          icon: 'h-4 w-4',
        }
      }
    }

    const styles = getControlStyles()

    return (
      <div className="flex flex-col gap-1 sm:gap-2">
        <button
          onClick={() => setShowResetConfirm(true)}
          className={`flex items-center justify-center gap-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800 transition ${styles.button}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.icon}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          <span>重置</span>
        </button>

        <button
          onClick={handleUndoLastAction}
          disabled={history.length === 0}
          className={`flex items-center justify-center gap-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 rounded hover:bg-yellow-200 dark:hover:bg-yellow-800 transition disabled:opacity-50 disabled:cursor-not-allowed ${styles.button}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.icon}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span>撤销</span>
        </button>
      </div>
    )
  }

  // 渲染标题和模式切换按钮
  const renderHeader = () => {
    return (
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 text-center sm:text-left">
          九球追分记分板
        </h1>
        <button
          onClick={() => setShowModeSelector(true)}
          className="flex items-center justify-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition w-full sm:w-auto text-sm"
        >
          <span>{gameMode}模式</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
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

  // 移动设备横屏布局 (iPhone等)
  const renderMobileLandscape = () => {
    const activePlayers = getActivePlayers()

    return (
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-1">
          <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            九球追分记分板
          </h1>
          <button
            onClick={() => setShowModeSelector(true)}
            className="flex items-center justify-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition text-xs"
          >
            <span>{gameMode}模式</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
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

        <div className="flex flex-1 gap-1">
          {/* 左侧：玩家记分板 */}
          <div className="flex-1 grid grid-cols-1 gap-1 auto-rows-min">
            {activePlayers.map((player, index) => (
              <div key={index} className="flex gap-1">
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
                    deviceType="mobile"
                  />
                </div>
                <div className="w-16">{renderStats(player.stats, true)}</div>
              </div>
            ))}
          </div>

          {/* 右侧：控制按钮 */}
          <div className="w-16 flex flex-col justify-start gap-1">
            {renderControls()}
          </div>
        </div>
      </div>
    )
  }

  // 平板设备横屏布局 (iPad等)
  const renderTabletLandscape = () => {
    const activePlayers = getActivePlayers()

    return (
      <div className="flex flex-col h-full">
        {renderHeader()}

        <div className="flex flex-1 gap-2">
          {/* 左侧：玩家记分板 */}
          <div className="flex-1 grid grid-cols-1 gap-2 auto-rows-min">
            {activePlayers.map((player, index) => (
              <div key={index} className="flex gap-2">
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
                    deviceType="tablet"
                  />
                </div>
                <div className="w-20">{renderStats(player.stats)}</div>
              </div>
            ))}
          </div>

          {/* 右侧：控制按钮 */}
          <div className="w-20 flex flex-col justify-start gap-2">
            {renderControls()}
          </div>
        </div>
      </div>
    )
  }

  // 桌面设备横屏布局
  const renderDesktopLandscape = () => {
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
                    isCompact={false}
                    deviceType="desktop"
                  />
                </div>
                <div className="w-24">{renderStats(player.stats)}</div>
              </div>
            ))}
          </div>

          {/* 右侧：控制按钮 */}
          <div className="w-24 flex flex-col justify-start gap-3">
            {renderControls()}
          </div>
        </div>
      </div>
    )
  }

  // 横屏布局 - 根据设备类型选择不同的布局
  const renderLandscapeLayout = () => {
    switch (deviceType) {
      case 'mobile':
        return renderMobileLandscape()
      case 'tablet':
        return renderTabletLandscape()
      case 'desktop':
      default:
        return renderDesktopLandscape()
    }
  }

  // 竖屏布局
  const renderPortraitLayout = () => {
    // 根据设备类型和游戏模式调整布局
    const getGridCols = () => {
      if (deviceType === 'mobile') {
        // 移动设备始终使用单列布局
        return 'grid-cols-1'
      } else if (deviceType === 'tablet') {
        // 平板设备根据游戏模式使用不同列数
        return gameMode === '两人'
          ? 'grid-cols-2'
          : 'grid-cols-1 md:grid-cols-3'
      } else {
        // 桌面设备根据游戏模式使用不同列数
        return gameMode === '两人' ? 'grid-cols-2' : 'grid-cols-3'
      }
    }

    // 根据设备类型调整间距
    const getGapSize = () => {
      if (deviceType === 'mobile') {
        return 'gap-2'
      } else if (deviceType === 'tablet') {
        return 'gap-3'
      } else {
        return 'gap-4'
      }
    }

    return (
      <>
        {renderHeader()}

        {/* 记分板区域 */}
        <div className={`grid ${getGridCols()} ${getGapSize()} mb-3`}>
          {getActivePlayers().map((player, index) => (
            <div key={index} className="flex flex-col">
              <Player
                name={player.name}
                initialScore={player.score}
                onScoreChange={(newScore, scoreType) =>
                  handlePlayerScoreChange(index, newScore, scoreType)
                }
                renderNameSection={() => renderPlayerName(player.name, index)}
                deviceType={deviceType}
                isCompact={deviceType !== 'desktop'}
              />
              <div className="mt-2">
                {renderStats(player.stats, deviceType === 'mobile')}
              </div>
            </div>
          ))}
        </div>

        {/* 控制按钮 */}
        <div className={deviceType === 'mobile' ? 'w-full' : 'w-1/2 mx-auto'}>
          {renderControls()}
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-2 sm:py-4 px-2 sm:px-4 text-gray-900 dark:text-gray-100">
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
