import { useState } from 'react'

interface PlayerProps {
  name: string
  initialScore: number
  onScoreChange: (newScore: number) => void
  isActive: boolean
}

export default function Player({
  name,
  initialScore,
  onScoreChange,
  isActive,
}: PlayerProps) {
  const [score, setScore] = useState(initialScore)

  const handleScoreChange = (increment: number) => {
    const newScore = score + increment
    if (newScore >= 0) {
      setScore(newScore)
      onScoreChange(newScore)
    }
  }

  return (
    <div
      className={`p-4 rounded-lg shadow-md ${
        isActive ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50'
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <div
          className={`px-2 py-1 rounded-full ${
            isActive ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {isActive ? '当前回合' : '等待中'}
        </div>
      </div>

      <div className="text-center mb-4">
        <span className="text-5xl font-bold">{score}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <button
          onClick={() => handleScoreChange(1)}
          className="bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          犯规 (+1)
        </button>
        <button
          onClick={() => handleScoreChange(4)}
          className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          普胜 (+4)
        </button>
        <button
          onClick={() => handleScoreChange(7)}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          小金 (+7)
        </button>
        <button
          onClick={() => handleScoreChange(10)}
          className="bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition"
        >
          大金 (+10)
        </button>
      </div>

      <button
        onClick={() => handleScoreChange(4)}
        className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
      >
        黄金9 (+4)
      </button>
    </div>
  )
}
