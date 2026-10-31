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

export const linuxSubtopics = [
  "Perintah navigasi & manipulasi file (find, grep, xargs, rsync)",
  "Permission file & folder (chmod angka oktal, chown, umask)",
  "Piping dan redirection (| , >, >>, 2>&1, /dev/null)",
  "Manajemen proses & monitoring (htop, ps aux, kill -9, killall, nice)",
  "Systemd & service management (systemctl status/restart, journalctl -u)",
  "Manajemen disk & storage (df -h, du -sh, ncdu, mount)",
  "Trik terminal praktis (sudo !!, Ctrl+R reverse search, alias kustom)",
  "Networking dasar (curl, wget, netstat, ss -tulpn, ping, traceroute)",
  "SSH & Otentikasi (ssh-keygen, authorized_keys, config file host)",
  "Cron jobs untuk jadwal otomatis (crontab -e, format menit-jam-hari)",
  "Environment variables (export PATH, /etc/environment, ~/.bashrc)",
  "Arsip & kompresi (tar -czvf, tar -xzvf, gzip)"
];

export const gitSubtopics = [
  "Git Rebase vs Git Merge (kapan linear history diperlukan)",
  "Git Reflog: penyelamat commit, branch, atau reset yang terhapus",
  "Git Cherry-Pick untuk comot commit spesifik antar branch",
  "Git Stash: simpan kerjaan sementara tanpa commit (stash pop/apply)",
  "Git Commit Amend: revisi pesan commit terakhir & tambah file kelupaan",
  "Git Reset (--soft vs --mixed vs --hard): perbedaan dampaknya",
  "Git Bisect: pelacak otomatis commit penyebab bug dengan binary search",
  "Conventional Commits (feat, fix, chore, breaking change) & SemVer",
  "Trik .gitignore dan cara untrack file yang terlanjur ter-commit",
  "GitHub Pull Request: Draft PR, Review Suggestion, & Squash Merge",
  "Resolusi Merge Conflict yang rapi tanpa panik",
  "Git Worktree: checkout banyak branch sekaligus di folder terpisah"
];

export const cicdSubtopics = [
  "Konsep dasar CI vs CD: Continuous Integration vs Continuous Delivery/Deployment",
  "GitHub Actions Workflow: triggers (push, pull_request, workflow_dispatch)",
  "Caching dependencies (npm/yarn/pip) untuk memangkas waktu build pipeline",
  "Matrix Builds: uji aplikasi serentak di berbagai versi runtime dan OS",
  "Pengelolaan Secrets & Environment Variables aman di pipeline",
  "Automated Testing & Coverage check sebagai syarat lolos status check",
  "Linting, Type Check, & formatting otomatis di pull request",
  "Artifact upload & download (folder build dist, test reports)",
  "Strategi Deployment: Blue-Green vs Canary vs Rolling Updates",
  "Otomatisasi rilis & changelog dengan GitHub Releases & SemVer",
  "Docker Image Build & Push ke Container Registry (GHCR/Docker Hub) di CI",
  "Rollback otomatis saat deployment staging/production gagal"
];

export const dockerSubtopics = [
  "Container vs Virtual Machine: isolasi kernel vs OS penuh",
  "Dockerfile instructions: perbedaan RUN vs CMD vs ENTRYPOINT",
  "Multi-stage builds untuk pangkas ukuran image dari ratusan MB ke <50MB",
  "Layer Caching: kenapa urutan COPY package.json harus sebelum COPY .",
  "Docker Compose: orkestrasi multi-container (web + redis + postgres)",
  "Bind Mounts vs Named Volumes untuk persistensi data database",
  "Port Mapping (-p host_port:container_port) vs EXPOSE",
  "Container Networking (bridge network, isolated network, inter-container DNS)",
  "Minimal base image: Alpine Linux vs Debian-Slim vs Distroless",
  "Docker hygiene: docker system prune, image dangling, dan hemat disk",
  "Pengelolaan file sensitif: .dockerignore dan BuildKit Secrets",
  "Healthcheck instruction untuk pantau kesiapan container otomatis"
];

