# Fun Fact Acak

Aplikasi web untuk menampilkan fakta acak edukatif tentang Python, TOEFL, Desain Grafis, dan Bahasa Jepang. Dibuat dengan Next.js 14 (App Router) dan TypeScript.

## Fitur

- **4 kategori**: Python, TOEFL, Desain Grafis, Bahasa Jepang + mode "Campur"
- **AI-powered**: Menggunakan Groq API untuk generate fakta baru
- **Fallback ke data lokal**: Jika API gagal, tampilkan fakta dari dataset seed
- **Simpan favorit**: LocalStorage untuk menyimpan fakta favorit
- **Mode gelap otomatis**: Mendukung prefers-color-scheme
- **Aksesibilitas**: Tab dengan aria-pressed, focus ring yang jelas
- **Responsif**: Tampilan optimal di desktop dan mobile

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **AI Integration**: Groq API (compatible dengan OpenAI)
- **Validation**: Zod
- **Storage**: LocalStorage (client-side only)
- **Deployment**: Vercel

## Setup Local

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd funfactpythonandtoeflmode
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   - Copy `.env.example` ke `.env.local`
   - Dapatkan API key dari [Groq Console](https://console.groq.com)
   - Tambahkan ke `.env.local`:
     ```
     GROQ_API_KEY=your_groq_api_key_here
     GROQ_MODEL=llama-3.3-70b-versatile
     ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000)

5. **Build untuk production**
   ```bash
   npm run build
   npm start
   ```

## Deployment ke Vercel

1. Push kode ke GitHub/GitLab
2. Di [Vercel Dashboard](https://vercel.com), pilih "Add New Project"
3. Import repository
4. Tambahkan environment variables:
   - `GROQ_API_KEY`: Kunci API dari Groq Console
   - `GROQ_MODEL`: `llama-3.3-70b-versatile` (atau model lain yang tersedia)
5. Klik "Deploy"

## Arsitektur

### Struktur Folder
```
funfact-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Halaman utama (client component)
│   ├── globals.css
│   └── api/fact/route.ts     # Route handler untuk Groq API
├── components/
│   ├── FactCard.tsx          # Tampilan kartu fakta
│   ├── CategoryTabs.tsx      # Tab kategori
│   └── Favorites.tsx         # Daftar favorit
├── lib/
│   ├── prompts.ts            # System prompt + subtopik
│   ├── schema.ts             # Zod schema dan types
│   └── storage.ts            # Helper localStorage
├── data/seed-facts.json      # Fakta cadangan (12 fakta)
└── public/
```

### Keamanan API
- `GROQ_API_KEY` hanya dipakai di server-side (`app/api/fact/route.ts`)
- Client hanya mengirim `category` dan `avoid` list, bukan prompt bebas
- Validasi input dengan Zod
- Timeout 20 detik untuk request API

### Data Flow
1. User pilih kategori → klik "Fakta acak"
2. Client POST ke `/api/fact` dengan `{ category, avoid }`
3. Server pilih subtopik random → build prompt → call Groq API
4. Jika sukses: validasi dengan Zod → return fakta
5. Jika gagal: fallback ke `seed-facts.json`

## Kustomisasi

### Menambah Fakta Seed
Edit `data/seed-facts.json` dengan format:
```json
{
  "category": "python" | "toefl" | "design" | "japanese",
  "title": "Judul fakta",
  "body": "Penjelasan singkat",
  "example": "Contoh/kode",
  "result": "Output/terjemahan/efek",
  "why": "Penjelasan mengapa",
  "howTo": ["langkah 1", "langkah 2", "langkah 3"],
  "usage": "Kegunaan praktis"
}
```

### Mengubah Prompt
Edit `lib/prompts.ts`:
- `systemPrompt`: Instruksi umum untuk AI
- `categorySpecificRules`: Aturan khusus per kategori
- Subtopik arrays: Daftar topik untuk variasi

### Warna dan Tema
Edit `tailwind.config.ts` dan `app/globals.css`:
- Warna kategori: Python (#2f5fc0), TOEFL (#b4531f), Design (#9a3fb0), Japanese (#b8324a)
- Mode terang/gelap: CSS variables dengan prefers-color-scheme

## Batasan

### Groq API Rate Limits
- Plan gratis punya batas request per menit/hari
- Aplikasi punya fallback ke seed data
- Tombol punya cooldown 1 detik untuk mencegah spam

### LocalStorage
- Maks 5MB per origin (cukup untuk ratusan favorit)
- Hanya bekerja di client-side (check `typeof window !== 'undefined'`)
- Wrapped dengan try/catch untuk error handling

### Vercel Free Tier
- `maxDuration: 30` di route handler sesuai batas Vercel Hobby
- Cold starts mungkin terjadi jika tidak ada traffic

## Testing

### Manual Testing Checklist
- [ ] Semua kategori berfungsi (termasuk "Campur")
- [ ] Tombol "Fakta acak" bekerja dengan loading state
- [ ] Simpan/hapus favorit berfungsi (persist setelah refresh)
- [ ] Mode gelap/terang otomatis
- [ ] Responsif di mobile
- [ ] Fallback ke seed data saat API gagal (test dengan hapus `GROQ_API_KEY`)
- [ ] Avoid list mencegah pengulangan (lihat "Sudah lihat N fakta")

### Build Verification
```bash
npm run build
# Harus sukses tanpa TypeScript errors
```

## Troubleshooting

### API Error "Groq 429"
- Rate limit tercapai
- Tunggu beberapa menit atau upgrade plan Groq
- Aplikasi otomatis fallback ke seed data

### LocalStorage Tidak Bekerja
- Pastikan tidak di SSR (`useEffect` atau check `typeof window`)
- Cek browser settings (private mode mungkin disable localStorage)
- Try/catch sudah diimplementasi di `lib/storage.ts`

### Build Error
- Pastikan TypeScript version compatible
- Run `npm install` ulang
- Cek `node_modules` permission

## Kontribusi

1. Fork repository
2. Buat branch fitur: `git checkout -b fitur-baru`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push ke branch: `git push origin fitur-baru`
5. Submit pull request

## Lisensi

MIT