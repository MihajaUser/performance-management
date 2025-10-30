import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import KpiTemplate from 'App/Models/KpiTemplate'

export default class KpiTemplateSeeder extends BaseSeeder {
  public async run() {
    await KpiTemplate.createMany([
      // Informatique – Développeur
      { departmentId: 1, jobTitleId: 1, name: 'Bugs corrigés / sprint', unit: 'nb', weight: 25 },
      { departmentId: 1, jobTitleId: 1, name: 'Qualité du code', unit: 'points', weight: 25 },
      { departmentId: 1, jobTitleId: 1, name: 'Respect des délais', unit: '%', weight: 25 },
      { departmentId: 1, jobTitleId: 1, name: 'Documentation technique', unit: 'pages', weight: 25 },

      // RH – Recruteur
      { departmentId: 2, jobTitleId: 3, name: 'Candidats traités', unit: 'nb', weight: 25 },
      { departmentId: 2, jobTitleId: 3, name: 'Taux d’embauche', unit: '%', weight: 25 },
      { departmentId: 2, jobTitleId: 3, name: 'Délai de recrutement moyen', unit: 'jours', weight: 25 },
      { departmentId: 2, jobTitleId: 3, name: 'Satisfaction candidats', unit: '%', weight: 25 },
    ])
  }
}
