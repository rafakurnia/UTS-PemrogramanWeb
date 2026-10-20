// Data berita SMA Negeri 9 Semarang
// Dioptimalkan dengan memory cache super cepat untuk mencegah disk lag
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src", "data", "berita.json");

let memoryCache = null;

export function getBerita() {
  if (memoryCache) {
    return memoryCache;
  }
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      memoryCache = JSON.parse(raw);
      return memoryCache;
    }
  } catch (err) {
    console.error("Gagal membaca file berita.json:", err);
  }
  return [];
}

export function saveBerita(newList) {
  memoryCache = newList; // update memory cache secara instan
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(newList, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Gagal menyimpan file berita.json:", err);
    return false;
  }
}

export function cariBerita(id) {
  const list = getBerita();
  return list.find((b) => b.id === id);
}

// Export getter langsung tanpa Proxy overhead
export const berita = new Proxy([], {
  get(target, prop) {
    const list = getBerita();
    const val = list[prop];
    if (typeof val === "function") {
      return val.bind(list);
    }
    return val;
  },
  has(target, prop) {
    return prop in getBerita();
  },
  ownKeys() {
    return Reflect.ownKeys(getBerita());
  },
  getOwnPropertyDescriptor(target, prop) {
    return Reflect.getOwnPropertyDescriptor(getBerita(), prop);
  },
});
