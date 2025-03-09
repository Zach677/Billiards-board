interface GameControlsProps {
  onSwitchPlayer: () => void
  onUndoLastAction: () => void
  onResetGame: () => void
  currentPlayerName: string
  round: number
}

export default function GameControls({
  onSwitchPlayer,
  onUndoLastAction,
  onResetGame,
  currentPlayerName,
  round,
}: GameControlsProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">当前回合: {round}</h3>
          <p className="text-sm text-gray-600">
            轮到: <span className="font-medium">{currentPlayerName}</span>
          </p>
        </div>
        <button
          onClick={onSwitchPlayer}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          换人
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onUndoLastAction}
          className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          撤销
        </button>
        <button
          onClick={onResetGame}
          className="bg-red-100 text-red-700 py-2 px-4 rounded-md hover:bg-red-200 transition flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          重置
        </button>
      </div>
    </div>
  )
}
