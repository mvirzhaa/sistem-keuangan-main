import { create } from "zustand";
import { apiService } from "../../../common/services/apiService";

export interface DashboardStats {
  totalTagihan: number;
  totalTagihanLunas: number;
  totalPembayaran: number;
  saldoDeposit: number;
}

export interface DashboardData {
  stats: DashboardStats;
  periode?: string;
  lastUpdated?: string;
}

interface DashboardState {
  // Data
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchDashboardData: (periode?: string) => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // Initial state
  data: null,
  isLoading: false,
  error: null,

  // Actions
  fetchDashboardData: async (periode?: string) => {
    set({ isLoading: true, error: null });

    try {
      const params = periode ? { periode } : {};
      const response = await apiService.get<DashboardData>(
        "/dashboard",
        params,
      );

      set({
        data: response.data,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Gagal memuat data dashboard",
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },

  reset: () => {
    set({
      data: null,
      isLoading: false,
      error: null,
    });
  },
}));
