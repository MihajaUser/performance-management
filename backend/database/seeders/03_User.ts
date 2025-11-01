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
        status: 'active',
      },
      {
        firstname: 'Bema',
        lastname: 'Andry',
        email: 'bema.a@generis.mg',
        password: await Hash.make('password'),
        departmentId: 1, // Informatique
        jobTitleId: 2, // Administrateur Réseau
        status: 'active',
      },
      {
        firstname: 'Tiana',
        lastname: 'Rakoto',
        email: 'tiana.r@generis.mg',
        password: await Hash.make('password'),
        departmentId: 2, // Ressources Humaines
        jobTitleId: 3, // Comptable
        status: 'active',
      },
      {
        firstname: 'Micka',
        lastname: 'Randria',
        email: 'micka.r@generis.mg',
        password: await Hash.make('password'),
        departmentId: 2, // Ressources Humaines
        jobTitleId: 4, // Responsable RH
        status: 'active',
      },
    ])
  }
}
