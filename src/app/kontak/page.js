import Image from "next/image";

export default function KontakPage() {
  return (
    <div className="bg-white text-gray-900 relative isolate overflow-hidden">

      {/* Gambar dekoratif gedung sekolah di kanan dengan fade ke kiri (CSS mask) */}
      <div
        className="absolute right-0 top-0 -z-10 w-[40%] md:w-[55%] h-full pointer-events-none"
        aria-hidden="true"
        style={{
          // Fade horizontal: transparan 0% → hitam 50% (gambar jelas di kanan, memudar ke kiri)
          // Fade vertikal: hitam 0% → transparan 95% (fade tipis di bawah)
          maskImage: 'linear-gradient(to right, transparent 0%, black 50%), linear-gradient(to bottom, black 0%, transparent 95%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 50%), linear-gradient(to bottom, black 0%, transparent 95%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      >
        <Image
          src="/gambarsekolah3.png"
          alt=""
          fill
          sizes="(max-width: 768px) 40vw, 55vw"
          className="object-cover object-right opacity-15 md:opacity-30"
          priority={false}
        />
      </div>

      {/* ── HEADER ─────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-5xl px-6 pt-14 pb-4 sm:px-8 lg:px-10">
        <div className="flex items-center gap-3 mb-1">
          <span className="block h-1 w-8 rounded-full bg-[#0a7a3c]" />
          <h1 className="text-3xl font-bold text-green-700 sm:text-4xl">Kontak</h1>
        </div>
        <p className="text-gray-500 text-sm ml-11">Hubungi kami untuk informasi lebih lanjut.</p>
      </section>

      {/* ── MAIN CARDS ─────────────────────────────────────── */}
      <main className="relative mx-auto max-w-5xl px-6 py-8 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* ── Kartu Informasi Kontak ──────────────────────── */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 flex gap-6 items-start shadow-sm">
            {/* Info */}
            <div className="space-y-5">

              {/* Alamat */}
              <div className="flex gap-3 items-start">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0a2e1c] text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.079 3.218-4.402 3.218-6.8C19.5 6.757 16.078 3 12 3S4.5 6.757 4.5 10.527c0 2.397 1.274 4.72 3.218 6.8a19.579 19.579 0 002.683 2.282 16.974 16.974 0 001.14.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Alamat</p>
                  <p className="text-sm text-gray-600 leading-6">
                    Jalan Cemara Raya, Padangsari, Banyumanik, Padangsari,<br />
                    Kec. Banyumanik, Kota Semarang, Jawa Tengah 50267
                  </p>
                </div>
              </div>

              {/* Telepon */}
              <div className="flex gap-3 items-start">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0a2e1c] text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Telepon</p>
                  <p className="text-sm text-gray-600">024 - 7472812</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3 items-start">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0a2e1c] text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Email</p>
                  <a
                    href="mailto:sman09semarang@gmail.com"
                    className="text-sm text-gray-600 hover:text-green-700 transition-colors"
                  >
                    sman09semarang@gmail.com
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* ── Kartu Media Sosial ──────────────────────────── */}
          <div className="rounded-2xl bg-[#0a2e1c] p-6 text-white shadow-sm">

            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-white/80">
                <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
              </svg>
              <h2 className="text-xl font-bold">Media Sosial</h2>
            </div>

            <p className="text-sm text-white/70 leading-6 mb-8">
              Ikuti kami di media sosial untuk mendapatkan<br />
              informasi terbaru seputar sekolah.
            </p>

            {/* Grid sosmed */}
            <div className="grid grid-cols-4 gap-3">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/sman9semarang"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition-colors group-hover:bg-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-white">Instagram</p>
                  <p className="text-[10px] text-white/60">@sman9semarang</p>
                </div>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@SMANegeri9Semarang"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition-colors group-hover:bg-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-white">YouTube</p>
                  <p className="text-[10px] text-white/60">SMA Negeri 9 Semarang</p>
                </div>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/SMANegeri9Semarang"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition-colors group-hover:bg-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-white">Facebook</p>
                  <p className="text-[10px] text-white/60">SMA Negeri 9 Semarang</p>
                </div>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@sman9semarang"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition-colors group-hover:bg-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-white">TikTok</p>
                  <p className="text-[10px] text-white/60">@sman9semarang</p>
                </div>
              </a>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
