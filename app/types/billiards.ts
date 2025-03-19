// 定义得分类型
export type ScoreType = '犯规' | '普胜' | '小金' | '大金' | '黄金9'

// 定义设备类型
export type DeviceType = 'mobile' | 'tablet' | 'desktop'

// 定义游戏模式类型
export type GameMode = '两人' | '三人'

// 定义统计类型
export interface Stats {
  犯规: number
  普胜: number
  小金: number
  大金: number
  黄金9: number
}

// 玩家数据接口
export interface PlayerData {
  name: string
  score: number
  stats: Stats
}

// 历史记录条目
export interface HistoryEntry {
  players: PlayerData[]
}
