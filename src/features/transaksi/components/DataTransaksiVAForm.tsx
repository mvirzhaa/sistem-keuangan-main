import React, { useState, useEffect } from "react";
import Dropdown from "../../../components/inputs/Dropdown";
import AutoComplete from "../../../components/inputs/AutoComplete";
import DatePicker from "../../../components/inputs/DatePicker";
import IconButton from "../../../components/button/IconButton";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdDownload, IoMdSave } from "react-icons/io";

interface MahasiswaData {
  id: string;
  nim: string;
  nama: string;
}

interface DataTransaksiVAFormData {
  penerimaTagihan: string;
  mahasiswa: MahasiswaData | null;
  metodePembayaran: string;
  kelompokTagihan: string;
  tanggalJatuhTempo: string;
}

interface DataTransaksiVAFormProps {
  onSubmit?: (data: DataTransaksiVAFormData) => void;
  onGenerateVA?: (data: DataTransaksiVAFormData) => void;
  onShowTagihan?: (data: DataTransaksiVAFormData) => void;
}

const MAHASISWA_DUMMY_DATA: MahasiswaData[] = [
  { id: "1", nim: "221105010366", nama: "AHMAD NABIL MUASSYAF KAMIL" },
  { id: "2", nim: "211105010318", nama: "AHMAD NUR RANDI" },
  { id: "3", nim: "221106043033", nama: "MUHAMMAD SYAIFULLAH NURROHMAN" },
  { id: "4", nim: "221106043019", nama: "AZKA FADILAH RAHMAN" },
  { id: "5", nim: "221106023147", nama: "NOVAL LUTFI FUADI" },
];

const DataTransaksiVAForm: React.FC<DataTransaksiVAFormProps> = ({ onSubmit, onGenerateVA, onShowTagihan }) => {
  const [formData, setFormData] = useState<DataTransaksiVAFormData>({
    penerimaTagihan: "Mahasiswa",
    mahasiswa: null,
    metodePembayaran: "-- Tentukan Mahasiswa terlebih dahulu --",
    kelompokTagihan: "-- Pilih Kelompok Tagihan --",
    tanggalJatuhTempo: "2025-07-13",
  });

  const [mahasiswaQuery, setMahasiswaQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [metodePembayaranOptions, setMetodePembayaranOptions] = useState<string[]>(["-- Tentukan Mahasiswa terlebih dahulu --"]);

  useEffect(() => {
    // Update metode pembayaran options when mahasiswa is selected
    if (formData.mahasiswa) {
      setMetodePembayaranOptions(["Virtual Account", "Transfer", "QRIS", "Cash"]);
      setFormData((prev) => ({
        ...prev,
        metodePembayaran: "Virtual Account",
      }));
    } else {
      setMetodePembayaranOptions(["-- Tentukan Mahasiswa terlebih dahulu --"]);
      setFormData((prev) => ({
        ...prev,
        metodePembayaran: "-- Tentukan Mahasiswa terlebih dahulu --",
      }));
    }
  }, [formData.mahasiswa]);

  const handleInputChange = (field: keyof DataTransaksiVAFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMahasiswaSelect = (item: MahasiswaData) => {
    setFormData((prev) => ({
      ...prev,
      mahasiswa: item,
    }));
    setMahasiswaQuery(`${item.nim} - ${item.nama}`);
  };

  const handleShowTagihan = () => {
    if (onShowTagihan) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onShowTagihan(formData);
      }, 500);
    }
  };

  const handleGenerateVA = () => {
    if (onGenerateVA) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onGenerateVA(formData);
      }, 500);
    }
  };

  // Function to render mahasiswa option
  const renderMahasiswaOption = (item: MahasiswaData, inputValue: string) => {
    const text = `${item.nim} - ${item.nama}`;

    // Highlight matching text
    const regex = new RegExp(`(${inputValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);

    return (
      <div>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <span key={i} className="font-bold">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </div>
    );
  };

  return (
    <div className="p-4 text-xs">
      <div className="grid grid-cols-1 gap-y-4">
        {/* Penerima Tagihan */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="w-48 text-blue-600 font-medium mb-1 sm:mb-0">Penerima Tagihan</label>
          <div className="flex-grow">
            <Dropdown options={["Mahasiswa", "Dosen", "Karyawan"]} defaultValue={formData.penerimaTagihan} onChange={(value) => handleInputChange("penerimaTagihan", value)} className="w-full" />
          </div>
        </div>

        {/* Mahasiswa */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="w-48 text-blue-600 font-medium mb-1 sm:mb-0">
            Mahasiswa<span className="text-red-500">*</span>
          </label>
          <div className="flex-grow">
            <AutoComplete
              data={MAHASISWA_DUMMY_DATA}
              value={mahasiswaQuery}
              onChange={setMahasiswaQuery}
              onSelect={handleMahasiswaSelect}
              getOptionLabel={(item) => `${item.nim} - ${item.nama}`}
              renderOption={renderMahasiswaOption}
              placeholder="Cari Mahasiswa"
              className="w-full"
            />
          </div>
        </div>

        {/* Metode Pembayaran */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="w-48 text-blue-600 font-medium mb-1 sm:mb-0">
            Metode Pembayaran<span className="text-red-500">*</span>
          </label>
          <div className="flex-grow">
            <Dropdown options={metodePembayaranOptions} defaultValue={formData.metodePembayaran} onChange={(value) => handleInputChange("metodePembayaran", value)} className="w-full" />
          </div>
        </div>

        {/* Kelompok Tagihan */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="w-48 text-blue-600 font-medium mb-1 sm:mb-0">Kelompok Tagihan</label>
          <div className="flex-grow">
            <Dropdown
              options={["-- Pilih Kelompok Tagihan --", "UKT", "Denda Keterlambatan", "Biaya Wisuda", "Biaya Praktikum"]}
              defaultValue={formData.kelompokTagihan}
              onChange={(value) => handleInputChange("kelompokTagihan", value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Tanggal Jatuh Tempo */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="w-48 text-blue-600 font-medium mb-1 sm:mb-0">Tanggal Jatuh Tempo</label>
          <div className="flex-grow">
            <DatePicker value={formData.tanggalJatuhTempo} onChange={(value) => handleInputChange("tanggalJatuhTempo", value)} className="w-full" disabled={!formData.mahasiswa} />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-4 space-x-4">
          <IconButton icon={<IoSearchOutline size={20} />} text="Tampilkan Tagihan" variant="info" />
          <IconButton icon={<IoMdSave size={20} />} text="Generate VA" variant="success" />
        </div>
      </div>
    </div>
  );
};

export default DataTransaksiVAForm;
