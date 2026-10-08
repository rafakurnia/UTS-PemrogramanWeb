// src/components/Hero.js
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-foto relative isolate overflow-hidden bg-[#020a06] text-white">
      <div className="absolute inset-0 -z-10 bg-[#020a06]/85" />

      <div className="mx-auto flex min-h-[520px] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 md:min-h-[640px]">
        <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-green-200 sm:text-sm">
          <span className="h-px w-8 bg-green-400 sm:w-12" />
          SMALAN JAWARA
        </p>

        <h1
          className="judul-foto mt-5 text-5xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl select-none"
          style={{ fontFamily: "var(--font-judul)" }}
        >
          <span className="block">SMA Negeri 9</span>
          <span className="block">Semarang</span>
        </h1>

        {/* TODO: pastikan kalimat ini memang slogan atau visi resmi sekolah */}
        <p className="mt-6 max-w-md text-base leading-relaxed text-gray-200 sm:text-lg">
          Sekolah menengah atas negeri di Kota Semarang, Jawa Tengah.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <Link
            href="/about"
            className="rounded-md bg-[#0a2e1c] px-5 py-2.5 font-semibold text-white transition-colors hover:bg-[#11492d]"
          >
            Tentang Sekolah
          </Link>
          <Link
            href="/berita"
            className="font-semibold text-white underline underline-offset-4 transition-colors hover:text-green-400"
          >
            Lihat Berita
          </Link>
        </div>
      </div>
    </section>
  );
}