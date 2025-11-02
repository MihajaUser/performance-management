export type KpiItem = { id: number; name: string; target: number; actual: number };

export function EmployeeKpis({ items }: { items: KpiItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((kpi) => {
        const pct = Math.min(100, Math.round((kpi.actual / kpi.target) * 100));
        return (
          <div key={kpi.id}>
            <div className="flex items-center justify-between text-sm">
              <p className="text-gray-700">{kpi.name}</p>
              <p className="text-gray-500">
                {kpi.actual} / {kpi.target}
              </p>
            </div>
            <div className="h-2 bg-gray-200 rounded">
              <div
                className="h-2 rounded bg-blue-600"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
      {items.length === 0 && <p className="text-gray-500">Aucun KPI.</p>}
    </div>
  );
}
