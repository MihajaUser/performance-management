import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Evaluation from "App/Models/Evaluation";

export default class EvaluationSeeder extends BaseSeeder {
  public async run() {
    await Evaluation.createMany([
      {
        employeeId: 1,
        evaluatorId: 2,
        type: "manager",
        period: "Q1-2025",
        generalScore: 80,
        comment:
          "Très bonne performance d’ensemble, mais un léger retard dans la documentation technique.",
        sentiment: "positive",
        trainingRecommendations: [
          {
            title:
              "OpenClassrooms - Rédigez une documentation technique claire et efficace",
            url: "https://openclassrooms.com/fr/courses/7693746-redigez-une-documentation-technique-claire-et-efficace",
          },
          {
            title:
              "Udemy - Technical Writing for Developers: Mastering Documentation",
            url: "https://www.udemy.com/course/technical-writing-for-developers/",
          },
        ],
      },
      {
        employeeId: 3,
        evaluatorId: 4,
        type: "manager",
        period: "Q1-2025",
        generalScore: 78,
        comment:
          "Bon trimestre, mais quelques retards sur les recrutements et communication interne à améliorer.",
        sentiment: "neutral",
        trainingRecommendations: [
          {
            title:
              "OpenClassrooms - Communiquez efficacement au travail",
            url: "https://openclassrooms.com/fr/courses/7644546-communiquez-efficacement-au-travail",
          },
          {
            title:
              "Udemy - Gestion du temps et des priorités pour managers",
            url: "https://www.udemy.com/course/gestion-du-temps-et-des-priorites-pour-managers/",
          },
        ],
      },
    ]);
  }
}
