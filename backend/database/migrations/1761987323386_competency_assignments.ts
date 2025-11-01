import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CompetencyAssignments extends BaseSchema {
  protected tableName = 'competency_assignments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('competency_id')
        .unsigned()
        .references('id')
        .inTable('competency_templates')
        .onDelete('CASCADE')

      table
        .integer('department_id')
        .unsigned()
        .references('id')
        .inTable('departments')
        .onDelete('SET NULL')
        .nullable()

      table
        .integer('job_title_id')
        .unsigned()
        .references('id')
        .inTable('job_titles')
        .onDelete('SET NULL')
        .nullable()

      table
        .enum('required_level', ['N', 'I', 'M', 'E'])
        .notNullable()
        .defaultTo('N')

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
