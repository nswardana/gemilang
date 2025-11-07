import { sequelize } from "./config.js";
import { Category } from "./models/Category.js";
import { GroupName } from "./models/GroupName.js";
import { Member } from "./models/Member.js";

async function initDatabase() {
  try {
    console.log("🔄 Sinkronisasi database...");

    // Hapus dan buat ulang semua tabel
    await sequelize.sync({ force: true });

    console.log("✅ Struktur tabel dibuat ulang sesuai model.");

    // === Insert data ===

    // 1️⃣ Categories
    const category = await Category.create({
      id: 1,
      name: "KATEGORI PZ KSUZ",
    });

    // 2️⃣ GroupNames (Page 2)
    const groups = await GroupName.bulkCreate([
      { id: 1, name: "FULL TIME", category_id: category.id },
      { id: 2, name: "BOLEH DIAJAK2", category_id: category.id },
      { id: 3, name: "BUAT HAL SENDIRI & TAK MENGATA", category_id: category.id },
      { id: 4, name: "TAK NAK & MENGELAK", category_id: category.id },
      { id: 5, name: "ANAK ABUYA & ANAK TC", category_id: category.id },
    ]);

    // 3️⃣ Members (sesuai daftar di Page 2)
    const membersData = [
      // FULL TIME (id group = 1)
      ["TUAN FATEH", 1],
      ["TUAN SYURAHBIL", 1],
      ["TUAN ABBAD", 1],
      ["TUAN SYARIF", 1],
      ["TUAN HAMDI", 1],
      ["TUAN ABUL FIDA", 1],
      ["TUAN WAJI", 1],

      // BOLEH DIAJAK2 (id group = 2)
      ["TUAN QUDAMAH", 2],
      ["TUAN HANZALAH", 2],
      ["TUAN AYIE", 2],
      ["TUAN LUQMAN", 2],
      ["TUAN UQBAH", 2],
      ["TUAN WAIE", 2],
      ["TUAN DHIYA", 2],
      ["TUAN MIQDAD", 2],
      ["TUAN ZAMAAH", 2],
      ["TUAN JUN AH", 2],
      ["TUAN ALUN", 2],
      ["TUAN TARMIZI", 2],
      ["TUAN HARIS", 2],
      ["TUAN ABU ZAR", 2],

      // BUAT HAL SENDIRI & TAK MENGATA (id group = 3)
      ["TUAN HAFIZ", 3],
      ["TUAN SYAHID", 3],
      ["TUAN FAAH", 3],
      ["TUAN ATHIF", 3],
      ["TUAN KHABAB", 3],
      ["TUAN RIZAL", 3],

      // TAK NAK & MENGELAK (id group = 4)
      // (tidak disebutkan nama, biarkan kosong dulu jika belum ada)

      // ANAK ABUYA & ANAK TC (id group = 5)
      ["TUAN MAD NAFIQ", 5],
      ["TUAN JUN A", 5],
      ["TUAN MAD UBADAH", 5],
      ["TUAN FIDA A", 5],
      ["TUAN AJWAD", 5],
    ];

    await Member.bulkCreate(
      membersData.map(([name, group_id], index) => ({
        id: index + 1,
        name,
        group_id,
        istri: null,
        anak: null,
        tinggal: null,
        kerja: null,
        perjuangan: null,
      }))
    );

    console.log("✅ Semua data berhasil dimasukkan sesuai struktur Page 1 & Page 2.");
    await sequelize.close();
  } catch (err) {
    console.error("❌ Gagal inisialisasi database:", err);
  }
}

initDatabase();
