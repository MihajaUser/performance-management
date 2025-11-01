import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PerformanceScore from 'App/Models/PerformanceScore'
import PerformanceScoreValidator from 'App/Validators/PerformanceScoreValidator'

export default class PerformanceScoreController {
  /**
   * 📋 Liste paginée et filtrée
   * GET /performance-scores?page=1&limit=10&period=Q1-2025
   */
  public async index({ request }: HttpContextContract) {
    const payload = await request.validate({ schema: PerformanceScoreValidator.list })

    const page = payload.page ?? 1
    const limit = payload.limit ?? 10
    const order = payload.order ?? 'desc'

    const query = PerformanceScore.query().preload('user', (q) =>
      q.preload('department').preload('jobTitle')
    )

    if (payload.userId) query.where('user_id', payload.userId)
    if (payload.period) query.where('period', payload.period)

    const scores = await query.orderBy('created_at', order).paginate(page, limit)
    return scores
  }

  /**
   * 👤 Scores d’un employé spécifique
   * GET /performance-scores/user/:id
   */
  public async byUser({ params, response }: HttpContextContract) {
    const scores = await PerformanceScore.query()
      .where('user_id', params.id)
      .orderBy('period', 'asc')

    if (scores.length === 0) {
      return response.notFound({ message: 'Aucun score trouvé pour cet employé.' })
    }

    return scores
  }

  /**
   * ➕ Créer un enregistrement
   * POST /performance-scores
   */
  public async store({ request }: HttpContextContract) {
    const payload = await request.validate({ schema: PerformanceScoreValidator.create })
    const score = await PerformanceScore.create(payload)
    return score
  }

  /**
   * ✏️ Mettre à jour un enregistrement
   * PUT /performance-scores/:id
   */
  public async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate({ schema: PerformanceScoreValidator.update })
    const score = await PerformanceScore.find(params.id)
    if (!score) return response.notFound({ message: 'Score introuvable' })

    score.merge(payload)
    await score.save()
    return score
  }
}
