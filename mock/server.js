import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { createApp } from "json-server/lib/app.js";
import { App } from "@tinyhttp/app";
import { cors } from "@tinyhttp/cors";
import { json } from "milliparsec";
import { join } from "node:path";

const PORT = Number(process.env.PORT) || 3001;
const file = join(process.cwd(), "mock/db.json");
const adapter = new JSONFile(file);
const defaultData = {
  periode: [],
  dashboard: {},
  tagihan: [],
  pembayaran: [],
  deposit: [],
  saldoDepositMahasiswa: [],
  virtualAccount: [],
  users: [],
  students: [],
  pendaftar: [],
  tagihanPembayaran: [],
  tagihanFormulir: [],
  referensi: {},
  uktMahasiswa: [],
  monitoringTarif: [],
  detailMonitoringTarif: [],
  monitoringTagihanMahasiswa: [],
  detailMonitoringTagihanMahasiswa: [],
  transaksiKeuangan: [],
  potonganDanBeasiswa: [],
  penerimaVoucher: [],
  detailMonitoringGenerateTagihanMahasiswa: [],
  detailMonitoringGenerateTagihanPendaftar: [],
};

const db = new Low(adapter, defaultData);
await db.read();

// Base json-server app
const jsonServerApp = createApp(db);

// Main tinyhttp app
const app = new App();

// CORS setup with full Authorization support
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "Origin",
      "X-Requested-With",
    ],
  })
);

// Fallback manual CORS header handler for all requests & preflight OPTIONS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Accept, Origin, X-Requested-With"
  );
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  next?.();
});

app.use(json());

// Request logger
app.use((req, res, next) => {
  const method = req.method;
  const url = req.url;
  console.log(`📡 [Mock API] ${method} ${url}`);
  next?.();
});

// Custom Auth Handler
function handleLogin(req, res) {
  const { email } = req.body || {};
  console.log(`🔐 [Mock Auth] Login request for: ${email || "anonymous"}`);

  // Find user from db.data.users or fallback to super admin
  const user =
    db.data.users?.find((u) => u.email === email) || {
      id: "1",
      nama: "Siddik Super Admin",
      email: email || "admin@uika-bogor.ac.id",
      roles: ["SUPER_ADMIN", "ADMIN_KEUANGAN"],
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    };

  const responseData = {
    message: "Login berhasil",
    data: {
      user,
      token: "mock-jwt-token-" + Buffer.from(user.email).toString("base64"),
      expiresIn: "24h",
    },
  };

  return res.status(200).json(responseData);
}

// Support both /auth/login and /api/auth/login
app.post("/auth/login", handleLogin);
app.post("/api/auth/login", handleLogin);

// Custom Dashboard Handler with All Periods support
function handleDashboard(req, res) {
  const urlObj = new URL(req.url, `http://localhost:${PORT}`);
  const periode = urlObj.searchParams.get("periode") || req.query?.periode || "";
  console.log(`📊 [Mock API] Dashboard request for periode: ${periode || "default"}`);

  if (
    periode === "-- Semua Periode --" ||
    periode === "ALL" ||
    periode === "Semua"
  ) {
    return res.status(200).json({
      stats: {
        totalTagihan: 86450000000,
        totalTagihanLunas: 115200000000,
        totalPembayaran: 112600000000,
        saldoDeposit: 4850000000,
      },
      periode: "-- Semua Periode --",
      lastUpdated: new Date().toISOString(),
    });
  }

  const baseStats = db.data.dashboard?.stats || {
    totalTagihan: 23300000000,
    totalTagihanLunas: 31050000000,
    totalPembayaran: 30400000000,
    saldoDeposit: 1250000000,
  };

  return res.status(200).json({
    stats: baseStats,
    periode: periode || db.data.dashboard?.periode || "2026 Genap",
    lastUpdated: new Date().toISOString(),
  });
}

