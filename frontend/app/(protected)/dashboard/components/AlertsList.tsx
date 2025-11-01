import { Badge } from "@heroui/react"

export function AlertsList({ alerts }: { alerts: { id: number; message: string; severity: string }[] }) {
  const getColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "danger"
      case "medium":
        return "warning"
      default:
        return "default"
    }
  }

  return (
    <ul className="space-y-3">
      {alerts.map((alert) => (
        <li key={alert.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
          <span className="text-gray-700 text-sm">{alert.message}</span>
          <Badge color={getColor(alert.severity)}>{alert.severity}</Badge>
        </li>
      ))}
    </ul>
  )
}
