const sejarah = [
  {
    tanggal: "14 Juli 1981",
    isi: "Surat Keputusan Menteri Pendidikan dan Kebudayaan nomor 0219/O/1981 membuka SMA Negeri 9 Semarang secara resmi.",
  },
  {
    tanggal: "Tahun pelajaran 1981/1982",
    isi: "Sekolah mulai berjalan dengan 15 guru. Tiga kelas X pertama menumpang di SMA Negeri 4, Jl. Karang Rejo Raya, Banyumanik, dan masuk siang karena ruang kelas terbatas.",
  },
  {
    tanggal: "1 Februari 1982",
    isi: "Enam ruang kelas pertama di Jl. Cemara Raya selesai dibangun. Kegiatan belajar mengajar pindah ke gedung baru itu.",
  },
  {
    tanggal: "Sekarang",
    isi: "Dari enam ruang kelas, sekolah kini memiliki 32 ruang kelas beserta laboratorium dan ruang penunjang lainnya.",
  },
];

const angka = [
  { nilai: "32", label: "Ruang kelas" },
  { nilai: "6", label: "Laboratorium" },
  { nilai: "2", label: "Ruang aula" },
  { nilai: "12", label: "Kantin siswa" },
];

const misi = [
  {
    judul: "Kebersihan, keindahan, dan penghijauan",
    butir: [
      "Meningkatkan kepedulian dan peran serta seluruh komponen sekolah dalam menjaga kebersihan dan kesehatan lingkungan sekolah.",
      "Meningkatkan kepedulian dan peran serta seluruh komponen sekolah dalam mewujudkan keindahan di lingkungan sekolah.",
      "Meningkatkan kepedulian dan peran serta seluruh komponen sekolah dalam gerakan penghijauan di lingkungan sekolah.",
      "Meningkatkan kepedulian dan peran serta seluruh komponen sekolah dalam pembangunan dan pemeliharaan taman-taman di lingkungan sekolah.",
      "Meningkatkan kepedulian seluruh komponen sekolah dalam pelestarian lingkungan melalui gerakan penghijauan.",
      "Meningkatkan kepedulian seluruh komponen sekolah dalam pelestarian lingkungan melalui gerakan pemeliharaan tanaman.",
    ],
  },
  {
    judul: "Pencegahan pencemaran dan pelestarian sumber daya",
    butir: [
      "Mencegah pencemaran lingkungan kelas akibat limbah sampah melalui gotong royong bersih kelas.",
      "Mencegah pencemaran lingkungan akibat limbah sampah melalui gerakan tidak membuang sampah sembarangan.",
      "Mencegah pencemaran lingkungan akibat limbah sampah melalui gerakan pemilahan sampah sesuai jenisnya.",
      "Mencegah pencemaran lingkungan akibat limbah sampah melalui gerakan mengurangi penggunaan bahan plastik.",
      "Mencegah kerusakan persediaan air tanah melalui pembuatan lubang resapan atau biopori.",
      "Mencegah kerusakan akibat kebakaran melalui penyediaan alat tabung anti kebakaran.",
      "Mencegah kerusakan lingkungan melalui gerakan hemat air dan hemat listrik.",
      "Melestarikan sumber energi melalui pemanfaatan energi matahari di lingkungan sekolah.",
    ],
  },
  {
    judul: "Ketaqwaan, kepedulian sosial, dan budaya santun",
    butir: [
      "Meningkatkan ketaqwaan melalui kegiatan pesantren kilat, pengajian Jumat pagi, pembiasaan sholat dhuha, dan peringatan hari besar Islam untuk peserta didik muslim, serta kegiatan keagamaan lainnya bagi peserta didik nonmuslim.",
      "Meningkatkan kepedulian sosial bagi seluruh komponen sekolah melalui kegiatan bakti sosial, pengabdian masyarakat, dan live in.",
      "Meningkatkan budaya santun melalui pembiasaan menatap wajah, melempar senyum, mengulurkan tangan, dan mengucapkan salam dalam setiap pertemuan.",
    ],
  },
  {
    judul: "Akademik dan prestasi",
    butir: [
      "Meningkatkan pengetahuan peserta didik melalui pembelajaran bermuatan kecakapan abad XXI, HOTS, literasi, dan PPK.",
      "Meningkatkan kompetensi peserta didik dalam menyusun karya ilmiah melalui pelatihan KIR.",
      "Meningkatkan prestasi peserta didik melalui pelatihan olimpiade.",
      "Meningkatkan rata-rata nilai UN melalui pembelajaran bermuatan kecakapan abad XXI, HOTS, literasi, dan PPK serta program tambahan pelajaran.",
      "Meningkatkan jumlah peserta didik yang diterima di PTN melalui program pengawalan prestasi belajar sejak kelas X, tes minat bakat, dan program motivation training.",
    ],
  },
  {
    judul: "Keterampilan, bahasa, dan literasi",
    butir: [
      "Meningkatkan keterampilan peserta didik melalui pembelajaran bermuatan kecakapan abad XXI, HOTS, literasi, dan PPK, serta kegiatan ekstrakurikuler.",
      "Meningkatkan keterampilan dalam bidang olahraga melalui kegiatan ekstrakurikuler.",
      "Meningkatkan keterampilan bahasa Inggris melalui ekstrakurikuler keterampilan bahasa Inggris.",
      "Meningkatkan keterampilan peserta didik dalam pemanfaatan TIK melalui pembelajaran TIK.",
      "Meningkatkan budaya membaca melalui program literasi: pembiasaan 15 menit di awal tatap muka untuk membaca dan menanggapi informasi dari sumber atau buku.",
    ],
  },
  {
    judul: "Seni dan budaya",
    butir: [
      "Meningkatkan keterampilan peserta didik dalam melukis dan seni rupa lainnya melalui pembelajaran seni rupa.",
      "Meningkatkan keterampilan peserta didik dalam menari melalui pembelajaran seni tari dan ekstrakurikuler tari.",
      "Meningkatkan keterampilan peserta didik dalam seni karawitan melalui kegiatan ekstrakurikuler karawitan.",
      "Meningkatkan keterampilan peserta didik dalam seni suara melalui ekstrakurikuler paduan suara dan musik.",
      "Meningkatkan kepedulian peserta didik dalam berbudaya melalui pembelajaran seni budaya, pagelaran budaya, pentas seni, ekstrakurikuler, dan kunjungan ke berbagai destinasi budaya.",
      "Meningkatkan kepedulian peserta didik dalam mengembangkan dan melestarikan seni dan budaya daerah melalui pagelaran seni, budaya, dan karya.",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-900">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative isolate overflow-hidden bg-[#020a06] text-white">
        <img
          src="/gambarsekolah2.png"
          alt="Gedung SMA Negeri 9 Semarang"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />

        <div className="absolute inset-0 -z-10 bg-[#020a06]/75" />

        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Tentang SMA Negeri 9 Semarang
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-200 sm:text-lg">
              Berdiri sejak 1981 di Jl. Cemara Raya, Banyumanik, Semarang.
            </p>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/20" />
      </section>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <main className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10">

        {/* ===================================================
            PROFIL SEKOLAH
        ==================================================== */}
        <section className="mb-20">

          <div className="mb-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#0a2e1c]">
              Tentang Kami
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Profil Sekolah
            </h2>
          </div>

          <p className="max-w-4xl text-base leading-7 text-gray-600">
            SMA Negeri 9 Semarang adalah sekolah menengah atas negeri di Jl.
            Cemara Raya, Kelurahan Padangsari, Kecamatan Banyumanik, Kota
            Semarang, Jawa Tengah. Nomor pokok sekolah nasional (NPSN) sekolah
            ini adalah 20328939. Sekolah menyelenggarakan pendidikan jurusan
            MIPA dan IPS dari kelas X sampai kelas XII.
          </p>


          {/* Statistik */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <dl className="grid grid-cols-2 divide-x divide-y divide-gray-200 sm:grid-cols-4 sm:divide-y-0">

              {angka.map((a) => (
                <div
                  key={a.label}
                  className="px-6 py-7 transition-colors hover:bg-green-50/60 sm:px-7"
                >
                  <dd className="text-4xl font-bold tracking-tight text-[#0a2e1c]">
                    {a.nilai}
                  </dd>

                  <dt className="mt-2 text-sm font-medium text-gray-500">
                    {a.label}
                  </dt>
                </div>
              ))}

            </dl>
          </div>


          <p className="mt-4 max-w-4xl text-sm leading-6 text-gray-500">
            Laboratorium: Fisika, Kimia, Biologi, Bahasa, dan 2 laboratorium
            komputer. Ruang lain: perpustakaan, mushola, UKS/BP, OSIS, PMR,
            dan ruang seni lukis.
          </p>

        </section>


        {/* ===================================================
            SEJARAH
        ==================================================== */}
        <section className="mb-20">

          <div className="mb-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#0a2e1c]">
              Perjalanan Sekolah
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Sejarah Singkat
            </h2>
          </div>


          <ol className="relative ml-2 border-l border-green-200">

            {sejarah.map((s, index) => (
              <li
                key={s.tanggal}
                className={`relative pl-8 ${index !== sejarah.length - 1 ? "pb-10" : ""
                  }`}
              >

                {/* Titik timeline */}
                <span className="absolute -left-[6px] top-1.5 h-3 w-3 rounded-full bg-[#0a2e1c] ring-4 ring-white" />

                <p className="text-sm font-bold text-[#0a2e1c]">
                  {s.tanggal}
                </p>

                <p className="mt-2 max-w-3xl text-base leading-7 text-gray-600">
                  {s.isi}
                </p>

              </li>
            ))}

          </ol>

        </section>


        {/* ===================================================
            VISI
        ==================================================== */}
        <section className="mb-20">

          <div className="mb-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#0a2e1c]">
              Arah Sekolah
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Visi
            </h2>
          </div>


          <div className="rounded-2xl border border-green-100 bg-green-50/70 p-6 sm:p-8">

            <div className="mb-5 h-1 w-12 rounded-full bg-[#0a2e1c]" />

            <p className="max-w-4xl text-lg font-medium leading-8 text-[#0a2e1c] sm:text-xl">
              Terwujudnya SMA Negeri 9 Semarang yang aman dan nyaman bagi
              seluruh komponen sekolah untuk meningkatkan ketaqwaan, hubungan
              sosial, pengetahuan, keterampilan, kepedulian berbudaya,
              pencegahan terhadap pencemaran dan kerusakan, serta pelestarian
              lingkungan.
            </p>

          </div>

        </section>


        {/* ===================================================
            MISI
        ==================================================== */}
        <section className="mb-20">

          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#0a2e1c]">
              Komitmen Sekolah
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Misi
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
              Misi sekolah terdiri dari 33 butir. Berikut dikelompokkan
              menurut bidangnya.
            </p>
          </div>


          <div className="space-y-3">

            {misi.map((k, i) => (
              <details
                key={k.judul}
                open={i === 0}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-colors hover:border-green-200"
              >

                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-gray-900 transition-colors hover:text-[#0a2e1c] [&::-webkit-details-marker]:hidden">

                  <span className="leading-6">
                    {k.judul}
                  </span>

                  <span className="flex shrink-0 items-center gap-3">

                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-[#0a2e1c]">
                      {k.butir.length} butir
                    </span>

                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-[#0a2e1c] transition-transform duration-200 group-open:rotate-180"
                      aria-hidden="true"
                    >
                      <path d="M0 11H3L3 0H5L5 11H8V12L4 16L0 12V11Z" fill="currentColor" />
                      <path d="M16 0H10V2H16V0Z" fill="currentColor" />
                      <path d="M10 4H14V6H10V4Z" fill="currentColor" />
                      <path d="M12 8H10V10H12V8Z" fill="currentColor" />
                    </svg>

                  </span>

                </summary>


                <div className="border-t border-gray-100 bg-gray-50/50">

                  <ol className="list-decimal space-y-3 py-5 pl-10 pr-5 text-sm leading-7 text-gray-600 sm:pl-12 sm:pr-8 sm:text-base">

                    {k.butir.map((b) => (
                      <li key={b} className="pl-1">
                        {b}
                      </li>
                    ))}

                  </ol>

                </div>

              </details>
            ))}

          </div>

        </section>


        {/* ===================================================
            ALAMAT
        ==================================================== */}
        <section>

          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#0a2e1c]">
              Informasi
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Alamat & Kontak
            </h2>
          </div>


          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

            <dl className="divide-y divide-gray-100">

              <div className="grid gap-2 px-6 py-5 sm:grid-cols-[140px_1fr] sm:gap-6">
                <dt className="text-sm font-semibold text-gray-900">
                  Alamat
                </dt>

                <dd className="text-sm leading-6 text-gray-600 sm:text-base">
                  Jl. Cemara Raya, Kelurahan Padangsari, Kecamatan Banyumanik,
                  Kota Semarang, Jawa Tengah
                </dd>
              </div>


              <div className="grid gap-2 px-6 py-5 sm:grid-cols-[140px_1fr] sm:gap-6">
                <dt className="text-sm font-semibold text-gray-900">
                  Telepon
                </dt>

                <dd className="text-sm text-gray-600 sm:text-base">
                  (024) 7472812
                </dd>
              </div>


              <div className="grid gap-2 px-6 py-5 sm:grid-cols-[140px_1fr] sm:gap-6">
                <dt className="text-sm font-semibold text-gray-900">
                  Instagram
                </dt>

                <dd className="text-sm text-gray-600 sm:text-base">
                  @sman9semarang
                </dd>
              </div>


              <div className="grid gap-2 px-6 py-5 sm:grid-cols-[140px_1fr] sm:gap-6">
                <dt className="text-sm font-semibold text-gray-900">
                  Situs resmi
                </dt>

                <dd>
                  <a
                    href="https://sman9smg.sch.id/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-green-700 underline underline-offset-4 transition-colors hover:text-green-900 sm:text-base"
                  >
                    sman9smg.sch.id
                  </a>
                </dd>
              </div>

            </dl>

          </div>

        </section>

      </main>

    </div>
  );
}