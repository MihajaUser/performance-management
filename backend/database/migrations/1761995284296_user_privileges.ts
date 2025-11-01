import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserPrivileges extends BaseSchema {
  protected tableName = 'user_privileges'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .integer('privilege_id')
        .unsigned()
        .references('id')
        .inTable('privileges')
        .onDelete('CASCADE')
      table
        .enum('mode', ['grant', 'revoke'])
        .notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
