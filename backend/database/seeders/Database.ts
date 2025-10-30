import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AiAnalysisSeeder from './core/AiAnalysis'
import AlertSeeder from './core/Alert'
import DepartmentSeeder from './core/Department'
import EvaluationSeeder from './core/Evaluation'
import JobTitleSeeder from './core/JobTitle'
import KpiTemplateSeeder from './core/KpiTemplate'
import PerformanceScoreSeeder from './core/PerformanceScore'
import UserSeeder from './core/User'
import UserKpiSeeder from './core/UserKpi'

export default class DatabaseSeeder extends BaseSeeder {
  public async run() {
    await new DepartmentSeeder(this.client).run()
    await new JobTitleSeeder(this.client).run()
    await new KpiTemplateSeeder(this.client).run()
    await new UserSeeder(this.client).run()
    await new UserKpiSeeder(this.client).run()
    await new EvaluationSeeder(this.client).run()
    await new AiAnalysisSeeder(this.client).run()
    await new PerformanceScoreSeeder(this.client).run()
    await new AlertSeeder(this.client).run()
  }
}
