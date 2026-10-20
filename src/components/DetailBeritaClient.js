"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getBeritaFromStorage } from "@/lib/beritaStorage";

export default function DetailBeritaClient({ id, initialItem = null }) {
  const [item, setItem] = useState(initialItem);
  const [loading, setLoading] = useState(!initialItem);

  useEffect(() => {
    // Cari dari LocalStorage jika belum ada atau untuk mengambil data paling mutakhir
    const list = getBeritaFromStorage();
    const found = list.find((b) => b.id === id);
    if (found) {
      setItem(found);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="py-24 text-center text-gray-500">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#0a2e1c] border-t-transparent mb-3"></div>
        <p className="text-sm">Memuat berita...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Berita Tidak Ditemukan</h2>
        <p className="text-sm text-gray-500 mb-6">
          Berita dengan ID tersebut mungkin telah dihapus atau belum tersedia.
        </p>
        <Link
          href="/berita"
          className="inline-block bg-[#0a2e1c] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#11492d] transition-colors"
        >
          &larr; Kembali ke Daftar Berita
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/berita"
          className="text-sm text-green-700 hover:text-green-900 font-medium transition-colors mb-6 inline-block"
        >
          &larr; Kembali ke Berita
        </Link>

        <article>
          {/* Gambar Berita */}
          {item.gambar ? (
            <div className="w-full h-56 sm:h-96 rounded-xl overflow-hidden shadow-md mb-8 relative">
              <img
                src={item.gambar}
                alt={item.judul}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ) : (
            <div className="w-full h-56 sm:h-72 bg-gray-300 rounded-xl flex items-center justify-center text-gray-500 mb-8 shadow-sm">
              [Gambar berita]
            </div>
          )}

          <time className="text-sm text-gray-500" dateTime={item.tanggal}>
            {item.tanggal}
          </time>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 mb-6">
            {item.judul}
          </h1>

          <div className="prose prose-gray max-w-none space-y-4">
            {Array.isArray(item.isi) ? (
              item.isi.map((paragraf, index) => (
                <p key={index} className="text-gray-600 leading-relaxed">
                  {paragraf}
                </p>
              ))
            ) : (
              <p className="text-gray-600 leading-relaxed">{item.isi}</p>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
