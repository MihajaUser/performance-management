import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserKpis extends BaseSchema {
  protected tableName = 'user_kpis'

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
        .integer('kpi_template_id')
        .unsigned()
        .references('id')
        .inTable('kpi_templates')
        .onDelete('CASCADE')
      table.string('period').notNullable()
      table.float('target').notNullable()
      table.float('actual').notNullable()
      table.float('score').notNullable()
      table.string('comment')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
