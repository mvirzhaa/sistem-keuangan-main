export interface TarifTagihanItem {
  id: string;
  periodeMasuk: string;
  gelombang: string;
  jalurPendaftaran: string;
  sistemKuliah: string;
  programStudi: string;
  jenisAkun: string;
  nominalTarif: number;
  cicilan: string;
  sksSemester?: string | number;
  frekuensiDenda?: string;
  nominalDenda?: string | number;
  maxDenda?: string | number;
}

const STORAGE_KEY = "tarif_tagihan_data";

export const DEFAULT_TARIF_TAGIHAN: TarifTagihanItem[] = [
  {
    id: "1",
    periodeMasuk: "2020 Ganjil",
    gelombang: "Gelombang 1",
    jalurPendaftaran: "Seleksi Mandiri PTS",
    sistemKuliah: "Reguler",
    programStudi: "S1 - Pendidikan Masyarakat",
    jenisAkun: "SPP",
    nominalTarif: 2000000,
    cicilan: "Sekali Bayar",
    sksSemester: 0,
    frekuensiDenda: "",
    nominalDenda: "0,00",
    maxDenda: "0,00",
  },
  {
    id: "2",
    periodeMasuk: "2024 Genap",
    gelombang: "Gelombang 1",
    jalurPendaftaran: "Seleksi Mandiri PTS",
    sistemKuliah: "Reguler",
    programStudi: "S1 - Kesehatan Masyarakat",
    jenisAkun: "SPP",
    nominalTarif: 2000000,
    cicilan: "Sekali Bayar",
    sksSemester: 0,
    frekuensiDenda: "",
    nominalDenda: "0,00",
    maxDenda: "0,00",
  },
  {
    id: "3",
    periodeMasuk: "2024 Genap",
    gelombang: "Gelombang 2",
    jalurPendaftaran: "Seleksi Mandiri PTS",
    sistemKuliah: "Reguler",
    programStudi: "S1 - Kesehatan Masyarakat",
    jenisAkun: "SPP",
    nominalTarif: 2000000,
    cicilan: "Sekali Bayar",
    sksSemester: 0,
    frekuensiDenda: "",
    nominalDenda: "0,00",
    maxDenda: "0,00",
  },
  {
    id: "4",
    periodeMasuk: "2024 Ganjil",
    gelombang: "Gelombang 1",
    jalurPendaftaran: "SNMPTN",
    sistemKuliah: "Reguler",
    programStudi: "S1 - Teknik Informatika",
    jenisAkun: "Biaya Kuliah",
    nominalTarif: 3500000,
    cicilan: "Cicilan 3x",
    sksSemester: 0,
    frekuensiDenda: "",
    nominalDenda: "0,00",
    maxDenda: "0,00",
  },
  {
    id: "5",
    periodeMasuk: "2024 Genap",
    gelombang: "Gelombang 3",
    jalurPendaftaran: "Mandiri",
    sistemKuliah: "Kelas Karyawan",
    programStudi: "S1 - Manajemen",
    jenisAkun: "SPP",
    nominalTarif: 2500000,
    cicilan: "Sekali Bayar",
    sksSemester: 0,
    frekuensiDenda: "",
    nominalDenda: "0,00",
    maxDenda: "0,00",
  },
  {
    id: "6",
    periodeMasuk: "2023 Genap",
    gelombang: "Gelombang 1",
    jalurPendaftaran: "SBMPTN",
    sistemKuliah: "Reguler",
    programStudi: "S1 - Akuntansi",
    jenisAkun: "Biaya Ujian",
    nominalTarif: 750000,
    cicilan: "Sekali Bayar",
    sksSemester: 0,
    frekuensiDenda: "",
    nominalDenda: "0,00",
    maxDenda: "0,00",
  },
];

export const tarifTagihanService = {
  getAll: (): TarifTagihanItem[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to load from storage", e);
    }
    return DEFAULT_TARIF_TAGIHAN;
  },

  getById: (id: string): TarifTagihanItem | undefined => {
    const list = tarifTagihanService.getAll();
    return list.find((item) => item.id === id);
  },

  save: (item: Partial<TarifTagihanItem> & { id?: string }): TarifTagihanItem => {
    const list = tarifTagihanService.getAll();
    let savedItem: TarifTagihanItem;

    if (item.id && list.some((i) => i.id === item.id)) {
      // Update
      savedItem = {
        ...list.find((i) => i.id === item.id)!,
        ...item,
      } as TarifTagihanItem;
      const updatedList = list.map((i) => (i.id === item.id ? savedItem : i));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } else {
      // Create new
      savedItem = {
        id: Date.now().toString(),
        periodeMasuk: item.periodeMasuk || "2025 Genap",
        gelombang: item.gelombang || "Gelombang 1",
        sistemKuliah: item.sistemKuliah || "Reguler",
        jalurPendaftaran: item.jalurPendaftaran || "SBMPTN",
        programStudi: item.programStudi || "Universitas Ibn Khaldun",
        jenisAkun: item.jenisAkun || "PRAKTIKUM PVDF",
        nominalTarif: Number(item.nominalTarif) || 0,
        cicilan: item.cicilan || "Sekali Bayar",
        sksSemester: item.sksSemester ?? 0,
        frekuensiDenda: item.frekuensiDenda || "",
        nominalDenda: item.nominalDenda ?? "0,00",
        maxDenda: item.maxDenda ?? "0,00",
        ...item,
      };
      const updatedList = [savedItem, ...list];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    }

    return savedItem;
  },

  delete: (id: string): void => {
    const list = tarifTagihanService.getAll();
    const updatedList = list.filter((i) => i.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  },
};
