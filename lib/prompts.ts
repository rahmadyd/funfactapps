import { CATEGORIES, Category } from "./schema";

export const pythonSubtopics = [
  "string dan slicing",
  "list dan comprehension",
  "dict dan set",
  "fungsi dan argumen",
  "error dan exception",
  "modul standar (collections, itertools, datetime)",
  "f-string dan format",
  "integer dan float",
  "generator dan iterator",
  "file dan path",
  "sifat unik bahasa Python (Zen of Python, sejarah, nama)",
  "trik satu baris yang berguna"
];

export const toeflSubtopics = [
  "kosakata akademik",
  "kata sambung dan transisi",
  "grammar (subject-verb agreement, tenses, article)",
  "kata yang sering tertukar (affect/effect, fewer/less)",
  "paraphrase dan sinonim",
  "strategi Reading",
  "strategi Listening",
  "strategi Speaking",
  "strategi Writing",
  "idiom dan frasa akademik"
];

export const designSubtopics = [
  "hierarki",
  "kontras",
  "proximity",
  "alignment",
  "repetition",
  "balance",
  "emphasis",
  "whitespace",
  "rhythm",
  "skala dan proporsi",
  "grid",
  "tipografi dasar (kerning, tracking, leading)",
  "warna (harmoni, kontras, RGB vs CMYK)",
  "logo (negative space, figure-ground)",
  "Gestalt",
  "komposisi (rule of thirds, golden ratio)"
];

export const japaneseSubtopics = [
  "hiragana (huruf dan pengucapan)",
  "katakana (huruf untuk kata asing)",
  "partikel dasar (wa, ga, o, ni, de)",
  "kata benda sederhana",
  "kata kerja bentuk masu (polite form)",
  "kata kerja bentuk nai (negatif)",
  "kata sifat (i-adjective dan na-adjective)",
  "kata tanya (nani, doko, dare, itsu, ikura)",
  "angka dan waktu (1-10, jam, hari)",
  "sapaan dan ucapan sehari-hari",
  "kosakata makanan dan minuman",
  "kosakata tempat dan arah"
];

export const machinelearningSubtopics = [
  "algoritma klasifikasi",
  "algoritma regresi",
  "algoritma clustering",
  "algoritma recommendation",
  "overfitting dan underfitting",
  "feature engineering",
  "evaluation metrics (accuracy, precision, recall, F1)",
  "cross-validation",
  "hyperparameter tuning",
  "bias-variance tradeoff",
  "regularization techniques",
  "ensemble methods",
  "neural networks basics",
  "dimensionality reduction",
  "anomaly detection"
];

export const reactSubtopics = [
  "useState batching dan asynchronous state update",
  "useEffect dependency array dan cleanup function",
  "key prop pada rendering list dan reconciliation",
  "useMemo dan useCallback: kapan perlu vs prematur",
  "useRef untuk manipulasi DOM dan mutable state tanpa re-render",
  "controlled vs uncontrolled components pada form",
  "custom hooks untuk modularisasi logika bisnis",
  "aturan Hooks (Rules of Hooks & call order)",
  "React.memo dan pencegahan re-render yang tidak perlu",
  "React Server Components (RSC) vs Client Components",
  "lifting state up dan unidirectional data flow",
  "Suspense dan Error Boundaries untuk penanganan loading & error"
];

export const nodejsSubtopics = [
  "Event Loop (Call Stack, Microtask queue, Macrotask queue)",
  "Non-blocking asynchronous I/O vs synchronous execution",
  "Buffer dan Streams untuk hemat memori saat baca/tulis data besar",
  "CommonJS (require) vs ES Modules (import/export)",
  "process.nextTick vs setImmediate timing",
  "fs/promises untuk operasi file async yang bersih",
  "Worker Threads vs Cluster module untuk CPU-heavy task",
  "Environment variables (process.env) dan pengelolaan secret",
  "Error handling async/await dan uncaughtException / unhandledRejection",
  "NPM semantic versioning (tilde ~ vs caret ^)",
  "Event Emitter pattern dan arsitektur decoupled"
];

export const sqlSubtopics = [
  "INNER JOIN vs LEFT JOIN vs FULL OUTER JOIN",
  "Indexing B-Tree dan cara mempercepat WHERE/ORDER BY",
  "GROUP BY dan perbedaan HAVING vs WHERE",
  "Prinsip ACID (Atomicity, Consistency, Isolation, Durability)",
  "Database Transactions (BEGIN, COMMIT, ROLLBACK)",
  "Tiga nilai logika NULL (TRUE, FALSE, UNKNOWN) dan IS NULL",
  "Primary Key vs Foreign Key dan cascade delete/update",
  "Window Functions (ROW_NUMBER, RANK, DENSE_RANK)",
  "EXPLAIN ANALYZE untuk membaca Query Execution Plan",
  "Bahaya deep pagination (OFFSET besar) vs Keyset/Cursor pagination",
  "Normalisasi data (1NF, 2NF, 3NF) vs Denormalisasi untuk performa"
];

