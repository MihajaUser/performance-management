//frontend/app/(protected)/dashboard/components/StatsCards.tsx
import { Card, CardBody } from "@heroui/react"

export function StatsCards({ stats }: { stats: { title: string; value: number | string }[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((item) => (
        <Card key={item.title} shadow="sm" className="bg-white border border-gray-100">
          <CardBody className="text-center space-y-1">
            <p className="text-sm text-gray-500">{item.title}</p>
            <p className="text-2xl font-semibold text-gray-800">{item.value}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
