import { useState, useEffect } from 'react'
import { PlayerCard } from '../Player'
import {
  StatsDisplay,
  GameControls,
  ModeSelector,
  ResetConfirmation,
  NameEditDialog,
  LandscapeLayout,
  PortraitLayout,
} from './'
import { useScreenDetection } from '~/hooks/useScreenDetection'
import { loadGameData, saveGameData } from '~/utils/storageUtils'
import { createEmptyStats } from '~/utils/statsUtils'
import { PlayerData, GameMode, ScoreType } from '~/types/billiards'

export function BilliardsGame() {
  // 使用屏幕检测钩子
  const { isLandscape, deviceType } = useScreenDetection()

  // 游戏模式
  const [gameMode, setGameMode] = useState<GameMode>('两人')

  // 玩家数据
  const [players, setPlayers] = useState<PlayerData[]>([
    { name: '玩家 1', score: 0, stats: createEmptyStats() },
    { name: '玩家 2', score: 0, stats: createEmptyStats() },
    { name: '玩家 3', score: 0, stats: createEmptyStats() },
  ])

  const [history, setHistory] = useState<{ players: PlayerData[] }[]>([])
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [editingName, setEditingName] = useState<number | null>(null)
  const [showModeSelector, setShowModeSelector] = useState(false)

  // 从本地存储加载数据
  useEffect(() => {
    const data = loadGameData()
    if (data.players) {
      setPlayers(data.players)
    }
    if (data.gameMode) {
      setGameMode(data.gameMode)
    }
  }, [])

  // 保存数据到本地存储
  useEffect(() => {
    saveGameData(players, gameMode)
  }, [players, gameMode])

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

  // 渲染玩家名字
  const renderPlayerName = (name: string, playerIndex: number) => {
    return (
      <h2
        className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
        onClick={() => setEditingName(playerIndex)}
      >
        {name}
      </h2>
    )
  }

  // 渲染玩家卡片
  const renderPlayers = () => {
    const activePlayers = getActivePlayers()
    return activePlayers.map((player, index) => (
      <PlayerCard
        key={index}
        name={player.name}
        initialScore={player.score}
        onScoreChange={(newScore, scoreType) =>
          handlePlayerScoreChange(index, newScore, scoreType)
        }
        renderNameSection={() => renderPlayerName(player.name, index)}
        deviceType={deviceType}
        isCompact={isLandscape && deviceType === 'mobile'}
      />
    ))
  }

  // 渲染统计信息
  const renderStats = () => {
    const activePlayers = getActivePlayers()
    return (
      <div className="grid grid-cols-1 gap-2 sm:gap-3">
        {activePlayers.map((player, index) => (
          <div key={index} className="flex items-center">
            <div className="mr-2 font-medium text-sm">{player.name}:</div>
            <StatsDisplay
              stats={player.stats}
              mini={true}
              deviceType={deviceType}
            />
          </div>
        ))}
      </div>
    )
  }

  // 渲染游戏控制
  const renderControls = () => {
    return (
      <GameControls
        onReset={() => setShowResetConfirm(true)}
        onUndo={handleUndoLastAction}
        onChangeModeClick={() => setShowModeSelector(true)}
        deviceType={deviceType}
        historyLength={history.length}
      />
    )
  }

  // 渲染确认重置对话框
  const renderResetConfirm = () => {
    if (!showResetConfirm) return null
    return (
      <ResetConfirmation
        onConfirm={handleResetGame}
        onCancel={() => setShowResetConfirm(false)}
        deviceType={deviceType}
      />
    )
  }

  // 渲染模式选择器
  const renderModeSelector = () => {
    if (!showModeSelector) return null
    return (
      <ModeSelector
        onModeSelect={switchGameMode}
        currentMode={gameMode}
        deviceType={deviceType}
        onClose={() => setShowModeSelector(false)}
      />
    )
  }

  // 渲染名字编辑对话框
  const renderNameEditDialog = () => {
    if (editingName === null) return null
    const playerName = players[editingName].name
    return (
      <NameEditDialog
        playerName={playerName}
        onSave={(newName) => handleNameChange(editingName, newName)}
        onCancel={() => setEditingName(null)}
        deviceType={deviceType}
      />
    )
  }

  // 主布局渲染
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {isLandscape ? (
        <LandscapeLayout deviceType={deviceType}>
          {renderPlayers()}
          {renderStats()}
          {renderControls()}
        </LandscapeLayout>
      ) : (
        <PortraitLayout deviceType={deviceType}>
          {renderPlayers()}
          {renderStats()}
          {renderControls()}
        </PortraitLayout>
      )}

      {renderResetConfirm()}
      {renderModeSelector()}
      {renderNameEditDialog()}
    </div>
  )
}
