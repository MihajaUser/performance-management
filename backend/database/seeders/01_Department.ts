import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Department from 'App/Models/Department'

export default class DepartmentSeeder extends BaseSeeder {
  public async run() {
    await Department.createMany([
      { name: 'Informatique', description: 'Département technique et développement logiciel' },
      { name: 'Ressources Humaines', description: 'Gestion du personnel et du recrutement' },
      { name: 'Finance', description: 'Suivi budgétaire et gestion financière' },
      { name: 'Logistique', description: 'Gestion des flux, stocks et approvisionnements' },
      { name: 'Commercial', description: 'Ventes, partenariats et relations clients' },
    ])
  }
}