app.get("/dashboard", handleDashboard);
app.get("/api/dashboard", handleDashboard);

// Custom Handlers for Operasional Pembayaran
async function handleStudents(req, res) {
  await db.read();
  const urlObj = new URL(req.url, `http://localhost:${PORT}`);
  const q = (
    urlObj.searchParams.get("q") ||
    urlObj.searchParams.get("search") ||
    req.query?.q ||
    req.query?.search ||
    ""
  )
    .toLowerCase()
    .trim();

  let students = db.data.students || [];
  if (q) {
    students = students.filter((s) => {
      const nim = (s.nim || "").toLowerCase();
      const nama = (s.nama || "").toLowerCase();
      const fullName = (s.fullName || "").toLowerCase();
      const name = (s.name || "").toLowerCase();
      return (
        nim.includes(q) ||
        nama.includes(q) ||
        fullName.includes(q) ||
        name.includes(q)
      );
    });
  }
  return res.status(200).json(students);
}

async function handlePendaftar(req, res) {
  await db.read();
  const urlObj = new URL(req.url, `http://localhost:${PORT}`);
  const q = (
    urlObj.searchParams.get("q") ||
    urlObj.searchParams.get("search") ||
    req.query?.q ||
    req.query?.search ||
    ""
  )
    .toLowerCase()
    .trim();

  let pendaftar = db.data.pendaftar || [];
  if (q) {
    pendaftar = pendaftar.filter((p) => {
      const idPendaftar = (p.idPendaftar || "").toLowerCase();
      const nama = (p.nama || "").toLowerCase();
      return idPendaftar.includes(q) || nama.includes(q);
    });
  }
  return res.status(200).json(pendaftar);
}

async function handleTagihanPembayaran(req, res) {
  await db.read();
  const urlObj = new URL(req.url, `http://localhost:${PORT}`);
  const nim = urlObj.searchParams.get("nim") || req.query?.nim;
  let tagihan = db.data.tagihanPembayaran || [];
  if (nim) {
    tagihan = tagihan.filter((t) => t.nim === nim);
  }
  return res.status(200).json(tagihan);
}

async function handleTagihanFormulir(req, res) {
  await db.read();
  const urlObj = new URL(req.url, `http://localhost:${PORT}`);
  const idPendaftar = urlObj.searchParams.get("idPendaftar") || req.query?.idPendaftar;
  let tagihan = db.data.tagihanFormulir || [];
  if (idPendaftar) {
    tagihan = tagihan.filter((t) => t.idPendaftar === idPendaftar);
  }
  return res.status(200).json(tagihan);
}

async function handleReferensi(req, res) {
  await db.read();
  const referensi = db.data.referensi || {};
  return res.status(200).json(referensi);
}

async function handleUktMahasiswa(req, res) {
  await db.read();
  const data = db.data.uktMahasiswa || [];
  return res.status(200).json(data);
}

// Handler Batch Update UKT Mahasiswa
async function handleBatchUpdateUktMahasiswa(req, res) {
  await db.read();
  const { ids, updates } = req.body || {};
  if (!Array.isArray(ids) || !updates) {
    return res.status(400).json({ message: "Parameter ids atau updates tidak valid" });
  }

  const idSet = new Set(ids.map(String));
  let list = db.data.uktMahasiswa || [];
  list = list.map((item) => {
    if (idSet.has(String(item.id))) {
      return { ...item, ...updates };
    }
    return item;
  });

  db.data.uktMahasiswa = list;
  await db.write();

  return res.status(200).json({
    message: "Data UKT mahasiswa berhasil diperbarui secara batch",
    data: list,
  });
}

