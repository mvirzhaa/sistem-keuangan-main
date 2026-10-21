import { useState } from "react";
import TextField from "../../../components/inputs/TextField";
import Toggle from "../../../components/inputs/Toggle";

export interface InformasiKeuanganSettings {
  aktifkanAturanPeriodeMasuk: boolean;
  tagihanWajibMahasiswa: boolean;
  sembunyikanTombolBatalPembayaran: boolean;
  pengecualianGenerateTagihanCuti: boolean;
  pembayaranKodeKelompokTagihan: boolean;
  prioritasPembayaranPeriodeLampau: boolean;
  batasPembatalanPembayaran: string;
  bayarTagihan: string;
  kodeVA: string;
  nomorVA: string;
  nomorVirtualAccount: string;
  va: string;
  virtualAccount: string;
}

const STORAGE_KEY = "pengaturan_informasi_keuangan_settings";

const defaultSettings: InformasiKeuanganSettings = {
  aktifkanAturanPeriodeMasuk: false,
  tagihanWajibMahasiswa: true,
  sembunyikanTombolBatalPembayaran: true,
  pengecualianGenerateTagihanCuti: false,
  pembayaranKodeKelompokTagihan: false,
  prioritasPembayaranPeriodeLampau: false,
  batasPembatalanPembayaran: "90",
  bayarTagihan: "Bayar Tagihan",
  kodeVA: "Kode VA",
  nomorVA: "Nomor VA",
  nomorVirtualAccount: "Nomor Virtual Account",
  va: "VA",
  virtualAccount: "Virtual Account",
};

