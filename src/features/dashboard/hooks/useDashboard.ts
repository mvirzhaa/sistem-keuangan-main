import { useMemo } from "react";
import { useDashboardStore } from "../stores/dashboardStore";

export function formatDashboardCurrency(amount: number): string {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1)} M`;
  } else if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)} Juta`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)} K`;
  }
  return amount.toString();
}

export function useDashboard() {
  const data = useDashboardStore((state) => state.data);
  const periodeList = useDashboardStore((state) => state.periodeList);
  const isLoading = useDashboardStore((state) => state.isLoading);
  const error = useDashboardStore((state) => state.error);
  const fetchDashboardData = useDashboardStore((state) => state.fetchDashboardData);
  const fetchPeriodeList = useDashboardStore((state) => state.fetchPeriodeList);
  const clearError = useDashboardStore((state) => state.clearError);
  const reset = useDashboardStore((state) => state.reset);

  const formattedStats = useMemo(() => {
    if (!data?.stats) return null;
    return {
      totalTagihan: formatDashboardCurrency(data.stats.totalTagihan),
      totalTagihanLunas: formatDashboardCurrency(data.stats.totalTagihanLunas),
      totalPembayaran: formatDashboardCurrency(data.stats.totalPembayaran),
      saldoDeposit: formatDashboardCurrency(data.stats.saldoDeposit),
    };
  }, [data?.stats]);

  return {
    data,
    periodeList,
    isLoading,
    error,
    formattedStats,
    fetchDashboardData,
    fetchPeriodeList,
    clearError,
    reset,
  };
}

export default useDashboard;
