import { useState, useEffect } from 'react'
import { DeviceType } from '~/types/billiards'

interface ScreenDetection {
  isLandscape: boolean
  deviceType: DeviceType
}

export function useScreenDetection(): ScreenDetection {
  const [isLandscape, setIsLandscape] = useState(false)
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop')

  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      // 检测横屏/竖屏
      setIsLandscape(width > height)

      // 检测设备类型
      if (width < 640) {
        setDeviceType('mobile') // iPhone或小型手机
      } else if (width < 1024) {
        setDeviceType('tablet') // iPad或平板设备
      } else {
        setDeviceType('desktop') // 桌面或大屏设备
      }
    }

    // 初始检查
    checkScreen()

    // 监听窗口大小变化
    window.addEventListener('resize', checkScreen)

    // 清理监听器
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  return { isLandscape, deviceType }
}
