// backend/app/services/Services/PredictionService.ts
import axios from "axios";
import Env from '@ioc:Adonis/Core/Env';

export default class PredictionService {
  public static async predictPerformance(input: {
    kpi_score: number;
    competency_score: number;
    seniority: number;
  }) {
    const AI_SERVICE_URL = Env.get("AI_SERVICE_URL");

    const res = await axios.post(`${AI_SERVICE_URL}/predict`, input);
    return res.data.predicted_score;
  }
}
