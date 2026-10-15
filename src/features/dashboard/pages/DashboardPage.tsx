import {
  IoCardOutline,
  IoCheckmarkCircleOutline,
  IoSaveOutline,
  IoWalletOutline,
  IoBarChartOutline,
} from "react-icons/io5";
import Dropdown from "../../../components/inputs/Dropdown";
import DashboardInformationCard from "../components/DashboardInformationCard";
import DashboardTabs, {
  type DashboardTabId,
} from "../components/DashboardTabs";
import StatistikPembayaranChart from "../components/StatistikPembayaranChart";
import ReviewTagihanFunnel from "../components/ReviewTagihanFunnel";
import PieChartCard from "../components/PieChartCard";
import ChartCard from "../components/ChartCard";
import AngkatanMahasiswaChart from "../components/AngkatanMahasiswaChart";
import TransaksiTiapBulanChart from "../components/TransaksiTiapBulanChart";
import PerbandinganTransaksiBulanLaluChart from "../components/PerbandinganTransaksiBulanLaluChart";
import {
  tagihanPerJenisData,
  tagihanPerFakultasData,
  pembayaranPerFakultasData,
  pembayaranPerHariData,
  pembayaranPerMetodeData,
  pembayaranPerAngkatanData,
  uangKuliahTunggalData,
} from "../data/mockDashboardCharts";
import { useEffect, useState } from "react";
import { useDashboardStore } from "../stores/dashboardStore";
import { dashboardController } from "../controllers/dashboardController";

