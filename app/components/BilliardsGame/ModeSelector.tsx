import { GameMode, DeviceType } from '~/types/billiards'

interface ModeSelectorProps {
  onModeSelect: (mode: GameMode) => void
  currentMode: GameMode
  deviceType: DeviceType
  onClose: () => void
}

export function ModeSelector({
  onModeSelect,
  currentMode,
  deviceType,
  onClose,
}: ModeSelectorProps) {
  const getModalStyles = () => {
    if (deviceType === 'mobile') {
      return {
        container: 'p-3',
        title: 'text-lg',
        button: 'py-2 text-sm',
      }
    } else if (deviceType === 'tablet') {
      return {
        container: 'p-4',
        title: 'text-xl',
        button: 'py-2.5 text-base',
      }
    } else {
      return {
        container: 'p-5',
        title: 'text-2xl',
        button: 'py-3 text-base',
      }
    }
  }

  const styles = getModalStyles()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-white dark:bg-gray-800 ${styles.container} rounded-lg shadow-lg max-w-sm w-full`}
      >
        <h2
          className={`${styles.title} font-bold text-gray-800 dark:text-gray-100 mb-4 text-center`}
        >
          选择游戏模式
        </h2>

        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => onModeSelect('两人')}
            className={`${
              currentMode === '两人'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            } ${
              styles.button
            } w-full rounded hover:bg-blue-500 dark:hover:bg-blue-800 transition`}
          >
            两人模式
          </button>
          <button
            onClick={() => onModeSelect('三人')}
            className={`${
              currentMode === '三人'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            } ${
              styles.button
            } w-full rounded hover:bg-blue-500 dark:hover:bg-blue-800 transition`}
          >
            三人模式
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  )
}
