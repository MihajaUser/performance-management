"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import { useSentimentAnalysis } from "../hooks/useSentimentAnalysis";

interface CommentSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export function CommentSection({ value, onChange }: CommentSectionProps) {
  const [sentiment, setSentiment] = useState<string | null>(null);

  const { mutateAsync: analyze, isPending: isAnalyzing } = useSentimentAnalysis();

  const analyzeSentiment = async () => {
    if (!value.trim()) return;
    setSentiment(null);
    try {
      const data = await analyze(value);
      setSentiment(data.sentiment);

      setSentiment(data.sentiment);

  
    } catch (err) {
      console.error(err);
      setSentiment("erreur");
    }
  };

  const getSentimentDisplay = () => {
    switch (sentiment) {
      case "positive":
        return (
          <span className="flex items-center gap-1 text-green-600 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            Le ton est positif
          </span>
        );
      case "negative":
        return (
          <span className="flex items-center gap-1 text-red-600 font-medium">
            <XCircle className="w-4 h-4" />
            Le ton est négatif
          </span>
        );
      case "neutral":
        return (
          <span className="flex items-center gap-1 text-gray-600 font-medium">
            <MinusCircle className="w-4 h-4" />
            Le ton est neutre
          </span>
        );
      case "aggressif":
        return (
          <span className="flex items-center gap-1 text-orange-600 font-semibold">
            <XCircle className="w-4 h-4" />
            ⚠️ Le ton est agressif — reformulez avant soumission
          </span>
        );
      case "erreur":
        return <span className="text-gray-500">Erreur d’analyse</span>;
      default:
        return null;
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Commentaire global
      </h3>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rédigez ici le commentaire global de l’évaluation..."
        className={`w-full border rounded-lg px-3 py-2 text-sm min-h-[100px] transition-colors
          ${sentiment === "aggressif"
            ? "border-orange-500 bg-orange-50"
            : "border-gray-300"
          }`}
      />

      <div className="flex justify-between items-center mt-3">
        <button
          type="button"
          onClick={analyzeSentiment}
          disabled={isAnalyzing}
          className="text-sm text-[#002B5B] underline hover:text-blue-700 flex items-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyse en cours...
            </>
          ) : (
            "Analyser le sentiment"
          )}
        </button>

        {getSentimentDisplay()}
      </div>

      {/* 🔒 Message bloquant si agressif */}
      {sentiment === "aggressif" && (
        <p className="mt-3 text-xs text-orange-600 italic">
          Vous ne pouvez pas soumettre tant que le ton est agressif.
        </p>
      )}
    </div>
  );
}
