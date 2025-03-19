import { Stats } from '~/types/billiards'

// 创建空统计对象
export const createEmptyStats = (): Stats => ({
  犯规: 0,
  普胜: 0,
  小金: 0,
  大金: 0,
  黄金9: 0,
})
