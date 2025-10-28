import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class UsersSchema extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("firstname").notNullable();
      table.string("lastname").notNullable();
      table.string("email").unique().notNullable();
      table.timestamps(true);
    });
 
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
