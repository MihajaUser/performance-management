import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AiAnalyses extends BaseSchema {
  protected tableName = 'ai_analyses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('evaluation_id')
        .unsigned()
        .references('id')
        .inTable('evaluations')
        .onDelete('CASCADE')
      table.enum('type', ['sentiment', 'prediction']).notNullable()
      table.string('result').notNullable()
      table.json('details')
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
