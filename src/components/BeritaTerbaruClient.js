"use client";

import { useState, useEffect } from "react";
import BeritaCard from "@/components/BeritaCard";
import { getBeritaFromStorage } from "@/lib/beritaStorage";

export default function BeritaTerbaruClient({ initialList = [] }) {
  const [list, setList] = useState(initialList.slice(0, 3));

  useEffect(() => {
    const stored = getBeritaFromStorage();
    if (stored && stored.length > 0) {
      setList(stored.slice(0, 3));
    }

    const handleUpdate = () => {
      setList(getBeritaFromStorage().slice(0, 3));
    };

    window.addEventListener("sman9_berita_updated", handleUpdate);
    return () => {
      window.removeEventListener("sman9_berita_updated", handleUpdate);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((item) => (
        <BeritaCard key={item.id} berita={item} />
      ))}
    </div>
  );
}
