// frontend/app/(protected)/dashboard/components/AlertsList.tsx
"use client";

import { Badge, type BadgeProps } from "@heroui/react";
import { AlertTriangle, TrendingDown, Info } from "lucide-react";

export interface Alert {
  id: number;
  message: string;
  severity: "high" | "medium" | "low";
}

interface AlertConfig {
  color: BadgeProps["color"];
  icon: JSX.Element;
  label: string;
  labelClass: string;
}

export function AlertsList({ alerts }: { alerts: Alert[] }) {
  const getConfig = (severity: Alert["severity"]): AlertConfig => {
    switch (severity) {
      case "high":
        return {
          color: "danger",
          icon: <TrendingDown className="w-4 h-4 text-red-600" />,
          label: "Critique",
          labelClass: "text-red-700 font-semibold",
        };
      case "medium":
        return {
          color: "warning",
          icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
          label: "Modérée",
          labelClass: "text-amber-700 font-medium",
        };
      default:
        return {
          color: "default",
          icon: <Info className="w-4 h-4 text-gray-500" />,
          label: "Mineure",
          labelClass: "text-gray-600 font-medium",
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
    <ul className="space-y-3">
      {alerts.map((alert) => {
        const { icon, label, labelClass } = getConfig(alert.severity);
        return (
          <li
            key={alert.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              {icon}
              <span className="text-gray-800 text-[15px] font-medium leading-snug">
                {alert.message}
              </span>
            </div>
            <span
              className={[
                "px-3 py-1 text-xs rounded-full border border-gray-200 bg-gray-50",
                labelClass,
              ].join(" ")}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
