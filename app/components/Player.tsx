import { useEffect, useState } from 'react'

// 定义得分类型
export type ScoreType = '犯规' | '普胜' | '小金' | '大金' | '黄金9'

interface PlayerProps {
  name: string
  initialScore: number
  onScoreChange: (newScore: number, scoreType: ScoreType) => void
  renderNameSection?: () => React.ReactNode
  isCompact?: boolean
}

export default function Player({
  name,
  initialScore,
  onScoreChange,
  renderNameSection,
  isCompact = false,
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

  // 紧凑模式下的布局
  if (isCompact) {
    return (
      <div className="bg-white p-2 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-1">
          {renderNameSection ? (
            renderNameSection()
          ) : (
            <h2 className="text-sm font-bold text-gray-800">{name}</h2>
          )}
        </div>

        <div className="text-center mb-2">
          <span className="text-3xl font-bold text-blue-600">{score}</span>
        </div>

        <div className="grid grid-cols-2 gap-1 mb-1">
          <button
            onClick={() => handleScoreChange(1, '犯规')}
            className="bg-red-500 text-white py-1 px-1 rounded hover:bg-red-600 transition font-medium text-xs"
          >
            犯+1
          </button>
          <button
            onClick={() => handleScoreChange(4, '普胜')}
            className="bg-green-500 text-white py-1 px-1 rounded hover:bg-green-600 transition font-medium text-xs"
          >
            普+4
          </button>
          <button
            onClick={() => handleScoreChange(7, '小金')}
            className="bg-blue-500 text-white py-1 px-1 rounded hover:bg-blue-600 transition font-medium text-xs"
          >
            小+7
          </button>
          <button
            onClick={() => handleScoreChange(10, '大金')}
            className="bg-purple-500 text-white py-1 px-1 rounded hover:bg-purple-600 transition font-medium text-xs"
          >
            大+10
          </button>
        </div>

        <button
          onClick={() => handleScoreChange(4, '黄金9')}
          className="w-full bg-yellow-500 text-white py-1 px-1 rounded hover:bg-yellow-600 transition font-medium text-xs"
        >
          黄金9 +4
        </button>
      </div>
    )
  }

  // 标准模式下的布局
  return (
    <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-1 sm:mb-2">
        {renderNameSection ? (
          renderNameSection()
        ) : (
          <h2 className="text-base sm:text-lg font-bold text-gray-800">
            {name}
          </h2>
        )}
      </div>

      <div className="text-center mb-2 sm:mb-4">
        <span className="text-4xl sm:text-5xl font-bold text-blue-600">
          {score}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-1 sm:gap-2 mb-1 sm:mb-2">
        <button
          onClick={() => handleScoreChange(1, '犯规')}
          className="bg-red-500 text-white py-2 rounded hover:bg-red-600 transition font-medium text-xs sm:text-sm"
        >
          犯规 +1
        </button>
        <button
          onClick={() => handleScoreChange(4, '普胜')}
          className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition font-medium text-xs sm:text-sm"
        >
          普胜 +4
        </button>
        <button
          onClick={() => handleScoreChange(7, '小金')}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition font-medium text-xs sm:text-sm"
        >
          小金 +7
        </button>
        <button
          onClick={() => handleScoreChange(10, '大金')}
          className="bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition font-medium text-xs sm:text-sm"
        >
          大金 +10
        </button>
      </div>

      <button
        onClick={() => handleScoreChange(4, '黄金9')}
        className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition font-medium text-xs sm:text-sm"
      >
        黄金9 +4
      </button>
    </div>
  )
}
