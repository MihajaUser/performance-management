import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'


export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        firstname: "Alice",
        lastname: "Rasoa",
        email: "alice@entreprise.com",
        password: await Hash.make("password"),
        role: "employee",
        departmentId: 1,
        jobTitleId: 1,
        status: "active",
      },
      {
        firstname: "Bema",
        lastname: "Andry",
        email: "bema@entreprise.com",
        password: await Hash.make("password"),
        role: "manager",
        departmentId: 1,
        jobTitleId: 2,
        status: "active",
      },
      {
        firstname: "Tiana",
        lastname: "Rakoto",
        email: "tiana@entreprise.com",
        password: await Hash.make("password"),
        role: "employee",
        departmentId: 2,
        jobTitleId: 3,
        status: "active",
      },
      {
        firstname: "Micka",
        lastname: "Randria",
        email: "micka@entreprise.com",
        password: await Hash.make("password"),
        role: "manager",
        departmentId: 2,
        jobTitleId: 4,
        status: "active",
      },
    ]);
  }
}
