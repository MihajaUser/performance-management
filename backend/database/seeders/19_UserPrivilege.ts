import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Privilege from 'App/Models/Privilege'

export default class UserPrivilegeSeeder extends BaseSeeder {
  public async run() {
    const users = await User.all()
    const privileges = await Privilege.all()

    const createEvaluation = privileges.find((p) => p.name === 'create_evaluation')

    const bema = users.find((u) => u.email === 'bema.a@generis.mg')
    const tiana = users.find((u) => u.email === 'tiana.r@generis.mg')

    if (bema && createEvaluation) {
      await bema.related('userPrivileges').create({
        privilegeId: createEvaluation.id,
        mode: 'grant',
      })
    }

    if (tiana && createEvaluation) {
      await tiana.related('userPrivileges').create({
        privilegeId: createEvaluation.id,
        mode: 'revoke',
      })
    }
  }
}
