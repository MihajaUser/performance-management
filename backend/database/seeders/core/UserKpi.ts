import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserKpi from 'App/Models/UserKpi'

export default class UserKpiSeeder extends BaseSeeder {
  public async run() {
    await UserKpi.createMany([
      // Alice – Informatique
      { userId: 1, kpiTemplateId: 1, period: 'Q1-2025', target: 30, actual: 28, score: 93, comment: 'Bonne rigueur sur les livrables.' },
      { userId: 1, kpiTemplateId: 2, period: 'Q1-2025', target: 85, actual: 88, score: 103, comment: 'Très bon code et qualité constante.' },
      { userId: 1, kpiTemplateId: 3, period: 'Q1-2025', target: 95, actual: 92, score: 97, comment: 'Quelques retards minimes.' },
      { userId: 1, kpiTemplateId: 4, period: 'Q1-2025', target: 10, actual: 9, score: 90, comment: 'Documentation quasi complète.' },

      // Tiana – Ressources Humaines
      { userId: 3, kpiTemplateId: 5, period: 'Q1-2025', target: 50, actual: 52, score: 104, comment: 'Objectifs dépassés.' },
      { userId: 3, kpiTemplateId: 6, period: 'Q1-2025', target: 80, actual: 78, score: 97, comment: 'Bon taux global.' },
      { userId: 3, kpiTemplateId: 7, period: 'Q1-2025', target: 15, actual: 17, score: 113, comment: 'Process rapide.' },
      { userId: 3, kpiTemplateId: 8, period: 'Q1-2025', target: 90, actual: 85, score: 94, comment: 'Bonne relation candidats.' },
    ])
  }
}
