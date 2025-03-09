interface HistoryEntry {
  round: number
  player1Score: number
  player2Score: number
  activePlayer: string
}

interface GameHistoryProps {
  history: HistoryEntry[]
  player1Name: string
  player2Name: string
}

export default function GameHistory({
  history,
  player1Name,
  player2Name,
}: GameHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">游戏历史</h3>
        <p className="text-gray-500 text-center py-4">暂无历史记录</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">游戏历史</h3>
      <div className="overflow-auto max-h-80">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                回合
              </th>
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {player1Name}
              </th>
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {player2Name}
              </th>
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                当前玩家
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {history.map((entry) => (
              <tr key={entry.round} className="hover:bg-gray-50">
                <td className="py-2 px-3 text-sm">{entry.round}</td>
                <td className="py-2 px-3 text-sm">{entry.player1Score}</td>
                <td className="py-2 px-3 text-sm">{entry.player2Score}</td>
                <td className="py-2 px-3 text-sm">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      entry.activePlayer === player1Name
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {entry.activePlayer}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
