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
        comment: "Tres bonne performance d`ensemble.",
        sentiment: "positive",
      },
      {
        employeeId: 3,
        evaluatorId: 4,
        type: "manager",
        period: "Q1-2025",
        generalScore: 78,
        comment: "Bon trimestre avec quelques retards sur un recrutement.",
        sentiment: "neutral",
      },
    ]);
  }
}
