import { Category } from "./schema";

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

export function pickCategory(requestedCategory: string): Category {
  if (requestedCategory === "mixed") {
    const categories: Category[] = ["python", "toefl", "design", "japanese", "machinelearning"];
    return categories[Math.floor(Math.random() * categories.length)];
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
  "quote": string (optional, terutama untuk kategori design)
}`;

  const categorySpecificRules = {
    python: "example berisi kode Python pendek (maks 6 baris) yang benar dan bisa dijalankan. result berisi output persisnya. Jangan membahas web atau framework.",
    toefl: "example berisi kalimat bahasa Inggris, result berisi terjemahan Indonesia. Fokus pada kosakata, grammar, atau strategi untuk TOEFL.",
    design: "Fokus pada prinsip desain grafis (komposisi, tipografi, warna, logo, layout cetak). Contoh dari poster, logo, kemasan, kartu nama, sampul buku, majalah, iklan cetak. JANGAN menyebut web, CSS, HTML, aplikasi, atau mobile. example berupa situasi nyata, result berupa efek visualnya. SELALU sertakan quote dari ahli desain terkenal yang relevan dengan prinsip yang dibahas dalam field 'quote'. Contoh ahli: Paul Rand, Massimo Vignelli, Milton Glaser, Saul Bass, Josef Müller-Brockmann, Dieter Rams, etc. Format: 'Kutipan inspiratif tentang prinsip ini' - Nama Ahli (Tahun, jika diketahui).",
    japanese: "Level pemula JLPT N5. example berisi tulisan Jepang asli dengan furigana (hiragana kecil di atas kanji) menggunakan format: [kanji]{hiragana}. Contoh: 私{わたし}は学生{がくせい}です. Baris berikutnya romaji. result berisi arti Indonesia. Gunakan maksimal 2 kanji N5 dan berikan furigana untuk SEMUA kanji. Fokus pada kosakata N5, partikel dasar, dan struktur kalimat sederhana. Contoh topic: sapaan, angka 1-10, makanan, benda di kelas, kata kerja dasar (masu-form).",
    machinelearning: "Fokus pada algoritma machine learning dan konsep data science. Jelaskan kapan algoritma dipakai, kelebihan dan kekurangannya. example bisa berisi pseudocode atau contoh dataset sederhana. result berisi penjelasan output atau insight yang didapat. Sertakan analogi sederhana untuk konsep yang kompleks. Fokus pada pemahaman intuitif bukan matematika detail."
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