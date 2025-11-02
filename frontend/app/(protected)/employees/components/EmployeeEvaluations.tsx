export type EvaluationItem = {
  id: number;
  period: string;
  score: number;
  sentiment: string;
};

export function EmployeeEvaluations({ items }: { items: EvaluationItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((e) => (
        <div
          key={e.id}
          className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
        >
          <div>
            <p className="text-sm text-gray-500">{e.period}</p>
            <p className="text-sm text-gray-700">
              Sentiment IA : <span className="font-medium">{e.sentiment}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Score</p>
            <p className="text-lg font-semibold text-gray-800">
              {e.score.toFixed(2)}
            </p>
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-gray-500">Aucune évaluation.</p>
      )}
    </div>
  );
}
