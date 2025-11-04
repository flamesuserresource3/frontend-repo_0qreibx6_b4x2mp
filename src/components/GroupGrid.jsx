import React from "react";
import { Calendar, Ticket } from "lucide-react";

function GroupCard({ name }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white overflow-hidden hover:shadow-md transition">
      <div className="h-24 bg-gradient-to-tr from-fuchsia-400/60 to-indigo-400/60" />
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-black text-white flex items-center justify-center font-bold">
            {name[0]}
          </div>
          <div>
            <h3 className="font-semibold leading-tight">{name}</h3>
            <p className="text-xs text-neutral-500">Following</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 text-xs text-neutral-600">
          <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> 2 upcoming</span>
          <span className="inline-flex items-center gap-1"><Ticket className="h-3.5 w-3.5" /> 1 fansign</span>
        </div>
      </div>
    </div>
  );
}

export default function GroupGrid({ groups = [] }) {
  if (groups.length === 0) return null;
  return (
    <section className="w-full">
      <h2 className="px-1 mb-3 font-semibold">Following</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {groups.map((g) => (
          <GroupCard key={g} name={g} />
        ))}
      </div>
    </section>
  );
}
