import { create } from "zustand";
import { apiService } from "../../../common/services/apiService";

export interface PeriodeItem {
  id: string;
  nama: string;
  tahun: number;
  semester: string;
  isActive: boolean;
}

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
  periodeList: PeriodeItem[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchDashboardData: (periode?: string) => Promise<void>;
  fetchPeriodeList: () => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // Initial state
  data: null,
  periodeList: [],
  isLoading: false,
  error: null,

  fetchPeriodeList: async () => {
    try {
      const response = await apiService.get<PeriodeItem[]>("/periode");
      set({ periodeList: response.data || [] });
    } catch (error: any) {
      console.error("Gagal memuat list periode:", error);
    }
  },

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
