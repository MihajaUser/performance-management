import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CompetencyCategory from 'App/Models/CompetencyCategory'

export default class CompetencyCategorySeeder extends BaseSeeder {
  public async run() {
    await CompetencyCategory.createMany([
      { name: 'Techniques', description: 'Compétences liées aux outils et à la pratique métier' },
      { name: 'Comportementales', description: 'Compétences humaines, communication, attitude' },
      { name: 'Managériales', description: 'Leadership, supervision, accompagnement d’équipe' },
    ])
  }
}
