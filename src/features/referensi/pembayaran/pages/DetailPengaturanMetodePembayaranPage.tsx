import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoChevronBack, IoPencil, IoSave } from "react-icons/io5";
import { IoMdRefresh, IoMdSearch } from "react-icons/io";
import { IoInformationCircle } from "react-icons/io5";
import { ROUTES } from "../../../../common/routes/routes";

interface MetodePembayaranDetailData {
  noUrut: string;
  metodePembayaran: string;
  channel: string;
  idChannel: string;
  jenisPembayaran: string;
  jumlahDigitVA: string;
  prefixVA: string;
  format: string;
  linkUrl: string;
  nomorRekening: string;
  namaPemilikRekening: string;
  nominalMaksimal: string;
  biayaAdmin: string;
  statusEdufin: boolean;
  dokuPaymentLink: boolean;
}

export default function DetailPengaturanMetodePembayaranPage() {
  document.title = "Detail Pengaturan Metode Pembayaran";
  const navigate = useNavigate();
  const location = useLocation();

  // Read item from navigation state or default to Bank Muamalat (Gambar 2)
  const passedItem = location.state?.item;

  const initialData: MetodePembayaranDetailData = {
    noUrut: "",
    metodePembayaran: "EduFin",
    channel: passedItem?.metodePembayaran || "Bank Muamalat",
    idChannel: passedItem?.idChannel || "Muamalat",
    jenisPembayaran: passedItem?.jenisPembayaran || "Virtual Account",
    jumlahDigitVA:
      passedItem?.idChannel === "Tokopedia"
        ? "11"
        : passedItem?.idChannel === "Shopee"
          ? "16"
          : "16",
    prefixVA: passedItem?.prefixVA || (passedItem?.idChannel === "Tokopedia" ? "" : "709906"),
    format:
      passedItem?.idChannel === "Tokopedia"
        ? ""
        : '$uid=str_pad($idva, 10, "0", STR_PAD_LEFT);',
    linkUrl: "",
    nomorRekening:
      passedItem?.nomorRekening && passedItem.nomorRekening !== "--"
        ? passedItem.nomorRekening
        : "",
    namaPemilikRekening: "",
    nominalMaksimal: "",
    biayaAdmin: "4.000,00",
    statusEdufin: passedItem?.statusEdufin ?? true,
    dokuPaymentLink: false,
  };

  const [formData, setFormData] = useState<MetodePembayaranDetailData>(initialData);
  const [savedData, setSavedData] = useState<MetodePembayaranDetailData>(initialData);
  const [isEdit, setIsEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSave = () => {
    setSavedData({ ...formData });
    setIsEdit(false);
  };

  const handleCancel = () => {
    setFormData({ ...savedData });
    setIsEdit(false);
  };

  return (
    <>
      {/* Header with Title and Subtitle */}
      <div className="flex flex-wrap items-baseline gap-2 mb-4">
        <h1 className="text-2xl font-medium text-gray-800">
          Pengaturan Metode Pembayaran
        </h1>
        <span className="text-gray-400 text-sm font-normal">
          Detail Pengaturan Metode Pembayaran
        </span>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-md shadow-md border-t-4 border-t-emerald-600 p-5 sm:p-6">
        {/* Top Action Bar matching Gambar 2 and Gambar 3 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          {/* Search Input on Left */}
          <div className="flex items-center w-full sm:w-auto">
            <input
              type="text"
              placeholder="Cari Pengaturan Metode Pembayaran"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-l px-3 py-1.5 text-xs sm:text-sm w-full sm:w-80 focus:outline-none focus:border-blue-500 bg-white"
            />
            <button
              type="button"
              className="bg-[#205295] hover:bg-[#183f73] text-white px-3.5 py-2 rounded-r flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title="Cari"
            >
              <IoMdSearch size={16} />
            </button>
          </div>

          {/* Action Buttons on Right */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() =>
                navigate(ROUTES.REFERENSI.PEMBAYARAN.PENGATURAN_METODE_PEMBAYARAN)
              }
              className="bg-[#00c0ef] hover:bg-[#00a7d0] text-white px-3.5 py-1.5 rounded text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <IoChevronBack size={15} />
              <span>Kembali ke Daftar</span>
            </button>

            {!isEdit ? (
              <button
                type="button"
                onClick={() => setIsEdit(true)}
                className="bg-[#f39c12] hover:bg-[#e08e0b] text-white px-3.5 py-1.5 rounded text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <IoPencil size={15} />
                <span>Edit</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-[#00a65a] hover:bg-[#008d4c] text-white px-3.5 py-1.5 rounded text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <IoSave size={15} />
                  <span>Simpan</span>
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-[#f39c12] hover:bg-[#e08e0b] text-white px-3.5 py-1.5 rounded text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <IoMdRefresh size={15} />
                  <span>Batal</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Section 1: Detail Metode Pembayaran */}
        <div className="mb-8">
          <div className="border-b-2 border-emerald-600 pb-2 mb-4">
            <h2 className="text-lg font-bold text-emerald-800">
              Detail Metode Pembayaran
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1 text-xs sm:text-sm">
            {/* Left Column */}
            <div className="divide-y divide-gray-100">
              <div className="py-2.5 flex items-center">
                <span className="w-48 font-bold text-[#337ab7]">No Urut</span>
                <span className="flex-1 text-gray-800 font-normal">
                  {isEdit ? (
                    <input
                      type="text"
                      value={formData.noUrut}
                      onChange={(e) =>
                        setFormData({ ...formData, noUrut: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2.5 py-1 text-xs w-full max-w-xs focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    formData.noUrut || ""
                  )}
                </span>
              </div>

              <div className="py-2.5 flex items-center">
                <span className="w-48 font-bold text-[#337ab7]">
                  Metode Pembayaran
                </span>
                <span className="flex-1 text-gray-800 font-normal">
                  {formData.metodePembayaran}
                </span>
              </div>

              <div className="py-2.5 flex items-center">
                <span className="w-48 font-bold text-[#337ab7]">Channel</span>
                <span className="flex-1 text-gray-800 font-normal">
                  {formData.channel}
                </span>
              </div>

              <div className="py-2.5 flex items-center">
                <span className="w-48 font-bold text-[#337ab7]">ID Channel</span>
                <span className="flex-1 text-gray-800 font-normal">
                  {formData.idChannel}
                </span>
              </div>

              <div className="py-2.5 flex items-center">
                <span className="w-48 font-bold text-[#337ab7]">
                  Jenis Pembayaran
                </span>
                <span className="flex-1 text-gray-800 font-normal">
                  {formData.jenisPembayaran}
                </span>
              </div>

              <div className="py-2.5 flex items-center">
                <span className="w-48 font-bold text-[#337ab7]">
                  Jumlah Digit VA
                </span>
                <span className="flex-1 text-gray-800 font-normal">
                  {isEdit ? (
                    <input
                      type="text"
                      value={formData.jumlahDigitVA}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          jumlahDigitVA: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded px-2.5 py-1 text-xs w-full max-w-xs focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    formData.jumlahDigitVA
                  )}
                </span>
              </div>

              <div className="py-2.5 flex items-center">
                <span className="w-48 font-bold text-[#337ab7]">Prefix VA</span>
                <span className="flex-1 text-gray-800 font-normal">
                  {isEdit ? (
                    <input
                      type="text"
                      value={formData.prefixVA}
                      onChange={(e) =>
                        setFormData({ ...formData, prefixVA: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2.5 py-1 text-xs w-full max-w-xs focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    formData.prefixVA || ""
                  )}
                </span>
              </div>

              <div className="py-2.5 flex items-center">
                <span className="w-48 font-bold text-[#337ab7]">Format</span>
                <span className="flex-1 text-gray-800 font-normal font-mono text-xs">
                  {isEdit ? (
                    <input
                      type="text"
                      value={formData.format}
                      onChange={(e) =>
                        setFormData({ ...formData, format: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2.5 py-1 text-xs w-full focus:outline-none focus:border-blue-500 font-mono"
                    />
                  ) : (
                    formData.format || ""
                  )}
                </span>
              </div>
            </div>

            {/* Right Column */}
            <div className="divide-y divide-gray-100">
              <div className="py-2.5 flex items-center">
                <span className="w-48 font-bold text-[#337ab7]">Link URL</span>
                <span className="flex-1 text-gray-800 font-normal">
                  {isEdit ? (
                    <input
                      type="text"
                      value={formData.linkUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, linkUrl: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2.5 py-1 text-xs w-full max-w-xs focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    formData.linkUrl || ""
                  )}
                </span>
              </div>

              <div className="py-2.5 flex items-center">
                <span className="w-48 font-bold text-[#337ab7]">
                  Nomor Rekening
                </span>
                <span className="flex-1 text-gray-800 font-normal">
                  {isEdit ? (
                    <input
                      type="text"
                      value={formData.nomorRekening}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nomorRekening: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded px-2.5 py-1 text-xs w-full max-w-xs focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    formData.nomorRekening || ""
                  )}
                </span>
              </div>

              <div className="py-2.5 flex items-center">
                <span className="w-48 font-bold text-[#337ab7]">
                  Nama Pemilik Rekening
                </span>
                <span className="flex-1 text-gray-800 font-normal">
                  {isEdit ? (
                    <input
                      type="text"
                      value={formData.namaPemilikRekening}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          namaPemilikRekening: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded px-2.5 py-1 text-xs w-full max-w-xs focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    formData.namaPemilikRekening || ""
                  )}
                </span>
              </div>

              <div className="py-2.5 flex items-center">
                <span className="w-48 font-bold text-[#337ab7]">
                  Nominal Maksimal
                </span>
                <span className="flex-1 text-gray-800 font-normal">
                  {isEdit ? (
                    <input
                      type="text"
                      value={formData.nominalMaksimal}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nominalMaksimal: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded px-2.5 py-1 text-xs w-full max-w-xs focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    formData.nominalMaksimal || ""
                  )}
                </span>
              </div>

              <div className="py-2.5 flex items-center">
                <span className="w-48 font-bold text-[#337ab7]">Biaya Admin</span>
                <span className="flex-1 text-gray-800 font-normal">
                  {isEdit ? (
                    <input
                      type="text"
                      value={formData.biayaAdmin}
                      onChange={(e) =>
                        setFormData({ ...formData, biayaAdmin: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2.5 py-1 text-xs w-full max-w-xs focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    formData.biayaAdmin
                  )}
                </span>
              </div>

              <div className="py-2.5 flex items-center">
                <span className="w-48 font-bold text-[#337ab7]">
                  Status Edufin Aktif?
                </span>
                <span className="flex-1 text-gray-800 font-normal">
                  {isEdit ? (
                    <input
                      type="checkbox"
                      checked={formData.statusEdufin}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          statusEdufin: e.target.checked,
                        })
                      }
                      className="form-checkbox h-4 w-4 text-blue-600 rounded cursor-pointer"
                    />
                  ) : formData.statusEdufin ? (
                    <span className="text-green-600 font-bold text-base leading-none">
                      ✓
                    </span>
                  ) : (
                    <span className="text-red-600 font-bold text-base leading-none">
                      ✗
                    </span>
                  )}
                </span>
              </div>

              <div className="py-2.5 flex items-center">
                <span className="w-48 font-bold text-[#337ab7]">
                  Doku Payment Link?
                </span>
                <span className="flex-1 text-gray-800 font-normal">
                  {isEdit ? (
                    <input
                      type="checkbox"
                      checked={formData.dokuPaymentLink}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          dokuPaymentLink: e.target.checked,
                        })
                      }
                      className="form-checkbox h-4 w-4 text-blue-600 rounded cursor-pointer"
                    />
                  ) : formData.dokuPaymentLink ? (
                    <span className="text-green-600 font-bold text-base leading-none">
                      ✓
                    </span>
                  ) : (
                    <span className="text-red-600 font-bold text-base leading-none">
                      ✗
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Aturan Penerapan Periode Masuk */}
        <div>
          <div className="border-b-2 border-emerald-600 pb-2 mb-4">
            <h2 className="text-lg font-bold text-emerald-800">
              Aturan Penerapan Periode Masuk
            </h2>
          </div>

          <div className="space-y-1.5">
            <div className="text-sm font-bold text-[#337ab7]">
              Periode Masuk Mahasiswa & Pendaftar Baru
            </div>
            <div className="text-sm text-gray-700">
              Diterapkan pada semua periode masuk dan seterusnya
            </div>
            {isEdit && (
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#337ab7] mt-3 bg-blue-50/50 p-2 rounded">
                <IoInformationCircle className="text-base text-blue-600 shrink-0" />
                <span>
                  Tidak dapat diubah, karena Aturan Periode Masuk tidak aktif
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
