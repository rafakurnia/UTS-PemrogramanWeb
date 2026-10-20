import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getBerita, saveBerita } from "@/data/berita";

export async function GET(request, { params }) {
  const { id } = await params;
  const list = getBerita();
  const found = list.find((b) => b.id === id);

  if (!found) {
    return NextResponse.json({ error: "Berita tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json(found);
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { judul, ringkasan, isi, gambar, tanggal } = body;

    const list = getBerita();
    const index = list.findIndex((b) => b.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Berita tidak ditemukan" }, { status: 404 });
    }

    // Olah isi jika berupa string jadi array
    let finalIsi = list[index].isi;
    if (Array.isArray(isi)) {
      finalIsi = isi.map((p) => p.trim()).filter(Boolean);
    } else if (typeof isi === "string") {
      finalIsi = isi
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);
    }

    const updatedBerita = {
      ...list[index],
      judul: judul !== undefined ? judul.trim() : list[index].judul,
      ringkasan: ringkasan !== undefined ? ringkasan.trim() : list[index].ringkasan,
      tanggal: tanggal || list[index].tanggal,
      gambar: gambar || list[index].gambar,
      isi: finalIsi && finalIsi.length > 0 ? finalIsi : list[index].isi,
    };

    list[index] = updatedBerita;
    const success = saveBerita(list);

    if (!success) {
      return NextResponse.json(
        { error: "Gagal menyimpan perubahan ke server" },
        { status: 500 }
      );
    }

    try {
      revalidatePath("/");
      revalidatePath("/berita");
      revalidatePath(`/berita/${id}`);
    } catch (e) {
      // Abaikan jika revalidatePath tidak aktif
    }

    return NextResponse.json({
      message: "Berita berhasil diperbarui",
      data: updatedBerita,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server: " + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const list = getBerita();
    const index = list.findIndex((b) => b.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Berita tidak ditemukan" }, { status: 404 });
    }

    const deletedItem = list.splice(index, 1)[0];
    const success = saveBerita(list);

    if (!success) {
      return NextResponse.json(
        { error: "Gagal menghapus berita dari server" },
        { status: 500 }
      );
    }

    try {
      revalidatePath("/");
      revalidatePath("/berita");
      revalidatePath(`/berita/${id}`);
    } catch (e) {
      // Abaikan jika revalidatePath tidak aktif
    }

    return NextResponse.json({
      message: "Berita berhasil dihapus",
      data: deletedItem,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server: " + error.message },
      { status: 500 }
    );
  }
}
