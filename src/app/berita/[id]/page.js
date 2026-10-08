import Link from "next/link";
import { notFound } from "next/navigation";
import { cariBerita } from "@/data/berita";

export default async function DetailBeritaPage({ params }) {
  const { id } = await params;
  const item = cariBerita(id);

  if (!item) {
    notFound();
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

          <div className="prose prose-gray max-w-none">
            {item.isi.map((paragraf, index) => (
              <p key={index} className="text-gray-600 leading-relaxed mb-4">
                {paragraf}
              </p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