// Handler Single Update UKT Mahasiswa by ID
async function handleUpdateUktMahasiswa(req, res) {
  await db.read();
  const id = req.params?.id;
  const updates = req.body || {};
  let list = db.data.uktMahasiswa || [];
  const index = list.findIndex((item) => String(item.id) === String(id));

  if (index === -1) {
    return res.status(404).json({ message: "Data mahasiswa tidak ditemukan" });
  }

  list[index] = { ...list[index], ...updates };
  db.data.uktMahasiswa = list;
  await db.write();

  return res.status(200).json({
    message: "Data UKT mahasiswa berhasil diperbarui",
    data: list[index],
  });
}

// Handler Monitoring Tarif
async function handleMonitoringTarif(req, res) {
  await db.read();
  const data = db.data.monitoringTarif || [];
  return res.status(200).json(data);
}

// Handler Detail Monitoring Tarif
async function handleDetailMonitoringTarif(req, res) {
  await db.read();
  const urlObj = new URL(req.url, `http://localhost:${PORT}`);
  const monitoringTarifId =
    urlObj.searchParams.get("monitoringTarifId") || req.query?.monitoringTarifId;
  const list = db.data.detailMonitoringTarif || [];
  if (monitoringTarifId) {
    const filtered = list.filter(
      (item) => String(item.monitoringTarifId) === String(monitoringTarifId),
    );
    if (filtered.length > 0) {
      return res.status(200).json(filtered);
    }
  }
  return res.status(200).json(list);
}

app.get("/students", handleStudents);
app.get("/api/students", handleStudents);
app.get("/pendaftar", handlePendaftar);
app.get("/api/pendaftar", handlePendaftar);
app.get("/tagihan-pembayaran", handleTagihanPembayaran);
app.get("/api/tagihan-pembayaran", handleTagihanPembayaran);
app.get("/tagihan-formulir", handleTagihanFormulir);
app.get("/api/tagihan-formulir", handleTagihanFormulir);
app.get("/referensi", handleReferensi);
app.get("/api/referensi", handleReferensi);
app.get("/ukt-mahasiswa", handleUktMahasiswa);
app.get("/api/ukt-mahasiswa", handleUktMahasiswa);

// Monitoring Tarif Endpoints
app.get("/monitoring-tarif", handleMonitoringTarif);
app.get("/api/monitoring-tarif", handleMonitoringTarif);
app.get("/monitoringTarif", handleMonitoringTarif);
app.get("/api/monitoringTarif", handleMonitoringTarif);

// Detail Monitoring Tarif Endpoints
app.get("/detail-monitoring-tarif", handleDetailMonitoringTarif);
app.get("/api/detail-monitoring-tarif", handleDetailMonitoringTarif);
app.get("/detailMonitoringTarif", handleDetailMonitoringTarif);
app.get("/api/detailMonitoringTarif", handleDetailMonitoringTarif);

// Handler Monitoring Tagihan Mahasiswa
async function handleMonitoringTagihanMahasiswa(req, res) {
  await db.read();
  const data = db.data.monitoringTagihanMahasiswa || [];
  return res.status(200).json(data);
}

// Handler Detail Monitoring Tagihan Mahasiswa
async function handleDetailMonitoringTagihanMahasiswa(req, res) {
  await db.read();
  const urlObj = new URL(req.url, `http://localhost:${PORT}`);
  const unit = urlObj.searchParams.get("unit") || req.query?.unit;
  const list = db.data.detailMonitoringTagihanMahasiswa || [];
  if (unit) {
    const filtered = list.filter((item) =>
      String(item.unit || "").toLowerCase().includes(String(unit).toLowerCase()),
    );
    if (filtered.length > 0) {
      return res.status(200).json(filtered);
    }
  }
  return res.status(200).json(list);
}

