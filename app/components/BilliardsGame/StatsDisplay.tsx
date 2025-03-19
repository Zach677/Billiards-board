import { Stats, DeviceType } from '~/types/billiards'

interface StatsDisplayProps {
  stats: Stats
  mini?: boolean
  deviceType: DeviceType
}

export function StatsDisplay({
  stats,
  mini = false,
  deviceType,
}: StatsDisplayProps) {
  // 根据设备类型调整样式
  const getStatsStyles = () => {
    if (deviceType === 'mobile') {
      return {
        container: 'p-1.5',
        title: 'text-xs mb-1',
        item: 'text-xs py-0.5',
      }
    } else if (deviceType === 'tablet') {
      return {
        container: 'p-2',
        title: 'text-sm mb-1.5',
        item: 'text-xs py-0.75',
      }
    } else {
      return {
        container: 'p-2 sm:p-3',
        title: 'text-sm sm:text-base mb-2',
        item: 'text-xs sm:text-sm py-1',
      }
    }
  }

  const styles = getStatsStyles()

  if (mini) {
    return (
      <div className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-md text-center">
        <div className="grid grid-cols-1 gap-0.5">
          <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded text-xs py-0.5">
            犯规: {stats.犯规}
          </div>
          <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs py-0.5">
            普胜: {stats.普胜}
          </div>
          <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs py-0.5">
            小金: {stats.小金}
          </div>
          <div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs py-0.5">
            大金: {stats.大金}
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs py-0.5">
            黄金9: {stats.黄金9}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`bg-white dark:bg-gray-800 ${styles.container} rounded-lg shadow-md`}
    >
      <h3
        className={`${styles.title} font-bold text-gray-700 dark:text-gray-300`}
      >
        统计
      </h3>

      <div className="space-y-1">
        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded px-2 flex justify-between items-center">
          <span className={styles.item}>犯规</span>
          <span className={styles.item}>{stats.犯规}</span>
        </div>
        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded px-2 flex justify-between items-center">
          <span className={styles.item}>普胜</span>
          <span className={styles.item}>{stats.普胜}</span>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded px-2 flex justify-between items-center">
          <span className={styles.item}>小金</span>
          <span className={styles.item}>{stats.小金}</span>
        </div>
        <div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded px-2 flex justify-between items-center">
          <span className={styles.item}>大金</span>
          <span className={styles.item}>{stats.大金}</span>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded px-2 flex justify-between items-center">
          <span className={styles.item}>黄金9</span>
          <span className={styles.item}>{stats.黄金9}</span>
        </div>
      </div>
    </div>
  )
}
