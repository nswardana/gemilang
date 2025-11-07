import { initDB, Category, GroupName, Member } from "./db/index.js";

async function seed() {
  await initDB();

  try {
    console.log("🌱 Seeding data...");

    // create category
    const [category, created] = await Category.findOrCreate({
      where: { name: "KATEGORI PZ KSUZ" },
      defaults: { name: "KATEGORI PZ KSUZ" }
    });

    // groups
    const groupsData = [
      "FULL TIME",
      "BOLEH DIAJAK2",
      "BUAT HAL SENDIRI & TAK MENGATA",
      "TAK NAK & MENGELAK",
      "ANAK ABUYA & ANAK TC"
    ];

    const groupMap = {};
    for (const name of groupsData) {
      const g = await GroupName.findOrCreate({
        where: { name, category_id: category.id },
        defaults: { name, category_id: category.id }
      });
      groupMap[name] = g[0];
    }

    // members for each group
    const fulltime = [
      "TUAN FATEH",
      "TUAN SYURAHBIL",
      "TUAN ABBAD",
      "TUAN SYARIF",
      "TUAN HAMDI",
      "TUAN ABUL FIDA",
      "TUAN WAJI"
    ];

    const bolehDiajaks = [
      "TUAN QUDAMAH",
      "TUAN HANZALAH",
      "TUAN AYIE",
      "TUAN LUQMAN",
      "TUAN UQBAH",
      "TUAN WAIE",
      "TUAN DHIYA",
      "TUAN MIQDAD",
      "TUAN ZAMAAH",
      "TUAN JUN AH",
      "TUAN ALUN",
      "TUAN TARMIZI",
      "TUAN HARIS",
      "TUAN ABU ZAR"
    ];

    const buatHalSendiri = [
      "TUAN HAFIZ",
      "TUAN SYAHID",
      "TUAN FAAH",
      "TUAN ATHIF",
      "TUAN KHABAB",
      "TUAN RIZAL"
    ];

    const anakAbuya = [
      "TUAN MAD NAFIQ",
      "TUAN JUN A",
      "TUAN MAD UBADAH",
      "TUAN FIDA A",
      "TUAN AJWAD"
    ];

    const insertNames = async (names, groupName) => {
      const g = groupMap[groupName];
      if (!g) return;
      for (const n of names) {
        await Member.findOrCreate({
          where: { name: n, group_id: g.id },
          defaults: { name: n, group_id: g.id }
        });
      }
    };

    await insertNames(fulltime, "FULL TIME");
    await insertNames(bolehDiajaks, "BOLEH DIAJAK2");
    await insertNames(buatHalSendiri, "BUAT HAL SENDIRI & TAK MENGATA");
    await insertNames(anakAbuya, "ANAK ABUYA & ANAK TC");

    console.log("✅ Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
}

seed();
