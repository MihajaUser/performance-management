import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AiAnalysis from 'App/Models/AiAnalysis'

export default class AiAnalysisSeeder extends BaseSeeder {
  public async run() {
    await AiAnalysis.createMany([
      { evaluationId: 1, type: 'sentiment', result: 'positive', details: { confidence: 0.88 } },
      { evaluationId: 1, type: 'prediction', result: '84.5', details: { model: 'RandomForest' } },
      { evaluationId: 2, type: 'sentiment', result: 'neutral', details: { confidence: 0.75 } },
      { evaluationId: 2, type: 'prediction', result: '81.2', details: { model: 'RandomForest' } },
    ])
  }
}
