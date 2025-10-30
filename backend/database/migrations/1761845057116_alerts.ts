import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Alerts extends BaseSchema {
  protected tableName = 'alerts'

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
        .enum('type', ['sentiment_warning', 'low_performance', 'prediction_drop'])
        .notNullable()
      table.string('message').notNullable()
      table.boolean('resolved').defaultTo(false)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
