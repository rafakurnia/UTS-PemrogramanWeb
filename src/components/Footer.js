export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-gray-800 text-gray-300">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/footerbg.png')" }}
      />
      <div className="absolute inset-0 z-0 bg-[#020a06]/50" />

      {/* Konten */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Logo: hampir setinggi footer, dari atas sampai baris copyright */}
          <img
            src="/logo.png"
            alt="Logo SMA Negeri 9 Semarang"
            className="h-5 w-5 shrink-0 object-contain drop-shadow-md sm:h-15 sm:w-15"
          />

          <div>
            <h3 className="mb-1.5 text-base font-bold text-white drop-shadow-md sm:text-lg">
              SMA Negeri 9 Semarang
            </h3>

            <p className="mb-3 max-w-sm text-xs leading-relaxed text-gray-200 drop-shadow-sm sm:text-sm">
              Jl. Cemara Raya, Semarang, Jawa Tengah
            </p>

            <p className="text-xs text-gray-400">
              &copy; 2404140012 Muhammad Rafa Kurnia Pemrograman Website
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}