import Link from "next/link";

export default function BeritaCard({ berita }) {
  return (
    <article className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {/* Gambar berita asli */}
      {berita.gambar ? (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={berita.gambar}
            alt={berita.judul}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-500 text-sm">
          [Gambar berita]
        </div>
      )}
      <div className="p-4">
        <time className="text-xs text-gray-500" dateTime={berita.tanggal}>
          {berita.tanggal}
        </time>
        <h3 className="text-base font-semibold text-gray-900 mt-1 mb-2 leading-snug">
          {berita.judul}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {berita.ringkasan}
        </p>
        <Link
          href={`/berita/${berita.id}`}
          className="text-sm font-medium text-green-700 hover:text-green-900 transition-colors inline-block mt-2"
        >
          Baca Selengkapnya &rarr;
        </Link>
      </div>
    </article>
  );
}
