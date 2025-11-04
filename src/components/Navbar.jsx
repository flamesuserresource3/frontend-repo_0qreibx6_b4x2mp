import { Bell, Search } from "lucide-react";
import React from "react";

export default function Navbar({ onSearch }) {
  return (
    <header className="sticky top-0 z-20 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 mr-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-fuchsia-500 to-indigo-500" />
          <span className="font-semibold text-lg tracking-tight">MultiStan</span>
        </div>

        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search groups, posts or platforms..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-100 focus:bg-white border border-transparent focus:border-neutral-300 outline-none transition-all text-sm"
          />
        </div>

        <button className="ml-auto inline-flex items-center justify-center h-9 w-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition">
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
