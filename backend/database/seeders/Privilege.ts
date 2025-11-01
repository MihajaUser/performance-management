import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Privilege from 'App/Models/Privilege'

export default class PrivilegeSeeder extends BaseSeeder {
  public async run() {
    await Privilege.createMany([
      // Évaluations
      { name: 'view_evaluation', category: 'evaluations', description: 'Voir les évaluations' },
      { name: 'create_evaluation', category: 'evaluations', description: 'Créer une évaluation' },
      { name: 'edit_evaluation', category: 'evaluations', description: 'Modifier une évaluation' },

      // Utilisateurs
      { name: 'view_user', category: 'users', description: 'Voir les informations utilisateur' },
      { name: 'manage_user', category: 'users', description: 'Créer ou modifier des utilisateurs' },

      // Objectifs
      { name: 'view_objective', category: 'objectives', description: 'Voir les objectifs' },
      { name: 'edit_objective', category: 'objectives', description: 'Modifier les objectifs' },

      // Rapports
      { name: 'export_reports', category: 'reports', description: 'Exporter les rapports PDF/Excel' },

      // Dashboard
      { name: 'view_dashboard', category: 'dashboard', description: 'Accéder au tableau de bord' },
    ])
  }
}