export const tailwindSubtopics = [
  "Filosofi Utility-First: kenapa bukan inline style dan anti class bloat",
  "Arbitrary Values [value]: custom spacing, colors, dan calc() instan",
  "Modifier State & Pseudo-class (hover, focus-visible, active, disabled)",
  "Parent & Sibling States (group-hover, peer-checked, group-focus)",
  "Responsive Design: mobile-first breakpoint (sm, md, lg, xl, 2xl)",
  "Dark Mode strategy: selector class vs system media query",
  "Container Queries (@container, @md, @lg) untuk komponen modular",
  "Grid & Flexbox modern utilities (gap, place-items, col-span)",
  "Tipografi & @tailwindcss/typography plugin (prose class)",
  "Kapan memakai @apply vs kapan @apply menjadi anti-pattern",
  "Tailwind JIT engine: zero-config engine & optimasi build instant",
  "Gradient, backdrop-blur, dan Glassmorphism utilities"
];

export const publicspeakingSubtopics = [
  "Cara Menolak Permintaan Atasan/Orang Penting Tanpa Terkesan Membangkang (Diplomatic Cushion)",
  "Cara Menjawab Spontan saat Ditodong Bicara Mendadak di Depan Rapat (Metode Jam 3 Arah / PREP)",
  "Cara Bicara Diplomatis saat Menegur atau Tidak Sependapat dengan Pimpinan Tanpa Emosional",
  "Cara Menghilangkan Gagap dan Kebiasaan 'Eee... / Ummm...' saat Berbicara (The 2-Second Lock)",
  "Cara Mengatasi Otak Blank / Lupa Materi di Tengah Panggung atau Rapat Tanpa Panik",
  "Cara Menyampaikan Kabar Buruk atau Kesalahan Kerja ke Klien Besar Secara Solutif & Berwibawa",
  "Cara Negosiasi Gaji atau Anggaran Menggunakan Teknik Calibrated Questions (Kata Apa & Bagaimana)",
  "Cara Menghadapi Orang Penting yang Sedang Emosi / Skeptis dengan Validasi Emosional Taktis",
  "Cara Menghindari Jebakan 'Terlalu Banyak Minta Maaf' yang Bikin Kamu Terlihat Lemah & Ragu",
  "Cara Mengatur Tempo dan Intonasi Suara Berat (Chest Voice) Agar Tidak Cempreng atau Gugup",
  "Cara Membuka Presentasi atau Obrolan dalam 15 Detik Pertama Agar Orang Penting Langsung Menyimak",
  "Cara Membelokkan Pertanyaan Menjebak atau Bersifat Menyerang Menggunakan Bridging Technique"
];

export const javascriptSubtopics = [
  "closures dan lexical scope",
  "hoisting (var, let, const, function)",
  "Promise, async/await, dan event loop",
  "destructuring (object \u0026 array)",
  "arrow functions vs regular functions (this binding)",
  "Array methods (map, filter, reduce, find)",
  "template literals dan tagged templates",
  "optional chaining (?.) dan nullish coalescing (??)",
  "spread operator dan rest parameters",
  "TypeScript basics (type, interface, generics)",
  "modules (import/export, default vs named)",
  "error handling (try/catch, custom errors)"
];

export const htmlcssSubtopics = [
  "semantic HTML (header, main, nav, article, section)",
  "Flexbox layout (justify-content, align-items, gap)",
  "CSS Grid (grid-template, fr unit, auto-fit/fill)",
  "CSS Selectors (specificity, pseudo-classes, pseudo-elements)",
  "CSS Variables (custom properties \u0026 theming)",
  "Responsive design (media queries, mobile-first)",
  "Position (static, relative, absolute, fixed, sticky)",
  "Box Model (margin, padding, border, box-sizing)",
  "Accessibility (aria, alt, role, focus management)",
  "CSS animations dan transitions",
  "Forms dan validasi HTML5",
  "BEM naming convention dan CSS architecture"
];

export const dsaSubtopics = [
  "Big-O Notation (time \u0026 space complexity)",
  "Array vs Linked List (trade-offs)",
  "Stack dan Queue (LIFO vs FIFO)",
  "Hash Table (collision handling, load factor)",
  "Binary Search (sorted array, O(log n))",
  "Sorting algorithms (quicksort, mergesort, insertion sort)",
  "Binary Tree dan BST (traversal: inorder, preorder, postorder)",
  "Recursion dan Dynamic Programming dasar",
  "Graph basics (BFS, DFS, adjacency list vs matrix)",
  "Two Pointer dan Sliding Window technique",
  "Heap dan Priority Queue",
  "Greedy algorithms vs brute force"
];

