import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoArrowBack, IoSave } from "react-icons/io5";
import IconButton from "../../../components/button/IconButton";
import TextField from "../../../components/inputs/TextField";
import Dropdown from "../../../components/inputs/Dropdown";
import { ROUTES } from "../../../common/routes/routes";

interface FormState {
  nim: string;
  nama: string;
  potongan: string;
  jenisPotongan: string;
  penerima: string;
  periodeMulai: string;
  nominal: string;
  isActive: boolean;
}

export default function DetailPenerimaPotonganPage() {
  document.title = "Tarif - Detail Penerima Potongan";

  const navigate = useNavigate();
  const location = useLocation();
  const editItem = (location.state as { item?: any })?.item;

  const [formData, setFormData] = useState<FormState>({
    nim: editItem?.nim || "",
    nama: editItem?.nama || "",
    potongan: editItem?.potongan || "Baznas Jawa Barat",
    jenisPotongan: editItem?.jenisPotongan || "Beasiswa",
    penerima: editItem?.penerima || "Mahasiswa",
    periodeMulai: editItem?.periodeMulai || "2024 Genap",
    nominal: editItem?.nominal ? String(editItem.nominal) : "1000000",
    isActive: editItem?.isActive !== undefined ? editItem.isActive : true,
  });

  const potonganOptions = [
    "Baznas Jawa Barat",
    "Potongan UKT",
    "Potongan Formulir",
    "Potongan Wisuda",
    "Beasiswa Prestasi",
  ];

  const jenisPotonganOptions = ["Beasiswa", "Potongan", "Diskon"];

  const penerimaOptions = ["Mahasiswa", "Calon Mahasiswa", "Alumni"];

  const periodeOptions = [
    "2027 Genap",
    "2027 Ganjil",
    "2026 Genap",
    "2026 Ganjil",
    "2025 Genap",
    "2025 Ganjil",
    "2024 Genap",
    "2024 Ganjil",
    "2023 Genap",
    "2023 Ganjil",
  ];

  const handleSave = () => {
    // Navigate back to potongan page with updated/new state or notice
    navigate(ROUTES.TARIF.POTONGAN, {
      state: {
        savedItem: {
          id: editItem?.id || String(Date.now()),
          ...formData,
          nominal: Number(formData.nominal.replace(/\D/g, "")) || 0,
        },
      },
    });
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-900">Tarif Potongan</h1>
        <p className="text-sm text-gray-500 mb-1">
          {editItem ? "Edit Penerima Potongan" : "Detail Penerima Potongan"}
        </p>
      </div>

      <div className="container shadow-md rounded-md border-t-green-800 border-t-4 p-6 mt-4 bg-white">
        {/* Top Action Bar */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">
            {editItem ? "Edit Data Penerima Potongan" : "Tambah Penerima Potongan"}
          </h2>
          <div className="flex space-x-2">
            <IconButton
              icon={<IoArrowBack />}
              responsive={false}
              text="Kembali ke Daftar"
              variant="info"
              className="text-sm cursor-pointer"
              onClick={() => navigate(ROUTES.TARIF.POTONGAN)}
            />
            <IconButton
              icon={<IoSave />}
              responsive={false}
              text="Simpan"
              variant="success"
              className="text-sm cursor-pointer"
              onClick={handleSave}
            />
          </div>
        </div>

        {/* Form Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 text-xs sm:text-sm">
          {/* Kolom Kiri */}
          <div className="space-y-4">
            {/* NIM Mahasiswa */}
            <div className="flex items-center">
              <label className="w-36 font-medium text-blue-600 text-sm flex-shrink-0">
                NIM Mahasiswa<span className="text-red-500">*</span>
              </label>
              <TextField
                placeholder="Masukkan NIM Mahasiswa"
                value={formData.nim}
                onChange={(val) => setFormData({ ...formData, nim: val })}
                className="w-full text-xs sm:text-sm"
              />
            </div>

            {/* Nama Mahasiswa */}
            <div className="flex items-center">
              <label className="w-36 font-medium text-blue-600 text-sm flex-shrink-0">
                Nama Mahasiswa<span className="text-red-500">*</span>
              </label>
              <TextField
                placeholder="Masukkan Nama Mahasiswa"
                value={formData.nama}
                onChange={(val) => setFormData({ ...formData, nama: val })}
                className="w-full text-xs sm:text-sm"
              />
            </div>

            {/* Potongan */}
            <div className="flex items-center">
              <label className="w-36 font-medium text-blue-600 text-sm flex-shrink-0">
                Potongan<span className="text-red-500">*</span>
              </label>
              <Dropdown
                options={potonganOptions}
                value={formData.potongan}
                onChange={(val) => setFormData({ ...formData, potongan: val })}
                className="w-full text-xs sm:text-sm"
              />
            </div>

            {/* Jenis Potongan */}
            <div className="flex items-center">
              <label className="w-36 font-medium text-blue-600 text-sm flex-shrink-0">
                Jenis Potongan
              </label>
              <Dropdown
                options={jenisPotonganOptions}
                value={formData.jenisPotongan}
                onChange={(val) =>
                  setFormData({ ...formData, jenisPotongan: val })
                }
                className="w-full text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="space-y-4">
            {/* Penerima */}
            <div className="flex items-center">
              <label className="w-36 font-medium text-blue-600 text-sm flex-shrink-0">
                Penerima
              </label>
              <Dropdown
                options={penerimaOptions}
                value={formData.penerima}
                onChange={(val) => setFormData({ ...formData, penerima: val })}
                className="w-full text-xs sm:text-sm"
              />
            </div>

            {/* Periode Mulai */}
            <div className="flex items-center">
              <label className="w-36 font-medium text-blue-600 text-sm flex-shrink-0">
                Periode Mulai<span className="text-red-500">*</span>
              </label>
              <Dropdown
                options={periodeOptions}
                value={formData.periodeMulai}
                onChange={(val) =>
                  setFormData({ ...formData, periodeMulai: val })
                }
                className="w-full text-xs sm:text-sm"
              />
            </div>

            {/* Nominal */}
            <div className="flex items-center">
              <label className="w-36 font-medium text-blue-600 text-sm flex-shrink-0">
                Nominal (Rp)<span className="text-red-500">*</span>
              </label>
              <TextField
                placeholder="Contoh: 1000000"
                value={formData.nominal}
                onChange={(val) => {
                  const num = val.replace(/\D/g, "");
                  setFormData({ ...formData, nominal: num });
                }}
                className="w-full text-xs sm:text-sm"
              />
            </div>

            {/* Status Aktif */}
            <div className="flex items-center">
              <label className="w-36 font-medium text-blue-600 text-sm flex-shrink-0">
                Status Aktif
              </label>
              <Dropdown
                options={["Aktif", "Tidak Aktif"]}
                value={formData.isActive ? "Aktif" : "Tidak Aktif"}
                onChange={(val) =>
                  setFormData({ ...formData, isActive: val === "Aktif" })
                }
                className="w-full text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
