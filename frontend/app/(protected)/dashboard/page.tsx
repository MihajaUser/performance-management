//frontend/app/(protected)/dashboard/page.tsx
"use client";

import { Card, CardHeader, CardBody } from "@heroui/react";
import { StatsCards } from "./components/StatsCards";
import { PerformanceChart } from "./components/PerformanceChart";
import { AlertsList } from "./components/AlertsList";
import { TopPerformers } from "./components/TopPerformers";
import {
  stats,
  performanceByDept,
  alerts,
  topPerformers,
} from "./data/mockDashboard";

export default function DashboardPage() {
  return (
    <div className="p-3.5 space-y-3.5">
      <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
        Tableau de bord
      </h1>

      <StatsCards stats={stats} />

      <Card shadow="sm">
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-700">
            Performance moyenne par département
          </h2>
        </CardHeader>
        <CardBody>
          <PerformanceChart data={performanceByDept} />
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card shadow="sm">
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-700">
              Top Performeurs
            </h2>
          </CardHeader>
          <CardBody>
            <TopPerformers data={topPerformers} />
          </CardBody>
        </Card>

        <Card shadow="sm">
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-700">Alertes IA</h2>
          </CardHeader>
          <CardBody>
            <AlertsList alerts={alerts} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
