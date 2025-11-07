"use client";

import { aiApi } from "@/app/(protected)/employees/lib/aiClient";
import { useMutation } from "@tanstack/react-query";

interface SentimentResponse {
  text: string;
  sentiment: "positive" | "neutral" | "negative" | "aggressif";
  raw_label?: string;
  confidence?: number;
}

export function useSentimentAnalysis() {
  return useMutation({
    mutationFn: async (text: string): Promise<SentimentResponse> => {
      const { data } = await aiApi.post("/analyze-sentiment", { text });
      return data;
    },
  });
}
