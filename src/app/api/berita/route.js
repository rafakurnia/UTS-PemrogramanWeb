import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getBerita, saveBerita } from "@/data/berita";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export async function GET() {
  const data = getBerita();
  return NextResponse.json(data);
}

export async function PUT(request) {
  try {
    const body = await request.json();
    if (body.bulk && Array.isArray(body.bulk)) {
      saveBerita(body.bulk);
      return NextResponse.json({ success: true, count: body.bulk.length });
    }
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { judul, ringkasan, isi, gambar, tanggal, id } = body;

    if (!judul || !ringkasan) {
      return NextResponse.json(
        { error: "Judul dan ringkasan wajib diisi" },
        { status: 400 }
      );
    }

    const currentList = getBerita();

    // Generate slug id jika belum ada
    let finalId = id ? slugify(id) : slugify(judul);
    if (!finalId) {
      finalId = "berita-" + Date.now();
    }

    // Pastikan ID unik
    let counter = 1;
    const baseId = finalId;
    while (currentList.some((b) => b.id === finalId)) {
      finalId = `${baseId}-${counter}`;
      counter++;
    }

    // Olah isi jika berupa string jadi array paragraf
    let finalIsi = [];
    if (Array.isArray(isi)) {
      finalIsi = isi.map((p) => p.trim()).filter(Boolean);
    } else if (typeof isi === "string") {
      finalIsi = isi
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);
    }
    if (finalIsi.length === 0) {
      finalIsi = [ringkasan];
    }

    const newBerita = {
      id: finalId,
      judul: judul.trim(),
      tanggal: tanggal || new Date().toISOString().split("T")[0],
      ringkasan: ringkasan.trim(),
      gambar: gambar || "/berita/1.png",
      isi: finalIsi,
    };

    // Tambahkan di awal daftar (berita terbaru di atas)
    const updatedList = [newBerita, ...currentList];
    const success = saveBerita(updatedList);

    if (!success) {
      return NextResponse.json(
        { error: "Gagal menyimpan data berita ke server" },
        { status: 500 }
      );
    }

    // Trigger revalidasi halaman web publik
    try {
      revalidatePath("/");
      revalidatePath("/berita");
      revalidatePath(`/berita/${finalId}`);
    } catch (e) {
      // Abaikan jika revalidatePath tidak aktif di lingkungan tertentu
    }

    return NextResponse.json(
      { message: "Berita berhasil ditambahkan", data: newBerita },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating berita:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server: " + error.message },
      { status: 500 }
    );
  }
}
