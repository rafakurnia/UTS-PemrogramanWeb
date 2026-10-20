import Link from "next/link";
import Hero from "@/components/Hero";
import BeritaTerbaruClient from "@/components/BeritaTerbaruClient";
import { berita } from "@/data/berita";

export const dynamic = "force-dynamic";

export default function Home() {
  const beritaTerbaru = berita.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Tentang Sekolah */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Bagian Teks (Kiri) */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Tentang Sekolah</h2>

              <div className="space-y-4 text-gray-600 leading-relaxed text-base sm:text-lg text-justify">
                <p>
                  SMA Negeri 9 Semarang resmi berdiri pada 14 Juli 1981 berdasarkan SK Mendikbud No. 0219/O/1981. Pada awal berdirinya, sekolah ini dipimpin oleh Bapak R. Soemarman sebagai Kepala Sekolah pertama bersama 15 orang guru.
                </p>
                <p>
                  Kegiatan belajar mengajar awalnya menumpang di SMAN 4 Semarang. Hingga pada 1 Februari 1982 SMA Negeri 9 Semarang resmi menempati gedung sendiri yang berlokasi di Jl. Cemara Raya, Pedalangan, Banyumanik.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-block bg-[#0a2e1c] text-white px-6 py-3 rounded-md hover:bg-[#11492d] transition-colors text-sm font-semibold shadow-sm"
                >
                  Lihat Profil Lengkap
                </Link>
              </div>
            </div>

            {/* Bagian Galeri (Kanan) */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden shadow-md h-40 sm:h-48">
                  <img src="/galeri/2.png" alt="Kegiatan Sekolah 2" loading="lazy" decoding="async" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="rounded-xl overflow-hidden shadow-md h-40 sm:h-48 mt-8">
                  <img src="/galeri/1.png" alt="Kegiatan Sekolah 1" loading="lazy" decoding="async" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="rounded-xl overflow-hidden shadow-md h-40 sm:h-48 -mt-4">
                  <img src="/galeri/3.png" alt="Kegiatan Sekolah 3" loading="lazy" decoding="async" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="rounded-xl overflow-hidden shadow-md h-40 sm:h-48 mt-4">
                  <img src="/galeri/4.png" alt="Kegiatan Sekolah 4" loading="lazy" decoding="async" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sambutan Kepala Sekolah */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Bagian Foto (Kiri) */}
            <div className="lg:col-span-4">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 translate-y-4 bg-gradient-to-r from-green-600 to-[#0a2e1c] rounded-xl opacity-20 group-hover:opacity-50 blur-lg transition duration-500 transform-gpu pointer-events-none"></div>
                <div className="relative rounded-xl overflow-hidden shadow-lg transform transition-transform duration-500">
                  <img
                    src="/kepala-sekolah.png"
                    alt="Kepala SMA Negeri 9 Semarang"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Bagian Teks Sambutan (Kanan) */}
            <div className="lg:col-span-8 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Sambutan Kepala Sekolah</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed text-justify italic border-l-4 border-[#0a2e1c] pl-6 py-2 bg-gray-50/50 rounded-r-lg">
                  <p>Assalamualaikum warahmatullahi wabarakatuh,</p>
                  <p>
                    Puji syukur kita panjatkan ke hadirat Allah SWT, Tuhan Yang Maha Esa, atas limpahan rahmat dan karunia-Nya sehingga website SMA Negeri 9 Semarang ini dapat hadir sebagai sarana informasi dan komunikasi bagi seluruh warga sekolah dan masyarakat.
                  </p>
                  <p>
                    Website ini kami hadirkan sebagai bentuk komitmen dalam memanfaatkan perkembangan teknologi informasi untuk mendukung kemajuan pendidikan. Melalui platform ini, kami berupaya menyediakan berbagai informasi yang dibutuhkan oleh siswa, guru, orang tua, maupun masyarakat secara luas, khususnya yang berkaitan dengan kegiatan pendidikan, ilmu pengetahuan, dan perkembangan sekolah.
                  </p>
                  <p>
                    Kami menyadari bahwa dalam era digital yang terus berkembang, keterbukaan informasi dan kemudahan akses menjadi kebutuhan penting. Oleh karena itu, kehadiran website ini diharapkan dapat menjadi media yang efektif, informatif, dan inspiratif bagi semua pihak.
                  </p>
                  <p>
                    Besar harapan kami, website ini dapat memberikan manfaat nyata serta menjadi jembatan komunikasi yang baik antara sekolah dengan seluruh pemangku kepentingan pendidikan, khususnya keluarga besar SMA Negeri 9 Semarang.
                  </p>
                  <p>
                    Kami juga sangat terbuka terhadap saran dan masukan yang konstruktif demi penyempurnaan website ini ke depannya. Dengan dukungan dan kerja sama semua pihak, kami optimis dapat terus meningkatkan kualitas layanan informasi serta membawa SMA Negeri 9 Semarang menjadi institusi pendidikan yang semakin unggul.
                  </p>
                  <p>Terima kasih atas perhatian dan kerja sama yang telah terjalin.</p>
                  <p>Wassalamualaikum warahmatullahi wabarakatuh.</p>
                </div>

                <div className="mt-6 text-gray-900 font-semibold">
                  <p>Hormat kami,</p>
                  <p>Kepala SMA Negeri 9 Semarang</p>
                  <p className="mt-4 text-lg text-[#0a2e1c] font-bold">Rr. Tri Widiyastuti, S.Pd.</p>
                  <p className="text-sm text-gray-500 font-normal">NIP. 19701231 199702 2 003</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Berita terbaru */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Berita Terbaru
            </h2>
            <Link
              href="/berita"
              className="text-sm font-medium text-green-700 hover:text-green-900 transition-colors"
            >
              Semua Berita &rarr;
            </Link>
          </div>
          <BeritaTerbaruClient initialList={berita} />
        </div>
      </section>
    </>
  );
}