// Handler Monitoring Aturan Akademik
async function handleMonitoringAturanAkademik(req, res) {
  await db.read();
  const urlObj = new URL(req.url, `http://localhost:${PORT}`);
  const periode = urlObj.searchParams.get("periode") || urlObj.searchParams.get("periodeAkademik") || req.query?.periode || req.query?.periodeAkademik;
  const angkatan = urlObj.searchParams.get("angkatan") || req.query?.angkatan;
  const aturan = urlObj.searchParams.get("aturan") || urlObj.searchParams.get("aturanAkademik") || req.query?.aturan || req.query?.aturanAkademik;
  const unit = urlObj.searchParams.get("unit") || urlObj.searchParams.get("unitKerja") || req.query?.unit || req.query?.unitKerja;

  let list = db.data.monitoringAturanAkademik || [];

  if (periode && !periode.includes("Semua")) {
    list = list.filter((item) =>
      (item.periodeAkademik || item.angkatan || "").toLowerCase().includes(periode.toLowerCase()),
    );
  }
  if (angkatan && !angkatan.includes("Semua")) {
    list = list.filter((item) =>
      String(item.angkatan || "").toLowerCase().includes(angkatan.toLowerCase()),
    );
  }
  if (aturan && !aturan.includes("Semua")) {
    const key = aturan.toLowerCase().split(" ")[0];
    list = list.filter((item) =>
      String(item.aturanAkademik || "").toLowerCase().includes(key),
    );
  }
  if (unit && !unit.includes("Universitas") && !unit.includes("Semua")) {
    list = list.filter((item) =>
      (item.unitKerja || "").toLowerCase().includes(unit.toLowerCase()) ||
      (item.namaProgram || "").toLowerCase().includes(unit.toLowerCase()),
    );
  }

  return res.status(200).json(list);
}

// Handler Detail Monitoring Mahasiswa Tercekal Aturan Akademik
async function handleDetailMonitoringMahasiswaTercekal(req, res) {
  await db.read();
  const urlObj = new URL(req.url, `http://localhost:${PORT}`);
  const kodeProdi = urlObj.searchParams.get("kodeProdi") || req.query?.kodeProdi;
  const list = db.data.detailMonitoringMahasiswaTercekalAturanAkademik || [];
  if (kodeProdi) {
    const filtered = list.filter(
      (item) => String(item.kodeProdi) === String(kodeProdi),
    );
    if (filtered.length > 0) {
      return res.status(200).json(filtered);
    }
  }
  return res.status(200).json(list);
}

// Handler Monitoring UKT
async function handleMonitoringUkt(req, res) {
  await db.read();
  const data = db.data.monitoringUkt || [];
  return res.status(200).json(data);
}

// Handler Detail Monitoring UKT
async function handleDetailMonitoringUkt(req, res) {
  await db.read();
  const urlObj = new URL(req.url, `http://localhost:${PORT}`);
  const kelompokUkt = urlObj.searchParams.get("kelompokUkt") || req.query?.kelompokUkt;
  const list = db.data.detailMonitoringUkt || [];
  if (kelompokUkt) {
    const filtered = list.filter((item) =>
      item.kelompokUkt.toLowerCase().includes(kelompokUkt.toLowerCase()),
    );
    if (filtered.length > 0) {
      return res.status(200).json(filtered);
    }
  }
  return res.status(200).json(list);
}

// Handler Monitoring Tagihan Semester
async function handleMonitoringTagihanSemester(req, res) {
  await db.read();
  const data = db.data.monitoringTagihanSemester || [];
  return res.status(200).json(data);
}

// Monitoring Tagihan Mahasiswa Endpoints
app.get("/monitoring-tagihan-mahasiswa", handleMonitoringTagihanMahasiswa);
app.get("/api/monitoring-tagihan-mahasiswa", handleMonitoringTagihanMahasiswa);
app.get("/monitoringTagihanMahasiswa", handleMonitoringTagihanMahasiswa);
app.get("/api/monitoringTagihanMahasiswa", handleMonitoringTagihanMahasiswa);

