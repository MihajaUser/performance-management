import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CompetencyResults extends BaseSchema {
  protected tableName = 'competency_results'

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
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('competency_categories')
        .onDelete('CASCADE')

      table.float('average_score').notNullable()
      table.text('comment_summary').nullable()

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
