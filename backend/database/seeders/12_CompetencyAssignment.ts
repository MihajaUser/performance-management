import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CompetencyAssignment from 'App/Models/CompetencyAssignment'

export default class CompetencyAssignmentSeeder extends BaseSeeder {
  public async run() {
    await CompetencyAssignment.createMany([
      // Département Informatique
      { competencyId: 1, departmentId: 1, jobTitleId: 1, requiredLevel: 'M' }, // Autonomie - Développeur
      { competencyId: 2, departmentId: 1, jobTitleId: 1, requiredLevel: 'M' }, // Esprit d’équipe - Développeur
      { competencyId: 3, departmentId: 1, jobTitleId: 1, requiredLevel: 'E' }, // Maîtrise technique - Développeur

      // Département RH
      { competencyId: 1, departmentId: 2, jobTitleId: 3, requiredLevel: 'I' }, // Autonomie - Comptable
      { competencyId: 2, departmentId: 2, jobTitleId: 3, requiredLevel: 'M' }, // Esprit d’équipe - Comptable
      { competencyId: 4, departmentId: 2, jobTitleId: 4, requiredLevel: 'M' }, // Leadership - Responsable RH
    ])
  }
}