// Detail Monitoring Tagihan Mahasiswa Endpoints
app.get("/detail-monitoring-tagihan-mahasiswa", handleDetailMonitoringTagihanMahasiswa);
app.get("/api/detail-monitoring-tagihan-mahasiswa", handleDetailMonitoringTagihanMahasiswa);
app.get("/detailMonitoringTagihanMahasiswa", handleDetailMonitoringTagihanMahasiswa);
app.get("/api/detailMonitoringTagihanMahasiswa", handleDetailMonitoringTagihanMahasiswa);

// Monitoring Aturan Akademik Endpoints
app.get("/monitoring-aturan-akademik", handleMonitoringAturanAkademik);
app.get("/api/monitoring-aturan-akademik", handleMonitoringAturanAkademik);
app.get("/monitoringAturanAkademik", handleMonitoringAturanAkademik);
app.get("/api/monitoringAturanAkademik", handleMonitoringAturanAkademik);

// Detail Monitoring Mahasiswa Tercekal Endpoints
app.get("/detail-monitoring-mahasiswa-tercekal", handleDetailMonitoringMahasiswaTercekal);
app.get("/api/detail-monitoring-mahasiswa-tercekal", handleDetailMonitoringMahasiswaTercekal);
app.get("/detailMonitoringMahasiswaTercekal", handleDetailMonitoringMahasiswaTercekal);
app.get("/api/detailMonitoringMahasiswaTercekal", handleDetailMonitoringMahasiswaTercekal);

// Monitoring UKT Endpoints
app.get("/monitoring-ukt", handleMonitoringUkt);
app.get("/api/monitoring-ukt", handleMonitoringUkt);
app.get("/monitoringUkt", handleMonitoringUkt);
app.get("/api/monitoringUkt", handleMonitoringUkt);

// Detail Monitoring UKT Endpoints
app.get("/detail-monitoring-ukt", handleDetailMonitoringUkt);
app.get("/api/detail-monitoring-ukt", handleDetailMonitoringUkt);
app.get("/detailMonitoringUkt", handleDetailMonitoringUkt);
app.get("/api/detailMonitoringUkt", handleDetailMonitoringUkt);

// Monitoring Tagihan Semester Endpoints
app.get("/monitoring-tagihan-semester", handleMonitoringTagihanSemester);
app.get("/api/monitoring-tagihan-semester", handleMonitoringTagihanSemester);
app.get("/monitoringTagihanSemester", handleMonitoringTagihanSemester);
app.get("/api/monitoringTagihanSemester", handleMonitoringTagihanSemester);

// Handler Transaksi Keuangan
async function handleTransaksiKeuangan(req, res) {
  await db.read();
  const data = db.data.transaksiKeuangan || [];
  return res.status(200).json(data);
}

app.get("/transaksi-keuangan", handleTransaksiKeuangan);
app.get("/api/transaksi-keuangan", handleTransaksiKeuangan);
app.get("/transaksiKeuangan", handleTransaksiKeuangan);
app.get("/api/transaksiKeuangan", handleTransaksiKeuangan);

// Handler Tagihan
async function handleTagihan(req, res) {
  await db.read();
  const data = db.data.tagihan || [];
  return res.status(200).json(data);
}

async function handleTagihanDetail(req, res) {
  await db.read();
  const id = req.params?.id;
  const list = db.data.tagihan || [];
  const found = list.find(
    (item) =>
      String(item.id) === String(id) ||
      item.kodeTagihan === id ||
      item.nim === id,
  );
  if (found) {
    return res.status(200).json(found);
  }
  if (list.length > 0) return res.status(200).json(list[0]);
  return res.status(404).json({ message: "Tagihan tidak ditemukan" });
}

