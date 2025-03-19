import { useState, useEffect } from 'react'
import { DeviceType } from '~/types/billiards'

interface NameEditDialogProps {
  playerName: string
  onSave: (newName: string) => void
  onCancel: () => void
  deviceType: DeviceType
}

export function NameEditDialog({
  playerName,
  onSave,
  onCancel,
  deviceType,
}: NameEditDialogProps) {
  const [name, setName] = useState(playerName)

  // 当playerName从父组件变化时更新本地状态
  useEffect(() => {
    setName(playerName)
  }, [playerName])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() !== '') {
      onSave(name)
    }
  }

  const getModalStyles = () => {
    if (deviceType === 'mobile') {
      return {
        container: 'p-3',
        title: 'text-base',
        input: 'text-sm py-1.5 px-3',
        button: 'py-1.5 px-3 text-xs',
      }
    } else if (deviceType === 'tablet') {
      return {
        container: 'p-4',
        title: 'text-lg',
        input: 'text-base py-2 px-4',
        button: 'py-2 px-4 text-sm',
      }
    } else {
      return {
        container: 'p-5',
        title: 'text-xl',
        input: 'text-base py-2 px-4',
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
          编辑玩家名称
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${styles.input} w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded mb-4 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600`}
            placeholder="输入玩家名称"
          />

          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={onCancel}
              className={`bg-gray-500 text-white ${styles.button} rounded hover:bg-gray-600 transition`}
            >
              取消
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white ${styles.button} rounded hover:bg-blue-600 transition`}
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
