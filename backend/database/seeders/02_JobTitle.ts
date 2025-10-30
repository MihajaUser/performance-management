import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import JobTitle from 'App/Models/JobTitle'

export default class JobTitleSeeder extends BaseSeeder {
  public async run() {
    await JobTitle.createMany([
      { departmentId: 1, name: 'Développeur web', description: 'Développement applicatif' },
      { departmentId: 1, name: 'Chef de projet', description: 'Gestion des projets techniques' },
      { departmentId: 2, name: 'Recruteur', description: 'Sélection et intégration du personnel' },
      { departmentId: 2, name: 'Responsable RH', description: 'Encadrement du service RH' },
    ])
  }
}