async function handleCreateTagihan(req, res) {
  await db.read();
  const body = req.body || {};
  const list = db.data.tagihan || [];

  // Generate ID baru & Kode Tagihan otomatis
  const newId = String(Date.now());
  const randomNum = Math.floor(1000000 + Math.random() * 9000000);
  const newKode =
    body.kodeTagihan && body.kodeTagihan !== "Generate Otomatis"
      ? body.kodeTagihan
      : `INV/20261/${randomNum}`;

  const nimVal = body.nim || (body.mahasiswa?.includes(" - ") ? body.mahasiswa.split(" - ")[0] : body.mahasiswa) || "261107010099";
  const namaVal = body.nama || (body.mahasiswa?.includes(" - ") ? body.mahasiswa.split(" - ")[1] : body.mahasiswa) || "MAHASISWA BARU";

  const newTagihan = {
    id: newId,
    kodeTagihan: newKode,
    nim: nimVal,
    nama: namaVal,
    prodi: body.prodi || "S1 - Teknik Informatika",
    sistemKuliah: body.sistemKuliah || "Reguler",
    jalurPendaftaran: body.jalurPendaftaran || "SELEKSI MANDIRI",
    periodeMasuk: body.periodeMasuk || "20261",
    gelombang: body.gelombang || "Gelombang 1",
    penerima: body.penerima || "Mahasiswa",
    kelompok: body.kelompok || "Kelompok 1",
    jenis: body.jenis || (body.jenisTagihan?.split(" - ")[0]) || "1011",
    jenisTagihan: body.jenisTagihan || "1011 - Uang Gedung Tahap 1",
    cicilan: Number(body.cicilan) || 1,
    bulan: body.bulan || "-",
    tahun: body.tahun || "-",
    nominal: Number(body.nominal) || 0,
    denda: Number(body.denda) || 0,
    potongan: Number(body.potonganLangsung || body.potongan || 0),
    potonganLangsung: Number(body.potonganLangsung || 0),
    potonganBeasiswa: Number(body.potonganBeasiswa || 0),
    bayar: 0,
    lunas: false,
    statusPembayaran: "belum_lunas",
    tglTagihan: body.tglTagihan || new Date().toLocaleString("id-ID"),
    tglTerbit: body.tglTerbit || body.tglTerbitTagihan || "-",
    tglJatuhTempo: body.tglJatuhTempo || "-",
    tglAkhirDispensasi: body.tglAkhirDispensasi || "-",
    keterangan: body.keterangan || "-",
    periodeTagihan: body.periode || body.periodeTagihan || "2026 Ganjil",
    angkatan: body.angkatan || "2026",
    riwayatPembayaran: [],
    riwayatPotongan: [],
  };

  list.unshift(newTagihan);
  db.data.tagihan = list;
  await db.write();

  return res.status(201).json(newTagihan);
}

app.get("/tagihan", handleTagihan);
app.get("/api/tagihan", handleTagihan);
app.get("/tagihan/:id", handleTagihanDetail);
app.get("/api/tagihan/:id", handleTagihanDetail);
app.post("/tagihan", handleCreateTagihan);
app.post("/api/tagihan", handleCreateTagihan);


// UKT Mahasiswa Update Endpoints
app.patch("/ukt-mahasiswa/batch", handleBatchUpdateUktMahasiswa);
app.patch("/api/ukt-mahasiswa/batch", handleBatchUpdateUktMahasiswa);
app.put("/ukt-mahasiswa/batch", handleBatchUpdateUktMahasiswa);
app.put("/api/ukt-mahasiswa/batch", handleBatchUpdateUktMahasiswa);

app.put("/ukt-mahasiswa/:id", handleUpdateUktMahasiswa);
app.put("/api/ukt-mahasiswa/:id", handleUpdateUktMahasiswa);
app.patch("/ukt-mahasiswa/:id", handleUpdateUktMahasiswa);
app.patch("/api/ukt-mahasiswa/:id", handleUpdateUktMahasiswa);

