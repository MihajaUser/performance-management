// app/Types/ai.ts

export interface AiAnalysisResult {
  sentiment: "positive" | "neutral" | "negative" | "aggressif"
  confidence: number | null
  raw_label?: string | null
  recommendations: { title: string; url: string }[]
}
