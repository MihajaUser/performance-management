import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import JobTitle from 'App/Models/JobTitle'

export default class JobTitleSeeder extends BaseSeeder {
  public async run() {
    await JobTitle.createMany([
      // --- Département Informatique ---
      { departmentId: 1, name: 'Développeur web', description: 'Développement applicatif' },
      { departmentId: 1, name: 'Chef de projet', description: 'Gestion des projets techniques' },

      // --- Département Ressources Humaines ---
      { departmentId: 2, name: 'Recruteur', description: 'Sélection et intégration du personnel' },
      { departmentId: 2, name: 'Responsable RH', description: 'Encadrement du service RH' },

      // --- Département Finance ---
      { departmentId: 3, name: 'Comptable', description: 'Gestion comptable et financière' },
      { departmentId: 3, name: 'Analyste financier', description: 'Suivi et analyse budgétaire' },

      // --- Département Logistique ---
      { departmentId: 4, name: 'Agent logistique', description: 'Gestion des flux et stocks' },
      { departmentId: 4, name: 'Responsable entrepôt', description: 'Supervision de la chaîne logistique' },

      // --- Département Commercial ---
      { departmentId: 5, name: 'Commercial terrain', description: 'Développement des ventes sur le terrain' },
      { departmentId: 5, name: 'Responsable des ventes', description: 'Pilotage de la stratégie commerciale' },
    ])
  }
}
