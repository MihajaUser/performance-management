// frontend/app/(protected)/dashboard/components/StatsCards.tsx
"use client";

import { Card, CardBody } from "@heroui/react";
import { Users, Briefcase, Building2, AlertTriangle } from "lucide-react";

interface Stat {
  title: string;
  value: number | string;
}

const iconMap: Record<string, JSX.Element> = {
  "Employés actifs": <Users className="w-6 h-6 text-blue-600" />,
  Managers: <Briefcase className="w-6 h-6 text-green-600" />,
  Départements: <Building2 className="w-6 h-6 text-indigo-600" />,
  "Alertes sous-performance": <AlertTriangle className="w-6 h-6 text-red-500" />,
};

export function StatsCards({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
      {stats.map((item) => (
        <Card
          key={item.title}
          shadow="sm"
          className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:shadow-md transition-all duration-200"
        >
          <CardBody className="flex flex-col items-center justify-center text-center space-y-2 py-5">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
              {iconMap[item.title] ?? <Users className="w-6 h-6 text-gray-500" />}
            </div>
            <p className="text-sm text-gray-500">{item.title}</p>
            <p className="text-3xl font-semibold text-[#002B5B]">{item.value}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
