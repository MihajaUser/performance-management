import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RolePrivileges extends BaseSchema {
  protected tableName = 'role_privileges'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')
      table
        .integer('privilege_id')
        .unsigned()
        .references('id')
        .inTable('privileges')
        .onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
