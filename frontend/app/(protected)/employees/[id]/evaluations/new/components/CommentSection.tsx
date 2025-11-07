"use client";

import { useState } from "react";
import {
  Loader2,
  CheckCircle2,
  AlertTriangle,
  MinusCircle,
  XOctagon,
} from "lucide-react";
import { useSentimentAnalysis } from "../hooks/useSentimentAnalysis";

interface CommentSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export function CommentSection({ value, onChange }: CommentSectionProps) {
  const [sentiment, setSentiment] = useState<string | null>(null);
  const { mutateAsync: analyze, isPending: isAnalyzing } =
    useSentimentAnalysis();
 

  const analyzeSentiment = async () => {
    if (!value.trim()) return;
    setSentiment(null);
    try {
      const data = await analyze(value);
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
          <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" />
            Ton positif et encourageant
          </span>
        );
      case "neutral":
        return (
          <span className="flex items-center gap-1 text-gray-600 text-sm font-medium">
            <MinusCircle className="w-4 h-4" />
            Ton neutre
          </span>
        );
      case "negative":
        return (
          <span className="flex items-center gap-1 text-amber-600 text-sm font-medium">
            <AlertTriangle className="w-4 h-4" />
            Critique constructive (formulation correcte)
          </span>
        );
      case "aggressif":
        return (
          <span className="flex items-center gap-1 text-red-600 text-sm font-semibold">
            <XOctagon className="w-4 h-4" />
            Ton agressif — à reformuler avant validation
          </span>
        );
      case "erreur":
        return <span className="text-gray-500 text-sm">Erreur d’analyse</span>;
      default:
        return null;
    }
  };

  return (
    <div>
      <h3 className="text-base font-semibold text-gray-900 mb-3">
        Commentaire global
      </h3>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rédigez ici le commentaire global de l’évaluation..."
        className={`w-full border rounded-lg px-3 py-2 text-sm min-h-[100px] transition-colors focus:outline-none
          ${
            sentiment === "aggressif"
              ? "border-red-500 bg-red-50"
              : sentiment === "negative"
              ? "border-amber-400 bg-amber-50"
              : sentiment === "positive"
              ? "border-green-500 bg-green-50"
              : "border-gray-300 bg-white"
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

      {sentiment === "aggressif" && (
        <p className="mt-2 text-xs text-red-600 italic">
          Vous ne pouvez pas soumettre tant que le ton est jugé agressif.
        </p>
      )}
    </div>
  );
}
