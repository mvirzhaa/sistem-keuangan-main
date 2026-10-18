import { apiService } from "../../../common/services/apiService";
import type { ApiResponse } from "../../../common/types/apiTypes";

export interface TransaksiKeuanganData {
  id: string;
  no: number;
  kodeTransaksi: string;
  jenisTransaksi: string; // "INV" | "DEP" | "PAY"
  periode: string;
  periodeNama?: string;
  tanggal: string;
  idPengguna: string;
  nama: string;
  uraian: string;
  debet: number | null;
  kredit: number | null;
}

export interface RiwayatPembayaranData {
  no?: number;
  kodePembayaran: string;
  periode: string;
  metodePembayaran: string;
  channel: string;
  isOnline: boolean;
  tanggal: string;
  nominal: number;
  isBatal: boolean;
}

export interface RiwayatPotonganData {
  no?: number;
  jenisPotongan: string;
  nominal: number;
  aksi?: string;
}

export interface TagihanItemData {
  id: string;
  kodeTagihan: string;
  nim: string;
  nama: string;
  prodi?: string;
  sistemKuliah?: string;
  jalurPendaftaran?: string;
  periodeMasuk?: string;
  gelombang?: string;
  penerima?: string;
  kelompok?: string;
  jenis: string;
  jenisTagihan?: string;
  cicilan: number;
  bulan: string;
  tahun?: string;
  nominal: number;
  denda: number;
  potongan: number;
  potonganLangsung?: number;
  potonganBeasiswa?: number;
  bayar: number;
  lunas: boolean;
  statusPembayaran: "lunas" | "belum_lunas" | "potongan_penuh";
  tglTagihan?: string;
  tglTerbit?: string;
  tglJatuhTempo?: string;
  tglAkhirDispensasi?: string;
  keterangan?: string;
  periodeTagihan?: string;
  angkatan?: string;
  riwayatPembayaran?: RiwayatPembayaranData[];
  riwayatPotongan?: RiwayatPotonganData[];
}

export interface VirtualAccountItem {
  no?: number;
  kodeVirtualAccount: string;
  metodePembayaran: string;
  tanggalVA: string;
  tanggalJatuhTempo: string;
  tanggalBayar: string;
  status: string;
  nominal: number;
  nominalBayar: number;
}

export interface TagihanDibayarItem {
  no?: number;
  kodeTagihan: string;
  jenisTagihan: string;
  cicilan: number;
  bulan: string;
  nominal: number;
  denda: number;
  potongan: number;
  bayar: number;
}

export interface DepositItem {
  no?: number;
  kodeDeposit: string;
  posisiDeposit: string;
  nominal: number;
}

export interface PembayaranDetailData {
  id: string;
  kodePembayaran: string;
  nim: string;
  nama: string;
  periode: string;
  periodePembayaran?: string;
  metodePembayaran: string;
  channel: string;
  online: boolean;
  tanggal: string;
  nominal: number;
  biayaAdmin?: number;
  batal: boolean;
  eksekutor?: string;
  dokumenPendukung?: string;
  keterangan?: string;
  penerima?: string;
  angkatan?: string;
  programStudi?: string;
  gelombang?: string;
  jalurPendaftaran?: string;
  sistemKuliah?: string;
  virtualAccountList?: VirtualAccountItem[];
  tagihanList?: TagihanDibayarItem[];
  depositList?: DepositItem[];
}

