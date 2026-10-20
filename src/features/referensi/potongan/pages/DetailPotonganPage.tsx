import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoChevronBack, IoSave, IoSearch } from "react-icons/io5";
import { ROUTES } from "../../../../common/routes/routes";
import DetailPotonganForm, {
  type DetailPotonganFormData,
} from "../components/DetailPotonganForm";
import DetailAturanPotonganTable, {
  type AturanPotonganItem,
} from "../components/DetailAturanPotonganTable";

export default function DetailPotonganPage() {
  document.title = "Detail Potongan";

  const navigate = useNavigate();
  const location = useLocation();

  // Mode check: 'view' (read-only data) or 'create' (editable form)
  const isReadOnly =
    location.state?.mode === "view" ||
    (Boolean(location.state?.item) && location.state?.mode !== "create");

  const passedItem = location.state?.item;

  // Currency helper
  const formatCurrency = (val: number | string): string => {
    const num =
      typeof val === "string" ? parseFloat(val.replace(/[^\d]/g, "")) : val;
    if (isNaN(num)) return "0,00";
    return num.toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Default values matching user screenshot for create mode
  const defaultCreateData: DetailPotonganFormData = {
    namaPotongan: "",
    tipePotongan: "Potongan Rata",
    metodePotongan: "Nominal",
    nominalPotongan: "",
    anggaran: "",
    periodeAwal: "2027 Genap",
    periodeAkhir: "2027 Genap",
    jenisPotongan: "Potongan",
    rekanan: "-- Pilih Rekanan --",
    jumlahPenerima: "",
    realisasi: "",
    memotongTagihan: true,
  };

  // View data when navigated from table row
  const initialData: DetailPotonganFormData = passedItem
    ? {
        namaPotongan:
          passedItem.namaBeasiswa || passedItem.namaPotongan || "",
        tipePotongan: passedItem.tipePotongan || "Potongan Rata",
        metodePotongan: passedItem.metodePotongan || "Nominal",
        nominalPotongan: passedItem.nominalBeasiswa
          ? formatCurrency(passedItem.nominalBeasiswa)
          : "",
        anggaran: passedItem.anggaran
          ? formatCurrency(passedItem.anggaran)
          : "",
        periodeAwal: passedItem.periodeAwal || "2025 Ganjil",
        periodeAkhir: passedItem.periodeAkhir || "2025 Genap",
        jenisPotongan: passedItem.jenisPotongan || "Beasiswa",
        rekanan: passedItem.rekanan || "Universitas Ibn Khaldun",
        jumlahPenerima:
          passedItem.jumlahPenerima !== undefined
            ? String(passedItem.jumlahPenerima)
            : "",
        realisasi: passedItem.realisasi
          ? formatCurrency(passedItem.realisasi)
          : "",
        memotongTagihan: passedItem.memotongTagihan ?? true,
      }
    : defaultCreateData;

  const [formData, setFormData] = useState<DetailPotonganFormData>(initialData);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // Default aturan for view mode
  const defaultAturanForView: AturanPotonganItem[] = [
    { id: "1", noUrut: 1, jenisAkun: "SPP", maksimalNominal: 9000000 },
    { id: "2", noUrut: 2, jenisAkun: "SKS", maksimalNominal: 5000000 },
    {
      id: "3",
      noUrut: 3,
      jenisAkun: "Uang Gedung Tahap 2",
      maksimalNominal: 4000000,
    },
  ];

  const [aturanList, setAturanList] = useState<AturanPotonganItem[]>(
    isReadOnly ? defaultAturanForView : [],
  );

  const handleInputChange = (
    field: keyof DetailPotonganFormData,
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Aturan Potongan operations
  const handleAddAturan = (item: Omit<AturanPotonganItem, "id">) => {
    const newItem: AturanPotonganItem = {
      ...item,
      id: `${Date.now()}`,
    };
    setAturanList((prev) => [...prev, newItem]);
  };

  const handleUpdateAturan = (
    id: string,
    updated: Partial<AturanPotonganItem>,
  ) => {
    setAturanList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item)),
    );
  };

  const handleDeleteAturan = (id: string) => {
    setAturanList((prev) => prev.filter((item) => item.id !== id));
  };

  // Save whole Potongan form
  const handleSave = () => {
    if (!formData.namaPotongan.trim()) {
      alert("Nama Potongan wajib diisi!");
      return;
    }
    alert("Data potongan berhasil disimpan!");
    navigate(ROUTES.REFERENSI.POTONGAN.POTONGAN);
  };

  return (
    <>
      {/* Title */}
      <div className="flex items-baseline space-x-3 mb-3">
        <h1 className="text-2xl font-medium text-gray-800">Detail Potongan</h1>
      </div>

      {/* Main Container Card */}
      <div className="container bg-white shadow-lg rounded border-t-green-600 border-t-4 p-5 sm:p-6">
        {/* Top Header Row with Search & Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          {/* Search bar inside detail */}
          <div className="flex items-center">
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <input
                type="text"
                placeholder="Cari Detail Potongan"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="px-3 py-1.5 text-sm w-60 sm:w-80 focus:outline-none text-gray-700"
              />
              <button
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white px-3.5 py-2 transition-colors cursor-pointer"
                title="Cari"
              >
                <IoSearch size={16} />
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(ROUTES.REFERENSI.POTONGAN.POTONGAN)}
              className="bg-[#00c0ef] hover:bg-[#00acd6] text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <IoChevronBack size={16} />
              <span>Kembali ke Daftar</span>
            </button>
            {!isReadOnly && (
              <button
                type="button"
                onClick={handleSave}
                className="bg-[#00a65a] hover:bg-[#008d4c] text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <IoSave size={16} />
                <span>Simpan</span>
              </button>
            )}
          </div>
        </div>

        {/* Form Fields Component */}
        <DetailPotonganForm
          formData={formData}
          onChange={handleInputChange}
          isReadOnly={isReadOnly}
        />

        {/* Aturan Potongan Section */}
        <div className="mt-8">
          <h2 className="text-base font-bold text-gray-800 mb-2">
            Aturan Potongan
          </h2>
          <DetailAturanPotonganTable
            aturanList={aturanList}
            onAddAturan={handleAddAturan}
            onUpdateAturan={handleUpdateAturan}
            onDeleteAturan={handleDeleteAturan}
            searchKeyword={searchKeyword}
            isReadOnly={isReadOnly}
          />
        </div>
      </div>
    </>
  );
}