// Handler Pembayaran
async function handlePembayaran(req, res) {
  await db.read();
  const urlObj = new URL(req.url, `http://localhost:${PORT}`);
  const q = (
    urlObj.searchParams.get("q") ||
    urlObj.searchParams.get("search") ||
    req.query?.q ||
    req.query?.search ||
    ""
  )
    .toLowerCase()
    .trim();
  const nim = urlObj.searchParams.get("nim") || req.query?.nim;

  let list = db.data.pembayaran || [];
  if (nim) {
    list = list.filter((p) => p.nim === nim);
  }
  if (q) {
    list = list.filter(
      (p) =>
        (p.kodePembayaran || "").toLowerCase().includes(q) ||
        (p.nim || "").toLowerCase().includes(q) ||
        (p.nama || "").toLowerCase().includes(q) ||
        (p.channel || "").toLowerCase().includes(q) ||
        (p.metodePembayaran || "").toLowerCase().includes(q)
    );
  }
  return res.status(200).json(list);
}

async function handlePembayaranDetail(req, res) {
  await db.read();
  const id = req.params?.id;
  const list = db.data.pembayaran || [];
  const found = list.find(
    (item) =>
      String(item.id) === String(id) ||
      item.kodePembayaran === id ||
      item.nim === id
  );
  if (found) {
    return res.status(200).json(found);
  }
  if (list.length > 0) return res.status(200).json(list[0]);
  return res.status(404).json({ message: "Data pembayaran tidak ditemukan" });
}

app.get("/pembayaran", handlePembayaran);
app.get("/api/pembayaran", handlePembayaran);
app.get("/pembayaran/:id", handlePembayaranDetail);
app.get("/api/pembayaran/:id", handlePembayaranDetail);

// Handler Penerima Voucher
async function handlePenerimaVoucher(req, res) {
  await db.read();
  const list = db.data.penerimaVoucher || [];
  return res.status(200).json(list);
}

async function handleUpdatePenerimaVoucher(req, res) {
  await db.read();
  const id = req.params?.id;
  const body = req.body || {};
  let list = db.data.penerimaVoucher || [];
  const index = list.findIndex((item) => String(item.id) === String(id));
  if (index !== -1) {
    list[index] = { ...list[index], ...body };
    db.data.penerimaVoucher = list;
    await db.write();
    console.log(`🎟️ [Mock API] Updated penerimaVoucher ID ${id}:`, body);
    return res.status(200).json(list[index]);
  }
  return res.status(404).json({ message: "Voucher tidak ditemukan" });
}

app.get("/penerimaVoucher", handlePenerimaVoucher);
app.get("/api/penerimaVoucher", handlePenerimaVoucher);
app.patch("/penerimaVoucher/:id", handleUpdatePenerimaVoucher);
app.patch("/api/penerimaVoucher/:id", handleUpdatePenerimaVoucher);
app.put("/penerimaVoucher/:id", handleUpdatePenerimaVoucher);
app.put("/api/penerimaVoucher/:id", handleUpdatePenerimaVoucher);

// Handler Detail Monitoring Generate Tagihan Mahasiswa
async function handleDetailMonitoringGenerateTagihanMahasiswa(req, res) {
  await db.read();
  let list = db.data.detailMonitoringGenerateTagihanMahasiswa || [];
  const { q, unit, status, frekuensi, periodeTagihan } = req.query || {};

  if (unit && unit !== "Universitas Ibn Khaldun" && !unit.includes("Semua")) {
    list = list.filter((item) =>
      item.unit?.toLowerCase().includes(unit.toLowerCase())
    );
  }
  if (status && !status.includes("Semua")) {
    list = list.filter(
      (item) => item.status?.toLowerCase() === status.toLowerCase()
    );
  }
  if (periodeTagihan && !periodeTagihan.includes("Semua")) {
    list = list.filter((item) =>
      item.periodeTagihan?.toLowerCase().includes(periodeTagihan.toLowerCase())
    );
  }
  if (q) {
    const keyword = q.toLowerCase();
    list = list.filter(
      (item) =>
        item.nim?.toLowerCase().includes(keyword) ||
        item.nama?.toLowerCase().includes(keyword) ||
        item.unit?.toLowerCase().includes(keyword) ||
        item.jenisAkun?.toLowerCase().includes(keyword)
    );
  }
  return res.status(200).json(list);
}

