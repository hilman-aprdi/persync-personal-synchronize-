import { LegalPage, LegalSection } from "../../components/legal-page";

export const metadata = {
  title: "Ketentuan Penggunaan | Persync",
  description: "Ketentuan penggunaan Persync, termasuk batasan AI, kuota gratis, dan tanggung jawab pengguna.",
  alternates: { canonical: "https://persync.ai.id/terms" },
  openGraph: {
    title: "Ketentuan Penggunaan | Persync",
    description: "Ketentuan penggunaan Persync, termasuk batasan AI, kuota gratis, dan tanggung jawab pengguna.",
    url: "https://persync.ai.id/terms",
  },
  twitter: {
    title: "Ketentuan Penggunaan | Persync",
    description: "Ketentuan penggunaan Persync, termasuk batasan AI, kuota gratis, dan tanggung jawab pengguna.",
  },
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Ketentuan penggunaan" title="Gunakan Persync sebagai alat bantu berpikir, bukan sebagai jaminan hasil." intro="Terakhir diperbarui: 16 Oktober 2026. Ketentuan ini menjelaskan layanan Persync dan hal-hal penting yang perlu Anda pahami saat menggunakannya.">
      <div className="space-y-12">
        <LegalSection title="1. Tentang layanan"><p>Persync membantu menyusun arah bisnis mikro dan side hustle berdasarkan jawaban yang Anda berikan. Hasilnya dapat berisi rekomendasi bisnis, pilihan alternatif, SWOT, jalur penghasilan pertama, langkah awal, dan catatan risiko.</p><p>Persync bukan konsultan bisnis, lembaga keuangan, penyedia investasi, atau penasihat profesional.</p></LegalSection>
        <LegalSection title="2. Penggunaan yang wajar"><p>Anda dapat menggunakan Persync untuk kebutuhan pribadi dan eksplorasi bisnis yang sah. Pastikan informasi yang Anda masukkan memang boleh Anda bagikan.</p><p>Jangan gunakan Persync untuk mengganggu layanan, mengirimkan konten berbahaya, melakukan penipuan, melanggar hukum, atau melanggar hak orang lain.</p></LegalSection>
        <LegalSection title="3. Batas gratis"><p>Persync saat ini menyediakan maksimal tiga analisis gratis dalam satu hari. Batas ini dihitung melalui cookie di browser Anda dan mengikuti jadwal reset layanan.</p><p>Karena batas ini terkait browser, penggunaan browser atau perangkat berbeda dapat memengaruhi perhitungannya. Persync dapat menyesuaikan batas tersebut jika diperlukan untuk menjaga layanan.</p></LegalSection>
        <LegalSection title="4. Hasil dari AI"><p>Rekomendasi Persync dibuat dengan bantuan Google Gemini. Hasilnya bisa kurang tepat, tidak lengkap, terlalu umum, atau tidak lagi sesuai ketika keadaan pasar berubah.</p><p>Periksa kembali permintaan pasar, biaya, aturan, dan risiko sebelum mengambil keputusan. Hasil Persync bukan jaminan penghasilan, keuntungan, atau keberhasilan bisnis.</p></LegalSection>
        <LegalSection title="5. Ketersediaan layanan"><p>Persync dapat mengalami gangguan, keterlambatan, pemeliharaan, atau perubahan fitur. Kami tidak menjamin layanan akan selalu tersedia atau setiap permintaan akan menghasilkan jawaban.</p></LegalSection>
        <LegalSection title="6. Informasi dan hasil analisis"><p>Anda tetap memiliki hak atas informasi yang Anda masukkan sejauh hak tersebut memang Anda miliki. Hasil analisis dibuat secara otomatis dan dapat memiliki kemiripan dengan hasil yang diterima pengguna lain.</p><p>Karena riwayat analisis tersimpan di browser Anda, jaga perangkat dan browser yang digunakan. Hindari memasukkan rahasia dagang, data pribadi orang lain, atau informasi sensitif yang tidak diperlukan.</p></LegalSection>
        <LegalSection title="7. Tanggung jawab pengguna"><p>Anda bertanggung jawab atas keputusan yang diambil berdasarkan hasil Persync. Persync tidak bertanggung jawab atas kerugian atau hasil usaha yang muncul karena rekomendasi digunakan tanpa pemeriksaan yang memadai. Ketentuan ini tidak menghapus hak atau tanggung jawab yang tidak dapat dikesampingkan oleh hukum.</p></LegalSection>
        <LegalSection title="8. Kontak"><p>Untuk pertanyaan tentang ketentuan ini, hubungi <a className="text-cyan-200/80 hover:text-cyan-100" href="mailto:hilmanokk09@gmail.com">hilmanokk09@gmail.com</a> atau Instagram <a className="text-cyan-200/80 hover:text-cyan-100" href="https://instagram.com/mnaprd_" target="_blank" rel="noreferrer">@mnaprd_</a>.</p></LegalSection>
      </div>
    </LegalPage>
  );
}
