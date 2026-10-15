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
  users: [],
};

const db = new Low(adapter, defaultData);
await db.read();

// Base json-server app
const jsonServerApp = createApp(db);

// Main tinyhttp app
const app = new App();

// CORS setup
app.use(cors());
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
  console.log(`======================================================\n`);
});