export const networkingSubtopics = [
  "HTTP methods (GET, POST, PUT, DELETE, PATCH)",
  "HTTP status codes (2xx, 3xx, 4xx, 5xx)",
  "TCP vs UDP (reliable vs fast)",
  "DNS resolution (domain to IP)",
  "HTTPS dan SSL/TLS handshake",
  "CORS (Cross-Origin Resource Sharing)",
  "WebSocket vs HTTP (real-time communication)",
  "CDN (Content Delivery Network) dan caching",
  "REST vs GraphQL vs gRPC",
  "OSI Model 7 layer (simplified)",
  "Load Balancer dan Reverse Proxy",
  "Cookie vs Session vs Token (autentikasi)"
];

export const restapiSubtopics = [
  "RESTful design principles (resource-based URLs)",
  "JWT (JSON Web Token) authentication flow",
  "OAuth 2.0 (authorization code, implicit, client credentials)",
  "API versioning strategies (URL vs header)",
  "Rate limiting dan throttling",
  "Pagination (offset vs cursor-based)",
  "HATEOAS dan API discoverability",
  "Request/Response headers penting (Content-Type, Authorization)",
  "Error handling di API (structured error responses)",
  "API security (HTTPS, input validation, CORS)",
  "Webhook vs Polling",
  "OpenAPI / Swagger documentation"
];

export const testingSubtopics = [
  "Unit testing vs Integration testing vs E2E testing",
  "Test-Driven Development (TDD) cycle (Red-Green-Refactor)",
  "Mocking, Stubbing, dan Spying",
  "Code coverage (line, branch, statement)",
  "Jest basics (describe, it, expect, beforeEach)",
  "Testing async code (Promise, async/await)",
  "Snapshot testing untuk UI components",
  "Testing best practices (AAA pattern: Arrange-Act-Assert)",
  "Cypress / Playwright untuk E2E testing",
  "Test doubles dan dependency injection",
  "Testing API endpoints (supertest, MSW)",
  "Regression testing dan CI integration"
];

export const confidenceSubtopics = [
  "Cara Mematikan Demam Panggung & Jantung Berdebar dalam 30 Detik (Metode Physiological Sigh)",
  "Cara Menghancurkan Rasa Minder saat Duduk di Meja Rapat Berisi Orang-Orang Berpengaruh",
  "Cara Menghilangkan Rasa Malu & Takut Dihakimi Semua Orang (Menghapus Spotlight Effect)",
  "Cara Melatih Kontak Mata yang Memancarkan Karisma Tanpa Menantang (Metode Segitiga Wajah)",
  "Cara Melatih Postur Tubuh Terbuka yang Otomatis Menurunkan Hormon Stres & Menaikkan Nyali",
  "Cara Berani Mengambil Ruang Bicara Pertama Kali di 5 Menit Awal Diskusi (Aturan 5 Detik Melompat)",
  "Cara Mengubah Rasa Cemas Menjadi Energi Percaya Diri Membara (Anxiety Reappraisal)",
  "Cara Berani Mengatakan 'Saya Belum Tahu' dengan Tenang Tanpa Terlihat Bodoh di Hadapan Atasan",
  "Cara Menghilangkan Kebiasaan 'People Pleasing' yang Membuatmu Sulit Bersikap Asertif & Berwibawa",
  "Cara Melatih Suara Terdengar Tenang dan Berbobot Melalui Latihan Dengung Dada (Chest Resonance)",
  "Cara Membongkar Jebakan Impostor Syndrome agar Kamu Merasa Layak Berbicara Sejajar dengan Siapapun",
  "Cara Menghadapi Tatapan Dingin atau Diamnya Audiens Tanpa Kehilangan Kepercayaan Diri"
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
    case "linux":
      return linuxSubtopics[Math.floor(Math.random() * linuxSubtopics.length)];
    case "git":
      return gitSubtopics[Math.floor(Math.random() * gitSubtopics.length)];
    case "cicd":
      return cicdSubtopics[Math.floor(Math.random() * cicdSubtopics.length)];
    case "docker":
      return dockerSubtopics[Math.floor(Math.random() * dockerSubtopics.length)];
    case "tailwind":
      return tailwindSubtopics[Math.floor(Math.random() * tailwindSubtopics.length)];
    case "publicspeaking":
      return publicspeakingSubtopics[Math.floor(Math.random() * publicspeakingSubtopics.length)];
    case "confidence":
      return confidenceSubtopics[Math.floor(Math.random() * confidenceSubtopics.length)];
    case "javascript":
      return javascriptSubtopics[Math.floor(Math.random() * javascriptSubtopics.length)];
    case "htmlcss":
      return htmlcssSubtopics[Math.floor(Math.random() * htmlcssSubtopics.length)];
    case "dsa":
      return dsaSubtopics[Math.floor(Math.random() * dsaSubtopics.length)];
    case "networking":
      return networkingSubtopics[Math.floor(Math.random() * networkingSubtopics.length)];
    case "restapi":
      return restapiSubtopics[Math.floor(Math.random() * restapiSubtopics.length)];
    case "testing":
      return testingSubtopics[Math.floor(Math.random() * testingSubtopics.length)];
  }
}

