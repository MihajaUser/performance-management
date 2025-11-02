import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("matricule").unique().nullable();
      table.string('firstname').notNullable()
      table.string('lastname').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table
        .enum('role', ['superadmin', 'employee', 'manager', 'hr'])
        .defaultTo('employee')
      table
        .integer('department_id')
        .unsigned()
        .references('id')
        .inTable('departments')
        .onDelete('CASCADE')
      table
        .integer('job_title_id')
        .unsigned()
        .references('id')
        .inTable('job_titles')
        .onDelete('CASCADE')
      table
        .enum('status', ['active', 'inactive', 'on_leave', 'terminated'])
        .defaultTo('active')
      table.date('date_hired')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
