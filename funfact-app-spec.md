# Spesifikasi Proyek: Funfact Random (Python, TOEFL, Desain Grafis, Bahasa Jepang)

Dokumen ini adalah brief lengkap untuk membangun aplikasi web funfact acak. Berikan seluruh isinya ke AI coding tool (Cursor, Claude Code, Windsurf, dll.) atau gunakan sebagai panduan sendiri.

## 1. Ringkasan

Aplikasi satu halaman. Pengguna menekan tombol **Fakta acak**, lalu AI (lewat Groq API) membuat satu fakta baru sesuai kategori yang dipilih. Tidak ada login, tidak ada database. Tujuannya belajar santai: lihat dulu, penasaran, baru paham.

- **Kategori:** Python, TOEFL, Desain Grafis, Bahasa Jepang, plus mode "Campur".
- **Tiap fakta berisi:** fakta, contoh, hasil/artinya, kenapa bisa begitu, cara pakainya (langkah), dan dipakai buat apa.
- **Bahasa antarmuka dan isi:** Bahasa Indonesia.

## 2. Tech stack

| Bagian | Pilihan |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS atau CSS biasa (bebas) |
| AI | Groq API (endpoint kompatibel OpenAI) |
| Validasi | zod |
| Penyimpanan | `localStorage` di browser saja (favorit, riwayat lihat) |
| Deploy | Vercel |

Tidak memakai database, auth, atau penyimpanan server.

## 3. Arsitektur

```
Browser  --POST /api/fact {category}-->  Route Handler (server)  --> Groq API
Browser  <--JSON fakta--------------     (kunci API hanya di server)
```

Aturan penting:

1. **`GROQ_API_KEY` hanya dipakai di server.** Jangan pernah memakai awalan `NEXT_PUBLIC_` dan jangan memanggil Groq langsung dari browser.
2. **Client tidak boleh mengirim prompt bebas.** Client hanya mengirim `category` (daftar terbatas) dan `avoid` (daftar judul yang sudah tampil). Prompt dirakit di server. Ini mencegah orang menyalahgunakan endpoint-mu sebagai chatbot gratis.
3. Kalau Groq gagal atau terkena rate limit, tampilkan **fakta cadangan** dari file lokal `data/seed-facts.json`.

## 4. Struktur folder

```
funfact-app/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx              # halaman utama (client component)
│  ├─ globals.css
│  └─ api/fact/route.ts     # panggil Groq
├─ components/
│  ├─ FactCard.tsx
│  ├─ CategoryTabs.tsx
│  └─ Favorites.tsx
├─ lib/
│  ├─ prompts.ts            # system prompt + daftar subtopik per kategori
│  ├─ schema.ts             # zod schema Fact
│  └─ storage.ts            # helper localStorage (try/catch)
├─ data/seed-facts.json     # fakta cadangan (minimal 3 per kategori)
├─ .env.local               # tidak di-commit
└─ .env.example
```

## 5. Environment variables

`.env.example`:

```
GROQ_API_KEY=isi_dengan_kunci_dari_console.groq.com
GROQ_MODEL=llama-3.3-70b-versatile
```

Nama model bisa berubah. Cek daftar model terbaru di `https://console.groq.com/docs/models` dan sesuaikan `GROQ_MODEL` lewat env var, jangan di-hardcode di kode.

## 6. Bentuk data

### Fact (respons dari API)

```ts
type Category = "python" | "toefl" | "design" | "japanese";

type Fact = {
  category: Category;
  title: string;          // judul fakta, maks ~80 karakter
  body: string;           // penjelasan singkat, 1-3 kalimat
  example: string;        // kode / kalimat / ilustrasi kasus (boleh multi-baris)
  result: string;         // output kode / terjemahan / efek visual
  why: string;            // kenapa bisa begini, 1-3 kalimat
  howTo: string[];        // 3-4 langkah singkat
  usage: string;          // dipakai buat apa di dunia nyata
};
```

### Request ke `/api/fact`

```json
{ "category": "python" | "toefl" | "design" | "japanese" | "mixed", "avoid": ["judul lama 1", "judul lama 2"] }
```

`avoid` diisi maksimal 15 judul terakhir yang sudah dilihat pengguna.

### Respons

```json
{ "fact": { ...Fact }, "source": "ai" | "seed" }
```

Jika kategori `mixed`, server memilih salah satu dari empat kategori secara acak.

