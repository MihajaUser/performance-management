"use client";

import { useState } from "react";

interface CommentSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export function CommentSection({ value, onChange }: CommentSectionProps) {
  const [sentiment, setSentiment] = useState<string | null>(null);

  const analyzeSentiment = async () => {
    if (!value.trim()) return;
    const isPositive = value.toLowerCase().includes("bon") || value.toLowerCase().includes("excellent");
    setSentiment(isPositive ? "Positif" : "À améliorer");
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Commentaire global</h3>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rédigez ici le commentaire global de l’évaluation..."
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-[100px]"
      />
      <div className="flex justify-between items-center mt-3">
        <button
          type="button"
          onClick={analyzeSentiment}
          className="text-sm text-[#002B5B] underline hover:text-blue-700"
        >
          Analyser le sentiment
        </button>
        {sentiment && (
          <span className="text-sm text-gray-700 font-medium">{sentiment}</span>
        )}
      </div>
    </div>
  );
}
