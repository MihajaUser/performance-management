"use client";

export function LoadingScreen({ message = "Chargement..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-gray-700">
      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-gray-300 border-t-[#002B5B] rounded-full animate-spin mb-3" />
      
      {/* Message */}
      <p className="text-sm font-medium text-gray-600">{message ?? 'Chargement...'}</p>
    </div>
  );
}
