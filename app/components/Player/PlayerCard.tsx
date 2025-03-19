import { useEffect, useState } from 'react'
import { ScoreType, DeviceType } from '~/types/billiards'
import { PlayerScoreButtons } from './PlayerScoreButtons'

interface PlayerCardProps {
  name: string
  initialScore: number
  onScoreChange: (newScore: number, scoreType: ScoreType) => void
  renderNameSection?: () => React.ReactNode
  isCompact?: boolean
  deviceType?: DeviceType
}

export function PlayerCard({
  name,
  initialScore,
  onScoreChange,
  renderNameSection,
  isCompact = false,
  deviceType = 'desktop',
}: PlayerCardProps) {
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
  const getStyles = () => {
    if (deviceType === 'mobile') {
      return {
        container: 'p-1.5',
        score: 'text-2xl',
      }
    } else if (deviceType === 'tablet') {
      return {
        container: 'p-2',
        score: 'text-3xl',
      }
    } else {
      return {
        container: isCompact ? 'p-3' : 'p-4',
        score: isCompact ? 'text-3xl' : 'text-4xl',
      }
    }
  }

  const styles = getStyles()

  return (
    <div
      className={`bg-white dark:bg-gray-800 ${styles.container} rounded-lg shadow-md`}
    >
      <div className="flex justify-between items-center mb-2">
        {renderNameSection ? (
          renderNameSection()
        ) : (
          <h2
            className={`${
              isCompact ? 'text-sm' : 'text-base sm:text-lg'
            } font-bold text-gray-800 dark:text-gray-100`}
          >
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

      <PlayerScoreButtons
        onScoreChange={handleScoreChange}
        isCompact={isCompact}
        deviceType={deviceType}
      />
    </div>
  )
}
