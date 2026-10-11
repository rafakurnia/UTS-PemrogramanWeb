"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3">
            {/* TODO: ganti dengan logo asli sekolah */}
            <div className="">
              <img src="/logokontak-sman9.png" alt="Logo SMAN 9 Semarang" className="h-15 w-auto object-contain" />
            </div>
            <span className="font-bold text-lg text-gray-800">
             
            </span>
          </Link>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-gray-600 hover:text-green-600 hover:underline underline-offset-4 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-green-600 hover:underline underline-offset-4 transition-colors">
              About
            </Link>
            <Link href="/berita" className="text-gray-600 hover:text-green-600 hover:underline underline-offset-4 transition-colors">
              Berita
            </Link>
            <Link href="/kontak" className="text-gray-600 hover:text-green-600 hover:underline underline-offset-4 transition-colors">
              Kontak
            </Link>
          </div>

          {/* Tombol hamburger */}
          <button
            className="md:hidden p-2 rounded text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2 text-sm font-medium">
            <Link
              href="/"
              className="block px-3 py-2 rounded text-gray-600 hover:bg-gray-100 hover:text-green-600 hover:underline underline-offset-4 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded text-gray-600 hover:bg-gray-100 hover:text-green-600 hover:underline underline-offset-4 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/berita"
              className="block px-3 py-2 rounded text-gray-600 hover:bg-gray-100 hover:text-green-600 hover:underline underline-offset-4 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Berita
            </Link>
            <Link
              href="/kontak"
              className="block px-3 py-2 rounded text-gray-600 hover:bg-gray-100 hover:text-green-600 hover:underline underline-offset-4 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Kontak
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
