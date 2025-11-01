import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CompetencyResult from 'App/Models/CompetencyResult'

export default class CompetencyResultSeeder extends BaseSeeder {
  public async run() {
    await CompetencyResult.createMany([
      // Alice (évaluation #1)
      { evaluationId: 1, categoryId: 1, averageScore: 4.2, commentSummary: 'Très bon niveau technique' },
      { evaluationId: 1, categoryId: 2, averageScore: 4.8, commentSummary: 'Excellent comportement' },

      // Tiana (évaluation #2)
      { evaluationId: 2, categoryId: 2, averageScore: 3.9, commentSummary: 'Bonne attitude générale' },
      { evaluationId: 2, categoryId: 3, averageScore: 4.1, commentSummary: 'Leadership prometteur' },
    ])
  }
}
