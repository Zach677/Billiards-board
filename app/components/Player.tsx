import { useEffect, useState } from 'react'

// 定义得分类型
export type ScoreType = '犯规' | '普胜' | '小金' | '大金' | '黄金9'

// 定义设备类型
export type DeviceType = 'mobile' | 'tablet' | 'desktop'

interface PlayerProps {
  name: string
  initialScore: number
  onScoreChange: (newScore: number, scoreType: ScoreType) => void
  renderNameSection?: () => React.ReactNode
  isCompact?: boolean
  deviceType?: DeviceType
}

export default function Player({
  name,
  initialScore,
  onScoreChange,
  renderNameSection,
  isCompact = false,
  deviceType = 'desktop',
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

  // 根据设备类型获取适当的样式
  const getButtonStyles = () => {
    if (deviceType === 'mobile') {
      return {
        container: 'p-1.5',
        score: 'text-2xl',
        buttonGrid: 'gap-1 mb-1',
        button: 'py-1 px-1 text-xs',
      }
    } else if (deviceType === 'tablet') {
      return {
        container: 'p-2',
        score: 'text-3xl',
        buttonGrid: 'gap-1.5 mb-1.5',
        button: 'py-1.5 px-1.5 text-xs',
      }
    } else {
      return {
        container: isCompact ? 'p-3' : 'p-4',
        score: isCompact ? 'text-3xl' : 'text-4xl',
        buttonGrid: 'gap-2 mb-2',
        button: 'py-2 text-sm',
      }
    }
  }

  const styles = getButtonStyles()

  // 紧凑模式下的布局
  if (isCompact) {
    return (
      <div
        className={`bg-white dark:bg-gray-800 ${styles.container} rounded-lg shadow-md`}
      >
        <div className="flex justify-between items-center mb-1">
          {renderNameSection ? (
            renderNameSection()
          ) : (
            <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100">
              {name}
            </h2>
          )}
        </div>

        <div className="text-center mb-2">
          <span
            className={`${styles.score} font-bold text-blue-600 dark:text-blue-400`}
          >
            {score}
          </span>
        </div>

        <div className={`grid grid-cols-2 ${styles.buttonGrid}`}>
          <button
            onClick={() => handleScoreChange(1, '犯规')}
            className={`bg-red-500 dark:bg-red-600 text-white ${styles.button} rounded hover:bg-red-600 dark:hover:bg-red-700 transition font-medium`}
          >
            犯+1
          </button>
          <button
            onClick={() => handleScoreChange(4, '普胜')}
            className={`bg-green-500 dark:bg-green-600 text-white ${styles.button} rounded hover:bg-green-600 dark:hover:bg-green-700 transition font-medium`}
          >
            普+4
          </button>
          <button
            onClick={() => handleScoreChange(7, '小金')}
            className={`bg-blue-500 dark:bg-blue-600 text-white ${styles.button} rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition font-medium`}
          >
            小+7
          </button>
          <button
            onClick={() => handleScoreChange(10, '大金')}
            className={`bg-purple-500 dark:bg-purple-600 text-white ${styles.button} rounded hover:bg-purple-600 dark:hover:bg-purple-700 transition font-medium`}
          >
            大+10
          </button>
        </div>

        <button
          onClick={() => handleScoreChange(4, '黄金9')}
          className={`w-full bg-yellow-500 dark:bg-yellow-600 text-white ${styles.button} rounded hover:bg-yellow-600 dark:hover:bg-yellow-700 transition font-medium`}
        >
          黄金9 +4
        </button>
      </div>
    )
  }

  // 标准模式下的布局
  return (
    <div
      className={`bg-white dark:bg-gray-800 ${styles.container} rounded-lg shadow-md`}
    >
      <div className="flex justify-between items-center mb-2">
        {renderNameSection ? (
          renderNameSection()
        ) : (
          <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100">
            {name}
          </h2>
        )}
      </div>

      <div className="text-center mb-3">
        <span
          className={`${styles.score} font-bold text-blue-600 dark:text-blue-400`}
        >
          {score}
        </span>
      </div>

      <div className={`grid grid-cols-2 ${styles.buttonGrid}`}>
        <button
          onClick={() => handleScoreChange(1, '犯规')}
          className={`bg-red-500 dark:bg-red-600 text-white ${styles.button} rounded hover:bg-red-600 dark:hover:bg-red-700 transition font-medium`}
        >
          犯规 +1
        </button>
        <button
          onClick={() => handleScoreChange(4, '普胜')}
          className={`bg-green-500 dark:bg-green-600 text-white ${styles.button} rounded hover:bg-green-600 dark:hover:bg-green-700 transition font-medium`}
        >
          普胜 +4
        </button>
        <button
          onClick={() => handleScoreChange(7, '小金')}
          className={`bg-blue-500 dark:bg-blue-600 text-white ${styles.button} rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition font-medium`}
        >
          小金 +7
        </button>
        <button
          onClick={() => handleScoreChange(10, '大金')}
          className={`bg-purple-500 dark:bg-purple-600 text-white ${styles.button} rounded hover:bg-purple-600 dark:hover:bg-blue-700 transition font-medium`}
        >
          大金 +10
        </button>
      </div>

      <button
        onClick={() => handleScoreChange(4, '黄金9')}
        className={`w-full bg-yellow-500 dark:bg-yellow-600 text-white ${styles.button} rounded hover:bg-yellow-600 dark:hover:bg-yellow-700 transition font-medium`}
      >
        黄金9 +4
      </button>
    </div>
  )
}
