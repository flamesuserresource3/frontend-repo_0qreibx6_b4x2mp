import { Plus, Users, Check } from "lucide-react";
import React, { useState } from "react";

export default function FollowPanel({ groups, onAddGroup, onRemoveGroup }) {
  const [value, setValue] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    const name = value.trim();
    if (!name) return;
    onAddGroup?.(name);
    setValue("");
  }

  return (
    <section className="w-full">
      <div className="rounded-2xl border border-black/5 bg-white shadow-sm">
        <div className="p-5 border-b border-black/5 flex items-center gap-2">
          <Users className="h-4 w-4" />
          <h2 className="font-semibold">Your Groups</h2>
        </div>
        <div className="p-5 space-y-4">
          <form onSubmit={handleAdd} className="flex gap-2">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder="Add a group (e.g., NewJeans, Stray Kids)"
              className="flex-1 px-3 py-2 rounded-xl bg-neutral-100 focus:bg-white border border-transparent focus:border-neutral-300 outline-none text-sm"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black text-white text-sm hover:opacity-90 transition"
            >
              <Plus className="h-4 w-4" /> Add
            </button>
          </form>

          {groups.length === 0 ? (
            <p className="text-sm text-neutral-500">Start by adding the groups you stan. We'll tailor the feed to them.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {groups.map((g) => (
                <span
                  key={g}
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 text-sm"
                >
                  <Check className="h-3.5 w-3.5 text-green-600" /> {g}
                  <button
                    type="button"
                    onClick={() => onRemoveGroup?.(g)}
                    className="ml-1 text-neutral-500 hover:text-red-600"
                    aria-label={`Remove ${g}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
