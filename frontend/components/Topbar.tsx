"use client";

import { Bell, Search, User, CalendarDays } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-200 px-8 h-16 shadow-sm">
      {/* --- Gauche : barre de recherche --- */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002B5B]/30 focus:border-[#002B5B]/40 text-gray-700 bg-gray-50 w-64 transition-all"
          />
        </div>
      </div>

      {/* --- Droite : calendrier, notifications, profil --- */}
      <div className="flex items-center gap-5 text-gray-600">
        <button
          className="hover:text-[#002B5B] transition"
          aria-label="Calendrier"
        >
          <CalendarDays className="w-5 h-5" />
        </button>

        <button
          className="relative hover:text-[#002B5B] transition"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
            2
          </span>
        </button>

        <div className="flex items-center gap-2 cursor-pointer hover:text-[#002B5B] transition">
          <User className="w-6 h-6" />
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-800">
              Antonio Mihaja
            </p>
            <p className="text-xs text-gray-500">Développeur Web</p>
          </div>
        </div>
      </div>
    </header>
  );
}
