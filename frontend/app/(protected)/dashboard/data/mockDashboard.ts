//frontend/app/(protected)/dashboard/data/mockDashboard.ts
export const stats = [
  { title: "Employés actifs", value: 42 },
  { title: "Managers", value: 6 },
  { title: "Départements", value: 5 },
  { title: "Alertes sous-performance", value: 3 },
];

export const performanceByDept = [
  { name: "Informatique", score: 82 },
  { name: "Ressources Humaines", score: 74 },
  { name: "Finance", score: 79 },
  { name: "Logistique", score: 68 },
  { name: "Commercial", score: 85 },
];

export const alerts = [
  { id: 1, message: "Sous-performance observée - Département RH", severity: "high" },
  { id: 2, message: "Baisse de productivité en Logistique", severity: "medium" },
  { id: 3, message: "Retards récurrents dans les livrables IT", severity: "medium" },
];

export const topPerformers = [
  { name: "Alice Rasoa", department: "Informatique", score: 94 },
  { name: "Tiana Rakoto", department: "RH", score: 89 },
  { name: "Rado Andry", department: "Commercial", score: 92 },
];
