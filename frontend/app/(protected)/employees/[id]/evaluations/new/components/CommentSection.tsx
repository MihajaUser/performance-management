//frontend/app/(protected)/employees/[id]/evaluations/new/components/CommentSection.tsx
"use client";

interface CommentSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export function CommentSection({ value, onChange }: CommentSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">
        Commentaire global
      </h3>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rédigez ici le commentaire global de l’évaluation..."
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-[100px]"
      />
    </div>
  );
}
