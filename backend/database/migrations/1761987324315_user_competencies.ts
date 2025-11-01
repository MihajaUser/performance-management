import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserCompetencies extends BaseSchema {
  protected tableName = 'user_competencies'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('evaluation_id')
        .unsigned()
        .references('id')
        .inTable('evaluations')
        .onDelete('CASCADE')

      table
        .integer('competency_id')
        .unsigned()
        .references('id')
        .inTable('competency_templates')
        .onDelete('CASCADE')

      table.integer('score').notNullable()
      table.text('comment').nullable()
      table
        .enum('evaluator_type', ['auto', 'manager', 'final'])
        .notNullable()
        .defaultTo('manager')

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
