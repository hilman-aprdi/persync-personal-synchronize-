import Link from "next/link";
import { ArrowRight, BrainCircuit, Compass, ShieldAlert } from "lucide-react";
import { LegalPage, LegalSection } from "../../components/legal-page";

export const metadata = {
  title: "Tentang Persync | Arah Bisnis yang Realistis",
  description: "Kenali cara Persync membantu menyusun arah bisnis mikro dan side hustle berdasarkan kondisi nyata pengguna.",
  alternates: { canonical: "https://persync.ai.id/about" },
  openGraph: {
    title: "Tentang Persync | Arah Bisnis yang Realistis",
    description: "Kenali cara Persync membantu menyusun arah bisnis mikro dan side hustle berdasarkan kondisi nyata pengguna.",
    url: "https://persync.ai.id/about",
  },
  twitter: {
    title: "Tentang Persync | Arah Bisnis yang Realistis",
    description: "Kenali cara Persync membantu menyusun arah bisnis mikro dan side hustle berdasarkan kondisi nyata pengguna.",
  },
};

export default function AboutPage() {
  return (
    <LegalPage eyebrow="Tentang Persync" title="Membantu Anda memilih arah bisnis yang lebih masuk akal." intro="Persync dibuat untuk membantu orang Indonesia menemukan langkah bisnis yang sesuai dengan modal, waktu, keahlian, dan kondisi mereka saat ini.">
      <div className="space-y-12">
        <LegalSection title="Apa itu Persync?"><p>Persync adalah asisten bisnis berbasis AI untuk Anda yang sedang mencari side hustle, usaha mikro, atau langkah awal menuju bisnis yang lebih serius.</p><p>Anda mengisi kondisi kerja, tujuan, skill dan minat, modal, waktu, gaya kerja, pengalaman menjual, target penghasilan, serta pemahaman pasar. Persync kemudian menyusun satu arah utama, pilihan alternatif, SWOT, jalur penghasilan pertama, dan langkah awal yang bisa diuji.</p></LegalSection>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[22px] border border-white/8 bg-white/[0.025] p-5"><BrainCircuit className="h-5 w-5 text-cyan-200/70" aria-hidden="true" /><h3 className="mt-4">Berangkat dari kondisi Anda</h3><p>Modal, waktu, pengalaman, dan cara kerja ikut dipertimbangkan.</p></div>
          <div className="rounded-[22px] border border-white/8 bg-white/[0.025] p-5"><Compass className="h-5 w-5 text-cyan-200/70" aria-hidden="true" /><h3 className="mt-4">Mempersempit pilihan</h3><p>Fokusnya bukan menambah banyak ide, tetapi memilih yang layak dicoba lebih dulu.</p></div>
          <div className="rounded-[22px] border border-white/8 bg-white/[0.025] p-5"><ShieldAlert className="h-5 w-5 text-cyan-200/70" aria-hidden="true" /><h3 className="mt-4">Tetap perlu diuji</h3><p>Hasil Persync adalah titik awal, bukan keputusan bisnis yang sudah terbukti.</p></div>
        </div>

        <LegalSection title="Mengapa tidak sekadar memberi daftar ide?"><p>Ide bisnis yang terlihat menarik belum tentu cocok dijalankan. Bisa saja modalnya terlalu besar, waktunya tidak cukup, atau pembeli pertamanya sulit ditemukan. Karena itu, Persync memulai dari keadaan nyata Anda.</p><p>Pendekatan ini juga memperhatikan hal-hal yang dekat dengan usaha kecil di Indonesia, seperti kebutuhan praktis, pasar lokal, harga, dan pentingnya mendapatkan bukti permintaan sebelum mengeluarkan modal lebih banyak.</p></LegalSection>

        <LegalSection title="Bagaimana AI membantu?"><p>Persync membaca jawaban Anda, membandingkannya dengan beberapa pola usaha yang realistis, lalu menyusun rekomendasi yang lebih spesifik. Hasilnya mencakup arah bisnis utama, alasan kecocokan, jalur penghasilan pertama, langkah validasi, alternatif, dan risiko.</p><p>AI tetap bisa salah memahami situasi atau memberi saran yang kurang tepat. Gunakan hasilnya sebagai bahan pertimbangan, lalu periksa kembali kondisi pasar sebelum mengambil keputusan.</p></LegalSection>

        <LegalSection title="Siapa yang mungkin terbantu?"><p>Persync dapat membantu mahasiswa, fresh graduate, karyawan full-time, freelancer, orang yang baru mulai menjual, atau siapa pun yang ingin menguji usaha kecil dengan langkah yang lebih terukur.</p></LegalSection>

        <LegalSection title="Batasan Persync"><p>Persync tidak menjamin penghasilan atau keberhasilan bisnis. Hasilnya bukan pengganti nasihat hukum, pajak, keuangan, atau nasihat profesional lain yang mungkin Anda perlukan.</p></LegalSection>

        <div className="border-t border-white/8 pt-8"><Link href="/new" className="btn-primary">Coba analisis Anda <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
      </div>
    </LegalPage>
  );
}
