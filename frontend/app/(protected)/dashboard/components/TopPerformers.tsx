//frontend/app/(protected)/dashboard/components/TopPerformers.tsx
export function TopPerformers({
  data,
}: {
  data: { name: string; department: string; score: number }[]
}) {
  return (
    <table className="w-full text-sm text-left text-gray-600">
      <thead className="border-b text-gray-500">
        <tr>
          <th className="py-2">Employé</th>
          <th>Département</th>
          <th className="text-right">Score</th>
        </tr>
      </thead>
      <tbody>
        {data.map((p) => (
          <tr key={p.name} className="border-b last:border-none">
            <td className="py-2">{p.name}</td>
            <td>{p.department}</td>
            <td className="text-right font-medium text-gray-800">{p.score.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
