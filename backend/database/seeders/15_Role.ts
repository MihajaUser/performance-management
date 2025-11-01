import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    await Role.createMany([
      {
        name: 'employee',
        label: 'Employé',
        description: 'Accès limité à ses informations et évaluations personnelles.',
        isSystem: true,
      },
      {
        name: 'manager',
        label: 'Manager',
        description: 'Supervise une équipe, crée et valide des évaluations.',
        isSystem: true,
      },
      {
        name: 'hr',
        label: 'Ressources Humaines',
        description: 'Gère les utilisateurs, les objectifs et les rapports RH.',
        isSystem: true,
      },
      {
        name: 'admin',
        label: 'Administrateur',
        description: 'Accès complet au système, configuration et sécurité.',
        isSystem: true,
      },
    ])
  }
}