export function buildMessages(category: Category, avoid: string[] = []) {
  const subtopic = getRandomSubtopic(category);
  
  // Random seed number untuk memaksa AI tidak mengulang pola yang sama
  const randomSeed = Math.floor(Math.random() * 999999);
  // Random angle/perspektif supaya AI lebih variatif
  const angles = [
    "dari sudut pandang pemula yang baru pertama kali belajar",
    "dari sudut pandang yang mengejutkan atau kontra-intuitif",
    "fokus pada kesalahan umum yang sering dilakukan",
    "dari sudut pandang sejarah atau asal-usul konsep ini",
    "dari perbandingan dengan konsep serupa",
    "dari sudut pandang tips praktis yang jarang diketahui",
    "dari sudut pandang best practice di industri",
    "fokus pada trik pintar atau shortcut yang berguna",
    "dari sudut pandang debugging atau troubleshooting",
    "dari sudut pandang pengalaman nyata di dunia kerja",
  ];
  const randomAngle = angles[Math.floor(Math.random() * angles.length)];

  const systemPrompt = `Kamu adalah pembuat funfact edukatif untuk orang Indonesia yang sedang belajar santai dan mulai jenuh dengan belajar runut.
Tulis dalam Bahasa Indonesia yang ringan dan ramah.

Aturan Penting:
- Buat SATU fakta saja, sesuai kategori dan subtopik yang diberikan.
- Fakta harus akurat. Kalau tidak yakin, pilih fakta lain yang lebih pasti. Jangan mengarang angka, tanggal, atau nama.
- Jangan mengulang fakta yang ada di daftar "hindari".
- Jelaskan sederhana, pemula boleh belum paham konsep dasarnya.
- Selalu sertakan contoh konkret dan penerapannya di dunia nyata.
- PENTING: Setiap kali diminta, buatlah fakta yang BENAR-BENAR BARU dan BERBEDA. Jangan pernah mengulang pola, contoh, atau struktur yang sama.
- FORMAT TEKS WAJIB RAPI, BERSIH, DAN NYAMAN DIBACA:
  * Field 'body': Tulis penjelasan inti yang jernih, mengalir, dan padat (1-2 kalimat). Jangan membuat kalimat yang bertumpuk atau berbelit-belit.
  * Field 'example': Format teks secara terstruktur dengan pemisah baris baru '\\n\\n' yang jelas agar tidak berdempetan. Jika memuat perbandingan skrip/percakapan, gunakan awalan '❌ Hindari:\\n...' dan '✔ Script Rekomendasi:\\n...'. Jika bahasa Jepang, baris 1 tulisan Jepang dengan furigana [kanji]{hiragana}, baris 2 romaji.
  * Field 'result': Tulis respon atau hasil yang langsung to-the-point, jelas, dan rapi.
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
  "quote": string (optional, terutama untuk kategori design, affirmation, publicspeaking, & confidence)
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
    affirmation: "Fokus pada penguatan mental, percaya diri, dan motivasi belajar/karir. example berisi kalimat afirmasi positif yang powerful dan realistis (bukan toxic positivity). result berisi dampak psikologis / perubahan pola pikir yang didapat. SELALU sertakan kutipan motivasi yang relevan di field 'quote' dari tokoh inspiratif (penulis, filsuf, psikolog, atau praktisi ternama).",
    linux: "example berisi perintah terminal Linux praktis (maks 3-5 baris). result berisi output terminal atau penjelasan efeknya. Fokus pada tips command line praktis, bash, navigasi, permission, atau manajemen server.",
    git: "example berisi perintah Git (maks 3-5 baris) atau skenario branch/commit. result berisi status output git atau efek pada commit graph. Fokus pada trik praktis Git dan workflow kolaborasi GitHub.",
    cicd: "example berisi potongan konfigurasi pipeline YAML (misal GitHub Actions, maks 6 baris) atau alur testing/deploy. result berisi efek pipeline atau status build. Jelaskan nilai praktis otomasi ini dalam siklus rilis.",
    docker: "example berisi potongan Dockerfile atau perintah Docker CLI ringkas (maks 5-6 baris). result berisi output build, eksekusi container, atau hasil optimasi image. Fokus pada efisiensi container dan isolasi aplikasi.",
    tailwind: "example berisi markup HTML/JSX dengan class utility Tailwind yang ringkas dan elegan (maks 5-6 baris). result berisi visualisasi styling atau efek class yang dihasilkan. Tunjukkan trik utility classes yang bersih.",
    publicspeaking: "FOKUS TOTAL pada PANDUAN PRAKTIK & CARA BISA JAGO berbicara di depan umum serta diplomatis ke orang penting (atasan, stakeholder, klien, audiens). BUKAN sekadar trivia atau teori! title harus berupa 'Cara/Trik Praktis...' yang solutif. body berisi formula strategi psikologis/komunikasinya. example WAJIB berisi SCRIPT KATA-DEMI-KATA (word-for-word script): tampilkan perbandingan jelas antara apa yang salah/hindari (❌ Hindari) vs kalimat persis yang elegan, berwibawa & diplomatis untuk diucapkan (✔ Script Diplomatis). result berisi respon positif atau dampak psikologis dari lawan bicara saat mendengar script tersebut. why menjelaskan alasan psikologis kenapa kalimat itu meluluhkan lawan bicara. howTo berisi 3-4 langkah latihan harian konkret (actionable drills) agar lidah dan otak terlatih spontan. usage berisi skenario kritis kapan trik ini harus dikeluarkan. SELALU sertakan quote komunikasi dari tokoh negosiasi/komunikasi terkemuka di field 'quote'.",
    confidence: "FOKUS TOTAL pada LATIHAN FISIK & MENTAL AGAR BENAR-BENAR PERCAYA DIRI dan berani tampil di depan siapa saja. BUKAN sekadar motivasi kosong! title harus berupa panduan latihan aksi ('Cara Melatih/Menghilangkan...'). body berisi penjelasan singkat mekanisme psikologis tubuh/otak. example berisi latihan aksi fisik/mental konkret yang bisa dicoba detik ini juga (misal pola napas, postur tubuh, resonansi vokal, atau kalimat afirmasi internal). result berisi sensasi fisik dan dampak mental yang langsung terasa setelah latihan. why menjelaskan mekanisme neurobiologis/psikologisnya. howTo berisi 3-4 langkah aksi latihan harian terukur. usage berisi situasi kritis kapan teknik ini wajib dipraktikkan. SELALU sertakan quote ketegaran/keberanian di field 'quote'.",
    javascript: "example berisi kode JavaScript/TypeScript pendek (maks 6 baris) yang bersih dan bisa dijalankan. result berisi output console atau perilaku kode. Fokus pada konsep esensial JS/TS yang sering membingungkan pemula.",
    htmlcss: "example berisi markup HTML dan/atau CSS pendek (maks 6 baris) yang mendemonstrasikan konsep. result berisi efek visual atau perilaku layout yang dihasilkan. Fokus pada layout, semantik, dan aksesibilitas.",
    dsa: "example berisi pseudocode atau kode sederhana (maks 6 baris) yang menunjukkan algoritma/struktur data. result berisi output atau penjelasan kompleksitas waktu/ruang. Jelaskan dengan analogi dunia nyata.",
    networking: "example berisi contoh request/response, header, atau diagram alur sederhana. result berisi penjelasan apa yang terjadi di balik layar. Fokus pada konsep praktis yang relevan untuk web developer.",
    restapi: "example berisi contoh endpoint, request body, atau konfigurasi autentikasi pendek. result berisi response atau efek dari konfigurasi tersebut. Fokus pada best practice API design dan keamanan.",
    testing: "example berisi kode test pendek (maks 6 baris) menggunakan Jest atau framework testing umum. result berisi output test (pass/fail) dan penjelasan. Fokus pada pola testing praktis.",
  };

  const avoidText = avoid.length > 0 ? avoid.join("; ") : "tidak ada";
  
  const userMessage = `Kategori: ${category}
Subtopik: ${subtopic}
Sudut pandang: ${randomAngle}
Hindari fakta dengan judul berikut: ${avoidText}
Random seed: ${randomSeed}

Buatlah fakta yang unik, segar, dan belum pernah kamu buat sebelumnya.

${categorySpecificRules[category]}`;

  return [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: userMessage }
  ];
}