export const nosqlSubtopics = [
  "Document DB (MongoDB) vs Key-Value (Redis) vs Wide-Column (Cassandra)",
  "CAP Theorem (Consistency, Availability, Partition Tolerance)",
  "Embedding (nested document) vs Referencing di MongoDB",
  "Aggregation Pipeline ($match, $group, $project, $lookup)",
  "Redis caching, TTL (Time-To-Live), dan tipe data in-memory",
  "Eventual Consistency vs Strong Consistency",
  "Sharding dan Horizontal Scaling vs Vertical Scaling",
  "Schema-less flexibility vs resiko validasi data aplikasi",
  "TTL Indexes untuk otomatis hapus session atau temporary log",
  "ACID vs BASE (Basically Available, Soft state, Eventual consistency)"
];

export const excelSubtopics = [
  "XLOOKUP vs VLOOKUP (kenapa XLOOKUP jauh lebih aman & fleksibel)",
  "INDEX + MATCH untuk lookup 2 arah dan pencarian dinamis",
  "SUMIFS dan COUNTIFS untuk rekap laporan keuangan multi-kriteria",
  "Flash Fill (Ctrl + E) untuk pisah nama/data tanpa rumus dalam 1 detik",
  "AutoSum cepat (Alt + =) untuk jumlahkan tabel instan",
  "Conditional Formatting otomatis untuk deadline jatuh tempo & stok tipis",
  "Data Validation dropdown agar user tidak salah ketik data",
  "IFERROR untuk sembunyikan error #N/A atau #DIV/0! di invoice",
  "Absolute reference ($A$1) vs Relative reference saat copy formula",
  "TEXTSPLIT, TEXTJOIN, dan CONCAT untuk manipulasi teks admin",
  "Pivot Table & Slicer untuk ringkasan laporan omset sekejap"
];

export const ieltsSubtopics = [
  "Band 7+ Academic Collocations & Vocabulary",
  "Writing Task 1: Ragam kosakata tren grafik (plummet, surge, plateau)",
  "Writing Task 2: Struktur esai efektif (PEEL paragraph method)",
  "Writing Task 2: Menghindari overgeneralization (tentative language / hedging)",
  "Speaking Part 1 & 2: Natural fillers dan idiomatic expressions",
  "Speaking Part 3: Mengembangkan argumen abstrak (Explain, Example, Consequence)",
  "Reading: Trik membedakan FALSE vs NOT GIVEN",
  "Listening: Waspada terhadap distractor (perubahan info mendadak)",
  "Signposting & Cohesive Devices (Furthermore, Conversely, In contrast)",
  "Grammar: Menggunakan Inversion dan Conditional Clauses untuk Band 8+"
];

export const affirmationSubtopics = [
  "Mengatasi Impostor Syndrome (merasa tidak cukup pintar)",
  "Memulai hari tanpa rasa cemas dan overwhelmed",
  "Menerima kesalahan kode/tugas sebagai proses iterasi belajar",
  "Berani mengutarakan ide dan bertanya tanpa takut dihakimi",
  "Growth Mindset: 'Belum bisa' bukan berarti 'tidak mampu'",
  "Detoks perbandingan diri dengan pencapaian orang lain di medsos",
  "Stoic Control: Fokus hanya pada usaha dan respon pribadimu",
  "Merayakan Small Wins harian untuk menjaga motivasi belajar",
  "Menghargai istirahat dan batasan diri tanpa rasa bersalah",
  "Kepercayaan diri saat menghadapi wawancara kerja dan tantangan baru"
];

export function pickCategory(requestedCategory: string): Category {
  if (requestedCategory === "mixed") {
    return CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  }
  return requestedCategory as Category;
}

export function getRandomSubtopic(category: Category): string {
  switch (category) {
    case "python":
      return pythonSubtopics[Math.floor(Math.random() * pythonSubtopics.length)];
    case "toefl":
      return toeflSubtopics[Math.floor(Math.random() * toeflSubtopics.length)];
    case "design":
      return designSubtopics[Math.floor(Math.random() * designSubtopics.length)];
    case "japanese":
      return japaneseSubtopics[Math.floor(Math.random() * japaneseSubtopics.length)];
    case "machinelearning":
      return machinelearningSubtopics[Math.floor(Math.random() * machinelearningSubtopics.length)];
    case "react":
      return reactSubtopics[Math.floor(Math.random() * reactSubtopics.length)];
    case "nodejs":
      return nodejsSubtopics[Math.floor(Math.random() * nodejsSubtopics.length)];
    case "sql":
      return sqlSubtopics[Math.floor(Math.random() * sqlSubtopics.length)];
    case "nosql":
      return nosqlSubtopics[Math.floor(Math.random() * nosqlSubtopics.length)];
    case "excel":
      return excelSubtopics[Math.floor(Math.random() * excelSubtopics.length)];
    case "ielts":
      return ieltsSubtopics[Math.floor(Math.random() * ieltsSubtopics.length)];
    case "affirmation":
      return affirmationSubtopics[Math.floor(Math.random() * affirmationSubtopics.length)];
  }
}