export default function InformasiKeuanganSection() {
  const [settings, setSettings] = useState<InformasiKeuanganSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch {
        // fallback
      }
    }
    return defaultSettings;
  });

  const [showSavedAlert, setShowSavedAlert] = useState(false);

  const handleToggle = (field: keyof InformasiKeuanganSettings) => {
    setSettings((prev) => {
      const nextValue = !prev[field];
      const updated = { ...prev, [field]: nextValue };

      // Mutual exclusion: "Jika fitur ini diaktifkan, otomatis tagihan wajib akan dimatikan, dan sebaliknya."
      if (field === "pembayaranKodeKelompokTagihan" && nextValue === true) {
        updated.tagihanWajibMahasiswa = false;
      } else if (field === "tagihanWajibMahasiswa" && nextValue === true) {
        updated.pembayaranKodeKelompokTagihan = false;
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleInputChange = (
    field: keyof InformasiKeuanganSettings,
    value: string
  ) => {
    setSettings((prev) => {
      const updated = { ...prev, [field]: value };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setShowSavedAlert(true);
    setTimeout(() => {
      setShowSavedAlert(false);
    }, 3000);
  };

  return (
    <div className="w-full">
      <div className="p-6 pb-4">
        <h2 className="text-lg font-semibold mb-1 text-gray-800">
          Informasi Keuangan
        </h2>
        <p className="text-xs text-gray-600">
          Kelola semua kebutuhan proses pembayaran keuangan mahasiswa pada
          Perguruan Tinggi Anda
        </p>
      </div>

      {showSavedAlert && (
        <div className="mx-6 mb-3 bg-[#dff0d8] border border-[#d6e9c6] text-[#3c763d] px-4 py-2.5 rounded text-xs flex justify-between items-center transition-all">
          <span>Pengaturan informasi keuangan berhasil disimpan.</span>
          <button
            type="button"
            onClick={() => setShowSavedAlert(false)}
            className="text-[#3c763d] hover:text-green-900 font-bold text-base leading-none cursor-pointer"
          >
            &times;
          </button>
        </div>
      )}

      <div>
        {/* 1. Aktifkan Aturan Periode Masuk */}
        <div className="flex items-start justify-between px-6 py-5 border-t border-gray-100">
          <div className="flex-1 mr-6">
            <h3 className="font-semibold text-gray-800 mb-1 text-sm">
              Aktifkan Aturan Periode Masuk
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Tambahkan aturan penerapan periode masuk mahasiswa dan pendaftar
              untuk menetapkan pembayaran yang berbeda pada periode masuk
              tertentu.
            </p>
          </div>
          <div className="shrink-0 pt-0.5">
            <Toggle
              checked={settings.aktifkanAturanPeriodeMasuk}
              onChange={() => handleToggle("aktifkanAturanPeriodeMasuk")}
            />
          </div>
        </div>

        {/* 2. Tagihan Wajib Mahasiswa */}
        <div className="flex items-start justify-between px-6 py-5 border-t border-gray-100">
          <div className="flex-1 mr-6">
            <h3 className="font-semibold text-gray-800 mb-1 text-sm">
              Tagihan Wajib Mahasiswa
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Membantu memudahkan Perguruan Tinggi dan mahasiswa dalam melakukan
              proses pembayaran tagihan dengan menaati Ketentuan Pembayaran yang
              telah ditetapkan perguruan tinggi.{" "}
              <a href="#" className="text-blue-600 hover:underline font-medium">
                Pelajari Selengkapnya
              </a>
            </p>
          </div>
          <div className="shrink-0 pt-0.5">
            <Toggle
              checked={settings.tagihanWajibMahasiswa}
              onChange={() => handleToggle("tagihanWajibMahasiswa")}
            />
          </div>
        </div>

        {/* 3. Sembunyikan Tombol "Batal Pembayaran" */}
        <div className="flex items-start justify-between px-6 py-5 border-t border-gray-100">
          <div className="flex-1 mr-6">
            <h3 className="font-semibold text-gray-800 mb-1 text-sm">
              Sembunyikan Tombol “Batal Pembayaran”
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Dengan membiarkannya aktif, Anda tidak menginzinkan mahasiswa
              untuk dapat melakukan pembatalan pembayaran tagihan
            </p>
          </div>
          <div className="shrink-0 pt-0.5">
            <Toggle
              checked={settings.sembunyikanTombolBatalPembayaran}
              onChange={() => handleToggle("sembunyikanTombolBatalPembayaran")}
            />
          </div>
        </div>

        {/* 4. Pengecualian Generate Tagihan Mahasiswa Cuti */}
        <div className="flex items-start justify-between px-6 py-5 border-t border-gray-100">
          <div className="flex-1 mr-6">
            <h3 className="font-semibold text-gray-800 mb-1.5 text-sm">
              Pengecualian Generate Tagihan Mahasiswa Cuti
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-2.5">
              Mengatur apakah mahasiswa berstatus cuti akan disertakan dalam
              proses generate tagihan pada semester berjalan, dengan
              pengecualian terhadap akun transaksi yang disetting pada event
              pengambilan cuti.
            </p>
            <ul className="text-xs text-gray-600 space-y-1.5 list-disc list-outside ml-4 leading-relaxed">
              <li>
                <span className="font-semibold text-gray-800">
                  Jika diaktifkan:
                </span>{" "}
                Mahasiswa dengan status cuti tidak akan menerima tagihan apa pun,
                kecuali tagihan yang berasal dari akun transaksi yang telah
                diatur pada event pengambilan cuti.
              </li>
              <li>
                <span className="font-semibold text-gray-800">
                  Jika dinonaktifkan:
                </span>{" "}
                Mahasiswa dengan status cuti tetap akan menerima seluruh tagihan
                sebagaimana mahasiswa aktif.
              </li>
            </ul>
          </div>
          <div className="shrink-0 pt-0.5">
            <Toggle
              checked={settings.pengecualianGenerateTagihanCuti}
              onChange={() => handleToggle("pengecualianGenerateTagihanCuti")}
            />
          </div>
        </div>

        {/* 5. Pembayaran Berdasarkan Kode Kelompok Tagihan */}
        <div className="flex items-start justify-between px-6 py-5 border-t border-gray-100">
          <div className="flex-1 mr-6">
            <h3 className="font-semibold text-gray-800 mb-1 text-sm">
              Pembayaran Berdasarkan Kode Kelompok Tagihan
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Mahasiswa dapat membayar berdasarkan kode kelompok tagihan. Jika
              fitur ini diaktifkan, otomatis tagihan wajib akan dimatikan, dan
              sebaliknya.{" "}
              <a href="#" className="text-blue-600 hover:underline font-medium">
                Pelajari Selengkapnya
              </a>
            </p>
          </div>
          <div className="shrink-0 pt-0.5">
            <Toggle
              checked={settings.pembayaranKodeKelompokTagihan}
              onChange={() => handleToggle("pembayaranKodeKelompokTagihan")}
            />
          </div>
        </div>

        {/* 6. Prioritas Pembayaran Tagihan Berdasarkan Periode Lampau */}
        <div className="flex items-start justify-between px-6 py-5 border-t border-gray-100">
          <div className="flex-1 mr-6">
            <h3 className="font-semibold text-gray-800 mb-1 text-sm">
              Prioritas Pembayaran Tagihan Berdasarkan Periode Lampau
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Pembayaran tagihan memprioritaskan tagihan yang lebih lampau.
              Mahasiswa wajib memilih tagihan yang lebih lampau pada periode
              sebelumnya agar dapat membayar tagihan pada periode berjalan.{" "}
              <a href="#" className="text-blue-600 hover:underline font-medium">
                Pelajari Selengkapnya
              </a>
            </p>
          </div>
          <div className="shrink-0 pt-0.5">
            <Toggle
              checked={settings.prioritasPembayaranPeriodeLampau}
              onChange={() => handleToggle("prioritasPembayaranPeriodeLampau")}
            />
          </div>
        </div>

        {/* 7. Batas Pembatalan Pembayaran */}
        <div className="flex items-center justify-between px-6 py-5 border-t border-gray-100">
          <div className="flex-1 mr-6">
            <h3 className="font-semibold text-gray-800 mb-1 text-sm">
              Batas Pembatalan Pembayaran
            </h3>
            <p className="text-xs text-gray-600">
              Batas waktu maksimal pembayaran mahasiswa
            </p>
          </div>
          <div className="shrink-0">
            <div className="flex items-center border border-gray-300 rounded overflow-hidden h-9 bg-white">
              <input
                type="text"
                value={settings.batasPembatalanPembayaran}
                onChange={(e) =>
                  handleInputChange(
                    "batasPembatalanPembayaran",
                    e.target.value.replace(/\D/g, "")
                  )
                }
                className="w-14 h-full px-2 text-center text-xs text-gray-800 outline-none"
              />
              <span className="h-full px-3.5 bg-gray-200 text-gray-600 text-xs flex items-center justify-center border-l border-gray-300 font-normal select-none">
                hari
              </span>
            </div>
          </div>
        </div>

        {/* Form Fields - Bisa diisi (Editable dengan background putih) */}
        <div className="px-6 py-5 border-t border-dashed border-gray-200 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-normal text-gray-700">
              Bayar Tagihan
            </label>
            <input
              type="text"
              value={settings.bayarTagihan}
              onChange={(e) => handleInputChange("bayarTagihan", e.target.value)}
              className="w-64 h-10 border border-gray-300 rounded-xl px-3.5 text-xs text-gray-800 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs font-normal text-gray-700">Kode VA</label>
            <input
              type="text"
              value={settings.kodeVA}
              onChange={(e) => handleInputChange("kodeVA", e.target.value)}
              className="w-64 h-10 border border-gray-300 rounded-xl px-3.5 text-xs text-gray-800 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs font-normal text-gray-700">
              Nomor VA
            </label>
            <input
              type="text"
              value={settings.nomorVA}
              onChange={(e) => handleInputChange("nomorVA", e.target.value)}
              className="w-64 h-10 border border-gray-300 rounded-xl px-3.5 text-xs text-gray-800 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs font-normal text-gray-700">
              Nomor Virtual Account
            </label>
            <input
              type="text"
              value={settings.nomorVirtualAccount}
              onChange={(e) =>
                handleInputChange("nomorVirtualAccount", e.target.value)
              }
              className="w-64 h-10 border border-gray-300 rounded-xl px-3.5 text-xs text-gray-800 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs font-normal text-gray-700">VA</label>
            <input
              type="text"
              value={settings.va}
              onChange={(e) => handleInputChange("va", e.target.value)}
              className="w-64 h-10 border border-gray-300 rounded-xl px-3.5 text-xs text-gray-800 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs font-normal text-gray-700">
              Virtual Account
            </label>
            <input
              type="text"
              value={settings.virtualAccount}
              onChange={(e) =>
                handleInputChange("virtualAccount", e.target.value)
              }
              className="w-64 h-10 border border-gray-300 rounded-xl px-3.5 text-xs text-gray-800 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Save Button: tetap seperti semula di sebelah kiri */}
        <div className="px-6 pb-6">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 bg-[#f0f3f6] hover:bg-[#e4e9ee] text-[#8c9ba5] hover:text-[#5a6a75] rounded-lg text-xs font-medium cursor-pointer transition-colors shadow-xs"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