app.get(
  "/detail-monitoring-generate-tagihan-mahasiswa",
  handleDetailMonitoringGenerateTagihanMahasiswa
);
app.get(
  "/api/detail-monitoring-generate-tagihan-mahasiswa",
  handleDetailMonitoringGenerateTagihanMahasiswa
);

async function handleDetailMonitoringGenerateTagihanPendaftar(req, res) {
  await db.read();
  let list = db.data.detailMonitoringGenerateTagihanPendaftar || [];
  const { q, unit, status, frekuensi, periodeTagihan, periodeMasuk, gelombang, jalur, sistemKuliah } =
    req.query || {};

  if (unit && unit !== "Universitas Ibn Khaldun" && !unit.includes("Semua")) {
    list = list.filter(
      (item) =>
        item.unitDiterima?.toLowerCase().includes(unit.toLowerCase()) ||
        item.unit?.toLowerCase().includes(unit.toLowerCase())
    );
  }
  if (status && !status.includes("Semua")) {
    list = list.filter(
      (item) => item.status?.toLowerCase() === status.toLowerCase()
    );
  }
  if (periodeTagihan && !periodeTagihan.includes("Semua")) {
    list = list.filter(
      (item) =>
        item.periode?.toLowerCase().includes(periodeTagihan.toLowerCase()) ||
        item.periodeTagihan?.toLowerCase().includes(periodeTagihan.toLowerCase())
    );
  }
  if (periodeMasuk && !periodeMasuk.includes("Semua")) {
    list = list.filter((item) =>
      item.periodeMasuk?.toLowerCase().includes(periodeMasuk.toLowerCase())
    );
  }
  if (gelombang && !gelombang.includes("Semua")) {
    list = list.filter((item) =>
      item.gelombang?.toLowerCase().includes(gelombang.toLowerCase())
    );
  }
  if (jalur && !jalur.includes("Semua")) {
    list = list.filter((item) =>
      item.jalurPendaftaran?.toLowerCase().includes(jalur.toLowerCase())
    );
  }
  if (sistemKuliah && !sistemKuliah.includes("Semua")) {
    list = list.filter((item) =>
      item.sistemKuliah?.toLowerCase().includes(sistemKuliah.toLowerCase())
    );
  }
  if (q) {
    const keyword = q.toLowerCase();
    list = list.filter(
      (item) =>
        item.kodePendaftar?.toLowerCase().includes(keyword) ||
        item.nama?.toLowerCase().includes(keyword) ||
        item.unitDiterima?.toLowerCase().includes(keyword) ||
        item.jalurPendaftaran?.toLowerCase().includes(keyword) ||
        item.jenisAkun?.toLowerCase().includes(keyword)
    );
  }
  return res.status(200).json(list);
}

app.get(
  "/detail-monitoring-generate-tagihan-pendaftar",
  handleDetailMonitoringGenerateTagihanPendaftar
);
app.get(
  "/api/detail-monitoring-generate-tagihan-pendaftar",
  handleDetailMonitoringGenerateTagihanPendaftar
);

// Mount json-server endpoints under /api and root /
app.use("/api", jsonServerApp);
app.use(jsonServerApp);

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Mock API Server running at http://localhost:${PORT}`);
  console.log(`======================================================`);
  console.log(`👉 Auth Login: http://localhost:${PORT}/auth/login`);
  console.log(`👉 Periode:    http://localhost:${PORT}/periode`);
  console.log(`👉 Dashboard:  http://localhost:${PORT}/dashboard`);
  console.log(`👉 Tagihan:    http://localhost:${PORT}/tagihan`);
  console.log(`👉 Pembayaran: http://localhost:${PORT}/pembayaran`);
  console.log(`👉 Referensi:  http://localhost:${PORT}/referensi`);
  console.log(`======================================================\n`);
});
