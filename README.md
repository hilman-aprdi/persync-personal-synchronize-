# Persync

Persync adalah alat bantu arah bisnis berbasis AI untuk siapa pun yang sedang mengeksplorasi usaha mikro, side hustle, atau langkah awal membangun bisnis.

Persync memulai analisis dari kondisi pengguna: modal, waktu, keahlian, preferensi kerja, pengalaman menjual, pemahaman pasar, dan target penghasilan. Hasilnya membantu mempersempit pilihan dan menentukan eksperimen awal yang lebih realistis. Hasil analisis bukan jaminan pendapatan, keuntungan, atau keberhasilan bisnis, serta bukan pengganti nasihat hukum, pajak, keuangan, atau nasihat profesional lainnya.

Situs production: [https://persync.vercel.app](https://persync.vercel.app)

## Gambaran proyek

Banyak daftar ide bisnis terlalu luas untuk langsung digunakan. Persync dibuat untuk membantu pengguna mengambil langkah awal yang lebih kecil dan praktis dengan menghubungkan sumber daya, batasan, dan tujuan mereka dengan arah bisnis yang mungkin dicoba.

Produk ini relevan untuk mahasiswa, fresh graduate, karyawan full-time, freelancer, orang yang baru mulai berjualan, serta siapa pun yang ingin menguji usaha kecil dengan waktu atau modal terbatas.

Persync tidak memiliki akun pengguna, tidak memverifikasi permintaan pasar, dan tidak menjalankan bisnis atas nama pengguna. Rekomendasi yang diberikan AI tetap perlu diperiksa berdasarkan calon pelanggan, biaya, aturan yang berlaku, dan kondisi pengguna sendiri.

## Fitur

Fitur yang tersedia saat ini:

- Form profil bisnis yang mencakup situasi kerja, tujuan utama, kisaran modal, waktu yang tersedia, gaya kerja, kepercayaan diri dalam menjual, target penghasilan, pemahaman pasar, serta keahlian atau minat.
- Pilihan kategori keahlian dan minat seperti programming, desain, marketing, sales, content, e-commerce, teaching, food and beverage, dan bidang lainnya.
- Analisis AI dua tahap. Tahap pertama membaca profil komersial dan batasan eksekusi, kemudian tahap kedua menyusun arahan bisnis.
- Hasil analisis yang dapat berisi arah bisnis utama, alternatif, alasan kecocokan, SWOT, jalur penghasilan pertama, langkah validasi awal, action steps, dan risiko.
- Tampilan proses berpikir saat analisis sedang dibuat.
- Riwayat analisis di browser dengan pengelompokan tanggal, penghapusan per sesi, penghapusan melalui data situs browser, dan fitur undo singkat setelah penghapusan.
- Cookie kuota harian bertanda tangan yang membatasi layanan gratis hingga tiga analisis per cakupan cookie browser per hari.
- Halaman publik About, Terms of Service, Privacy Policy, robots.txt, dan sitemap.xml.

## Tech stack dan arsitektur

- Next.js 15.5 dengan App Router dan React 19.
- JavaScript dengan ES modules. Repository ini belum menggunakan TypeScript.
- Tailwind CSS 4 melalui plugin Tailwind PostCSS.
- Google Gemini melalui `@google/genai`.
- Deployment serverless yang disiapkan untuk Vercel.
- Tidak menggunakan database aplikasi.
- Tidak memiliki login, akun pengguna, atau alur autentikasi.

### Alur request

1. Browser memvalidasi field form yang wajib diisi dan mengirim input analisis ke `POST /api/generate`.
2. Server memvalidasi request kembali dan memeriksa cookie HttpOnly bertanda tangan bernama `persync_daily_quota`.
3. Server mengirim input ke Gemini untuk tahap analisis pertama.
4. Hasil tahap pertama dan input awal digunakan untuk membuat request Gemini kedua.
5. Server mengembalikan session dan hasil analisis ke browser, lalu memperbarui cookie kuota.
6. Browser menyimpan session di `localStorage` dan menggunakan ID session untuk route hasil `/chat/[id]`.

Route API memiliki batas waktu maksimum 60 detik untuk fungsi Vercel. Request Gemini dapat dicoba ulang ketika terjadi kegagalan sementara dari provider.

### Penyimpanan dan autentikasi

Aplikasi tidak memiliki database session di server. Riwayat analisis disimpan di browser dengan key localStorage `persync_sessions_history`. Data yang tersimpan mencakup field profil, hasil analisis, ID session, dan timestamp.

Aplikasi tidak memiliki login. Batas harian tidak terhubung dengan identitas pengguna yang terverifikasi. Karena menggunakan cookie browser, browser atau perangkat yang berbeda dapat memiliki status kuota yang berbeda. Menghapus cookie atau data situs juga dapat memengaruhi status kuota lokal.

## Memulai secara lokal

### Prasyarat

- Node.js dan npm yang kompatibel dengan Next.js 15.
- API key Google AI Studio yang memiliki akses ke model Gemini yang digunakan.

### Instalasi dependency

Jalankan dari root repository:

```bash
npm ci
```

Gunakan `npm install` jika memang ingin memperbarui dependency dan lockfile secara sengaja.

### Konfigurasi environment lokal

Salin file contoh lalu edit file lokalnya:

```bash
cp .env.example .env.local
```

Jangan commit `.env.local` atau menaruh secret pada variable yang diawali `NEXT_PUBLIC_`.

### Menjalankan development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

### Build dan menjalankan production secara lokal

```bash
npm run build
npm run start
```

Script production menggunakan port 3000.

## Environment variables

| Variable | Wajib | Fungsi | Default atau panduan |
| --- | --- | --- | --- |
| `GEMINI_API_KEY` | Ya | Credential server-side untuk memanggil Gemini melalui `@google/genai`. | Buat melalui [Google AI Studio](https://aistudio.google.com/). Jangan expose ke browser. |
| `GEMINI_MODEL` | Tidak | Nama model Gemini yang dikirim ke API. | `gemini-2.5-flash` |
| `GEMINI_RETRY_ATTEMPTS` | Tidak | Jumlah percobaan ulang setelah kegagalan Gemini yang dapat dicoba ulang. | `2`, sehingga total maksimal tiga percobaan. |
| `GEMINI_RETRY_BASE_DELAY_MS` | Tidak | Jeda dasar dalam milidetik antar percobaan ulang. | `1200`; jeda meningkat mengikuti nomor percobaan. |
| `QUOTA_SECRET` | Ya | Secret untuk membuat dan memverifikasi cookie kuota harian HMAC-SHA256. | Gunakan nilai acak yang panjang. |
| `JWT_SECRET` | Tidak | Fallback lama yang masih diterima modul kuota jika `QUOTA_SECRET` tidak tersedia. | Gunakan `QUOTA_SECRET` untuk deployment baru. |

`.env.example` hanya berisi nama variable dan placeholder, bukan nilai secret. `NODE_ENV` dikelola oleh runtime. `NEXT_PUBLIC_APP_URL` tidak digunakan oleh implementasi saat ini.

Contoh nama variable tanpa nilai asli:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
QUOTA_SECRET=your_long_random_secret_here
```

## Deployment

Repository ini disiapkan untuk Vercel melalui `vercel.json`. Deploy project dari root repository, yaitu direktori yang berisi `package.json` dan folder `app`.

1. Import repository ke Vercel.
2. Gunakan preset Next.js dan build command `npm run build`.
3. Tambahkan `GEMINI_API_KEY` dan `QUOTA_SECRET` pada Vercel Production environment. Tambahkan variable Gemini opsional hanya jika ingin mengubah default.
4. Gunakan domain production `persync.vercel.app` di Vercel.
5. Pastikan HTTPS aktif. Jika masih ada domain lama atau preview yang perlu diarahkan, atur redirect tersebut di luar kode aplikasi.
6. Periksa halaman production berikut:

   - `https://persync.vercel.app/`
   - `https://persync.vercel.app/about`
   - `https://persync.vercel.app/terms`
   - `https://persync.vercel.app/privacy`
   - `https://persync.vercel.app/robots.txt`
   - `https://persync.vercel.app/sitemap.xml`

7. Jalankan satu analisis terkontrol menggunakan data uji yang tidak sensitif. Pastikan request Gemini, cookie kuota, halaman hasil, dan riwayat browser berjalan sesuai harapan.

Jangan memasukkan API key, quota secret, atau data pengguna ke environment variable publik, source code, screenshot, issue, atau log deployment.

## Privasi dan pengelolaan data

Dokumen utama untuk pengguna adalah [Kebijakan Privasi](https://persync.vercel.app/privacy) dan [Ketentuan Penggunaan](https://persync.vercel.app/terms). Ringkasan berikut menjelaskan implementasi saat ini dan tidak menggantikan kedua dokumen tersebut.

### Informasi yang dikirim

Form analisis mengirim informasi tentang situasi kerja, tujuan, keahlian dan minat, kisaran modal, waktu yang tersedia, gaya kerja, kepercayaan diri dalam menjual, target penghasilan, dan pemahaman pasar. Pengguna sebaiknya tidak mengirim nomor identitas, data kesehatan, data pribadi orang lain, rahasia dagang, atau data keuangan sensitif yang tidak diperlukan.

### Pemrosesan server dan Gemini

Input form dikirim ke backend Persync melalui `/api/generate`. Input tidak hanya berada di perangkat. Backend mengirim input tersebut ke Google Gemini dalam dua request berurutan untuk membuat analisis dan arahan. Gemini adalah layanan pihak ketiga, sehingga pemrosesan dan penyimpanannya juga mengikuti ketentuan Google yang berlaku.

Aplikasi tidak menyimpan session analisis ke database. API mengembalikan session dan hasilnya ke browser, lalu browser menyimpannya secara lokal.

### Penyimpanan di browser

Browser menyimpan riwayat analisis pada localStorage dengan key `persync_sessions_history`. Data akan tetap ada sampai pengguna menghapus session, membersihkan data situs, atau browser menghapusnya. Aplikasi menyediakan penghapusan per session dan jendela undo singkat. Pada perangkat bersama, pengguna lain yang dapat membuka browser mungkin dapat melihat riwayat tersebut.

### Cookie kuota

Server menggunakan cookie HttpOnly bernama `persync_daily_quota`. Payload bertanda tangan cookie mencatat tanggal dan jumlah penggunaan. Cookie ini tidak berisi input form atau hasil analisis. Cookie berlaku 24 jam, menggunakan `SameSite=Lax`, dan memakai `Secure` saat production. Jadwal reset mengikuti konfigurasi waktu layanan.

### Log dan layanan pihak ketiga

Kode mencatat error server dan metadata request Gemini yang gagal atau dicoba ulang melalui `console.error` dan `console.warn`. Log dari provider hosting dapat berisi informasi operasional terkait error. Repository ini tidak menunjukkan integrasi analytics, iklan, atau layanan tracking tambahan. Masa penyimpanan oleh Vercel, Google, atau provider lain mengikuti layanan masing-masing dan tidak ditentukan oleh kode aplikasi ini.

## Keamanan dan batas penggunaan

- API key Gemini hanya dibaca di server melalui `GEMINI_API_KEY`.
- API memvalidasi field string yang wajib dan mewajibkan minimal satu keahlian atau minat.
- Cookie kuota ditandatangani dengan HMAC-SHA256 dan diverifikasi di server menggunakan `QUOTA_SECRET`.
- Batasnya adalah tiga request analisis per cakupan cookie per hari. Ini bukan pembatasan berbasis akun atau identitas.
- Cookie kuota yang tidak valid atau telah diubah akan kembali ke status kuota awal. Pergantian browser, penghapusan cookie, penggunaan beberapa perangkat, dan kondisi client lainnya dapat memengaruhi kuota yang terlihat.
- Kegagalan Gemini sementara dapat dicoba ulang. Kegagalan lain akan dikembalikan sebagai error dan pengguna mungkin perlu mencoba lagi.

Kontrol ini membantu mengurangi penyalahgunaan dasar. Kontrol tersebut bukan jaminan keamanan absolut, verifikasi identitas, atau pencegahan penyalahgunaan secara menyeluruh.

## Keterbatasan AI

Output Persync dibuat oleh model AI eksternal berdasarkan informasi yang diberikan pengguna. Hasilnya dapat keliru, tidak lengkap, terlalu umum, tidak konsisten, atau tidak sesuai dengan pasar dan situasi tertentu. Hasil juga dapat menjadi kurang relevan ketika harga, perilaku pelanggan, peraturan, atau kondisi pasar berubah.

Sebelum mengikuti rekomendasi, periksa permintaan pelanggan, biaya, kebutuhan operasional, aturan yang berlaku, dan risiko keputusan tersebut. Persync tidak menjamin pendapatan, keuntungan, pendanaan, pekerjaan, atau keberhasilan bisnis.

## Ketentuan legal dan disclaimer

Persync menyediakan informasi dan bantuan pengambilan keputusan untuk eksplorasi bisnis. Persync bukan lembaga keuangan, layanan investasi, penasihat hukum, penasihat pajak, atau pengganti layanan profesional lain yang mungkin diperlukan pengguna.

Penggunaan layanan diatur oleh [Ketentuan Penggunaan](https://persync.vercel.app/terms). Pengelolaan informasi dijelaskan dalam [Kebijakan Privasi](https://persync.vercel.app/privacy). README ini tidak mencantumkan nama badan hukum, nomor registrasi, alamat kantor, sertifikasi, atau klaim kepatuhan regulasi karena informasi tersebut tidak tersedia di repository.

## Script dan pemeliharaan

Script yang tersedia di `package.json`:

| Command | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan development server Next.js pada port 3000. |
| `npm run build` | Membuat production build dan menjalankan validasi build Next.js. |
| `npm run start` | Menjalankan aplikasi hasil build pada port 3000. |
| `npm run lint` | Menjalankan ESLint di seluruh repository. |

Saat ini tidak ada script `npm test` dan `npm run typecheck`. Aplikasi menggunakan JavaScript, dan `npm run build` menjalankan pemeriksaan validitas yang disediakan konfigurasi build Next.js.

Pemeliharaan rutin:

1. Install dependency dari lockfile menggunakan `npm ci`.
2. Jalankan `npm run lint` dan `npm run build` sebelum deployment.
3. Tinjau update dependency dengan sengaja dan perbarui `package-lock.json` ketika dependency berubah.
4. Pastikan `.env.local` tidak masuk version control. Rotasi API key Gemini atau quota secret jika ada kemungkinan terekspos.
5. Tinjau kembali Kebijakan Privasi ketika storage, logging, analytics, provider AI, atau perilaku penyimpanan berubah.

## Keterbatasan yang diketahui

- Tidak ada akun pengguna, riwayat analisis di server, sinkronisasi antarperangkat, atau kepemilikan hasil yang diautentikasi.
- Riwayat browser bergantung pada localStorage, sehingga dapat tidak tersedia, terhapus, atau terlihat oleh pengguna lain pada perangkat bersama.
- Batas penggunaan berbasis cookie dan dapat berbeda antar-browser atau perangkat.
- Server memvalidasi field wajib, tetapi belum memiliki moderasi konten komprehensif atau kebijakan panjang input server-side yang mendetail untuk setiap nilai.
- Ketersediaan Gemini, kualitas output, harga, kuota provider, dan retensi provider berada di luar kendali langsung Persync.
- Antarmuka saat ini masih menggunakan bahasa Indonesia, pilihan modal dalam rupiah, dan beberapa asumsi pasar lokal. Copy produk dapat digunakan secara umum, tetapi dukungan penuh untuk negara, mata uang, bahasa, dan konteks pasar lain belum tersedia.
- Belum tersedia script automated test dan type-check TypeScript terpisah.
- Repository ini tidak menjamin indexing production, traffic, uptime, atau kualitas hasil model tertentu.

## Lisensi dan kontak

Kode dalam repository ini menggunakan [BSD 0-Clause License (0BSD)](./LICENSE). Siapa pun bebas menggunakan, menyalin, mengubah, dan mendistribusikan kode ini untuk tujuan apa pun, tanpa kewajiban atribusi. Kode disediakan tanpa jaminan.

Untuk pertanyaan produk, ketentuan penggunaan, atau privasi:

- Email: [hilmanokk09@gmail.com](mailto:hilmanokk09@gmail.com)
- Instagram: [@mnaprd_](https://instagram.com/mnaprd_)
