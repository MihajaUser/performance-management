import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Privileges extends BaseSchema {
  protected tableName = 'privileges'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').unique().notNullable()  
      table.string('category').nullable()  
      table.text('description').nullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
