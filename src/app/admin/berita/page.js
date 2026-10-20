"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  getBeritaFromStorage,
  saveBeritaToStorage,
  DEFAULT_BERITA_LIST,
  compressImageFile,
} from "@/lib/beritaStorage";

const PRESET_IMAGES = [
  { label: "Foto 1 (PPDB)", src: "/berita/1.png" },
  { label: "Foto 2 (Upacara)", src: "/berita/2.png" },
  { label: "Foto 3 (Class Meeting)", src: "/berita/3.png" },
  { label: "Foto 4 (Pelatihan)", src: "/berita/4.png" },
  { label: "Foto 5 (Perpustakaan)", src: "/berita/5.png" },
  { label: "Foto 6 (Sosialisasi)", src: "/berita/6.png" },
];

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

export default function AdminBeritaPage() {
  const [beritaList, setBeritaList] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("table"); // "table" | "grid"

  // Toast state
  const [toast, setToast] = useState(null);

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [previewTarget, setPreviewTarget] = useState(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    id: "",
    judul: "",
    tanggal: new Date().toISOString().split("T")[0],
    ringkasan: "",
    gambar: "/berita/1.png",
    isi: "",
  });
  const [autoSlug, setAutoSlug] = useState(true);
  const [imageTab, setImageTab] = useState("upload"); // "upload" | "preset" | "url"
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Load from localStorage immediately on mount
  useEffect(() => {
    const list = getBeritaFromStorage();
    setBeritaList(list);
    setMounted(true);

    const handleStorageUpdate = () => {
      setBeritaList(getBeritaFromStorage());
    };

    window.addEventListener("sman9_berita_updated", handleStorageUpdate);
    return () => {
      window.removeEventListener("sman9_berita_updated", handleStorageUpdate);
    };
  }, []);

  // Handle open Tambah Berita
  const handleOpenTambah = () => {
    setEditingItem(null);
    setAutoSlug(true);
    setImageTab("upload");
    setFormData({
      id: "",
      judul: "",
      tanggal: new Date().toISOString().split("T")[0],
      ringkasan: "",
      gambar: "/berita/1.png",
      isi: "",
    });
    setIsFormOpen(true);
  };

  // Handle open Edit Berita
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setAutoSlug(false);
    setImageTab(item.gambar && item.gambar.startsWith("data:") ? "upload" : "preset");
    setFormData({
      id: item.id,
      judul: item.judul,
      tanggal: item.tanggal,
      ringkasan: item.ringkasan,
      gambar: item.gambar || "/berita/1.png",
      isi: Array.isArray(item.isi) ? item.isi.join("\n\n") : item.isi || "",
    });
    setIsFormOpen(true);
  };

  // Handle upload gambar dari komputer
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Pilih file gambar (JPG, PNG, WebP)!", "error");
      return;
    }

    try {
      setIsCompressing(true);
      // Kompres gambar otomatis agar ringan di LocalStorage dan tidak lag
      const compressedDataUrl = await compressImageFile(file, 900, 600, 0.82);
      setFormData((prev) => ({ ...prev, gambar: compressedDataUrl }));
      showToast("Gambar berhasil dimuat dan dioptimasi!");
    } catch (err) {
      showToast("Gagal memproses gambar: " + err.message, "error");
    } finally {
      setIsCompressing(false);
    }
  };

  // Handle submit form (Create / Update)
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.judul.trim() || !formData.ringkasan.trim()) {
      showToast("Judul dan ringkasan wajib diisi!", "error");
      return;
    }

    let finalId = formData.id ? slugify(formData.id) : slugify(formData.judul);
    if (!finalId) finalId = "berita-" + Date.now();

    // Olah isi jadi array paragraf
    let finalIsi = [];
    if (typeof formData.isi === "string") {
      finalIsi = formData.isi
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);
    }
    if (finalIsi.length === 0) {
      finalIsi = [formData.ringkasan];
    }

    const currentList = [...beritaList];

    if (editingItem) {
      // UPDATE
      const index = currentList.findIndex((b) => b.id === editingItem.id);
      if (index !== -1) {
        currentList[index] = {
          ...currentList[index],
          judul: formData.judul.trim(),
          tanggal: formData.tanggal || currentList[index].tanggal,
          ringkasan: formData.ringkasan.trim(),
          gambar: formData.gambar || "/berita/1.png",
          isi: finalIsi,
        };
        saveBeritaToStorage(currentList);
        setBeritaList(currentList);
        showToast("Berita berhasil diperbarui!");
      }
    } else {
      // CREATE
      // Cek duplikasi ID
      let counter = 1;
      const baseId = finalId;
      while (currentList.some((b) => b.id === finalId)) {
        finalId = `${baseId}-${counter}`;
        counter++;
      }

      const newBerita = {
        id: finalId,
        judul: formData.judul.trim(),
        tanggal: formData.tanggal || new Date().toISOString().split("T")[0],
        ringkasan: formData.ringkasan.trim(),
        gambar: formData.gambar || "/berita/1.png",
        isi: finalIsi,
      };

      const updated = [newBerita, ...currentList];
      saveBeritaToStorage(updated);
      setBeritaList(updated);
      showToast("Berita baru berhasil ditambahkan!");
    }

    setIsFormOpen(false);
  };

  // Handle Delete
  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    const updated = beritaList.filter((b) => b.id !== deleteTarget.id);
    saveBeritaToStorage(updated);
    setBeritaList(updated);
    showToast(`Berita "${deleteTarget.judul}" berhasil dihapus.`);
    setDeleteTarget(null);
  };

  // Handle Reset to Default
  const handleResetData = () => {
    saveBeritaToStorage(DEFAULT_BERITA_LIST);
    setBeritaList(DEFAULT_BERITA_LIST);
    showToast("Data berita berhasil direset ke pengaturan awal!");
    setIsResetConfirmOpen(false);
  };

  // Search filter
  const filteredList = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return beritaList;
    return beritaList.filter(
      (b) =>
        b.judul.toLowerCase().includes(q) ||
        b.ringkasan.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q)
    );
  }, [beritaList, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50/80 text-gray-900 pb-20">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg border text-sm font-medium transition-all ${
            toast.type === "error"
              ? "bg-red-50 text-red-800 border-red-200"
              : "bg-emerald-50 text-emerald-800 border-emerald-200"
          }`}
        >
          {toast.type === "error" ? (
            <svg className="w-5 h-5 text-red-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 text-gray-400 hover:text-gray-700">
            &times;
          </button>
        </div>
      )}

      {/* Header bar */}
      <div className="bg-[#0a2e1c] text-white border-b border-green-950/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Panel Rahasia / Akses Manual
                </span>
                <span className="text-xs bg-emerald-900/60 text-emerald-200 border border-emerald-700/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  Mode: LocalStorage Cepat
                </span>
                <span className="text-xs text-green-200/70">
                  URL: <code className="bg-black/30 px-1.5 py-0.5 rounded text-emerald-300 font-mono">/admin/berita</code>
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Kelola Berita SMAN 9 Semarang
              </h1>
              <p className="text-sm text-green-100/80 mt-1">
                CRUD Berita dengan LocalStorage & Upload Gambar dari Komputer (Instan & Tanpa Lag).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Ke Website Utama
              </Link>

              <button
                onClick={() => setIsResetConfirmOpen(true)}
                title="Reset kembali ke 6 berita bawaan"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 transition-colors border border-amber-400/30"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Default
              </button>

              <button
                onClick={handleOpenTambah}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-gray-950 transition-colors shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                Tambah Berita Baru
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Info Banner */}
        <div className="mb-6 p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-3">
          <svg className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
            <strong>Optimasi LocalStorage & Akses Rahasia:</strong> Halaman ini 100% menggunakan <strong>LocalStorage browser</strong> untuk pemrosesan super cepat tanpa lag! Anda dapat mengunggah gambar langsung dari komputer yang otomatis dikompresi. Halaman ini hanya dapat diakses melalui link manual <span className="font-mono bg-emerald-200/70 px-1.5 py-0.5 rounded font-bold">/admin/berita</span>.
          </div>
        </div>

        {/* Search & Stats Toolbar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#0a2e1c]/10 flex items-center justify-center text-[#0a2e1c] font-bold">
              {beritaList.length}
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Berita Tersimpan</p>
              <p className="text-sm font-semibold text-gray-900">
                {beritaList.length} artikel di LocalStorage
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-80">
              <svg
                className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Cari berdasarkan judul, isi, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a2e1c]/30 focus:border-[#0a2e1c]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  &times;
                </button>
              )}
            </div>

            {/* View toggle */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200 shrink-0">
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "table" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500 hover:text-gray-800"
                }`}
                title="Tampilan Tabel"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500 hover:text-gray-800"
                }`}
                title="Tampilan Kartu"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content list */}
        {!mounted ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#0a2e1c] border-t-transparent mb-3"></div>
            <p className="text-sm">Memuat data dari LocalStorage...</p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
            <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-800">Tidak ada berita ditemukan</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
              {searchQuery
                ? `Tidak ada hasil pencarian untuk "${searchQuery}". Coba kata kunci lain.`
                : "Belum ada berita yang tersimpan di LocalStorage. Klik tombol di bawah untuk menambahkan."}
            </p>
            {!searchQuery && (
              <button
                onClick={handleOpenTambah}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[#0a2e1c] text-white hover:bg-[#11492d] transition-colors"
              >
                + Tambah Berita Baru
              </button>
            )}
          </div>
        ) : viewMode === "table" ? (
          /* TABLE VIEW */
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase text-gray-500 tracking-wider">
                  <tr>
                    <th scope="col" className="px-5 py-3.5">Gambar</th>
                    <th scope="col" className="px-5 py-3.5">Judul & Ringkasan</th>
                    <th scope="col" className="px-5 py-3.5">Tanggal</th>
                    <th scope="col" className="px-5 py-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredList.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                      {/* Thumbnail */}
                      <td className="px-5 py-4 w-28">
                        <div className="w-20 h-14 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 relative shrink-0">
                          <img
                            src={item.gambar || "/berita/1.png"}
                            alt={item.judul}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>

                      {/* Judul & ringkasan */}
                      <td className="px-5 py-4">
                        <div className="max-w-xl">
                          <h4 className="font-bold text-gray-900 text-base line-clamp-1 mb-1">
                            {item.judul}
                          </h4>
                          <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
                            {item.ringkasan}
                          </p>
                          <div className="mt-1.5 flex items-center gap-2 text-[11px] text-gray-400 font-mono">
                            <span>ID: {item.id}</span>
                            {item.gambar && item.gambar.startsWith("data:") && (
                              <span className="bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded text-[10px] font-sans font-medium">
                                Gambar Upload
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Tanggal */}
                      <td className="px-5 py-4 whitespace-nowrap text-xs text-gray-600 font-medium">
                        {item.tanggal}
                      </td>

                      {/* Aksi */}
                      <td className="px-5 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Pratinjau */}
                          <button
                            onClick={() => setPreviewTarget(item)}
                            title="Pratinjau Berita"
                            className="p-1.5 rounded-lg text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>

                          {/* Buka halaman publik */}
                          <Link
                            href={`/berita/${item.id}`}
                            target="_blank"
                            title="Buka Halaman Publik"
                            className="p-1.5 rounded-lg text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </Link>

                          {/* Edit */}
                          <button
                            onClick={() => handleOpenEdit(item)}
                            title="Edit Berita"
                            className="p-1.5 rounded-lg text-gray-600 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>

                          {/* Hapus */}
                          <button
                            onClick={() => setDeleteTarget(item)}
                            title="Hapus Berita"
                            className="p-1.5 rounded-lg text-gray-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="h-44 w-full bg-gray-100 relative overflow-hidden">
                  <img
                    src={item.gambar || "/berita/1.png"}
                    alt={item.judul}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
                    {item.tanggal}
                  </div>
                  {item.gambar && item.gambar.startsWith("data:") && (
                    <div className="absolute bottom-3 left-3 bg-blue-600/90 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                      Upload Komputer
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base line-clamp-2 mb-2">
                      {item.judul}
                    </h3>
                    <p className="text-gray-600 text-xs line-clamp-3 leading-relaxed mb-4">
                      {item.ringkasan}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400 font-mono truncate max-w-[120px]">
                      {item.id}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setPreviewTarget(item)}
                        className="px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="px-2 py-1 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-md transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteTarget(item)}
                        className="px-2 py-1 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* MODAL FORM TAMBAH / EDIT */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/70">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {editingItem ? "Edit Berita" : "Tambah Berita Baru"}
                </h2>
                <p className="text-xs text-emerald-700 font-medium">
                  Tersimpan langsung di LocalStorage (Respons Instan)
                </p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none p-1"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitForm} className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Judul Berita */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Judul Berita <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.judul}
                  onChange={(e) => {
                    const newJudul = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      judul: newJudul,
                      id: autoSlug && !editingItem ? slugify(newJudul) : prev.id,
                    }));
                  }}
                  placeholder="Contoh: Siswa SMAN 9 Semarang Juara 1 Olimpiade Sains"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2e1c]/30 focus:border-[#0a2e1c]"
                />
              </div>

              {/* Slug / ID & Tanggal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                      ID / Slug URL
                    </label>
                    {!editingItem && (
                      <label className="text-[11px] text-gray-500 flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={autoSlug}
                          onChange={(e) => setAutoSlug(e.target.checked)}
                          className="rounded text-[#0a2e1c]"
                        />
                        Otomatis dari judul
                      </label>
                    )}
                  </div>
                  <input
                    type="text"
                    disabled={editingItem !== null}
                    value={formData.id}
                    onChange={(e) => {
                      setAutoSlug(false);
                      setFormData({ ...formData, id: slugify(e.target.value) });
                    }}
                    placeholder="id-berita-unik"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-mono bg-gray-50 disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0a2e1c]/30 focus:border-[#0a2e1c]"
                  />
                  <p className="text-[11px] text-gray-400 mt-1 font-mono">
                    /berita/{formData.id || "..."}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Tanggal Publikasi
                  </label>
                  <input
                    type="date"
                    value={formData.tanggal}
                    onChange={(e) =>
                      setFormData({ ...formData, tanggal: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2e1c]/30 focus:border-[#0a2e1c]"
                  />
                </div>
              </div>

              {/* Upload Gambar Dari Komputer & Preset */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Gambar Berita
                </label>

                {/* Tab Switcher Gambar */}
                <div className="flex items-center gap-2 mb-3 border-b border-gray-200 pb-2">
                  <button
                    type="button"
                    onClick={() => setImageTab("upload")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      imageTab === "upload"
                        ? "bg-[#0a2e1c] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Upload dari Komputer
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageTab("preset")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      imageTab === "preset"
                        ? "bg-[#0a2e1c] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Pilihan Foto Sekolah
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageTab("url")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      imageTab === "url"
                        ? "bg-[#0a2e1c] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    URL / Tautan
                  </button>
                </div>

                {/* Tab 1: Upload dari Komputer */}
                {imageTab === "upload" && (
                  <div className="space-y-3">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 hover:border-[#0a2e1c] rounded-2xl p-6 text-center cursor-pointer bg-gray-50/50 hover:bg-emerald-50/30 transition-all flex flex-col items-center justify-center gap-2"
                    >
                      {isCompressing ? (
                        <div className="flex items-center gap-2 text-emerald-800 text-sm font-medium">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#0a2e1c] border-t-transparent"></div>
                          Sedang mengompresi gambar...
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#0a2e1c] flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-800">
                              Klik untuk memilih gambar dari komputer Anda
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Mendukung format PNG, JPG, JPEG, WebP. Gambar dikompresi otomatis agar ringan.
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Tab 2: Pilihan Foto Bawaan */}
                {imageTab === "preset" && (
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.src}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, gambar: preset.src })
                        }
                        className={`relative rounded-xl overflow-hidden border-2 aspect-video transition-all ${
                          formData.gambar === preset.src
                            ? "border-[#0a2e1c] ring-2 ring-[#0a2e1c]/30 scale-102"
                            : "border-gray-200 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={preset.src}
                          alt={preset.label}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Tab 3: Kustom URL */}
                {imageTab === "url" && (
                  <input
                    type="text"
                    value={formData.gambar}
                    onChange={(e) =>
                      setFormData({ ...formData, gambar: e.target.value })
                    }
                    placeholder="https://example.com/gambar.jpg atau /berita/1.png"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#0a2e1c]/30 focus:border-[#0a2e1c]"
                  />
                )}

                {/* Pratinjau Gambar Terpilih */}
                {formData.gambar && (
                  <div className="mt-3 flex items-center gap-3 p-2 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-200 shrink-0 border border-gray-300">
                      <img
                        src={formData.gambar}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800">
                        Gambar Aktif:
                      </p>
                      <p className="text-[11px] text-gray-500 truncate">
                        {formData.gambar.startsWith("data:")
                          ? "Gambar dari komputer Anda (terkompresi Data URL)"
                          : formData.gambar}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, gambar: "/berita/1.png" })
                      }
                      className="text-xs text-red-600 hover:text-red-800 font-medium px-2 py-1"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>

              {/* Ringkasan */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Ringkasan Singkat <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.ringkasan}
                  onChange={(e) =>
                    setFormData({ ...formData, ringkasan: e.target.value })
                  }
                  placeholder="Ringkasan 1-2 kalimat untuk kartu berita..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2e1c]/30 focus:border-[#0a2e1c]"
                />
              </div>

              {/* Isi Lengkap */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Isi Berita Lengkap
                  </label>
                  <span className="text-[11px] text-gray-500">
                    Tekan <kbd className="px-1 py-0.5 bg-gray-100 rounded text-gray-700 font-mono">Enter 2x</kbd> untuk paragraf baru
                  </span>
                </div>
                <textarea
                  rows={6}
                  value={formData.isi}
                  onChange={(e) =>
                    setFormData({ ...formData, isi: e.target.value })
                  }
                  placeholder="Tuliskan berita lengkap di sini...&#10;&#10;Paragraf kedua..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#0a2e1c]/30 focus:border-[#0a2e1c]"
                />
              </div>

              {/* Footer Buttons */}
              <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#0a2e1c] hover:bg-[#11492d] text-white transition-colors shadow-xs"
                >
                  {editingItem ? "Simpan Perubahan" : "Terbitkan Berita"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI HAPUS */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Hapus Berita Ini?</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Apakah Anda yakin ingin menghapus berita <strong className="text-gray-900">"{deleteTarget.judul}"</strong>? Berita akan segera dihapus dari LocalStorage.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors shadow-xs"
              >
                Ya, Hapus Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETAIL PREVIEW */}
      {previewTarget && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Pratinjau Artikel
                </span>
                <span className="text-xs text-gray-500">{previewTarget.tanggal}</span>
              </div>
              <button
                onClick={() => setPreviewTarget(null)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold leading-none p-1"
              >
                &times;
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="w-full h-56 rounded-xl overflow-hidden bg-gray-100 mb-4 border border-gray-200">
                <img
                  src={previewTarget.gambar || "/berita/1.png"}
                  alt={previewTarget.judul}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                {previewTarget.judul}
              </h2>

              <p className="text-sm font-medium text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                {previewTarget.ringkasan}
              </p>

              <div className="pt-2 space-y-3 text-sm text-gray-700 leading-relaxed">
                {Array.isArray(previewTarget.isi) ? (
                  previewTarget.isi.map((p, idx) => <p key={idx}>{p}</p>)
                ) : (
                  <p>{previewTarget.isi}</p>
                )}
              </div>
            </div>

            <div className="px-6 py-3.5 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <Link
                href={`/berita/${previewTarget.id}`}
                target="_blank"
                className="text-xs text-[#0a2e1c] font-semibold hover:underline inline-flex items-center gap-1"
              >
                Buka di tampilan website penuh &rarr;
              </Link>
              <button
                onClick={() => setPreviewTarget(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL RESET CONFIRMATION */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Reset ke Data Awal?</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Tindakan ini akan mengembalikan daftar berita di LocalStorage ke 6 berita sekolah bawaan.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleResetData}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-amber-600 hover:bg-amber-700 text-white transition-colors shadow-xs"
              >
                Ya, Reset Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
