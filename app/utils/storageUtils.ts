import { PlayerData, GameMode } from '~/types/billiards'

// 本地存储键
export const STORAGE_KEY = 'billiardsGameData'

// 保存游戏数据到本地存储
export const saveGameData = (
  players: PlayerData[],
  gameMode: GameMode,
): void => {
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
}

// 从本地存储加载游戏数据
export const loadGameData = (): {
  players?: PlayerData[]
  gameMode?: GameMode
} => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      return JSON.parse(savedData)
    }
  } catch (error) {
    console.error('Failed to load data from localStorage:', error)
  }
  return {}
}
