import { apiService } from "../../../common/services/apiService";
import type { ApiResponse } from "../../../common/types/apiTypes";

export interface DetailMonitoringGenerateTagihanItem {
  id: string;
  nim: string;
  nama: string;
  periodeMasuk: string;
  unit: string;
  status: "Lunas" | "Belum Lunas" | string;
  sks: number;
  jenisAkun: string;
  nominalTarif: number;
  nominalPotongan: number;
  nominalSekarang: number;
  cicilanKe: number;
  periodeTagihan?: string;
  gelombang?: string;
  jalur?: string;
  sistemKuliah?: string;
  frekuensi?: string;
}

export interface DetailMonitoringGenerateTagihanPendaftarItem {
  id: string;
  kodePendaftar: string;
  nama: string;
  periode: string;
  gelombang: string;
  jalurPendaftaran: string;
  sistemKuliah: string;
  unitDiterima: string;
  unit?: string;
  jenisAkun: string;
  nominalTarif: number;
  nominalPotongan: number;
  nominalSekarang: number;
  cicilanKe: number;
  status?: string;
  periodeMasuk?: string;
  periodeTagihan?: string;
  frekuensi?: string;
}

export const generateApi = {
  /**
   * Mengambil list detail monitoring generate tagihan mahasiswa
   */
  getDetailMonitoringGenerateTagihanMahasiswa: (
    params?: Record<string, any>,
  ): Promise<ApiResponse<DetailMonitoringGenerateTagihanItem[]>> => {
    return apiService.get<DetailMonitoringGenerateTagihanItem[]>(
      "/detail-monitoring-generate-tagihan-mahasiswa",
      params,
    );
  },

  /**
   * Mengambil list detail monitoring generate tagihan pendaftar
   */
  getDetailMonitoringGenerateTagihanPendaftar: (
    params?: Record<string, any>,
  ): Promise<ApiResponse<DetailMonitoringGenerateTagihanPendaftarItem[]>> => {
    return apiService.get<DetailMonitoringGenerateTagihanPendaftarItem[]>(
      "/detail-monitoring-generate-tagihan-pendaftar",
      params,
    );
  },

  /**
   * Batch generate tagihan mahasiswa berdasarkan pilihan item transaksi
   */
  generateTagihanMahasiswa: (payload: {
    unitId?: string;
    frekuensi?: string;
    items: string[];
  }): Promise<ApiResponse<{ success: boolean; message: string }>> => {
    return apiService.post("/tagihan/generate", payload);
  },

  /**
   * Batch batalkan tagihan mahasiswa berdasarkan pilihan item transaksi
   */
  batalkanTagihanMahasiswa: (payload: {
    unitId?: string;
    frekuensi?: string;
    items: string[];
  }): Promise<ApiResponse<{ success: boolean; message: string }>> => {
    return apiService.post("/tagihan/cancel", payload);
  },
};

export default generateApi;
