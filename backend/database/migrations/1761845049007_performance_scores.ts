import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PerformanceScores extends BaseSchema {
  protected tableName = 'performance_scores'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.string('period').notNullable()
      table.float('score_auto')
      table.float('score_manager')
      table.float('score_final')
      table.float('predicted_score')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
