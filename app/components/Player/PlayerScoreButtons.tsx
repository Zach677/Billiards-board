import { ScoreType, DeviceType } from '~/types/billiards'

interface PlayerScoreButtonsProps {
  onScoreChange: (increment: number, scoreType: ScoreType) => void
  isCompact?: boolean
  deviceType?: DeviceType
}

export function PlayerScoreButtons({
  onScoreChange,
  isCompact = false,
  deviceType = 'desktop',
}: PlayerScoreButtonsProps) {
  // 根据设备类型获取适当的样式
  const getButtonStyles = () => {
    if (deviceType === 'mobile') {
      return {
        buttonGrid: 'gap-1 mb-1',
        button: 'py-1 px-1 text-xs',
      }
    } else if (deviceType === 'tablet') {
      return {
        buttonGrid: 'gap-1.5 mb-1.5',
        button: 'py-1.5 px-1.5 text-xs',
      }
    } else {
      return {
        buttonGrid: 'gap-2 mb-2',
        button: 'py-2 text-sm',
      }
    }
  }

  const styles = getButtonStyles()

  return (
    <>
      <div className={`grid grid-cols-2 ${styles.buttonGrid}`}>
        <button
          onClick={() => onScoreChange(1, '犯规')}
          className={`bg-red-500 dark:bg-red-600 text-white ${styles.button} rounded hover:bg-red-600 dark:hover:bg-red-700 transition font-medium`}
        >
          {isCompact ? '犯+1' : '犯规 +1'}
        </button>
        <button
          onClick={() => onScoreChange(4, '普胜')}
          className={`bg-green-500 dark:bg-green-600 text-white ${styles.button} rounded hover:bg-green-600 dark:hover:bg-green-700 transition font-medium`}
        >
          {isCompact ? '普+4' : '普胜 +4'}
        </button>
        <button
          onClick={() => onScoreChange(7, '小金')}
          className={`bg-blue-500 dark:bg-blue-600 text-white ${styles.button} rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition font-medium`}
        >
          {isCompact ? '小+7' : '小金 +7'}
        </button>
        <button
          onClick={() => onScoreChange(10, '大金')}
          className={`bg-purple-500 dark:bg-purple-600 text-white ${styles.button} rounded hover:bg-purple-600 dark:hover:bg-purple-700 transition font-medium`}
        >
          {isCompact ? '大+10' : '大金 +10'}
        </button>
      </div>

      <button
        onClick={() => onScoreChange(4, '黄金9')}
        className={`w-full bg-yellow-500 dark:bg-yellow-600 text-white ${styles.button} rounded hover:bg-yellow-600 dark:hover:bg-yellow-700 transition font-medium`}
      >
        黄金9 +4
      </button>
    </>
  )
}
