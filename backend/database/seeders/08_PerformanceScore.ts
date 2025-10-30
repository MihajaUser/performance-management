import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PerformanceScore from 'App/Models/PerformanceScore'

export default class PerformanceScoreSeeder extends BaseSeeder {
  public async run() {
    await PerformanceScore.createMany([
      { userId: 1, period: 'Q1-2025', scoreAuto: 75, scoreManager: 80, scoreFinal: 79, predictedScore: 84.5 },
      { userId: 3, period: 'Q1-2025', scoreAuto: 72, scoreManager: 78, scoreFinal: 76, predictedScore: 81.2 },
    ])
  }
}
