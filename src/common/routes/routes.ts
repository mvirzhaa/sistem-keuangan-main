export const ROUTES = {
  LOGIN: "/login",

  // Dashboard
  DASHBOARD: "/dashboard",

  // Operasional
  OPERASIONAL: {
    PEMBAYARAN: "/operasional/pembayaran",
    PEMBAYARAN_FORMULIR: "/operasional/pembayaran_formulir",
    UKT_MAHASISWA: "/operasional/ukt_mahasiswa",
    MONITORING_TARIF: "/operasional/monitoring_tarif",
    MONITORING_TAGIHAN: "/operasional/monitoring_tagihan_mahasiswa",
    MONITORING_ATURAN: "/operasional/monitoring_aturan_akademik",
    MONITORING_UKT: "/operasional/monitoring_ukt",
  },

  // Transaksi
  TRANSAKSI: {
    KEUANGAN: "/transaksi/keuangan",
    TAGIHAN: "/transaksi/tagihan",
    DETAIL_TAGIHAN: "/transaksi/tagihan/detail_tagihan",
    PEMBAYARAN: "/transaksi/pembayaran",
    DEPOSIT: "/transaksi/deposit",
    DETAIL_DEPOSIT: "/transaksi/deposit/detail_deposit",
    VIRTUAL_ACCOUNT: "/transaksi/virtual_account",
    DATA_TRANSAKSI_VA: "/transaksi/virtual_account/data_transaksi_va",
    POTONGAN_BEASISWA: "/transaksi/potongan_dan_beasiswa",
    VOUCHER: "/transaksi/voucher",
  },

  // Generate
  GENERATE: {
    TAGIHAN_MAHASISWA: "/generate/tagihan_mahasiswa",
    TAGIHAN_PENDAFTAR: "/generate/tagihan_pendaftar",
  },

  // Tarif
  TARIF: {
    TAGIHAN: "/tarif/tagihan",
    DETAIL_TARIF_TAGIHAN: "/tarif/tagihan/detail_tarif_tagihan",
    MATA_KULIAH: "/tarif/mata_kuliah",
    DENDA: "/tarif/denda",
    FORMULIR: "/tarif/formulir",
    UKT: "/tarif/ukt",
    DETAIL_TARIF_UKT: "/tarif/ukt/detail_tarif_ukt",
    POTONGAN: "/tarif/potongan",
  },

  // Referensi
  REFERENSI: {
    TRANSAKSI: {
      JENIS_TRANSAKSI: "/referensi/transaksi/jenis_transaksi",
      KELOMPOK: "/referensi/transaksi/kelompok",
      FREKUENSI: "/referensi/transaksi/frekuensi",
      AKUN_TRANSAKSI: "/referensi/transaksi/akun_transaksi",
    },
    PEMBAYARAN: {
      CHANNEL_PEMBAYARAN: "/referensi/pembayaran/channer_pembayaran",
      PENGATURAN_METODE_PEMBAYARAN:
        "/referensi/pembayaran/pengaturan_metode_pembayaran",
      PROMO_EDUFIN: "/referensi/pembayaran/promo_edufin",
    },
    TARIF: {
      KELOMPOK_UKT: "/referensi/tarif/kelompok_ukt",
    },
    POTONGAN: {
      POTONGAN: "/referensi/potongan/potongan",
      DETAIL_POTONGAN: "/referensi/potongan/detail_potongan",
      ATURAN_POTONGAN: "/referensi/potongan/aturan_potongan",
    },
    PELENGKAP: {
      ATURAN_AKADEMIK: "/referensi/pelengkap/aturan_akademik",
      REKANAN: "/referensi/pelengkap/rekanan",
    },
    VOUCHER: {
      VOUCHER: "/referensi/voucher/voucher",
      DETAIL_VOUCHER: "/referensi/voucher/detail_voucher",
      ATURAN_VOUCHER: "/referensi/voucher/aturan_voucher",
    },
  },

  // Pengaturan
  PENGATURAN: {
    TAGIHAN: "/pengaturan/tagihan",
    ATURAN_AKADEMIK: "/pengaturan/aturan_akademik",
    DETAIL_ATURAN_AKADEMIK:
      "/pengaturan/aturan_akademik/detail_aturan_akademik",
    ATURAN_SWITCHING_BANK: "/pengaturan/aturan_switching_bank",
    JENIS_TAGIHAN: "/pengaturan/jenis_tagihan",
    PERIODE_PEMBAYARAN: "/pengaturan/periode_pembayaran",
    SETTING_APLIKASI: "/pengaturan/setting_aplikasi",
  },

  // Laporan
  LAPORAN: {
    TAGIHAN: {
      LAPORAN_TAGIHAN: "/laporan/tagihan/laporan_tagihan",
      LAPORAN_REKAP_TAGIHAN: "/laporan/tagihan/laporan_rekap_tagihan",
      TAGIHAN_PERWALIAN: "/laporan/tagihan/tagihan_perwalian",
      PIVOT_TAGIHAN: "/laporan/tagihan/pivot_tagihan",
    },
    PEMBAYARAN: {
      LAPORAN_PEMBAYARAN: "/laporan/pembayaran/laporan_pembayaran",
      LAPORAN_REKAP_PEMBAYARAN: "/laporan/pembayaran/laporan_rekap_pembayaran",
      PEMBAYARAN_PER_MAHASISWA: "/laporan/pembayaran/pembayaran_per_mahasiswa",
      DISTRIBUSI_PEMBAYARAN: "/laporan/pembayaran/distribusi_pembayaran",
      DISTRIBUSI_JENIS_TAGIHAN_PER_TANGGAL:
        "/laporan/pembayaran/distribusi_jenis_tagihan_per_tanggal",
      DISTRIBUSI_PEMBAYARAN_PER_TANGGAL:
        "/laporan/pembayaran/distribusi_pembayaran_per_tanggal",
      PIVOT_PEMBAYARAN: "/laporan/pembayaran/pivot_pembayaran",
    },
    UKT_MAHASISWA: {
      LAPORAN_PENERIMA_UKT: "/laporan/ukt_mahasiswa/laporan_penerima_ukt",
      LAPORAN_TARIF_UKT: "/laporan/ukt_mahasiswa/laporan_tarif_ukt",
      LAPORAN_TARIF: "/laporan/ukt_mahasiswa/laporan_tarif",
    },
    DEPOSIT: {
      LAPORAN_DEPOSIT: "/laporan/deposit/laporan_deposit",
      LAPORAN_REKAP_DEPOSIT: "/laporan/deposit/laporan_rekap_deposit",
    },
    POTONGAN: {
      LAPORAN_PENERIMA_POTONGAN: "/laporan/potongan/laporan_penerima_potongan",
      REKAP_POTONGAN_BEASISWA: "/laporan/potongan/rekap_potongan_beasiswa",
    },
    MANUAL: {
      CETAK_LAPORAN_MANUAL: "/laporan/manual/cetak_laporan_manual",
    },
    MONITORING_KEUANGAN: {
      LAPORAN_MAHASISWA_TERCEKAL:
        "/laporan/monitoring_keuangan/laporan_mahasiswa_tercekal",
    },
  },
};
