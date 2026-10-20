import DetailBeritaClient from "@/components/DetailBeritaClient";
import { cariBerita } from "@/data/berita";

export const dynamic = "force-dynamic";

export default async function DetailBeritaPage({ params }) {
  const { id } = await params;
  const item = cariBerita(id);

  return <DetailBeritaClient id={id} initialItem={item || null} />;
}
