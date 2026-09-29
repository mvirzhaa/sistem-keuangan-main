import React from "react";
import TextField from "../../../components/inputs/TextField";
import SearchableDropdown from "../../../components/inputs/SearchableDropdown";

interface DetailTarifTagihanFormProps {
  className?: string;
}

const DetailTarifTagihanForm: React.FC<DetailTarifTagihanFormProps> = ({
  className = "",
}) => {
  // Sample options for dropdowns
  const periodeMasukOptions = [
    "2025 Genap",
    "2025 Ganjil",
    "2024 Genap",
    "2024 Ganjil",
  ];
  const gelombangOptions = [
    "Gelombang 1",
    "Gelombang 2",
    "Gelombang 3",
    "Gelombang 4",
  ];
  const sistemKuliahOptions = ["Reguler", "Karyawan", "Online"];
  const jalurPendaftaranOptions = ["SBMPTN", "SNMPTN", "Mandiri", "Beasiswa"];
  const programStudiOptions = [
    "Universitas Ibn Khaldun",
    "Teknik Informatika",
    "Manajemen",
    "Hukum",
  ];
  const jenisAkunOptions = ["PRAKTIKUM PVDF", "SPP", "UKT", "Ujian"];
  const cicilanOptions = [
    "Sekali Bayar",
    "2x Cicilan",
    "3x Cicilan",
    "4x Cicilan",
  ];
  const frekuensiDendaOptions = [
    "-- Pilih Frekuensi Denda --",
    "Harian",
    "Mingguan",
    "Bulanan",
  ];

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs">
        {/* Left Column */}
        <div>
          {/* Periode Masuk */}
          <div className="mb-4 flex items-center">
            <label className="w-36 text-blue-600 font-semibold">
              Periode Masuk<span className="text-red-500">*</span>
            </label>
            <div className="flex-grow">
              <SearchableDropdown
                options={periodeMasukOptions}
                defaultValue="2025 Genap"
                className="w-full"
              />
            </div>
          </div>

          {/* Gelombang */}
          <div className="mb-4 flex items-center">
            <label className="w-36 text-blue-600 font-semibold">
              Gelombang<span className="text-red-500">*</span>
            </label>
            <div className="flex-grow">
              <SearchableDropdown
                options={gelombangOptions}
                defaultValue="Gelombang 1"
                className="w-full"
              />
            </div>
          </div>

          {/* Sistem Kuliah */}
          <div className="mb-4 flex items-center">
            <label className="w-36 text-blue-600 font-semibold">
              Sistem Kuliah<span className="text-red-500">*</span>
            </label>
            <div className="flex-grow">
              <SearchableDropdown
                options={sistemKuliahOptions}
                defaultValue="Reguler"
                className="w-full"
              />
            </div>
          </div>

          {/* Jalur Pendaftaran */}
          <div className="mb-4 flex items-center">
            <label className="w-36 text-blue-600 font-semibold">
              Jalur Pendaftaran<span className="text-red-500">*</span>
            </label>
            <div className="flex-grow">
              <SearchableDropdown
                options={jalurPendaftaranOptions}
                defaultValue="SBMPTN"
                className="w-full"
              />
            </div>
          </div>

          {/* Program Studi */}
          <div className="mb-4 flex items-center">
            <label className="w-36 text-blue-600 font-semibold">
              Program Studi<span className="text-red-500">*</span>
            </label>
            <div className="flex-grow">
              <SearchableDropdown
                options={programStudiOptions}
                defaultValue="Universitas Ibn Khaldun"
                className="w-full"
              />
            </div>
          </div>

          {/* Jenis Akun */}
          <div className="mb-4 flex items-center">
            <label className="w-36 text-blue-600 font-semibold">
              Jenis Akun<span className="text-red-500">*</span>
            </label>
            <div className="flex-grow">
              <SearchableDropdown
                options={jenisAkunOptions}
                defaultValue="PRAKTIKUM PVDF"
                className="w-full"
              />
            </div>
          </div>

          {/* Jml. Cicilan */}
          <div className="mb-4 flex items-center">
            <label className="w-36 text-blue-600 font-semibold">
              Jml. Cicilan<span className="text-red-500">*</span>
            </label>
            <div className="flex-grow">
              <SearchableDropdown
                options={cicilanOptions}
                defaultValue="Sekali Bayar"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* SKS Semester */}
          <div className="mb-4 flex items-center">
            <label className="w-40 text-blue-600 font-semibold">
              SKS Semester (Rp.)
            </label>
            <div className="flex-grow">
              <TextField
                type="text"
                value="0"
                inputClassName="text-right"
                fullWidth
              />
            </div>
          </div>

          {/* Nominal Tarif */}
          <div className="mb-4 flex items-center">
            <label className="w-40 text-blue-600 font-semibold">
              Nominal Tarif (Rp.)<span className="text-red-500">*</span>
            </label>
            <div className="flex-grow">
              <TextField
                type="text"
                value=""
                inputClassName="text-right"
                fullWidth
                required
              />
            </div>
          </div>

          {/* Frekuensi Denda */}
          <div className="mb-4 flex items-center">
            <label className="w-40 text-blue-600 font-semibold">
              Frekuensi Denda
            </label>
            <div className="flex-grow">
              <SearchableDropdown
                options={frekuensiDendaOptions}
                defaultValue="-- Pilih Frekuensi Denda --"
                className="w-full"
              />
            </div>
          </div>

          {/* Nominal Denda */}
          <div className="mb-4 flex items-center">
            <label className="w-40 text-blue-600 font-semibold">
              Nominal Denda (Rp.)
            </label>
            <div className="flex-grow">
              <TextField
                type="text"
                value="0,00"
                inputClassName="text-right"
                fullWidth
              />
            </div>
          </div>

          {/* Max Denda */}
          <div className="mb-4 flex items-center">
            <label className="w-40 text-blue-600 font-semibold">
              Max. Denda (Rp.)
            </label>
            <div className="flex-grow">
              <TextField
                type="text"
                value="0,00"
                inputClassName="text-right"
                fullWidth
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTarifTagihanForm;
