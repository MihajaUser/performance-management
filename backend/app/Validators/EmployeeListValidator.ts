import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class EmployeeListValidator {
  public schema = schema.create({
    departmentId: schema.number.optional([rules.exists({ table: 'departments', column: 'id' })]),
    status: schema.enum.optional(['active', 'on_leave', 'inactive'] as const),
    search: schema.string.optional({}, [rules.trim()]),
  })

  public messages = {
    'departmentId.exists': 'Le département sélectionné est invalide.',
    'status.enum': 'Le statut fourni est invalide.',
  }
}
