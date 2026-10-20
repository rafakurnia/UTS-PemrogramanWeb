import BeritaListClient from "@/components/BeritaListClient";
import { berita } from "@/data/berita";

export const dynamic = "force-dynamic";

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

        {/* Daftar Berita (Dukungan LocalStorage Dinamis) */}
        <BeritaListClient initialList={berita} />
      </main>
    </div>
  );
}