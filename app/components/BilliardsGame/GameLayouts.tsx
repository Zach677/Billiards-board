import { ReactNode } from 'react'
import { DeviceType } from '~/types/billiards'

interface LayoutProps {
  children: ReactNode[]
  deviceType: DeviceType
}

export function LandscapeLayout({ children, deviceType }: LayoutProps) {
  const [players, stats, controls] = children

  if (deviceType === 'mobile') {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-grow flex gap-2 p-2">
          <div className="w-3/4 grid grid-rows-3 gap-2">{players}</div>
          <div className="w-1/4 flex flex-col gap-2">
            <div className="flex-grow">{stats}</div>
            <div>{controls}</div>
          </div>
        </div>
      </div>
    )
  }

  if (deviceType === 'tablet') {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-grow flex gap-3 p-3">
          <div className="w-3/4 grid grid-rows-3 gap-3">{players}</div>
          <div className="w-1/4 flex flex-col gap-3">
            <div className="flex-grow">{stats}</div>
            <div>{controls}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow flex gap-4 p-4">
        <div className="w-3/4 grid grid-rows-3 gap-4">{players}</div>
        <div className="w-1/4 flex flex-col gap-4">
          <div className="flex-grow">{stats}</div>
          <div>{controls}</div>
        </div>
      </div>
    </div>
  )
}

export function PortraitLayout({ children, deviceType }: LayoutProps) {
  const [players, stats, controls] = children

  const getGridCols = () => {
    const activePlayers = Array.isArray(players) ? players.length : 0

    if (activePlayers === 2) {
      return deviceType === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'
    } else {
      // 三人模式
      return deviceType === 'mobile'
        ? 'grid-cols-1'
        : deviceType === 'tablet'
        ? 'grid-cols-2'
        : 'grid-cols-3'
    }
  }

  const getGapSize = () => {
    if (deviceType === 'mobile') return 'gap-2 p-2'
    if (deviceType === 'tablet') return 'gap-3 p-3'
    return 'gap-4 p-4'
  }

  const gridCols = getGridCols()
  const gapSize = getGapSize()

  return (
    <div className="min-h-screen flex flex-col">
      <div className={`flex-1 grid ${gridCols} ${gapSize}`}>{players}</div>
      <div className={gapSize}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-inherit">
          <div className="order-2 md:order-1">{controls}</div>
          <div className="order-1 md:order-2">{stats}</div>
        </div>
      </div>
    </div>
  )
}
