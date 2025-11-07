import { sequelize } from "./config.js";
import { Category } from "./models/Category.js";
import { GroupName } from "./models/GroupName.js";
import { Member } from "./models/Member.js";

async function initDatabase() {
  try {
    console.log("🔄 Sinkronisasi database...");

    // Buat ulang semua tabel
    await sequelize.sync({ force: true });

    console.log("✅ Struktur tabel dibuat ulang sesuai model.");

    // === Insert data sesuai dump ===

    // 1️⃣ Categories
    const categories = await Category.bulkCreate([
      { id: 1, name: "KATEGORI PZ KSUZ" },
      { id: 2, name: "KATEGORI PZ KSUZ" },
      { id: 3, name: "KATEGORI PZ KSUZ" },
    ]);

    // 2️⃣ GroupNames
    const groups = await GroupName.bulkCreate([
      { id: 1, name: "FULL TIME", category_id: 2 },
      { id: 2, name: "BOLEH DIAJAK2", category_id: 2 },
      { id: 3, name: "BUAT HAL SENDIRI & TAK MENGATA", category_id: 2 },
      { id: 4, name: "TAK NAK & MENGELAK", category_id: 2 },
      { id: 5, name: "ANAK ABUYA & ANAK TC", category_id: 2 },
      { id: 6, name: "FULL TIME", category_id: 3 },
      { id: 7, name: "BOLEH DIAJAK2", category_id: 3 },
      { id: 8, name: "BUAT HAL SENDIRI & TAK MENGATA", category_id: 3 },
      { id: 9, name: "TAK NAK & MENGELAK", category_id: 3 },
      { id: 10, name: "ANAK ABUYA & ANAK TC", category_id: 3 },
    ]);

    // 3️⃣ Members
    const members = [
      [1, "TUAN SYURAHBIL", 1], [2, "TUAN FATEH", 1], [3, "TUAN ABBAD", 1],
      [4, "TUAN SYARIF", 1], [5, "TUAN HAMDI", 1], [6, "TUAN WAJI", 1],
      [7, "TUAN ABUL FIDA", 1], [8, "TUAN QUDAMAH", 2], [9, "TUAN HANZALAH", 2],
      [10, "TUAN AYIE", 2], [11, "TUAN LUQMAN", 2], [12, "TUAN UQBAH", 2],
      [13, "TUAN WAIE", 2], [14, "TUAN DHIYA", 2], [15, "TUAN MIQDAD", 2],
      [16, "TUAN ZAMAAH", 2], [17, "TUAN JUN AH", 2], [18, "TUAN ALUN", 2],
      [19, "TUAN TARMIZI", 2], [20, "TUAN HARIS", 2], [21, "TUAN ABU ZAR", 2],
      [22, "TUAN HAFIZ", 3], [23, "TUAN SYAHID", 3], [24, "TUAN FAAH", 3],
      [25, "TUAN ATHIF", 3], [26, "TUAN KHABAB", 3], [27, "TUAN RIZAL", 3],
      [28, "TUAN MAD NAFIQ", 5], [29, "TUAN JUN A", 5], [30, "TUAN MAD UBADAH", 5],
      [31, "TUAN FIDA A", 5], [32, "TUAN AJWAD", 5], [33, "TUAN FATEH", 6],
      [34, "TUAN SYURAHBIL", 6], [35, "TUAN ABBAD", 6], [36, "TUAN SYARIF", 6],
      [37, "TUAN HAMDI", 6], [38, "TUAN ABUL FIDA", 6], [39, "TUAN WAJI", 6],
      [40, "TUAN HANZALAH", 7], [41, "TUAN QUDAMAH", 7], [42, "TUAN AYIE", 7],
      [43, "TUAN LUQMAN", 7], [44, "TUAN UQBAH", 7], [45, "TUAN WAIE", 7],
      [46, "TUAN DHIYA", 7], [47, "TUAN MIQDAD", 7], [48, "TUAN ZAMAAH", 7],
      [49, "TUAN JUN AH", 7], [50, "TUAN ALUN", 7], [51, "TUAN TARMIZI", 7],
      [52, "TUAN HARIS", 7], [53, "TUAN ABU ZAR", 7], [54, "TUAN HAFIZ", 8],
      [55, "TUAN SYAHID", 8], [56, "TUAN FAAH", 8], [57, "TUAN ATHIF", 8],
      [58, "TUAN KHABAB", 8], [59, "TUAN RIZAL", 8], [60, "TUAN MAD NAFIQ", 10],
      [61, "TUAN JUN A", 10], [62, "TUAN MAD UBADAH", 10],
      [63, "TUAN FIDA A", 10], [64, "TUAN AJWAD", 10],
    ];

    await Member.bulkCreate(
      members.map(([id, name, group_id]) => ({
        id,
        name,
        group_id,
        istri: null,
        anak: null,
        tinggal: null,
        kerja: null,
        perjuangan: null,
      }))
    );

    console.log("✅ Semua data sesuai dump berhasil dimasukkan.");
    await sequelize.close();
  } catch (err) {
    console.error("❌ Gagal inisialisasi database:", err);
  }
}

initDatabase();
