import BeritaCard from "@/components/BeritaCard";
import { berita } from "@/data/berita";

export const metadata = {
  title: "Berita — SMA Negeri 9 Semarang",
  description: "Daftar berita dan kegiatan SMA Negeri 9 Semarang",
};

export default function BeritaPage() {
  return (
    <div className="bg-white text-gray-900">
      <main className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10">

        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-4xl text-center items-center">
            Berita Sekolah
          </h1>

        </div>

        {/* Daftar Berita */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {berita.map((item) => (
            <BeritaCard key={item.id} berita={item} />
          ))}
        </div>

      </main>
    </div>
  );
}