## 7. Cara membuat hasilnya beragam

LLM cenderung mengulang topik yang itu-itu saja kalau hanya diminta "buat fakta acak". Solusinya:

1. Simpan **daftar subtopik** per kategori di `lib/prompts.ts` (contoh di bawah).
2. Di server, pilih satu subtopik **secara acak** setiap request, lalu masukkan ke prompt: "Topik fakta ini: {subtopik}".
3. Kirim daftar `avoid` ke prompt supaya tidak mengulang.
4. Pakai `temperature` sekitar 0.8 sampai 1.0.

### Contoh daftar subtopik

**python:** string dan slicing, list dan comprehension, dict dan set, fungsi dan argumen, error dan exception, modul standar (collections, itertools, datetime), f-string dan format, integer dan float, generator dan iterator, file dan path, sifat unik bahasa Python (Zen of Python, sejarah, nama), trik satu baris yang berguna.

**toefl:** kosakata akademik, kata sambung dan transisi, grammar (subject-verb agreement, tenses, article), kata yang sering tertukar (affect/effect, fewer/less), paraphrase dan sinonim, strategi Reading, strategi Listening, strategi Speaking, strategi Writing, idiom dan frasa akademik.

**design:** hierarki, kontras, proximity, alignment, repetition, balance, emphasis, whitespace, rhythm, skala dan proporsi, grid, tipografi dasar (kerning, tracking, leading), warna (harmoni, kontras, RGB vs CMYK), logo (negative space, figure-ground), Gestalt, komposisi (rule of thirds, golden ratio). **Khusus prinsip desain grafis, bukan desain web, aplikasi mobile, atau CSS.**

**japanese:** hiragana, katakana, kanji (asal gambar), partikel dasar, urutan kalimat, bentuk sopan vs santai, counter (penghitung), kosakata sehari-hari, sapaan dan ucapan, kata serapan, budaya yang berkaitan dengan bahasa, kesalahan umum pemula Indonesia.

## 8. Prompt template (server)

### System prompt dasar

```
Kamu adalah pembuat funfact edukatif untuk orang Indonesia yang sedang belajar santai dan mulai jenuh dengan belajar runut.
Tulis dalam Bahasa Indonesia yang ringan dan ramah.

Aturan:
- Buat SATU fakta saja, sesuai kategori dan subtopik yang diberikan.
- Fakta harus akurat. Kalau tidak yakin, pilih fakta lain yang lebih pasti. Jangan mengarang angka, tanggal, atau nama.
- Jangan mengulang fakta yang ada di daftar "hindari".
- Jelaskan sederhana, pemula boleh belum paham konsep dasarnya.
- Selalu sertakan contoh konkret dan penerapannya di dunia nyata.
- Balas HANYA dengan JSON valid sesuai skema, tanpa teks lain, tanpa markdown.

Skema JSON:
{
  "title": string,
  "body": string,
  "example": string,
  "result": string,
  "why": string,
  "howTo": [string, string, string],
  "usage": string
}
```

### Tambahan per kategori

- **python:** `example` berisi kode Python pendek (maks 6 baris) yang benar dan bisa dijalankan. `result` berisi output persisnya. Jangan membahas web atau framework.
- **toefl:** `example` berisi kalimat bahasa Inggris, `result` berisi terjemahan Indonesia. Fokus pada kosakata, grammar, atau strategi untuk TOEFL.
- **design:** Fokus pada **prinsip desain grafis** (komposisi, tipografi, warna, logo, layout cetak). Contoh dari poster, logo, kemasan, kartu nama, sampul buku, majalah, iklan cetak. **Jangan menyebut web, CSS, HTML, aplikasi, atau mobile.** `example` berupa situasi nyata, `result` berupa efek visualnya.
- **japanese:** Level pemula (JLPT N5). `example` berisi tulisan Jepang asli, baris berikutnya romaji. `result` berisi arti Indonesia. Pastikan tulisan dan romaji konsisten dan benar.

### User message

```
Kategori: {category}
Subtopik: {subtopic}
Hindari fakta dengan judul berikut: {avoid.join("; ") atau "tidak ada"}
```

## 9. Route handler (kerangka)

`app/api/fact/route.ts`:

```ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { buildMessages, pickCategory } from "@/lib/prompts";
import { FactSchema } from "@/lib/schema";
import seed from "@/data/seed-facts.json";

export const maxDuration = 30; // cek batas durasi plan Vercel kamu

const ReqSchema = z.object({
  category: z.enum(["python", "toefl", "design", "japanese", "mixed"]),
  avoid: z.array(z.string().max(120)).max(15).default([]),
});

export async function POST(req: Request) {
  const parsed = ReqSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Request tidak valid" }, { status: 400 });
  }
  const { category, avoid } = parsed.data;
  const cat = pickCategory(category); // jika "mixed", pilih acak

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL,
        messages: buildMessages(cat, avoid),
        temperature: 0.9,
        max_tokens: 900,
        response_format: { type: "json_object" },
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) throw new Error(`Groq ${res.status}`);

    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content ?? "";
    const fact = FactSchema.parse({ ...JSON.parse(raw), category: cat });
    return NextResponse.json({ fact, source: "ai" });
  } catch {
    const pool = (seed as any[]).filter((f) => f.category === cat);
    const fact = pool[Math.floor(Math.random() * pool.length)];
    return NextResponse.json({ fact, source: "seed" });
  }
}
```

Catatan untuk implementasi:
- Kalau `JSON.parse` atau validasi zod gagal, coba **sekali lagi** sebelum jatuh ke fakta cadangan.
- Jangan log kunci API atau isi header.
- Batasi `max_tokens` supaya biaya dan latensi terjaga.

## 10. Spesifikasi UI

### Halaman utama

1. Judul dan subjudul singkat: "Belum ngerti nggak apa-apa. Baca, penasaran, nanti nyambung sendiri."
2. **Tab kategori:** ✨ Campur, 🐍 Python, 📘 TOEFL, 🎨 Desain Grafis, 🌸 Bahasa Jepang.
3. **Kartu fakta** berisi, berurutan: badge kategori, judul, penjelasan, **Contoh**, **Hasil/Artinya/Efeknya**, **Kenapa bisa begini?**, **Cara pakainya** (daftar bernomor), **Dipakai buat apa?**.
4. Dua tombol: **☆ Simpan** dan **Fakta acak →**.
5. Teks kecil: "Sudah lihat N fakta".
6. Daftar **fakta tersimpan** di bawah. Klik untuk menampilkan ulang (simpan seluruh objek fakta di `localStorage`, bukan hanya id).
7. Catatan kecil di bawah kartu: "Dibuat AI, jadi cek ulang kalau mau dipakai serius."

### Status

- **Loading:** kartu dengan skeleton lembut dan tombol dinonaktifkan.
- **Error atau fallback:** tampilkan fakta cadangan dan label kecil "Fakta cadangan (AI sedang sibuk)".

### Nuansa visual (nyaman di mata)

- Latar krem hangat `#f6f3ee`, kartu `#fffdf9`, teks `#2f3338` (bukan hitam pekat).
- Mode gelap otomatis (`prefers-color-scheme`), warna cokelat-abu hangat `#1d1c1b`, kartu `#262523`, teks `#e6e2da`.
- Aksen per kategori (pastel, kontras tetap cukup untuk dibaca): Python biru `#2f5fc0`, TOEFL oranye bata `#b4531f`, Desain ungu `#9a3fb0`, Jepang merah sakura `#b8324a`.
- Kartu dengan garis atas warna aksen, sudut membulat (18px), bayangan tipis.
- Ukuran teks dasar 17px, line-height 1.75, lebar maksimum konten 620px.
- Animasi fade 0.35 detik saat ganti fakta. Matikan jika `prefers-reduced-motion`.
- Kotak kode: `white-space: pre-wrap`, font mono, latar sedikit lebih gelap dari kartu.

### Aksesibilitas

- Tab memakai `aria-pressed`, tombol punya focus ring yang jelas.
- Tampilan nyaman di layar ponsel (satu kolom, tombol cukup besar).

## 11. Penyimpanan lokal (tanpa database)

Gunakan `localStorage` dengan kunci:

- `ff-favs`: array objek `Fact` yang disimpan.
- `ff-recent`: array judul (maks 30) untuk dikirim sebagai `avoid` dan menghitung "sudah lihat".

Bungkus semua pembacaan dan penulisan dengan `try/catch`, dan pastikan aplikasi tetap jalan kalau penyimpanan tidak tersedia. Akses `localStorage` hanya di client (hindari error SSR).

## 12. Deploy ke Vercel

