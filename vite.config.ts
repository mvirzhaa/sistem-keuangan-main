import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": "http://localhost:3001",
      "/students": "http://localhost:3001",
      "/pendaftar": "http://localhost:3001",
      "/tagihan-pembayaran": "http://localhost:3001",
      "/tagihan-formulir": "http://localhost:3001",
      "/referensi": "http://localhost:3001",
      "/ukt-mahasiswa": "http://localhost:3001",
      "/monitoring-tarif": "http://localhost:3001",
      "/detail-monitoring-tarif": "http://localhost:3001",
      "/monitoring-tagihan-mahasiswa": "http://localhost:3001",
      "/detail-monitoring-tagihan-mahasiswa": "http://localhost:3001",
      "/monitoring-aturan-akademik": "http://localhost:3001",
      "/detail-monitoring-mahasiswa-tercekal": "http://localhost:3001",
      "/monitoring-ukt": "http://localhost:3001",
      "/detail-monitoring-ukt": "http://localhost:3001",
      "/monitoring-tagihan-semester": "http://localhost:3001",
      "/transaksi-keuangan": "http://localhost:3001",
      "/tagihan": "http://localhost:3001",
    },
  },
});
