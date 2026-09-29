import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";

import { ROUTES } from "./routes";
import { withSuspense } from "../pages/LazyWrapper";
import LoginPage from "../../features/auth/pages/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute";
import UnauthorizedPage from "../pages/UnauthorizedPage";

// Route configuration
export const routeConfig: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.DASHBOARD,
    element: (
      <ProtectedRoute requiredRole="SUPER_ADMIN">
        {withSuspense(
          lazy(() => import("../../features/dashboard/pages/DashboardPage")),
        )}
      </ProtectedRoute>
    ),
  },
  // Operasional Routes
  {
    path: ROUTES.OPERASIONAL.PEMBAYARAN,
    element: withSuspense(
      lazy(() => import("../../features/operasional/pages/PembayaranPage")),
    ),
  },
  {
    path: ROUTES.OPERASIONAL.PEMBAYARAN_FORMULIR,
    element: withSuspense(
      lazy(
        () => import("../../features/operasional/pages/PembayaranFormulirPage"),
      ),
    ),
  },
  {
    path: ROUTES.OPERASIONAL.UKT_MAHASISWA,
    element: withSuspense(
      lazy(() => import("../../features/operasional/pages/UktMahasiswaPage")),
    ),
  },
  {
    path: ROUTES.OPERASIONAL.MONITORING_TARIF,
    element: withSuspense(
      lazy(
        () => import("../../features/operasional/pages/MonitoringTarifPage"),
      ),
    ),
  },
  {
    path: ROUTES.OPERASIONAL.MONITORING_TAGIHAN,
    element: withSuspense(
      lazy(
        () =>
          import(
            "../../features/operasional/pages/MonitoringTagihanfMahasiswaPage"
          ),
      ),
    ),
  },
  {
    path: ROUTES.OPERASIONAL.MONITORING_ATURAN,
    element: withSuspense(
      lazy(
        () =>
          import(
            "../../features/operasional/pages/MonitoringAturanAkademikPage"
          ),
      ),
    ),
  },
  {
    path: ROUTES.OPERASIONAL.MONITORING_UKT,
    element: withSuspense(
      lazy(() => import("../../features/operasional/pages/MonitoringUktPage")),
    ),
  },
  // Transaksi Routes
  {
    path: ROUTES.TRANSAKSI.KEUANGAN,
    element: withSuspense(
      lazy(() => import("../../features/transaksi/pages/KeuanganPage")),
    ),
  },
  {
    path: ROUTES.TRANSAKSI.TAGIHAN,
    element: withSuspense(
      lazy(() => import("../../features/transaksi/pages/TagihanPage")),
    ),
  },
  {
    path: ROUTES.TRANSAKSI.DETAIL_TAGIHAN,
    element: withSuspense(
      lazy(() => import("../../features/transaksi/pages/DetailTagihanPage")),
    ),
  },
  {
    path: ROUTES.TRANSAKSI.PEMBAYARAN,
    element: withSuspense(
      lazy(() => import("../../features/transaksi/pages/PembayaranPage")),
    ),
  },
  {
    path: ROUTES.TRANSAKSI.DEPOSIT,
    element: withSuspense(
      lazy(() => import("../../features/transaksi/pages/DepositPage")),
    ),
  },
  {
    path: ROUTES.TRANSAKSI.DETAIL_DEPOSIT,
    element: withSuspense(
      lazy(() => import("../../features/transaksi/pages/DetailDepositPage")),
    ),
  },
  {
    path: ROUTES.TRANSAKSI.VIRTUAL_ACCOUNT,
    element: withSuspense(
      lazy(() => import("../../features/transaksi/pages/VirtualAccountPage")),
    ),
  },
  {
    path: ROUTES.TRANSAKSI.DATA_TRANSAKSI_VA,
    element: withSuspense(
      lazy(() => import("../../features/transaksi/pages/DataTransaksiVAPage")),
    ),
  },
  {
    path: ROUTES.TRANSAKSI.POTONGAN_BEASISWA,
    element: withSuspense(
      lazy(
        () => import("../../features/transaksi/pages/PotonganDanBeasiswaPage"),
      ),
    ),
  },
  {
    path: ROUTES.TRANSAKSI.VOUCHER,
    element: withSuspense(
      lazy(() => import("../../features/transaksi/pages/VoucherPage")),
    ),
  },
  // Generate Routes
  {
    path: ROUTES.GENERATE.TAGIHAN_MAHASISWA,
    element: withSuspense(
      lazy(() => import("../../features/generate/pages/TagihanMahasiswaPage")),
    ),
  },
  {
    path: ROUTES.GENERATE.TAGIHAN_PENDAFTAR,
    element: withSuspense(
      lazy(() => import("../../features/generate/pages/TagihanPendaftarPage")),
    ),
  },
  //Tarif Routes
  {
    path: ROUTES.TARIF.TAGIHAN,
    element: withSuspense(
      lazy(() => import("../../features/tarif/pages/TarifTagihanPage")),
    ),
  },
  {
    path: ROUTES.TARIF.DETAIL_TARIF_TAGIHAN,
    element: withSuspense(
      lazy(() => import("../../features/tarif/pages/DetailTarifTagihanPage")),
    ),
  },
  {
    path: ROUTES.TARIF.MATA_KULIAH,
    element: withSuspense(
      lazy(() => import("../../features/tarif/pages/TarifMataKuliahPage")),
    ),
  },
  {
    path: ROUTES.TARIF.FORMULIR,
    element: withSuspense(
      lazy(() => import("../../features/tarif/pages/TarifFormulirPage")),
    ),
  },
  {
    path: ROUTES.TARIF.UKT,
    element: withSuspense(
      lazy(() => import("../../features/tarif/pages/TarifUktPage")),
    ),
  },
  {
    path: ROUTES.TARIF.DETAIL_TARIF_UKT,
    element: withSuspense(
      lazy(() => import("../../features/tarif/pages/DetailTarifUktPage")),
    ),
  },
  {
    path: ROUTES.TARIF.POTONGAN,
    element: withSuspense(
      lazy(() => import("../../features/tarif/pages/TarifPotonganPage")),
    ),
  },

  //Referensi routes
  {
    path: ROUTES.REFERENSI.TRANSAKSI.JENIS_TRANSAKSI,
    element: withSuspense(
      lazy(
        () =>
          import("../../features/referensi/transaksi/pages/JenisTransaksiPage"),
      ),
    ),
  },

  {
    path: ROUTES.REFERENSI.TRANSAKSI.KELOMPOK,
    element: withSuspense(
      lazy(
        () => import("../../features/referensi/transaksi/pages/KelompokPage"),
      ),
    ),
  },
  {
    path: ROUTES.REFERENSI.TRANSAKSI.FREKUENSI,
    element: withSuspense(
      lazy(
        () => import("../../features/referensi/transaksi/pages/FrekuensiPage"),
      ),
    ),
  },
  {
    path: ROUTES.REFERENSI.TRANSAKSI.AKUN_TRANSAKSI,
    element: withSuspense(
      lazy(
        () =>
          import("../../features/referensi/transaksi/pages/AkunTransaksiPage"),
      ),
    ),
  },
  {
    path: ROUTES.REFERENSI.PEMBAYARAN.CHANNEL_PEMBAYARAN,
    element: withSuspense(
      lazy(
        () =>
          import(
            "../../features/referensi/pembayaran/pages/ChannelPembayaranPage"
          ),
      ),
    ),
  },
  {
    path: ROUTES.REFERENSI.PEMBAYARAN.PENGATURAN_METODE_PEMBAYARAN,
    element: withSuspense(
      lazy(
        () =>
          import(
            "../../features/referensi/pembayaran/pages/PengaturanMetodePembayaranPage"
          ),
      ),
    ),
  },
  {
    path: ROUTES.REFERENSI.PEMBAYARAN.PROMO_EDUFIN,
    element: withSuspense(
      lazy(
        () =>
          import("../../features/referensi/pembayaran/pages/PromoEdufinPage"),
      ),
    ),
  },
  {
    path: ROUTES.REFERENSI.TARIF.KELOMPOK_UKT,
    element: withSuspense(
      lazy(
        () => import("../../features/referensi/tarif/pages/KelompokUktPage"),
      ),
    ),
  },
  {
    path: ROUTES.REFERENSI.POTONGAN.POTONGAN,
    element: withSuspense(
      lazy(
        () => import("../../features/referensi/potongan/pages/PotonganPage"),
      ),
    ),
  },
  {
    path: ROUTES.REFERENSI.POTONGAN.DETAIL_POTONGAN,
    element: withSuspense(
      lazy(
        () =>
          import("../../features/referensi/potongan/pages/DetailPotonganPage"),
      ),
    ),
  },
  {
    path: ROUTES.REFERENSI.POTONGAN.ATURAN_POTONGAN,
    element: withSuspense(
      lazy(
        () =>
          import("../../features/referensi/potongan/pages/AturanPotongaPage"),
      ),
    ),
  },
  {
    path: ROUTES.REFERENSI.PELENGKAP.ATURAN_AKADEMIK,
    element: withSuspense(
      lazy(
        () =>
          import("../../features/referensi/pelengkap/pages/AturanAkademikPage"),
      ),
    ),
  },
  {
    path: ROUTES.REFERENSI.PELENGKAP.REKANAN,
    element: withSuspense(
      lazy(
        () => import("../../features/referensi/pelengkap/pages/RekananPage"),
      ),
    ),
  },
  {
    path: ROUTES.REFERENSI.VOUCHER.VOUCHER,
    element: withSuspense(
      lazy(() => import("../../features/referensi/voucher/pages/VoucherPage")),
    ),
  },
  {
    path: ROUTES.REFERENSI.VOUCHER.DETAIL_VOUCHER,
    element: withSuspense(
      lazy(
        () =>
          import("../../features/referensi/voucher/pages/DetailVoucherPage"),
      ),
    ),
  },
  {
    path: ROUTES.REFERENSI.VOUCHER.ATURAN_VOUCHER,
    element: withSuspense(
      lazy(
        () =>
          import("../../features/referensi/voucher/pages/AturanVoucherPage"),
      ),
    ),
  },

  // Pengaturan routes
  {
    path: ROUTES.PENGATURAN.TAGIHAN,
    element: withSuspense(
      lazy(
        () => import("../../features/pengaturan/pages/PengaturanTagihanPage"),
      ),
    ),
  },
  {
    path: ROUTES.PENGATURAN.ATURAN_AKADEMIK,
    element: withSuspense(
      lazy(
        () =>
          import(
            "../../features/pengaturan/pages/PengaturanAturanAkademikPage"
          ),
      ),
    ),
  },
  {
    path: ROUTES.PENGATURAN.DETAIL_ATURAN_AKADEMIK,
    element: withSuspense(
      lazy(
        () =>
          import(
            "../../features/pengaturan/pages/DetailPengaturanAturanAkademikPage"
          ),
      ),
    ),
  },
  {
    path: ROUTES.PENGATURAN.JENIS_TAGIHAN,
    element: withSuspense(
      lazy(
        () =>
          import("../../features/pengaturan/pages/PengaturanJenisTagihanPage"),
      ),
    ),
  },
  {
    path: ROUTES.PENGATURAN.PERIODE_PEMBAYARAN,
    element: withSuspense(
      lazy(
        () =>
          import(
            "../../features/pengaturan/pages/PengaturanPeriodePembayaranPage"
          ),
      ),
    ),
  },
  {
    path: ROUTES.PENGATURAN.SETTING_APLIKASI,
    element: withSuspense(
      lazy(
        () => import("../../features/pengaturan/pages/PengaturanAplikasiPage"),
      ),
    ),
  },
];
