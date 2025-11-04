import React, { useMemo, useState } from "react";
import { Instagram, Twitter, Youtube, MessageSquare, Calendar, Ticket, Globe } from "lucide-react";

const platforms = [
  { key: "all", label: "All", icon: Globe },
  { key: "weverse", label: "Weverse", icon: MessageSquare },
  { key: "instagram", label: "Instagram", icon: Instagram },
  { key: "twitter", label: "Twitter/X", icon: Twitter },
  { key: "youtube", label: "YouTube", icon: Youtube },
  { key: "events", label: "Concerts & Fansigns", icon: Ticket },
];

function PlatformPill({ active, onClick, label, Icon }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border transition ${
        active ? "bg-black text-white border-black" : "bg-white text-black border-black/10 hover:bg-neutral-50"
      }`}
    >
      <Icon className="h-4 w-4" /> {label}
    </button>
  );
}

function FeedCard({ item }) {
  return (
    <a
      href={item.url || "#"}
      target="_blank"
      rel="noreferrer"
      className="block rounded-2xl border border-black/5 bg-white hover:shadow-md transition overflow-hidden"
    >
      <div className="p-4 flex items-start gap-3">
        <div className="shrink-0 h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 text-white flex items-center justify-center font-bold">
          {item.group[0]}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span className="font-medium text-black">{item.group}</span>
            <span>•</span>
            <span className="capitalize">{item.platform}</span>
            <span>•</span>
            <span>{item.time}</span>
          </div>
          <h3 className="mt-1 font-medium leading-snug line-clamp-2">{item.title}</h3>
          {item.meta && (
            <p className="mt-1 text-sm text-neutral-600 line-clamp-2">{item.meta}</p>
          )}
        </div>
      </div>
      {item.image && (
        <div className="h-48 w-full bg-neutral-100 overflow-hidden">
          <img src={item.image} alt="" className="h-full w-full object-cover" />
        </div>
      )}
    </a>
  );
}

export default function UpdateFeed({ followedGroups = [], query = "" }) {
  const [filter, setFilter] = useState("all");

  const items = useMemo(
    () => [
      {
        id: 1,
        group: "NewJeans",
        platform: "instagram",
        title: "Minji posted a new carousel from the studio",
        time: "2h ago",
        image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop",
        url: "https://instagram.com/",
      },
      {
        id: 2,
        group: "Stray Kids",
        platform: "weverse",
        title: "Bang Chan left a voice message for STAY",
        time: "3h ago",
        meta: "2 min voice note on Weverse",
        url: "https://weverse.io/",
      },
      {
        id: 3,
        group: "LE SSERAFIM",
        platform: "youtube",
        title: "New dance practice video is out",
        time: "5h ago",
        url: "https://youtube.com/",
      },
      {
        id: 4,
        group: "IVE",
        platform: "twitter",
        title: "Tour dates expanded to Asia-Pacific",
        time: "6h ago",
        meta: "8 new stops added",
        url: "https://twitter.com/",
      },
      {
        id: 5,
        group: "SEVENTEEN",
        platform: "events",
        title: "Fansign announced in Seoul",
        time: "1d ago",
        meta: "Lottery opens Friday 10AM KST",
      },
      {
        id: 6,
        group: "TWICE",
        platform: "instagram",
        title: "Nayeon teaser image for comeback",
        time: "1d ago",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
        url: "https://instagram.com/",
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      const inGroup =
        followedGroups.length === 0 ||
        followedGroups.some((g) => g.toLowerCase() === i.group.toLowerCase());
      const byFilter = filter === "all" ? true : i.platform === filter;
      const byQuery = !q ||
        i.group.toLowerCase().includes(q) ||
        i.title.toLowerCase().includes(q) ||
        (i.meta && i.meta.toLowerCase().includes(q));
      return inGroup && byFilter && byQuery;
    });
  }, [items, filter, followedGroups, query]);

  return (
    <section className="w-full">
      <div className="flex flex-wrap gap-2 mb-4">
        {platforms.map((p) => (
          <PlatformPill
            key={p.key}
            label={p.label}
            Icon={p.icon}
            active={filter === p.key}
            onClick={() => setFilter(p.key)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <FeedCard key={item.id} item={item} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-neutral-500 py-10 border border-dashed border-neutral-300 rounded-2xl">
            No updates match your filters yet. Try adding more groups or switching tabs.
          </div>
        )}
      </div>
    </section>
  );
}
