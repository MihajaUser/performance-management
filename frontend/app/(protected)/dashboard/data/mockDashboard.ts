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
  { id: 1, message: "Hausse inhabituelle de commentaires négatifs dans le département Logistique.", severity: "high" },
  { id: 2, message: "Sous-performance prédite par l’IA pour le département Commercial.", severity: "high" },
  { id: 3, message: "Légère baisse d’engagement détectée dans le département Informatique.", severity: "medium" },
];


export const topPerformers = [
  { name: "Alice Rasoa", department: "RH", score: 94 },
  { name: "Tiana Rakoto", department: "Informatique", score: 92 },
  { name: "Rado Andry", department: "Commercial", score: 89 },
];
