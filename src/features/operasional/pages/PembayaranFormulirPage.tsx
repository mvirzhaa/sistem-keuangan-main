import { useState, useEffect } from "react";
import HighlightText from "../../../components/highlightText/HighLightText";
import AutoComplete from "../../../components/inputs/AutoComplete";
import IconButton from "../../../components/button/IconButton";
import { IoMdRefresh, IoMdSearch } from "react-icons/io";
import InformasiPendaftarCard, {
  type PendaftarData,
} from "../components/InformasiPendaftarCard";
import TagihanFormulirTable from "../components/TagihanFormulirTable";
import { operasionalApi } from "../services/operasional.api";

// Tipe data untuk pendaftar
export interface Pendaftar extends PendaftarData {
  id?: string;
  idPendaftar: string;
  nama: string;
  periode: string;
  gelombang: string;
  jalurPendaftaran: string;
  sistemKuliah: string;
}

export default function PembayaranFormulirPage() {
  document.title = "Pembayaran - Formulir";

  const [searchValue, setSearchValue] = useState("");
  const [pendaftarList, setPendaftarList] = useState<Pendaftar[]>([]);
  const [selectedPendaftar, setSelectedPendaftar] = useState<Pendaftar | null>(null);
  const [inquiredPendaftar, setInquiredPendaftar] = useState<Pendaftar | null>(null);
  const [formulirData, setFormulirData] = useState<any[]>([]);
  const [loadingTagihan, setLoadingTagihan] = useState(false);

  // Server-side search ke database (mock json server) dengan debounce saat user mengetik
  useEffect(() => {
    const handler = setTimeout(async () => {
      const query = searchValue.trim();
      try {
        const response = await operasionalApi.getPendaftar(query || undefined);
        if (response && response.data && Array.isArray(response.data)) {
          setPendaftarList(response.data);
        }
      } catch (err) {
        console.error("Gagal melakukan pencarian pendaftar:", err);
      }
    }, 250);

    return () => clearTimeout(handler);
  }, [searchValue]);

  // Handle saat memilih pendaftar dari AutoComplete dropdown
  const handleSelectPendaftar = (pendaftar: Pendaftar) => {
    setSelectedPendaftar(pendaftar);
    setSearchValue(`${pendaftar.idPendaftar} - ${pendaftar.nama}`);
  };

  // Handle klik tombol Inquiry: ambil tagihan formulir dari server
  const handleInquiry = async () => {
    let target = selectedPendaftar;
    if (!target && searchValue.trim()) {
      const cleanInput = searchValue.trim().toLowerCase();
      const idCandidate = searchValue.split(" - ")[0].trim().toLowerCase();
      target =
        pendaftarList.find(
          (p) =>
            p.idPendaftar.toLowerCase() === idCandidate ||
            p.idPendaftar.toLowerCase().includes(cleanInput) ||
            (p.nama && p.nama.toLowerCase().includes(cleanInput))
        ) || null;

      // Jika belum ditemukan di list saat ini, lakukan pencarian query langsung ke database/server
      if (!target) {
        try {
          const res = await operasionalApi.getPendaftar(idCandidate || cleanInput);
          if (res.data && res.data.length > 0) {
            target = res.data[0];
          }
        } catch (e) {
          console.error("Gagal mencari data pendaftar:", e);
        }
      }
    }

    if (target) {
      setInquiredPendaftar(target);
      setLoadingTagihan(true);
      try {
        const res = await operasionalApi.getTagihanFormulir(target.idPendaftar);
        setFormulirData(res.data || []);
      } catch (err) {
        console.error("Gagal mengambil data tagihan formulir dari server:", err);
        setFormulirData([]);
      } finally {
        setLoadingTagihan(false);
      }
    }
  };

  // Handle klik tombol Batal: mereset / refresh form dan tabel ke kondisi awal
  const handleReset = () => {
    setSearchValue("");
    setSelectedPendaftar(null);
    setInquiredPendaftar(null);
    setFormulirData([]);
  };

  // Render opsi dropdown pendaftar dengan penyorotan (highlight)
  const renderPendaftarOption = (pendaftar: Pendaftar, inputValue: string) => {
    return (
      <div className="flex items-center text-xs sm:text-sm">
        <span className="mr-1.5 font-medium text-gray-700">{pendaftar.idPendaftar} -</span>
        <HighlightText
          text={pendaftar.nama}
          searchTerm={inputValue}
          highlightClassName="font-bold text-blue-800"
        />
      </div>
    );
  };

  const handleBayarTagihan = (selectedItems: any, paymentData: any) => {
    console.log("Items yang dibayar:", selectedItems);
    console.log("Data pembayaran:", paymentData);
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-800">Pembayaran</h1>
        <p className="text-sm text-gray-500 mb-1">Formulir</p>
      </div>

      <div className="container shadow-lg rounded border-t-emerald-600 border-t-4 p-4 min-h-96 bg-white">
        <div className="flex justify-center items-center space-x-1.5 mb-5">
          <AutoComplete
            data={pendaftarList}
            value={searchValue}
            onChange={setSearchValue}
            onSelect={handleSelectPendaftar}
            getOptionLabel={(pendaftar) => `${pendaftar.idPendaftar} ${pendaftar.nama}`}
            renderOption={renderPendaftarOption}
            className="w-full max-w-lg"
            placeholder="Masukkan kode / nama pendaftar"
          />
          <IconButton
            icon={<IoMdSearch size={18} />}
            text="Inquiry"
            variant="primary"
            onClick={handleInquiry}
          />
          <IconButton
            icon={<IoMdRefresh size={18} />}
            text="Batal"
            variant="warning"
            onClick={handleReset}
          />
        </div>

        <div className="mb-4">
          <InformasiPendaftarCard data={inquiredPendaftar || undefined} />
        </div>

        <div className="text-xs">
          <TagihanFormulirTable
            data={inquiredPendaftar ? formulirData : []}
            loading={loadingTagihan}
            onBayarTagihan={handleBayarTagihan}
          />
        </div>
      </div>
    </>
  );
}
