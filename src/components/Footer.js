export default function Footer() {
  return (
    <footer className="relative mt-auto text-gray-300 overflow-hidden border-t border-gray-800">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/footerbg.png')" }}
      />
      {/* Dark Overlay (dikurangi kegelapannya, tanpa blur) */}
      <div className="absolute inset-0 z-0 bg-[#020a06]/50" />

      {/* Konten Footer */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="sm:flex sm:justify-between sm:items-start gap-8">
          <div className="mb-4 sm:mb-0">
            {/* Judul: Diperkecil dari text-xl ke text-base (desktop: text-lg) */}
            <h3 className="text-white font-bold text-base sm:text-lg mb-1.5 drop-shadow-md">
              SMA Negeri 9 Semarang
            </h3>

            {/* Alamat: Diperkecil dari text-sm/text-base ke text-xs/text-sm */}
            <p className="text-xs sm:text-sm leading-relaxed text-gray-200 drop-shadow-sm max-w-sm mb-3">
              Jl. Cemara Raya, Semarang, Jawa Tengah
            </p>

            {/* Copyright: Ditambahkan text-xs dan warna text-gray-400 agar lebih samar */}
            <p className="text-xs text-gray-400">
              &copy; 2404140012 Muhammad Rafa Kurnia Pemrograman Website
            </p>
          </div>
          <div className="text-xs text-gray-300 font-medium self-start drop-shadow-sm">
          </div>
        </div>
      </div>
    </footer>
  );
}