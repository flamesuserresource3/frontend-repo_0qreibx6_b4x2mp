import React, { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import FollowPanel from "./components/FollowPanel";
import UpdateFeed from "./components/UpdateFeed";
import GroupGrid from "./components/GroupGrid";

export default function App() {
  const [followed, setFollowed] = useState(["NewJeans", "Stray Kids", "LE SSERAFIM"]);
  const [query, setQuery] = useState("");

  const normalized = useMemo(() =>
    Array.from(new Set(followed.map((g) => g.trim()).filter(Boolean)))
  , [followed]);

  function addGroup(name) {
    const exists = normalized.some((g) => g.toLowerCase() === name.toLowerCase());
    if (!exists) setFollowed((prev) => [...prev, name]);
  }

  function removeGroup(name) {
    setFollowed((prev) => prev.filter((g) => g !== name));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white text-neutral-900">
      <Navbar onSearch={setQuery} />

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <UpdateFeed followedGroups={normalized} query={query} />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <FollowPanel groups={normalized} onAddGroup={addGroup} onRemoveGroup={removeGroup} />
          <GroupGrid groups={normalized} />
        </div>
      </main>

      <footer className="border-t border-black/5 py-8 mt-6">
        <div className="max-w-6xl mx-auto px-4 text-sm text-neutral-500 flex items-center justify-between">
          <p>Made for multistans — one feed for all your groups.</p>
          <p>
            Roadmap: accounts, real-time platform sync, alerts, and calendars.
          </p>
        </div>
      </footer>
    </div>
  );
}
