import {
  IoCardOutline,
  IoCheckmarkCircleOutline,
  IoSaveOutline,
  IoWalletOutline,
} from "react-icons/io5";
import Dropdown from "../../../components/inputs/Dropdown";
import DashboardInformationCard from "../components/DashboardInformationCard";
import { useEffect, useState } from "react";
import { useDashboardStore } from "../stores/dashboardStore";
import { dashboardController } from "../controllers/dashboardController";

export default function DashboardPage() {
  document.title = "Dashboard - Selamat Datang di Sistem Informasi Keuangan";

  const [selectedPeriode, setSelectedPeriode] = useState("2024 Genap");
  // const { data, isLoading, error } = useDashboardStore();

  useEffect(() => {
    // Load data saat component mount
    dashboardController.loadDashboardData(selectedPeriode);
  }, [selectedPeriode]);

  const handlePeriodeChange = (periode: string) => {
    setSelectedPeriode(periode);
  };

  const formattedStats = dashboardController.getFormattedStats();

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium ">Dashboard</h1>
        <p className="text-sm text-gray-500 mb-1">
          Selamat Datang di Sistem Informasi Keuangan
        </p>
      </div>
      <div className="container shadow-lg rounded border-t-amber-500 border-t-4 p-4 mb-4">
        <div className="flex space-x-20 space-y-3 flex-col sm:flex-row items-start sm:items-center">
          <p className="text-amber-500 font-medium">Periode</p>
          <Dropdown
            options={["2024 Genap", "2024 Ganjil"]}
            defaultValue={selectedPeriode}
            onChange={handlePeriodeChange}
            className="w-full sm:w-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Tagihan Card */}
        <DashboardInformationCard
          title="Total Tagihan"
          value="23.3 M"
          icon={<IoWalletOutline size={56} />}
          tooltipContent="Total seluruh tagihan mahasiswa yang belum lunas untuk periode berjalan."
          gradient={{ from: "#4299E1", to: "#2B6CB0" }}
        />

        {/* Total Tagihan Lunas Card */}
        <DashboardInformationCard
          title="Total Tagihan Lunas"
          value="31.05 M"
          icon={<IoCheckmarkCircleOutline size={56} />}
          tooltipContent="Total seluruh tagihan mahasiswa yang sudah dilunasi untuk periode berjalan."
          gradient={{ from: "#38B2AC", to: "#2C7A7B" }}
        />

        {/* Total Pembayaran Card */}
        <DashboardInformationCard
          title="Total Pembayaran"
          value="30.4 M"
          icon={<IoCardOutline size={56} />}
          tooltipContent="Total pembayaran yang diterima untuk periode berjalan."
          gradient={{ from: "#ED8936", to: "#C05621" }}
        />

        {/* Saldo Deposit Card */}
        <DashboardInformationCard
          title="Saldo Deposit"
          value="15.64 Juta"
          icon={<IoSaveOutline size={56} />}
          tooltipContent="Total saldo deposit yang tersedia dari semua mahasiswa."
          gradient={{ from: "#D53F8C", to: "#B83280" }}
        />
      </div>
    </>
  );
}
