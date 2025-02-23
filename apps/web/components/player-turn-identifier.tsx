
export default function PlayerTurnIdentifier({
  username,
  isPlayerTurn
}: {
  username: string;
  isPlayerTurn: boolean;
}) {
  return <div 
    className={`w-96  flex items-center justify-center text-2xl monospace text-white p-3 rounded-e-lg mb-2
      transition-all
        ${isPlayerTurn ? "translate-x-0 bg-green-500" : "-translate-x-64 bg-gray-500"}
      `}
  >
    { username }
  </div>
}