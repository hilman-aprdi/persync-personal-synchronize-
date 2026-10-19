import { LegalPage, LegalSection } from "../../components/legal-page";

export const metadata = {
  title: "Kebijakan Privasi | Persync",
  description: "Penjelasan singkat tentang informasi yang diproses Persync, penyimpanan riwayat, cookie kuota, dan Google Gemini.",
  alternates: { canonical: "https://persync.ai.id/privacy" },
  openGraph: {
    title: "Kebijakan Privasi | Persync",
    description: "Penjelasan singkat tentang informasi yang diproses Persync, penyimpanan riwayat, cookie kuota, dan Google Gemini.",
    url: "https://persync.ai.id/privacy",
  },
  twitter: {
    title: "Kebijakan Privasi | Persync",
    description: "Penjelasan singkat tentang informasi yang diproses Persync, penyimpanan riwayat, cookie kuota, dan Google Gemini.",
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Kebijakan privasi" title="Kami ingin Anda tahu apa yang terjadi pada informasi yang dimasukkan ke Persync." intro="Terakhir diperbarui: 16 Oktober 2026. Penjelasan ini dibuat berdasarkan cara kerja Persync saat ini.">
      <div className="space-y-12">
        <LegalSection title="1. Informasi yang Anda masukkan"><p>Persync menerima jawaban tentang situasi kerja, tujuan, skill dan minat, modal, waktu, gaya kerja, pengalaman menjual, target penghasilan, serta pemahaman pasar. Informasi ini digunakan untuk membuat rekomendasi yang lebih sesuai dengan kondisi Anda.</p><p>Jangan masukkan nomor identitas, data kesehatan, rahasia dagang, data keuangan sensitif, atau data orang lain jika tidak diperlukan.</p></LegalSection>
        <LegalSection title="2. Pemrosesan untuk membuat analisis"><p>Saat Anda meminta analisis, jawaban Anda dikirim ke server Persync dan diproses dengan bantuan Google Gemini. Informasi tersebut digunakan untuk menghasilkan arah bisnis, langkah awal, peluang, dan risiko yang ditampilkan kepada Anda.</p><p>Artinya, input Anda tidak hanya berada di perangkat. Google Gemini adalah layanan pihak ketiga yang membantu membuat analisis, sehingga pemrosesan datanya juga mengikuti ketentuan Google yang berlaku.</p></LegalSection>
        <LegalSection title="3. Riwayat di browser"><p>Riwayat analisis disimpan di browser Anda agar dapat dibuka kembali. Persync tidak menggunakan database aplikasi untuk menyimpan riwayat tersebut.</p><p>Anda dapat menghapus satu riwayat melalui menu yang tersedia. Anda juga dapat menghapus seluruhnya melalui pengaturan data situs di browser. Pada perangkat bersama, orang lain yang dapat membuka browser Anda mungkin dapat melihat riwayat tersebut.</p></LegalSection>
        <LegalSection title="4. Cookie batas gratis"><p>Persync menggunakan cookie untuk menghitung maksimal tiga analisis gratis per hari. Cookie ini tidak menyimpan isi formulir atau hasil analisis. Cookie tersebut diperlukan agar batas penggunaan dapat berjalan dan akan berlaku selama 24 jam.</p></LegalSection>
        <LegalSection title="5. Log layanan"><p>Saat terjadi masalah, informasi error dapat tercatat di log server untuk membantu menjaga dan memperbaiki layanan. Saat ini tidak terlihat penggunaan analytics, iklan, atau layanan pelacak pihak ketiga lain dalam aplikasi.</p><p>Masa penyimpanan log dan data oleh layanan hosting atau Google Gemini mengikuti pengaturan penyedia masing-masing dan belum ditetapkan secara khusus oleh Persync.</p></LegalSection>
        <LegalSection title="6. Berapa lama data disimpan?"><p>Riwayat di browser akan tersimpan sampai Anda menghapusnya, membersihkan data situs, atau browser menghapusnya. Cookie batas gratis berlaku selama 24 jam.</p><p>Untuk data yang diproses oleh server dan Google Gemini, lama penyimpanannya dapat bergantung pada penyedia layanan. Persync tidak menjanjikan jangka waktu tertentu yang belum dapat dipastikan.</p></LegalSection>
        <LegalSection title="7. Pilihan Anda"><p>Anda dapat memilih untuk tidak menggunakan Persync, tidak mengisi informasi yang tidak diperlukan, menghapus riwayat dari browser, dan menghapus cookie melalui pengaturan browser. Jika cookie dinonaktifkan, batas penggunaan mungkin tidak bekerja sebagaimana mestinya.</p></LegalSection>
        <LegalSection title="8. Pertanyaan privasi"><p>Jika Anda memiliki pertanyaan atau ingin membahas privasi, hubungi <a className="text-cyan-200/80 hover:text-cyan-100" href="mailto:hilmanokk09@gmail.com">hilmanokk09@gmail.com</a> atau Instagram <a className="text-cyan-200/80 hover:text-cyan-100" href="https://instagram.com/mnaprd_" target="_blank" rel="noreferrer">@mnaprd_</a>.</p></LegalSection>
        <LegalSection title="9. Perubahan kebijakan"><p>Jika cara Persync memproses atau menyimpan informasi berubah, halaman ini akan diperbarui agar tetap sesuai dengan layanan yang digunakan.</p></LegalSection>
      </div>
    </LegalPage>
  );
}
