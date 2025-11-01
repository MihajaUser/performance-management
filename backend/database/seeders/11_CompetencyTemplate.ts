import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CompetencyTemplate from 'App/Models/CompetencyTemplate'

export default class CompetencyTemplateSeeder extends BaseSeeder {
  public async run() {
    await CompetencyTemplate.createMany([
      { name: 'Autonomie', description: 'Capacité à travailler sans supervision constante', categoryId: 2 },
      { name: 'Esprit d’équipe', description: 'Collaboration et communication efficace avec les collègues', categoryId: 2 },
      { name: 'Maîtrise technique', description: 'Utilisation efficace des outils et technologies du poste', categoryId: 1 },
      { name: 'Leadership', description: 'Capacité à guider, motiver et accompagner une équipe', categoryId: 3 },
    ])
  }
}
