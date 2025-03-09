import { useEffect, useState } from 'react'

// 定义得分类型
export type ScoreType = '犯规' | '普胜' | '小金' | '大金' | '黄金9'

interface PlayerProps {
  name: string
  initialScore: number
  onScoreChange: (newScore: number, scoreType: ScoreType) => void
  renderNameSection?: () => React.ReactNode
}

export default function Player({
  name,
  initialScore,
  onScoreChange,
  renderNameSection,
}: PlayerProps) {
  const [score, setScore] = useState(initialScore)

  // 当initialScore从父组件变化时更新本地状态
  useEffect(() => {
    setScore(initialScore)
  }, [initialScore])

  const handleScoreChange = (increment: number, scoreType: ScoreType) => {
    const newScore = score + increment
    if (newScore >= 0) {
      onScoreChange(newScore, scoreType)
    }
  }

  return (
    <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2 sm:mb-3">
        {renderNameSection ? (
          renderNameSection()
        ) : (
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">{name}</h2>
        )}
      </div>

      <div className="text-center mb-3 sm:mb-5">
        <span className="text-5xl sm:text-6xl font-bold text-blue-600">
          {score}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
        <button
          onClick={() => handleScoreChange(1, '犯规')}
          className="bg-red-500 text-white py-3 sm:py-3 rounded-lg hover:bg-red-600 transition font-medium text-sm sm:text-base"
        >
          犯规 +1
        </button>
        <button
          onClick={() => handleScoreChange(4, '普胜')}
          className="bg-green-500 text-white py-3 sm:py-3 rounded-lg hover:bg-green-600 transition font-medium text-sm sm:text-base"
        >
          普胜 +4
        </button>
        <button
          onClick={() => handleScoreChange(7, '小金')}
          className="bg-blue-500 text-white py-3 sm:py-3 rounded-lg hover:bg-blue-600 transition font-medium text-sm sm:text-base"
        >
          小金 +7
        </button>
        <button
          onClick={() => handleScoreChange(10, '大金')}
          className="bg-purple-500 text-white py-3 sm:py-3 rounded-lg hover:bg-purple-600 transition font-medium text-sm sm:text-base"
        >
          大金 +10
        </button>
      </div>

      <button
        onClick={() => handleScoreChange(4, '黄金9')}
        className="w-full bg-yellow-500 text-white py-3 sm:py-3 rounded-lg hover:bg-yellow-600 transition font-medium text-sm sm:text-base"
      >
        黄金9 +4
      </button>
    </div>
  )
}
