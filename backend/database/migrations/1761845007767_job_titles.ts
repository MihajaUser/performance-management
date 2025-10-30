import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class JobTitles extends BaseSchema {
  protected tableName = 'job_titles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('department_id')
        .unsigned()
        .references('id')
        .inTable('departments')
        .onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('description')
      table.boolean('is_active').defaultTo(true)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