1. Push proyek ke GitHub (pastikan `.env.local` ada di `.gitignore`).
2. Di vercel.com, **Add New → Project**, impor repo.
3. Di **Settings → Environment Variables**, tambahkan `GROQ_API_KEY` dan `GROQ_MODEL`.
4. Klik **Deploy**. Setelah mengubah env var, lakukan redeploy.
5. Uji di URL produksi: tiap kategori, mode Campur, dan kondisi AI gagal (hapus sementara kunci untuk menguji fakta cadangan).

Catatan:
- Batas durasi fungsi dan kuota gratis Vercel bisa berubah. Cek dokumentasi Vercel dan sesuaikan `maxDuration`.
- Plan gratis Groq punya batas request per menit dan per hari. Cek di `console.groq.com`. Karena itu fakta cadangan dan jeda tombol (misalnya 1 detik antar klik) penting.
- Untuk membatasi penyalahgunaan, bisa tambahkan **Vercel WAF/Rate Limiting** atau jeda sisi client. Rate limit di memori server kurang andal di serverless karena instance bisa berganti.

## 13. Urutan pengerjaan (milestone)

1. Setup Next.js + TypeScript, halaman statis dengan satu fakta dari `seed-facts.json`.
2. Tab kategori, tombol acak (dari seed), tampilan kartu lengkap.
3. Favorit dan riwayat dengan `localStorage`.
4. Route handler `/api/fact` + integrasi Groq + validasi zod + fallback.
5. Subtopik acak dan daftar `avoid` supaya hasil beragam.
6. Poles tampilan (mode gelap, animasi, loading, error state).
7. Deploy ke Vercel dan uji.

## 14. Kriteria selesai

- [ ] Tombol **Fakta acak** menghasilkan fakta baru yang lengkap di semua kategori.
- [ ] Fakta tidak berulang dalam satu sesi (`avoid` bekerja).
- [ ] Kategori Desain tidak membahas web, CSS, atau mobile.
- [ ] Contoh Python benar dan hasilnya sesuai. Tulisan dan romaji Jepang konsisten.
- [ ] Jika Groq gagal, fakta cadangan muncul dan aplikasi tidak error.
- [ ] Kunci API tidak muncul di kode client, repo, maupun Network tab browser.
- [ ] Favorit tetap ada setelah refresh.
- [ ] Nyaman dibaca di layar ponsel, mode terang dan gelap.

## 15. Contoh bentuk `seed-facts.json`

Buat minimal 3 fakta per kategori dengan bentuk yang sama:

```json
[
  {
    "category": "python",
    "title": "0.1 + 0.2 itu bukan 0.3",
    "body": "Komputer menyimpan desimal dalam biner, jadi sebagian pecahan tidak bisa tepat.",
    "example": "print(0.1 + 0.2)\nprint(0.1 + 0.2 == 0.3)",
    "result": "0.30000000000000004\nFalse",
    "why": "Seperti 1/3 yang tak berujung di desimal, 0.1 juga berulang tak berujung di biner.",
    "howTo": [
      "Untuk uang, pakai modul decimal",
      "Tulis angka sebagai teks: Decimal(\"0.1\")",
      "Bandingkan float dengan math.isclose"
    ],
    "usage": "Menghitung total di kasir atau invoice supaya tidak meleset."
  },
  {
    "category": "japanese",
    "title": "Kata kerja selalu di akhir kalimat",
    "body": "Urutan kalimat Jepang adalah subjek, objek, lalu kata kerja.",
    "example": "私はりんごを食べます\nWatashi wa ringo o tabemasu",
    "result": "Saya makan apel.",
    "why": "Partikel menandai peran kata, jadi kata kerja bisa diletakkan di akhir tanpa membingungkan.",
    "howTo": [
      "Cari kata kerja di akhir kalimat",
      "Cari partikel: は topik, を objek",
      "Hubungkan topik, objek, lalu kata kerja"
    ],
    "usage": "Menyusun kalimat sendiri dengan mulai dari kata kerja yang diinginkan."
  }
]
```

## 16. Prompt awal untuk AI coding tool

Salin ke tool-mu bersama dokumen ini:

> Bangun aplikasi sesuai dokumen spesifikasi ini, mengikuti urutan milestone. Mulai dari milestone 1 dan berhenti setelah tiap milestone supaya aku bisa menguji. Gunakan Next.js App Router + TypeScript. Jangan memakai database. Kunci Groq hanya boleh di server lewat environment variable. Jelaskan singkat apa yang kamu ubah di setiap langkah.