export default function DashboardPage() {
  document.title = "Dashboard - Selamat Datang di Sistem Informasi Keuangan";

  const { periodeList } = useDashboardStore();
  const [selectedPeriode, setSelectedPeriode] = useState("-- Semua Periode --");
  const [activeTab, setActiveTab] = useState<DashboardTabId>("dashboard");

  useEffect(() => {
    // Load list periode dari mock server / API
    dashboardController.loadPeriodeList();
  }, []);

  useEffect(() => {
    // Load data dashboard saat periode berganti
    if (selectedPeriode) {
      dashboardController.loadDashboardData(selectedPeriode);
    }
  }, [selectedPeriode]);

  const handlePeriodeChange = (periode: string) => {
    setSelectedPeriode(periode);
  };

  const formattedStats = dashboardController.getFormattedStats();

  const periodeOptions = [
    "-- Semua Periode --",
    ...(periodeList.length > 0
      ? periodeList.map((p) => p.nama)
      : [
          "2026 Genap",
          "2026 Ganjil",
          "2025 Genap",
          "2025 Ganjil",
          "2024 Genap",
          "2024 Ganjil",
        ]),
  ];

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Dashboard</h1>
        <p className="text-sm text-gray-500 mb-1">
          Selamat Datang di Sistem Informasi Keuangan
        </p>
      </div>

      {/* Filter Periode Box */}
      <div className="container relative z-20 bg-white shadow-md rounded border-t-amber-500 border-t-4 p-4 mb-4">
        <div className="flex space-x-20 space-y-3 flex-col sm:flex-row items-start sm:items-center">
          <p className="text-amber-500 font-medium">Periode</p>
          <Dropdown
            options={periodeOptions}
            defaultValue={selectedPeriode}
            value={selectedPeriode}
            onChange={handlePeriodeChange}
            className="w-full sm:w-md"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10 mb-6">
        {/* Total Tagihan Card */}
        <DashboardInformationCard
          title="Total Tagihan"
          value={formattedStats?.totalTagihan || "23.3 M"}
          icon={<IoWalletOutline size={56} />}
          tooltipContent="Total seluruh tagihan mahasiswa yang belum lunas untuk periode berjalan."
          gradient={{ from: "#4299E1", to: "#2B6CB0" }}
        />

        {/* Total Tagihan Lunas Card */}
        <DashboardInformationCard
          title="Total Tagihan Lunas"
          value={formattedStats?.totalTagihanLunas || "31.05 M"}
          icon={<IoCheckmarkCircleOutline size={56} />}
          tooltipContent="Total seluruh tagihan mahasiswa yang sudah dilunasi untuk periode berjalan."
          gradient={{ from: "#38B2AC", to: "#2C7A7B" }}
        />

        {/* Total Pembayaran Card */}
        <DashboardInformationCard
          title="Total Pembayaran"
          value={formattedStats?.totalPembayaran || "30.4 M"}
          icon={<IoCardOutline size={56} />}
          tooltipContent="Total pembayaran yang diterima untuk periode berjalan."
          gradient={{ from: "#ED8936", to: "#C05621" }}
        />

        {/* Saldo Deposit Card */}
        <DashboardInformationCard
          title="Saldo Deposit"
          value={formattedStats?.saldoDeposit || "15.64 Juta"}
          icon={<IoSaveOutline size={56} />}
          tooltipContent="Total saldo deposit yang tersedia dari semua mahasiswa."
          gradient={{ from: "#D53F8C", to: "#B83280" }}
        />
      </div>

      {/* Dashboard Sub-navigation (Navbar Dashboard) & Charts Container */}
      <div className="bg-white rounded-lg shadow-sm border-t-2 border-t-emerald-500 overflow-hidden mb-8">
        {/* Tabs Bar */}
        <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Contents: pure white background without outer boxes/wrapper */}
        <div className="p-4 sm:p-6 bg-white">
          {/* TAB 1: DASHBOARD (Foto 5) */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Main Line Chart: Statistik Pembayaran */}
              <StatistikPembayaranChart periode={selectedPeriode} />

              {/* Grid 2x2 for Sub-Charts - Natural without card boxes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">
                {/* 1. Review Tagihan Funnel */}
                <ReviewTagihanFunnel />

                {/* 2. Tagihan Per Jenis Pie Chart */}
                <PieChartCard
                  title="Tagihan Per Jenis"
                  slices={tagihanPerJenisData}
                />

                {/* 3. Tagihan Per Fakultas Pie Chart */}
                <PieChartCard
                  title="Tagihan Per Fakultas"
                  slices={tagihanPerFakultasData}
                />

                {/* 4. Pembayaran Per Fakultas Pie Chart */}
                <PieChartCard
                  title="Pembayaran Per Fakultas"
                  slices={pembayaranPerFakultasData}
                />

                {/* 5. Pembayaran Per Hari Pie Chart */}
                <PieChartCard
                  title="Pembayaran Per Hari"
                  slices={pembayaranPerHariData}
                />

                {/* 6. Pembayaran Per Metode Pembayaran */}
                <PieChartCard
                  title="Pembayaran Per Metode Pembayaran"
                  slices={pembayaranPerMetodeData}
                />

                {/* 7. Pembayaran Per Angkatan Mahasiswa */}
                <PieChartCard
                  title="Pembayaran Per Angkatan Mahasiswa"
                  slices={pembayaranPerAngkatanData}
                />

                {/* 8. Uang Kuliah Tunggal Pie Chart */}
                <PieChartCard
                  title="Uang Kuliah Tunggal"
                  slices={uangKuliahTunggalData}
                  unitName="Orang"
                />
              </div>
            </div>
          )}

          {/* TAB 2: JENIS TAGIHAN (Foto 1 - Kosong dan kata-kata natural) */}
          {activeTab === "jenis_tagihan" && (
            <div className="min-h-[420px] flex items-center justify-center p-8 text-center">
              <p className="text-gray-400 text-sm font-normal">
                Belum ada data untuk jenis tagihan periode {selectedPeriode}
              </p>
            </div>
          )}

          {/* TAB 3: ANGKATAN MAHASISWA (Foto 2 - Horizontal Bar Chart) */}
          {activeTab === "angkatan_mahasiswa" && (
            <div className="py-2">
              <AngkatanMahasiswaChart />
            </div>
          )}

          {/* TAB 4: TRANSAKSI TIAP BULAN (Foto 3 dan Foto 4) */}
          {activeTab === "transaksi_tiap_bulan" && (
            <div className="space-y-10 py-2">
              {/* Foto 3: Transaksi Tiap Bulan */}
              <TransaksiTiapBulanChart />

              {/* Foto 4: Perbandingan Transaksi Dengan Bulan Lalu */}
              <PerbandinganTransaksiBulanLaluChart />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
