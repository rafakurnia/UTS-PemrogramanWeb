"use client";

import { useState, useEffect } from "react";
import BeritaCard from "@/components/BeritaCard";
import { getBeritaFromStorage } from "@/lib/beritaStorage";

export default function BeritaListClient({ initialList = [] }) {
  const [list, setList] = useState(initialList);

  useEffect(() => {
    // Ambil data terbaru dari LocalStorage
    const stored = getBeritaFromStorage();
    if (stored && stored.length > 0) {
      setList(stored);
    }

    const handleUpdate = () => {
      setList(getBeritaFromStorage());
    };

    window.addEventListener("sman9_berita_updated", handleUpdate);
    return () => {
      window.removeEventListener("sman9_berita_updated", handleUpdate);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {list.map((item) => (
        <BeritaCard key={item.id} berita={item} />
      ))}
    </div>
  );
}