export const transaksiApi = {
  /**
   * Mengambil list data transaksi keuangan dari server / database json
   */
  getTransaksiKeuangan: (
    params?: Record<string, any>,
  ): Promise<ApiResponse<TransaksiKeuanganData[]>> => {
    return apiService.get<TransaksiKeuanganData[]>("/transaksi-keuangan", params);
  },

  /**
   * Mengambil list data tagihan dari server / database json
   */
  getTagihan: (
    params?: Record<string, any>,
  ): Promise<ApiResponse<TagihanItemData[]>> => {
    return apiService.get<TagihanItemData[]>("/tagihan", params);
  },

  /**
   * Mengambil satu data detail tagihan berdasarkan ID
   */
  getTagihanById: (
    id: string,
  ): Promise<ApiResponse<TagihanItemData>> => {
    return apiService.get<TagihanItemData>(`/tagihan/${id}`);
  },

  /**
   * Menyimpan data tagihan baru ke server / database json
   */
  createTagihan: (
    data: Partial<TagihanItemData> & Record<string, any>,
  ): Promise<ApiResponse<TagihanItemData>> => {
    return apiService.post<TagihanItemData>("/tagihan", data);
  },

  /**
   * Menghapus data tagihan berdasarkan ID
   */
  deleteTagihan: (id: string): Promise<ApiResponse<any>> => {
    return apiService.delete<any>(`/tagihan/${id}`);
  },

  /**
   * Mengambil list data pembayaran dari server / database json
   */
  getPembayaran: (
    params?: Record<string, any>,
  ): Promise<ApiResponse<PembayaranDetailData[]>> => {
    return apiService.get<PembayaranDetailData[]>("/pembayaran", params);
  },

  /**
   * Mengambil satu data detail pembayaran berdasarkan ID
   */
  getPembayaranById: (
    id: string,
  ): Promise<ApiResponse<PembayaranDetailData>> => {
    return apiService.get<PembayaranDetailData>(`/pembayaran/${id}`);
  },

  /**
   * Mengambil list data deposit dari server / database json
   */
  getDeposit: (
    params?: Record<string, any>,
  ): Promise<ApiResponse<DepositData[]>> => {
    return apiService.get<DepositData[]>("/deposit", params);
  },

  /**
   * Mengambil satu data detail deposit berdasarkan ID
   */
  getDepositById: (
    id: string,
  ): Promise<ApiResponse<DepositData>> => {
    return apiService.get<DepositData>(`/deposit/${id}`);
  },

  /**
   * Menambahkan data deposit baru ke server / database json
   */
  createDeposit: (
    data: Partial<DepositData>,
  ): Promise<ApiResponse<DepositData>> => {
    return apiService.post<DepositData>("/deposit", data);
  },

  /**
   * Menghapus data deposit berdasarkan ID
   */
  deleteDeposit: (id: string): Promise<ApiResponse<any>> => {
    return apiService.delete<any>(`/deposit/${id}`);
  },

  /**
   * Mengambil data saldo deposit mahasiswa dari server / database json
   */
  getSaldoDepositMahasiswa: (
    params?: Record<string, any>,
  ): Promise<ApiResponse<SaldoDepositMahasiswaItem[]>> => {
    return apiService.get<SaldoDepositMahasiswaItem[]>(
      "/saldoDepositMahasiswa",
      params
    );
  },

  /**
   * Mengambil data virtual account dari server / database json
   */
  getVirtualAccount: (
    params?: Record<string, any>,
  ): Promise<ApiResponse<VirtualAccountData[]>> => {
    return apiService.get<VirtualAccountData[]>("/virtualAccount", params);
  },

  /**
   * Mengambil satu data virtual account berdasarkan ID
   */
  getVirtualAccountById: (
    id: string,
  ): Promise<ApiResponse<VirtualAccountData>> => {
    return apiService.get<VirtualAccountData>(`/virtualAccount/${id}`);
  },

  /**
   * Membuat data virtual account baru ke server / database json
   */
  createVirtualAccount: (
    data: Partial<VirtualAccountData>,
  ): Promise<ApiResponse<VirtualAccountData>> => {
    return apiService.post<VirtualAccountData>("/virtualAccount", data);
  },

  /**
   * Mengupdate data virtual account berdasarkan ID
   */
  updateVirtualAccount: (
    id: string,
    data: Partial<VirtualAccountData>,
  ): Promise<ApiResponse<VirtualAccountData>> => {
    return apiService.patch<VirtualAccountData>(`/virtualAccount/${id}`, data);
  },

  /**
   * Membatalkan virtual account (status -> BATAL)
   */
  cancelVirtualAccount: (
    id: string,
  ): Promise<ApiResponse<VirtualAccountData>> => {
    return apiService.patch<VirtualAccountData>(`/virtualAccount/${id}`, {
      status: "BATAL",
    });
  },

  /**
   * Menghapus virtual account berdasarkan ID
   */
  deleteVirtualAccount: (id: string): Promise<ApiResponse<any>> => {
    return apiService.delete<any>(`/virtualAccount/${id}`);
  },

  /**
   * Mengambil data potongan dan beasiswa dari server / database json
   */
  getPotonganDanBeasiswa: (
    params?: Record<string, any>,
  ): Promise<ApiResponse<PotonganDanBeasiswaData[]>> => {
    return apiService.get<PotonganDanBeasiswaData[]>(
      "/potonganDanBeasiswa",
      params,
    );
  },

  /**
   * Mengupdate data potongan dan beasiswa berdasarkan ID
   */
  updatePotonganDanBeasiswa: (
    id: string,
    data: Partial<PotonganDanBeasiswaData>,
  ): Promise<ApiResponse<PotonganDanBeasiswaData>> => {
    return apiService.patch<PotonganDanBeasiswaData>(
      `/potonganDanBeasiswa/${id}`,
      data,
    );
  },

  /**
   * Menghapus data potongan dan beasiswa berdasarkan ID
   */
  deletePotonganDanBeasiswa: (id: string): Promise<ApiResponse<any>> => {
    return apiService.delete<any>(`/potonganDanBeasiswa/${id}`);
  },

  /**
   * Mengambil data penerima voucher dari server / database json
   */
  getPenerimaVoucher: (
    params?: Record<string, any>,
  ): Promise<ApiResponse<VoucherData[]>> => {
    return apiService.get<VoucherData[]>("/penerimaVoucher", params);
  },

  /**
   * Mengupdate data penerima voucher (misal: ubah nominal) berdasarkan ID
   */
  updatePenerimaVoucher: (
    id: string,
    data: Partial<VoucherData>,
  ): Promise<ApiResponse<VoucherData>> => {
    return apiService.patch<VoucherData>(`/penerimaVoucher/${id}`, data);
  },

  /**
   * Menghapus data penerima voucher berdasarkan ID
   */
  deletePenerimaVoucher: (id: string): Promise<ApiResponse<any>> => {
    return apiService.delete<any>(`/penerimaVoucher/${id}`);
  },
};

