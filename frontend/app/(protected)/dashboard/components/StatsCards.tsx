// frontend/app/(protected)/dashboard/components/StatsCards.tsx
"use client";

import { Card, CardBody } from "@heroui/react";
import { Users, Briefcase, Building2, AlertTriangle } from "lucide-react";

interface Stat {
  title: string;
  value: number | string;
}

const iconMap: Record<string, JSX.Element> = {
  "Employés actifs": <Users className="w-6 h-6 text-blue-500" />,
  Managers: <Briefcase className="w-6 h-6 text-green-500" />,
  Départements: <Building2 className="w-6 h-6 text-indigo-500" />,
  "Alertes sous-performance": <AlertTriangle className="w-6 h-6 text-red-500" />,
};

export function StatsCards({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((item) => (
        <Card
          key={item.title}
          shadow="none"
          className="bg-white border border-blue-50 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 rounded-xl"
        >
          <CardBody className="flex flex-col items-center justify-center text-center py-6 space-y-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 shadow-inner">
              {iconMap[item.title] ?? (
                <Users className="w-6 h-6 text-gray-500" />
              )}
            </div>
            <p className="text-sm text-gray-600 font-medium tracking-wide">
              {item.title}
            </p>
            <p className="text-3xl font-semibold text-[#002B5B]">
              {item.value}
            </p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
