import React from "react";
import TextField from "../../../components/inputs/TextField";
import SearchableDropdown from "../../../components/inputs/SearchableDropdown";

export interface DetailTarifTagihanFormData {
  periodeMasuk: string;
  gelombang: string;
  sistemKuliah: string;
  jalurPendaftaran: string;
  programStudi: string;
  jenisAkun: string;
  cicilan: string;
  sksSemester: string;
  nominalTarif: string;
  frekuensiDenda: string;
  nominalDenda: string;
  maxDenda: string;
}

interface DetailTarifTagihanFormProps {
  formData: DetailTarifTagihanFormData;
  onChange: (field: keyof DetailTarifTagihanFormData, value: string) => void;
  className?: string;
}

const DetailTarifTagihanForm: React.FC<DetailTarifTagihanFormProps> = ({
  formData,
  onChange,
  className = "",
}) => {
  const periodeMasukOptions = [
    "2025 Genap",
    "2025 Ganjil",
    "2024 Genap",
    "2024 Ganjil",
    "2023 Genap",
    "2023 Ganjil",
    "2020 Ganjil",
  ];

  const gelombangOptions = [
    "Gelombang 1",
    "Gelombang 2",
    "Gelombang 3",
    "Gelombang 4",
  ];

  const sistemKuliahOptions = ["Reguler", "Kelas Karyawan", "Online"];

  const jalurPendaftaranOptions = [
    "SBMPTN",
    "SNMPTN",
    "Seleksi Mandiri PTS",
    "Mandiri",
    "Beasiswa",
  ];

  const programStudiOptions = [
    "Universitas Ibn Khaldun",
    "S1 - Pendidikan Masyarakat",
    "S1 - Kesehatan Masyarakat",
    "S1 - Teknik Informatika",
    "S1 - Manajemen",
    "S1 - Akuntansi",
    "S1 - Ilmu Hukum",
  ];

  const jenisAkunOptions = [
    "PRAKTIKUM PVDF",
    "SPP",
    "Biaya Pendaftaran",
    "Biaya Kuliah",
    "Biaya Ujian",
    "Biaya Wisuda",
  ];

  const cicilanOptions = [
    "Sekali Bayar",
    "2x Cicilan",
    "3x Cicilan",
    "Cicilan 3x",
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Periode Masuk */}
          <div className="flex items-center">
            <label className="w-40 text-blue-600 font-semibold text-sm flex-shrink-0">
              Periode Masuk<span className="text-red-500 ml-0.5">*</span>
            </label>
            <div className="flex-grow">
              <SearchableDropdown
                options={periodeMasukOptions}
                value={formData.periodeMasuk}
                onChange={(val) => onChange("periodeMasuk", val)}
                className="w-full text-sm"
              />
            </div>
          </div>

          {/* Gelombang */}
          <div className="flex items-center">
            <label className="w-40 text-blue-600 font-semibold text-sm flex-shrink-0">
              Gelombang<span className="text-red-500 ml-0.5">*</span>
            </label>
            <div className="flex-grow">
              <SearchableDropdown
                options={gelombangOptions}
                value={formData.gelombang}
                onChange={(val) => onChange("gelombang", val)}
                className="w-full text-sm"
              />
            </div>
          </div>

          {/* Sistem Kuliah */}
          <div className="flex items-center">
            <label className="w-40 text-blue-600 font-semibold text-sm flex-shrink-0">
              Sistem Kuliah<span className="text-red-500 ml-0.5">*</span>
            </label>
            <div className="flex-grow">
              <SearchableDropdown
                options={sistemKuliahOptions}
                value={formData.sistemKuliah}
                onChange={(val) => onChange("sistemKuliah", val)}
                className="w-full text-sm"
              />
            </div>
          </div>

          {/* Jalur Pendaftaran */}
          <div className="flex items-center">
            <label className="w-40 text-blue-600 font-semibold text-sm flex-shrink-0">
              Jalur Pendaftaran<span className="text-red-500 ml-0.5">*</span>
            </label>
            <div className="flex-grow">
              <SearchableDropdown
                options={jalurPendaftaranOptions}
                value={formData.jalurPendaftaran}
                onChange={(val) => onChange("jalurPendaftaran", val)}
                className="w-full text-sm"
              />
            </div>
          </div>

          {/* Program Studi */}
          <div className="flex items-center">
            <label className="w-40 text-blue-600 font-semibold text-sm flex-shrink-0">
              Program Studi<span className="text-red-500 ml-0.5">*</span>
            </label>
            <div className="flex-grow">
              <SearchableDropdown
                options={programStudiOptions}
                value={formData.programStudi}
                onChange={(val) => onChange("programStudi", val)}
                className="w-full text-sm"
              />
            </div>
          </div>

          {/* Jenis Akun */}
          <div className="flex items-center">
            <label className="w-40 text-blue-600 font-semibold text-sm flex-shrink-0">
              Jenis Akun<span className="text-red-500 ml-0.5">*</span>
            </label>
            <div className="flex-grow">
              <SearchableDropdown
                options={jenisAkunOptions}
                value={formData.jenisAkun}
                onChange={(val) => onChange("jenisAkun", val)}
                className="w-full text-sm"
              />
            </div>
          </div>

          {/* Jml. Cicilan */}
          <div className="flex items-center">
            <label className="w-40 text-blue-600 font-semibold text-sm flex-shrink-0">
              Jml. Cicilan<span className="text-red-500 ml-0.5">*</span>
            </label>
            <div className="flex-grow">
              <SearchableDropdown
                options={cicilanOptions}
                value={formData.cicilan}
                onChange={(val) => onChange("cicilan", val)}
                className="w-full text-sm"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* SKS Semester */}
          <div className="flex items-center">
            <label className="w-44 text-blue-600 font-semibold text-sm flex-shrink-0">
              SKS Semester (Rp.)
            </label>
            <div className="flex-grow">
              <TextField
                type="text"
                value={formData.sksSemester}
                onChange={(val) => onChange("sksSemester", val)}
                inputClassName="text-right text-sm"
                fullWidth
              />
            </div>
          </div>

          {/* Nominal Tarif */}
          <div className="flex items-center">
            <label className="w-44 text-blue-600 font-semibold text-sm flex-shrink-0">
              Nominal Tarif (Rp.)<span className="text-red-500 ml-0.5">*</span>
            </label>
            <div className="flex-grow">
              <TextField
                type="text"
                value={formData.nominalTarif}
                onChange={(val) => onChange("nominalTarif", val)}
                placeholder="2.000.000"
                inputClassName="text-right text-sm"
                fullWidth
                required
              />
            </div>
          </div>

          {/* Frekuensi Denda */}
          <div className="flex items-center">
            <label className="w-44 text-blue-600 font-semibold text-sm flex-shrink-0">
              Frekuensi Denda
            </label>
            <div className="flex-grow">
              <SearchableDropdown
                options={frekuensiDendaOptions}
                value={formData.frekuensiDenda}
                onChange={(val) => onChange("frekuensiDenda", val)}
                className="w-full text-sm"
              />
            </div>
          </div>

          {/* Nominal Denda */}
          <div className="flex items-center">
            <label className="w-44 text-blue-600 font-semibold text-sm flex-shrink-0">
              Nominal Denda (Rp.)
            </label>
            <div className="flex-grow">
              <TextField
                type="text"
                value={formData.nominalDenda}
                onChange={(val) => onChange("nominalDenda", val)}
                inputClassName="text-right text-sm"
                fullWidth
              />
            </div>
          </div>

          {/* Max Denda */}
          <div className="flex items-center">
            <label className="w-44 text-blue-600 font-semibold text-sm flex-shrink-0">
              Max. Denda (Rp.)
            </label>
            <div className="flex-grow">
              <TextField
                type="text"
                value={formData.maxDenda}
                onChange={(val) => onChange("maxDenda", val)}
                inputClassName="text-right text-sm"
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

