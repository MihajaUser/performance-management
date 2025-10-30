import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class KpiTemplates extends BaseSchema {
  protected tableName = 'kpi_templates'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
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
      table.string('name').notNullable()
      table.string('description')
      table.string('unit').notNullable()
      table.integer('weight').notNullable()
      table.boolean('is_active').defaultTo(true)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
