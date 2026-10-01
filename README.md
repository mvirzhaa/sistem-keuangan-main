# Sistem Keuangan UIKA (Frontend)

Frontend aplikasi Sistem Keuangan UIKA dibangun dengan React 19, TypeScript, Vite, Tailwind CSS v4, dan Zustand.

---

## 📋 Prasyarat
- **Node.js**: v18+ (disarankan v20+)
- **Backend API**: Sudah berjalan di http://localhost:3000/api

---

## 🚀 Panduan Setup Lokal

### 1. Konfigurasi Environment (.env)
Salin file .env.example ke .env:
`ash
cp .env.example .env
`

Isi file .env untuk mode lokal:
`env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
`

> **Catatan**: Untuk build production, file .env.production sudah disediakan dan mengarah ke https://sc.uika-bogor.ac.id/keu-api/api.

---

### 2. Install Dependensi
`ash
npm install
`

---

### 3. Menjalankan Server Development
`ash
npm run dev
`

Aplikasi akan berjalan secara lokal di:
- **URL Lokal**: http://localhost:5173/keuangan/

*(Perhatikan path /keuangan/ sesuai dengan konfigurasi base Vite & basename React Router).*

---

### 4. Build untuk Production
`ash
npm run build
`
Hasil build akan tersimpan di direktori dist/ dan siap di-deploy ke server web/hosting.

---

## 📜 Daftar Script Penting
| Command | Deskripsi |
|---|---|
| 
pm run dev | Menjalankan Vite development server |
| 
pm run build | Menjalankan typecheck (	sc -b) dan build produksi |
| 
pm run preview | Menjalankan preview lokal dari hasil build dist |
| 
pm run lint | Menjalankan linter ESLint |
