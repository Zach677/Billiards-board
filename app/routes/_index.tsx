import type { MetaFunction } from '@remix-run/node'
import BilliardsGame from '~/components/BilliardsGame'

export const meta: MetaFunction = () => {
  return [
    { title: '九球追分记分板' },
    { name: 'description', content: '一个简单易用的九球追分记分板应用' },
  ]
}

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <BilliardsGame />
    </div>
  )
}
