import { apiService } from "../../../common/services/apiService";
import type { ApiResponse } from "../../../common/types/apiTypes";
import type { UktMahasiswaData } from "../components/UktMahasiswaTable";
import type { Student } from "../pages/PembayaranPage";
import type { Pendaftar } from "../pages/PembayaranFormulirPage";

export const operasionalApi = {
  /**
   * Mengambil list data mahasiswa UKT dari server / database json
   */
  getUktMahasiswa: (): Promise<ApiResponse<UktMahasiswaData[]>> => {
    return apiService.get<UktMahasiswaData[]>("/ukt-mahasiswa");
  },

  /**
   * Memperbarui data UKT seorang mahasiswa berdasarkan ID
   */
  updateUktMahasiswa: (
    id: string,
    data: Partial<UktMahasiswaData>,
  ): Promise<ApiResponse<UktMahasiswaData>> => {
    return apiService.put<UktMahasiswaData>(`/ukt-mahasiswa/${id}`, data);
  },

  /**
   * Memperbarui data UKT beberapa mahasiswa sekaligus (batch)
   */
  batchUpdateUktMahasiswa: (
    ids: string[],
    updates: Partial<UktMahasiswaData>,
  ): Promise<ApiResponse<UktMahasiswaData[]>> => {
    return apiService.patch<UktMahasiswaData[]>("/ukt-mahasiswa/batch", {
      ids,
      updates,
    });
  },

  /**
   * Mencari data mahasiswa berdasarkan keyword NIM / Nama
   */
  getStudents: (query?: string): Promise<ApiResponse<Student[]>> => {
    const params = query ? { q: query } : undefined;
    return apiService.get<Student[]>("/students", params);
  },

  /**
   * Mencari data pendaftar berdasarkan keyword ID / Nama
   */
  getPendaftar: (query?: string): Promise<ApiResponse<Pendaftar[]>> => {
    const params = query ? { q: query } : undefined;
    return apiService.get<Pendaftar[]>("/pendaftar", params);
  },

  /**
   * Mengambil tagihan pembayaran mahasiswa berdasarkan NIM
   */
  getTagihanPembayaran: (nim: string): Promise<ApiResponse<any[]>> => {
    return apiService.get<any[]>("/tagihan-pembayaran", { nim });
  },

  /**
   * Mengambil tagihan formulir pendaftar berdasarkan ID Pendaftar
   */
  getTagihanFormulir: (idPendaftar: string): Promise<ApiResponse<any[]>> => {
    return apiService.get<any[]>("/tagihan-formulir", { idPendaftar });
  },

  /**
   * Mengambil list monitoring tarif dari server / database json
   */
  getMonitoringTarif: (): Promise<ApiResponse<any[]>> => {
    return apiService.get<any[]>("/monitoring-tarif");
  },

  /**
   * Mengambil detail tarif jenis akun dari server / database json
   */
  getDetailMonitoringTarif: (
    monitoringTarifId?: string,
  ): Promise<ApiResponse<any[]>> => {
    const params = monitoringTarifId ? { monitoringTarifId } : undefined;
    return apiService.get<any[]>("/detail-monitoring-tarif", params);
  },

  /**
   * Mengambil list monitoring tagihan mahasiswa dari server / database json
   */
  getMonitoringTagihanMahasiswa: (): Promise<ApiResponse<any[]>> => {
    return apiService.get<any[]>("/monitoring-tagihan-mahasiswa");
  },

  /**
   * Mengambil detail tagihan mahasiswa per program studi dari server / database json
   */
  getDetailMonitoringTagihanMahasiswa: (
    params?: Record<string, any>,
  ): Promise<ApiResponse<any[]>> => {
    return apiService.get<any[]>("/detail-monitoring-tagihan-mahasiswa", params);
  },

  /**
   * Mengambil list monitoring mahasiswa tercekal aturan akademik dari server / database json
   */
  getMonitoringAturanAkademik: (): Promise<ApiResponse<any[]>> => {
    return apiService.get<any[]>("/monitoring-aturan-akademik");
  },

  /**
   * Mengambil detail mahasiswa tercekal aturan akademik per prodi dari server / database json
   */
  getDetailMonitoringMahasiswaTercekal: (
    params?: Record<string, any>,
  ): Promise<ApiResponse<any[]>> => {
    return apiService.get<any[]>("/detail-monitoring-mahasiswa-tercekal", params);
  },

  /**
   * Mengambil list monitoring UKT dari server / database json
   */
  getMonitoringUkt: (): Promise<ApiResponse<any[]>> => {
    return apiService.get<any[]>("/monitoring-ukt");
  },

  /**
   * Mengambil detail monitoring mahasiswa penerima UKT dari server / database json
   */
  getDetailMonitoringUkt: (
    params?: Record<string, any>,
  ): Promise<ApiResponse<any[]>> => {
    return apiService.get<any[]>("/detail-monitoring-ukt", params);
  },

  /**
   * Mengambil list monitoring tagihan semester dari server / database json
   */
  getMonitoringTagihanSemester: (): Promise<ApiResponse<any[]>> => {
    return apiService.get<any[]>("/monitoring-tagihan-semester");
  },
};

export default operasionalApi;
