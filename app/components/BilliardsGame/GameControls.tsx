import { DeviceType } from '~/types/billiards'

interface GameControlsProps {
  onReset: () => void
  onUndo: () => void
  onChangeModeClick: () => void
  deviceType: DeviceType
  historyLength: number
}

export function GameControls({
  onReset,
  onUndo,
  onChangeModeClick,
  deviceType,
  historyLength,
}: GameControlsProps) {
  const getControlStyles = () => {
    if (deviceType === 'mobile') {
      return {
        container: 'p-1.5',
        button: 'px-2 py-1 text-xs',
      }
    } else if (deviceType === 'tablet') {
      return {
        container: 'p-2',
        button: 'px-3 py-1.5 text-sm',
      }
    } else {
      return {
        container: 'p-3',
        button: 'px-4 py-2 text-sm',
      }
    }
  }

  const styles = getControlStyles()

  return (
    <div
      className={`bg-white dark:bg-gray-800 ${styles.container} rounded-lg shadow-md flex flex-wrap gap-2 justify-center`}
    >
      <button
        onClick={onReset}
        className={`bg-red-500 text-white ${styles.button} rounded hover:bg-red-600 transition font-medium`}
      >
        重置
      </button>
      <button
        onClick={onUndo}
        className={`bg-amber-500 text-white ${
          styles.button
        } rounded hover:bg-amber-600 transition font-medium ${
          historyLength === 0 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={historyLength === 0}
      >
        撤销
      </button>
      <button
        onClick={onChangeModeClick}
        className={`bg-blue-500 text-white ${styles.button} rounded hover:bg-blue-600 transition font-medium`}
      >
        切换模式
      </button>
    </div>
  )
}
