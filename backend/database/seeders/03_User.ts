import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        firstname: 'Avotra',
        lastname: 'Rakoto',
        email: 'avotra.r@generis.mg',
        password: await Hash.make('password'),
        departmentId: 1, // Informatique
        jobTitleId: 1, // Développeur
        matricule: 'IT-INF-001', // Département Informatique (INF), 1er employé
        status: 'active',
      },
      {
        firstname: 'Bema',
        lastname: 'Andry',
        email: 'bema.r@generis.mg',
        password: await Hash.make('password'),
        departmentId: 1, // Informatique
        jobTitleId: 2, // Administrateur Réseau
        matricule: 'IT-INF-002', // Département Informatique (INF), 2e employé
        status: 'active',
      },
      {
        firstname: 'Tiana',
        lastname: 'Rakoto',
        email: 'tiana.r@generis.mg',
        password: await Hash.make('password'),
        departmentId: 2, // Ressources Humaines
        jobTitleId: 3, // Comptable
        matricule: 'RH-RES-001', // Département RH (RES), 1er employé
        status: 'active',
      },
      {
        firstname: 'Micka',
        lastname: 'Randria',
        email: 'micka.r@generis.mg',
        password: await Hash.make('password'),
        departmentId: 2, // Ressources Humaines
        jobTitleId: 4, // Responsable RH
        matricule: 'RH-RES-002', // Département RH (RES), 2e employé
        status: 'active',
      },
    ])
  }
}
