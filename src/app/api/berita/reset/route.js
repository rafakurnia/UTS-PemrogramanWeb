import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { saveBerita } from "@/data/berita";

const DEFAULT_BERITA = [
  {
    id: "penerimaan-peserta-didik-baru-2026",
    judul: "Pendaftaran Peserta Didik Baru Tahun Ajaran 2026/2027 Dibuka",
    tanggal: "2026-06-15",
    ringkasan: "SMA Negeri 9 Semarang membuka pendaftaran peserta didik baru untuk tahun ajaran 2026/2027. Pendaftaran dilakukan secara daring melalui portal PPDB Kota Semarang.",
    gambar: "/berita/1.png",
    isi: [
      "SMA Negeri 9 Semarang resmi membuka pendaftaran peserta didik baru untuk tahun ajaran 2026/2027. Proses pendaftaran mengikuti mekanisme PPDB daring yang dikelola oleh Dinas Pendidikan Kota Semarang.",
      "Calon peserta didik dapat mendaftar melalui portal resmi PPDB di alamat yang telah ditentukan. Jalur penerimaan yang tersedia meliputi jalur zonasi, jalur prestasi, dan jalur perpindahan tugas orang tua.",
      "Panitia PPDB sekolah menyediakan layanan informasi dan bantuan pendaftaran bagi calon peserta didik yang memerlukan. Layanan ini tersedia pada hari kerja di ruang tata usaha sekolah.",
      "Informasi lebih lanjut mengenai persyaratan, jadwal, dan tata cara pendaftaran dapat dilihat di papan pengumuman sekolah atau dengan menghubungi panitia PPDB SMA Negeri 9 Semarang."
    ]
  },
  {
    id: "upacara-hari-pendidikan-nasional",
    judul: "Upacara Peringatan Hari Pendidikan Nasional di SMA Negeri 9 Semarang",
    tanggal: "2026-05-02",
    ringkasan: "Seluruh warga sekolah mengikuti upacara peringatan Hari Pendidikan Nasional yang dilaksanakan di lapangan utama sekolah.",
    gambar: "/berita/2.png",
    isi: [
      "SMA Negeri 9 Semarang menyelenggarakan upacara peringatan Hari Pendidikan Nasional pada tanggal 2 Mei 2026 di lapangan utama sekolah. Upacara diikuti oleh seluruh guru, tenaga kependidikan, dan siswa.",
      "Pembina upacara menyampaikan amanat yang berisi ajakan kepada seluruh warga sekolah untuk terus meningkatkan semangat belajar dan mengajar. Tema peringatan tahun ini menekankan pentingnya pendidikan yang adaptif.",
      "Setelah upacara, sekolah mengadakan kegiatan kerja bakti membersihkan lingkungan sekolah sebagai bentuk kepedulian terhadap kebersihan dan kenyamanan tempat belajar."
    ]
  },
  {
    id: "kegiatan-class-meeting-semester-genap",
    judul: "Class Meeting Semester Genap: Turnamen Olahraga dan Lomba Seni",
    tanggal: "2026-06-10",
    ringkasan: "Kegiatan class meeting semester genap berlangsung selama tiga hari dengan berbagai pertandingan olahraga dan lomba antar kelas.",
    gambar: "/berita/3.png",
    isi: [
      "SMA Negeri 9 Semarang mengadakan kegiatan class meeting semester genap selama tiga hari, mulai tanggal 10 hingga 12 Juni 2026. Kegiatan ini diselenggarakan oleh OSIS dengan dukungan seluruh guru dan staf sekolah.",
      "Berbagai cabang olahraga dipertandingkan dalam class meeting kali ini, di antaranya futsal, bola voli, dan bulu tangkis. Selain olahraga, terdapat juga lomba-lomba seperti menyanyi, menggambar, dan cerdas cermat.",
      "Kegiatan class meeting bertujuan untuk mempererat kebersamaan antar siswa dari berbagai kelas sekaligus menjadi ajang penyaluran bakat di luar kegiatan akademik. Antusiasme siswa terlihat tinggi di setiap pertandingan.",
      "Hasil pertandingan dan pemenang lomba diumumkan pada hari terakhir class meeting dalam acara penutupan yang dihadiri oleh perwakilan pimpinan sekolah."
    ]
  },
  {
    id: "pelatihan-guru-kurikulum-merdeka",
    judul: "Guru SMA Negeri 9 Semarang Ikuti Pelatihan Kurikulum Merdeka",
    tanggal: "2026-07-20",
    ringkasan: "Sebanyak seluruh guru mata pelajaran mengikuti pelatihan implementasi Kurikulum Merdeka yang diselenggarakan di aula sekolah.",
    gambar: "/berita/4.png",
    isi: [
      "SMA Negeri 9 Semarang menyelenggarakan pelatihan implementasi Kurikulum Merdeka bagi seluruh guru mata pelajaran. Pelatihan berlangsung selama dua hari di aula sekolah.",
      "Narasumber dari Dinas Pendidikan Provinsi Jawa Tengah memberikan materi mengenai penyusunan modul ajar, asesmen diagnostik, dan diferensiasi pembelajaran sesuai dengan prinsip Kurikulum Merdeka.",
      "Pelatihan ini merupakan bagian dari upaya sekolah untuk memastikan seluruh guru siap menerapkan kurikulum terbaru. Peserta juga berlatih menyusun perangkat pembelajaran secara langsung selama sesi praktik.",
      "Kepala sekolah menyampaikan harapan agar hasil pelatihan dapat langsung diterapkan pada tahun ajaran baru yang akan dimulai pada bulan Juli."
    ]
  },
  {
    id: "kegiatan-literasi-perpustakaan",
    judul: "Program Literasi: Perpustakaan Sekolah Tambah Koleksi Buku Baru",
    tanggal: "2026-08-05",
    ringkasan: "Perpustakaan SMA Negeri 9 Semarang menerima tambahan koleksi buku baru untuk mendukung program gerakan literasi sekolah.",
    gambar: "/berita/5.png",
    isi: [
      "Perpustakaan SMA Negeri 9 Semarang menerima tambahan koleksi buku baru sebagai bagian dari program Gerakan Literasi Sekolah. Buku-buku yang diterima mencakup berbagai genre, mulai dari fiksi, nonfiksi, hingga buku referensi pelajaran.",
      "Pengelola perpustakaan mengajak seluruh siswa untuk memanfaatkan koleksi baru ini. Jam kunjung perpustakaan tetap dibuka setiap hari sekolah pada jam istirahat dan setelah jam pelajaran terakhir.",
      "Selain penambahan buku, perpustakaan juga mulai menata ulang ruangannya agar lebih nyaman digunakan untuk kegiatan membaca dan belajar kelompok."
    ]
  },
  {
    id: "sosialisasi-keselamatan-berlalu-lintas",
    judul: "Polresta Semarang Gelar Sosialisasi Keselamatan Berlalu Lintas di SMAN 9",
    tanggal: "2026-09-12",
    ringkasan: "Polresta Semarang mengadakan sosialisasi keselamatan berlalu lintas kepada siswa SMA Negeri 9 Semarang di aula sekolah.",
    gambar: "/berita/6.png",
    isi: [
      "Polresta Semarang mengadakan kegiatan sosialisasi keselamatan berlalu lintas di SMA Negeri 9 Semarang. Kegiatan ini diikuti oleh siswa kelas X dan XI di aula sekolah.",
      "Materi yang disampaikan meliputi pentingnya mematuhi rambu lalu lintas, penggunaan helm standar, serta bahaya berkendara tanpa surat izin mengemudi. Petugas juga menjelaskan prosedur pengurusan SIM C bagi siswa yang sudah memenuhi syarat usia.",
      "Sosialisasi ini merupakan bagian dari program rutin Polresta Semarang untuk meningkatkan kesadaran berlalu lintas di kalangan pelajar. Siswa tampak antusias mengikuti sesi tanya jawab di akhir acara.",
      "Pihak sekolah menyambut baik kegiatan ini dan berharap dapat menjadi pengingat bagi siswa untuk selalu menjaga keselamatan saat berkendara dari dan menuju sekolah."
    ]
  }
];

export async function POST() {
  saveBerita(DEFAULT_BERITA);
  try {
    revalidatePath("/");
    revalidatePath("/berita");
  } catch (e) {}

  return NextResponse.json({
    message: "Data berita berhasil direset ke pengaturan awal",
    data: DEFAULT_BERITA,
  });
}
