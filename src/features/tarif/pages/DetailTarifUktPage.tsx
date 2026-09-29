import { IoArrowBack, IoSave } from "react-icons/io5";
import IconButton from "../../../components/button/IconButton";
import { IoMdSearch } from "react-icons/io";
import TextField from "../../../components/inputs/TextField";
import { useNavigate } from "react-router-dom";
import DetailTarifUktForm from "../components/DetailTarifUktForm";
import { useState } from "react";

export default function DetailTarifUktPage() {
  document.title = "Detail Tarif UKT";

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    periodeMasuk: "2025 Genap",
    jalurPendaftaran: "SBMPTN",
    gelombang: "Gelombang 1",
    programStudi: "Universitas Ibn Khaldun",
    sistemKuliah: "Reguler",
    kelompokUKT: "-- Pilih Kelompok UKT --",
    kuotaPenerima: "",
    nominalTarif: "",
    jmlCicilan: "Sekali Bayar",
    frekuensiDenda: "-- Pilih Frekuensi Denda --",
    nominalDenda: "",
    maxDenda: "0",
  });

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Tarif UKT</h1>
        <p className="text-sm text-gray-500 mb-1">Detail Uang Kuliah Tunggal</p>
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        <div className="flex flex-col sm:flex-row space-y-2  justify-between mb-4">
          <div className="flex flex-col sm:flex-row space-x-8 ">
            <div className="flex space-x-0.5 items-center">
              <TextField placeholder="Cari Tarif" className="w-full sm:w-80" />
              <IconButton icon={<IoMdSearch />} variant="success" />
            </div>
          </div>
          <div className="flex space-x-2">
            <IconButton
              icon={<IoArrowBack />}
              responsive={false}
              text="Kembali ke Daftar"
              variant="info"
              className="text-sm"
              onClick={() => {
                navigate(-1);
              }}
            />
            <IconButton
              icon={<IoSave />}
              responsive={false}
              text="Simpan"
              variant="success"
              className="text-sm"
              onClick={() => {}}
            />
          </div>
        </div>
        <div>
          <DetailTarifUktForm formData={formData} onChange={handleChange} />
        </div>
      </div>
    </>
  );
}
