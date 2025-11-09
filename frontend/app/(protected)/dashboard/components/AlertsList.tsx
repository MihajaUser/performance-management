// frontend/app/(protected)/dashboard/components/AlertsList.tsx
"use client";

import { Badge } from "@heroui/react";
import { AlertTriangle, TrendingDown, Info } from "lucide-react";

export interface Alert {
  id: number;
  message: string;
  severity: "high" | "medium" | "low";
}

export function AlertsList({ alerts }: { alerts: Alert[] }) {
  const getConfig = (severity: Alert["severity"]) => {
    switch (severity) {
      case "high":
        return {
          color: "danger",
          icon: <TrendingDown className="w-4 h-4 text-red-600" />,
          label: "Critique",
        };
      case "medium":
        return {
          color: "warning",
          icon: <AlertTriangle className="w-4 h-4 text-orange-500" />,
          label: "Modérée",
        };
      default:
        return {
          color: "default",
          icon: <Info className="w-4 h-4 text-gray-500" />,
          label: "Mineure",
        };
    }
  };

  if (!alerts.length) {
    return (
      <p className="text-gray-500 text-sm italic">
        Aucune alerte de sous-performance détectée récemment.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {alerts.map((alert) => {
        const { color, icon, label } = getConfig(alert.severity);
        return (
          <li
            key={alert.id}
            className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition p-2 rounded-lg border border-gray-200"
          >
            <div className="flex items-center gap-3 text-gray-700 text-sm">
              {icon}
              <span>{alert.message}</span>
            </div>
            <Badge color={color} variant="flat">
              {label}
            </Badge>
          </li>
        );
      })}
    </ul>
  );
}