export function buildMessages(category: Category, avoid: string[] = []) {
  const subtopic = getRandomSubtopic(category);
  
  const systemPrompt = `Kamu adalah pembuat funfact edukatif untuk orang Indonesia yang sedang belajar santai dan mulai jenuh dengan belajar runut.
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
  "usage": string,
  "quote": string (optional, terutama untuk kategori design & affirmation)
}`;

  const categorySpecificRules: Record<Category, string> = {
    python: "example berisi kode Python pendek (maks 6 baris) yang benar dan bisa dijalankan. result berisi output persisnya. Jangan membahas web atau framework.",
    toefl: "example berisi kalimat bahasa Inggris, result berisi terjemahan Indonesia. Fokus pada kosakata, grammar, atau strategi untuk TOEFL.",
    design: "Fokus pada prinsip desain grafis (komposisi, tipografi, warna, logo, layout cetak). Contoh dari poster, logo, kemasan, kartu nama, sampul buku, majalah, iklan cetak. JANGAN menyebut web, CSS, HTML, aplikasi, atau mobile. example berupa situasi nyata, result berupa efek visualnya. SELALU sertakan quote dari ahli desain terkenal yang relevan dengan prinsip yang dibahas dalam field 'quote'. Contoh ahli: Paul Rand, Massimo Vignelli, Milton Glaser, Saul Bass, Josef Müller-Brockmann, Dieter Rams, etc. Format: 'Kutipan inspiratif tentang prinsip ini' - Nama Ahli (Tahun, jika diketahui).",
    japanese: "Level pemula JLPT N5. example berisi tulisan Jepang asli dengan furigana (hiragana kecil di atas kanji) menggunakan format: [kanji]{hiragana}. Contoh: 私{わたし}は学生{がくせい}です. Baris berikutnya romaji. result berisi arti Indonesia. Gunakan maksimal 2 kanji N5 dan berikan furigana untuk SEMUA kanji. Fokus pada kosakata N5, partikel dasar, dan struktur kalimat sederhana. Contoh topic: sapaan, angka 1-10, makanan, benda di kelas, kata kerja dasar (masu-form).",
    machinelearning: "Fokus pada algoritma machine learning dan konsep data science. Jelaskan kapan algoritma dipakai, kelebihan dan kekurangannya. example bisa berisi pseudocode atau contoh dataset sederhana. result berisi penjelasan output atau insight yang didapat. Sertakan analogi sederhana untuk konsep yang kompleks. Fokus pada pemahaman intuitif bukan matematika detail.",
    react: "example berisi kode komponen atau hook React/JSX ringkas (maks 6 baris) yang bersih dan tepat. result berisi output render atau perilaku komponennya. Fokus pada konsep esensial seperti state, hooks, rendering, dan props.",
    nodejs: "example berisi kode Node.js / JavaScript runtime pendek (maks 6 baris). result berisi output console atau hasil eksekusinya. Fokus pada arsitektur backend, event loop, file system, atau async I/O.",
    sql: "example berisi query SQL pendek (maks 5-6 baris) yang terstruktur rapi. result berisi tabel hasil ringkas atau penjelasan output data. Fokus pada manipulasi data, indexing, join, atau konsep database relasional.",
    nosql: "example berisi query MongoDB/Redis atau struktur dokumen JSON pendek (maks 6 baris). result berisi output data atau perilaku penyimpanan. Jelaskan kenapa pendekatan NoSQL cocok untuk skenario tersebut.",
    excel: "Fokus pada tips & rumus produktivitas admin kantor/keuangan. example berisi contoh rumus Excel konkret (misal: =XLOOKUP(...), =SUMIFS(...)) beserta skenario datanya. result berisi nilai sel atau hasil yang keluar. Sertakan tips shortcut keyboard jika relevan.",
    ielts: "Fokus pada persiapan tes IELTS (Band 7+). example berupa kalimat bahasa Inggris akademis atau perbandingan Band 6 vs Band 8+. result berisi arti Indonesia dan analisa mengapa ungkapan tersebut bernilai tinggi. Sertakan tips trik praktis untuk Listening, Reading, Writing, atau Speaking.",
    affirmation: "Fokus pada penguatan mental, percaya diri, dan motivasi belajar/karir. example berisi kalimat afirmasi positif yang powerful dan realistis (bukan toxic positivity). result berisi dampak psikologis / perubahan pola pikir yang didapat. SELALU sertakan kutipan motivasi yang relevan di field 'quote' dari tokoh inspiratif (penulis, filsuf, psikolog, atau praktisi ternama)."
  };

  const avoidText = avoid.length > 0 ? avoid.join("; ") : "tidak ada";
  
  const userMessage = `Kategori: ${category}
Subtopik: ${subtopic}
Hindari fakta dengan judul berikut: ${avoidText}

${categorySpecificRules[category]}`;

  return [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: userMessage }
  ];
}