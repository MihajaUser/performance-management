import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Role from 'App/Models/Role'

export default class UserRoleSeeder extends BaseSeeder {
  public async run() {
    const users = await User.all()
    const roles = await Role.all()

    const map = {
      'avotra.r@generis.mg': 'employee',
      'bema.a@generis.mg': 'manager',
      'tiana.r@generis.mg': 'employee',
      'micka.r@generis.mg': 'hr',
    }

    for (const user of users) {
      const role = roles.find((r) => r.name === map[user.email])
      if (role) {
        await user.related('userRoles').create({ roleId: role.id })
      }
    }
  }
}