export interface VoucherData {
  id: string;
  no?: number;
  idPendaftar: string;
  nama: string;
  voucher: string;
  periode: string;
  nominal: number;
  digunakan: number;
  penerima?: string;
}

export interface PotonganDanBeasiswaData {
  id: string;
  no?: number;
  nim: string;
  nama: string;
  angkatan: string;
  programStudi: string;
  sumber: string;
  beasiswa: string;
  periode: string;
  nominal: number;
  digunakan: number;
  jenisPotongan?: string;
  penerima?: string;
}

export interface VATagihanItem {
  kodeTagihan: string;
  jenisTagihan: string;
  periode: string;
  bulan?: string;
  angsuran?: number;
  nominal: number;
  denda?: number;
  potongan?: number;
  sisaTagihan?: number;
  jumlahBayar?: number;
}

export interface DepositData {
  id: string;
  kodeDeposit: string;
  nim: string;
  nama: string;
  periode: string;
  periodeDeposit?: string;
  tanggal: string;
  metodePembayaran: string;
  channel: string;
  masuk: number | null;
  keluar: number | null;
  posisiTransaksi?: string;
  eksekutor?: string;
  uraian?: string;
  dokumenPendukung?: string;
  penerima?: string;
  angkatan?: string;
  programStudi?: string;
  gelombang?: string;
  jalurPendaftaran?: string;
  sistemKuliah?: string;
}

export interface SaldoDepositMahasiswaItem {
  id: string;
  no?: number;
  nim: string;
  nama: string;
  prodi: string;
  saldo: number;
}

export interface RiwayatPembayaranVAItem {
  no?: number;
  kodePembayaran: string;
  tanggal: string;
  nominal: number;
  status: string;
}

export interface VirtualAccountData {
  id: string;
  kodeVA: string;
  nim: string;
  nama: string;
  channel: string;
  tglJatuhTempo: string;
  nominal: number;
  bayar: number | null;
  tglBayar: string | null;
  status: "LUNAS" | "AKTIF" | "BATAL";
  penerimaTagihan?: string;
  kelompokTagihan?: string;
  metodePembayaran?: string;
  angkatan?: string;
  unitKerja?: string;
  gelombang?: string;
  jalurPendaftaran?: string;
  sistemKuliah?: string;
  prodi?: string;
  tglVA?: string;
  paymentUrl?: string;
  tagihanList?: VATagihanItem[];
  riwayatPembayaran?: RiwayatPembayaranVAItem[];
}

export default transaksiApi;


