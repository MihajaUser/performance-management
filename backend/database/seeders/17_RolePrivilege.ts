import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'
import Privilege from 'App/Models/Privilege'

export default class RolePrivilegeSeeder extends BaseSeeder {
  public async run() {
    const roles = await Role.all()
    const privileges = await Privilege.all()

    const map = {
      employee: ['view_evaluation', 'view_objective', 'view_dashboard'],
      manager: [
        'view_evaluation',
        'create_evaluation',
        'edit_evaluation',
        'view_objective',
        'edit_objective',
        'export_reports',
        'view_dashboard',
      ],
      hr: [
        'view_evaluation',
        'edit_evaluation',
        'view_user',
        'manage_user',
        'view_objective',
        'edit_objective',
        'export_reports',
        'view_dashboard',
      ],
      admin: privileges.map((p) => p.name), // tous les privilèges
    }

    for (const role of roles) {
      const rolePrivs = privileges.filter((p) => map[role.name]?.includes(p.name))
      await role.related('privileges').sync(rolePrivs.map((p) => p.id))
    }
  }
}
