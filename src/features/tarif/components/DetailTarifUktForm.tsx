import React from "react";
import TextField from "../../../components/inputs/TextField";
import Dropdown from "../../../components/inputs/Dropdown";

interface DetailTarifUktFormProps {
  formData: {
    periodeMasuk: string;
    jalurPendaftaran: string;
    gelombang: string;
    programStudi: string;
    sistemKuliah: string;
    kelompokUKT: string;
    kuotaPenerima: string;
    nominalTarif: string;
    jmlCicilan: string;
    frekuensiDenda: string;
    nominalDenda: string;
    maxDenda: string;
  };
  onChange: (field: string, value: string) => void;
  readOnly?: boolean;
}

const DetailTarifUktForm: React.FC<DetailTarifUktFormProps> = ({
  formData,
  onChange,
  readOnly = false,
}) => {
  // Options for dropdowns
  const periodeOptions = [
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
  const sistemKuliahOptions = ["Reguler", "Kelas Karyawan", "Online"];
  const jalurOptions = ["SBMPTN", "SNMPTN", "Mandiri"];
  const programStudiOptions = [
    "Universitas Ibn Khaldun",
    "Teknik Informatika",
    "Manajemen",
  ];
  const kelompokUKTOptions = [
    "-- Pilih Kelompok UKT --",
    "UKT 1",
    "UKT 2",
    "UKT 3",
    "UKT 4",
    "UKT 5",
  ];
  const cicilanOptions = ["Sekali Bayar", "2 Kali", "3 Kali", "4 Kali"];
  const frekuensiDendaOptions = [
    "-- Pilih Frekuensi Denda --",
    "Harian",
    "Mingguan",
    "Bulanan",
    "Semesteran",
  ];

  return (
    <div className="text-sm ">
      {/* Main Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex items-center">
            <label className="flex-1 text-blue-600">
              Periode Masuk<span className="text-red-500">*</span>
            </label>
            <Dropdown
              options={periodeOptions}
              defaultValue={formData.periodeMasuk}
              onChange={(value) => onChange("periodeMasuk", value)}
              className="flex-4"
            />
          </div>

          <div className="flex items-center">
            <label className="flex-1 text-blue-600">
              Gelombang<span className="text-red-500">*</span>
            </label>
            <Dropdown
              options={gelombangOptions}
              defaultValue={formData.gelombang}
              onChange={(value) => onChange("gelombang", value)}
              className="flex-4 "
            />
          </div>

          <div className="flex items-center">
            <label className="flex-1 text-blue-600">
              Sistem Kuliah<span className="text-red-500">*</span>
            </label>
            <Dropdown
              options={sistemKuliahOptions}
              defaultValue={formData.sistemKuliah}
              onChange={(value) => onChange("sistemKuliah", value)}
              className="flex-4"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="flex items-center">
            <label className="flex-1 text-blue-600">
              Jalur Pendaftaran<span className="text-red-500">*</span>
            </label>
            <Dropdown
              options={jalurOptions}
              defaultValue={formData.jalurPendaftaran}
              onChange={(value) => onChange("jalurPendaftaran", value)}
              className="flex-4"
            />
          </div>

          <div className="flex items-center">
            <label className="flex-1 text-blue-600">
              Program Studi<span className="text-red-500">*</span>
            </label>
            <Dropdown
              options={programStudiOptions}
              defaultValue={formData.programStudi}
              onChange={(value) => onChange("programStudi", value)}
              className="flex-4"
            />
          </div>
        </div>
      </div>

      {/* Tarif dan Kuota Section */}
      <div className="mt-8">
        <h2 className="text-green-800 font-medium border-b-2 border-green-800 pb-1 mb-4">
          Tarif dan Kuota Penerima UKT
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center ">
              <label className="flex-1 text-blue-600">
                Kelompok UKT<span className="text-red-500">*</span>
              </label>
              <Dropdown
                options={kelompokUKTOptions}
                defaultValue={formData.kelompokUKT}
                onChange={(value) => onChange("kelompokUKT", value)}
                className="flex-4"
              />
            </div>

            <div className="flex items-center ">
              <label className="flex-1 text-blue-600">Kuota Penerima UKT</label>
              <div className="flex-4">
                <TextField
                  value={formData.kuotaPenerima}
                  onChange={(value) => onChange("kuotaPenerima", value)}
                  fullWidth={true}
                  readOnly={readOnly}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <label className="flex-1 text-blue-600">
                Nominal Tarif (Rp.)<span className="text-red-500">*</span>
              </label>
              <div className="flex-4">
                <TextField
                  value={formData.nominalTarif}
                  onChange={(value) => onChange("nominalTarif", value)}
                  fullWidth={true}
                  readOnly={readOnly}
                />
              </div>
            </div>

            <div className="flex items-center">
              <label className="flex-1 text-blue-600">
                Jml. Cicilan<span className="text-red-500">*</span>
              </label>
              <Dropdown
                options={cicilanOptions}
                defaultValue={formData.jmlCicilan}
                onChange={(value) => onChange("jmlCicilan", value)}
                className="flex-4"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Aturan Denda Section */}
      <div className="mt-8">
        <h2 className="text-green-800 font-medium border-b-2 border-green-800 pb-1 mb-4">
          Aturan Denda Keterlambatan Pembayaran
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <label className="flex-1 text-blue-600">Frekuensi Denda</label>
              <Dropdown
                options={frekuensiDendaOptions}
                defaultValue={formData.frekuensiDenda}
                onChange={(value) => onChange("frekuensiDenda", value)}
                className="flex-4"
              />
            </div>

            <div className="flex items-center">
              <label className="flex-1 text-blue-600">
                Nominal Denda (Rp.)
              </label>
              <div className="flex-4">
                <TextField
                  value={formData.nominalDenda}
                  onChange={(value) => onChange("nominalDenda", value)}
                  fullWidth={true}
                  readOnly={readOnly}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <label className="flex-1 text-blue-600">Max. Denda (Rp.)</label>
              <div className="flex-4">
                <TextField
                  value={formData.maxDenda}
                  onChange={(value) => onChange("maxDenda", value)}
                  readOnly={readOnly}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTarifUktForm;
