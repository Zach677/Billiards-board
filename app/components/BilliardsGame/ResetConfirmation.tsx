import { DeviceType } from '~/types/billiards'

interface ResetConfirmationProps {
  onConfirm: () => void
  onCancel: () => void
  deviceType: DeviceType
}

export function ResetConfirmation({
  onConfirm,
  onCancel,
  deviceType,
}: ResetConfirmationProps) {
  const getModalStyles = () => {
    if (deviceType === 'mobile') {
      return {
        container: 'p-3',
        title: 'text-base',
        button: 'py-1.5 px-3 text-xs',
      }
    } else if (deviceType === 'tablet') {
      return {
        container: 'p-4',
        title: 'text-lg',
        button: 'py-2 px-4 text-sm',
      }
    } else {
      return {
        container: 'p-5',
        title: 'text-xl',
        button: 'py-2 px-5 text-base',
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
          确认重置
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
          确定要重置所有分数吗？此操作无法撤销。
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className={`bg-gray-500 text-white ${styles.button} rounded hover:bg-gray-600 transition`}
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className={`bg-red-500 text-white ${styles.button} rounded hover:bg-red-600 transition`}
          >
            重置
          </button>
        </div>
      </div>
    </div>
  )
}
