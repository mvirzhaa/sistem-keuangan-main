import { apiService } from "../../../common/services/apiService";
import type { ApiResponse } from "../../../common/types/apiTypes";
import type { DashboardData, PeriodeItem } from "../stores/dashboardStore";

export const dashboardApi = {
  /**
   * Mengambil data statistik dashboard berdasarkan periode tertentu
   * @param periode Nama periode (opsional, contoh: "2026 Genap" atau "-- Semua Periode --")
   */
  getDashboardData: (periode?: string): Promise<ApiResponse<DashboardData>> => {
    const params = periode ? { periode } : undefined;
    return apiService.get<DashboardData>("/dashboard", params);
  },

  /**
   * Mengambil daftar master periode dari server / database json
   */
  getPeriodeList: (): Promise<ApiResponse<PeriodeItem[]>> => {
    return apiService.get<PeriodeItem[]>("/periode");
  },
};

export default dashboardApi;
