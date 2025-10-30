import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Alert from 'App/Models/Alert'

export default class AlertSeeder extends BaseSeeder {
  public async run() {
    await Alert.createMany([
      {
        userId: 1,
        type: 'sentiment_warning',
        message: 'Tendance positive détectée mais charge de travail élevée.',
        resolved: false,
      },
      {
        userId: 3,
        type: 'low_performance',
        message: 'Légère baisse sur le taux d`embauche observée.',
        resolved: false,
      },
    ])
  }
}
