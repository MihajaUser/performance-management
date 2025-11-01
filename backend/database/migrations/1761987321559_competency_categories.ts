import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CompetencyCategories extends BaseSchema {
  protected tableName = 'competency_categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description').nullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
