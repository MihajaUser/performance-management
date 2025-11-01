import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserCompetency from 'App/Models/UserCompetency'

export default class UserCompetencySeeder extends BaseSeeder {
  public async run() {
    await UserCompetency.createMany([
      // Alice (évaluation #1)
      { evaluationId: 1, competencyId: 1, score: 4, comment: 'Bonne autonomie', evaluatorType: 'manager' },
      { evaluationId: 1, competencyId: 2, score: 5, comment: 'Très bon esprit d`équipe', evaluatorType: 'manager' },
      { evaluationId: 1, competencyId: 3, score: 4, comment: 'Bonne maîtrise technique', evaluatorType: 'auto' },

      // Tiana (évaluation #2)
      { evaluationId: 2, competencyId: 1, score: 3, comment: 'Doit gagner en autonomie', evaluatorType: 'manager' },
      { evaluationId: 2, competencyId: 2, score: 4, comment: 'Bon travail en groupe', evaluatorType: 'manager' },
      { evaluationId: 2, competencyId: 4, score: 4, comment: 'Bon leadership', evaluatorType: 'manager' },
    ])
  }
}
