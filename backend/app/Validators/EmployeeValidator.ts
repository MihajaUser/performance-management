import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class EmployeeValidator {
 
  public static list = schema.create({
    page: schema.number.optional([rules.unsigned()]),
    limit: schema.number.optional([rules.range(1, 100)]),
    order: schema.enum.optional(['asc', 'desc'] as const),
    departmentId: schema.number.optional([rules.exists({ table: 'departments', column: 'id' })]),
    status: schema.enum.optional(['active', 'on_leave', 'inactive', 'terminated'] as const),
    search: schema.string.optional({}, [rules.trim()]),
  })

 
  public static show = schema.create({
    id: schema.number([rules.exists({ table: 'users', column: 'id' })]),
  })
}
