import { useState } from "react";
import TextField from "../../../components/inputs/TextField";
import Toggle from "../../../components/inputs/Toggle";

export default function InformasiKeuanganSection() {
  const [settings, setSettings] = useState({
    aktifkanAturanPeriodeMasuk: false,
    tagihanWajibMahasiswa: true,
    sembunyikanTombolBatalPembayaran: true,
    batasPembatalanPembayaran: "90",
    bayarTagihan: "Bayar Tagihan",
    kodeVA: "Kode VA",
    nomorVA: "Nomor VA",
    nomorVirtualAccount: "Nomor Virtual Account",
    va: "VA",
    virtualAccount: "Virtual Account",
  });

  const handleToggle = (field: string) => {
    // setSettings(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (field: string, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-sm shadow-sm border-t-2 border-t-amber-400">
      <div className="p-6 pb-3">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Informasi Keuangan
        </h2>
        <p className="text-sm text-gray-600">
          Kelola semua kebutuhan proses pembayaran keuangan mahasiswa pada
          Perguruan Tinggi Anda
        </p>
      </div>

      <div>
        {/* Aktifkan Aturan Periode Masuk */}
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
          <div className="flex items-center gap-3">
            <Toggle
              checked={settings.aktifkanAturanPeriodeMasuk}
              onChange={() => handleToggle("aktifkanAturanPeriodeMasuk")}
            />
            <span className="text-xs text-gray-600">Aktifkan</span>
          </div>
        </div>

        {/* Tagihan Wajib Mahasiswa */}
        <div className="flex items-start justify-between px-6 py-5 border-t border-gray-100">
          <div className="flex-1 mr-6">
            <h3 className="font-semibold text-gray-800 mb-1 text-sm">
              Tagihan Wajib Mahasiswa
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Membantu memudahkan Perguruan Tinggi dan mahasiswa dalam melakukan
              proses pembayaran tagihan dengan menaati ketentuan Pembayaran yang
              telah ditetapkan perguruan tinggi.{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Pelajari Selengkapnya
              </a>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Toggle
              checked={settings.tagihanWajibMahasiswa}
              onChange={() => handleToggle("tagihanWajibMahasiswa")}
            />
            <span className="text-xs text-gray-600">Aktif</span>
          </div>
        </div>

        {/* Sembunyikan Tombol Batal Pembayaran */}
        <div className="flex items-start justify-between px-6 py-5 border-t border-gray-100">
          <div className="flex-1 mr-6">
            <h3 className="font-semibold text-gray-800 mb-1 text-sm">
              Sembunyikan Tombol "Batal Pembayaran"
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Dengan menyembunyikan aktif, Anda tidak mengizinkan mahasiswa
              untuk dapat melakukan pembatalan pembayaran tagihan
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Toggle
              checked={settings.sembunyikanTombolBatalPembayaran}
              onChange={() => handleToggle("sembunyikanTombolBatalPembayaran")}
            />
            <span className="text-xs text-gray-600">Aktif</span>
          </div>
        </div>

        {/* Batas Pembatalan Pembayaran */}
        <div className="flex items-center justify-between px-6 py-5 border-t border-gray-100">
          <div className="flex-1 mr-6">
            <h3 className="font-semibold text-gray-800 mb-1 text-sm">
              Batas Pembatalan Pembayaran
            </h3>
            <p className="text-xs text-gray-600">
              Batas waktu maksimal pembayaran mahasiswa
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TextField
              value={settings.batasPembatalanPembayaran}
              onChange={(value) =>
                handleInputChange("batasPembatalanPembayaran", value)
              }
              className="w-16 h-8 text-center text-xs"
            />
            <span className="text-xs text-gray-600">hari</span>
          </div>
        </div>

        {/* Form Fields */}
        <div className="px-6 py-5 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <label className="text-xs font-medium text-gray-700">
              Bayar Tagihan
            </label>
            <TextField
              value={settings.bayarTagihan}
              onChange={(value) => handleInputChange("bayarTagihan", value)}
              className="w-64 h-8 text-xs"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="text-xs font-medium text-gray-700">Kode VA</label>
            <TextField
              value={settings.kodeVA}
              onChange={(value) => handleInputChange("kodeVA", value)}
              className="w-64 h-8 text-xs"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="text-xs font-medium text-gray-700">
              Nomor VA
            </label>
            <TextField
              value={settings.nomorVA}
              onChange={(value) => handleInputChange("nomorVA", value)}
              className="w-64 h-8 text-xs"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="text-xs font-medium text-gray-700">
              Nomor Virtual Account
            </label>
            <TextField
              value={settings.nomorVirtualAccount}
              onChange={(value) =>
                handleInputChange("nomorVirtualAccount", value)
              }
              className="w-64 h-8 text-xs"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="text-xs font-medium text-gray-700">VA</label>
            <TextField
              value={settings.va}
              onChange={(value) => handleInputChange("va", value)}
              className="w-64 h-8 text-xs"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="text-xs font-medium text-gray-700">
              Virtual Account
            </label>
            <TextField
              value={settings.virtualAccount}
              onChange={(value) => handleInputChange("virtualAccount", value)}
              className="w-64 h-8 text-xs"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="px-6 py-5 border-t border-gray-100">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded text-xs">
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
