import { useState } from "react";
import HighlightText from "../../../components/highlightText/HighLightText";
import AutoComplete from "../../../components/inputs/AutoComplete";
import IconButton from "../../../components/button/IconButton";
import { IoMdRefresh, IoMdSearch } from "react-icons/io";
import InformasiPendaftarCard, {
  type PendaftarData,
} from "../components/InformasiPendaftarCard";
import TagihanFormulirTable from "../components/TagihanFormulirTable";

// Tipe data untuk pendaftar
interface Pendaftar extends PendaftarData {
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
  const [selectedPendaftar, setSelectedPendaftar] = useState<Pendaftar | null>(null);
  const [inquiredPendaftar, setInquiredPendaftar] = useState<Pendaftar | null>(null);

  // Data contoh pendaftar (termasuk referensi DEDE FEBRIANDI sesuai spesifikasi)
  const pendaftarList: Pendaftar[] = [
    {
      idPendaftar: "4102541234",
      nama: "DEDE FEBRIANDI",
      periode: "2025 Ganjil",
      gelombang: "Gelombang 1",
      jalurPendaftaran: "BEASISWA KIP",
      sistemKuliah: "Reguler",
    },
    {
      idPendaftar: "4102541235",
      nama: "AGUS MUHAMMAD RIZAL",
      periode: "2025 Ganjil",
      gelombang: "Gelombang 1",
      jalurPendaftaran: "SELEKSI MANDIRI",
      sistemKuliah: "Reguler",
    },
    {
      idPendaftar: "4102541236",
      nama: "AHID MUHAMMAD RIDWAN",
      periode: "2025 Ganjil",
      gelombang: "Gelombang 1",
      jalurPendaftaran: "SELEKSI MANDIRI",
      sistemKuliah: "Reguler",
    },
    {
      idPendaftar: "4102541237",
      nama: "AL HAFIZ MUHAMMAD JABAR",
      periode: "2025 Ganjil",
      gelombang: "Gelombang 2",
      jalurPendaftaran: "BEASISWA PRESTASI",
      sistemKuliah: "Reguler",
    },
    {
      idPendaftar: "4102541238",
      nama: "ANDI MUHAMMAD FAJAR",
      periode: "2025 Ganjil",
      gelombang: "Gelombang 1",
      jalurPendaftaran: "SELEKSI MANDIRI",
      sistemKuliah: "Reguler",
    },
    {
      idPendaftar: "4102541239",
      nama: "ANDI MUHAMMAD FARID AR",
      periode: "2025 Ganjil",
      gelombang: "Gelombang 1",
      jalurPendaftaran: "SELEKSI MANDIRI",
      sistemKuliah: "Reguler",
    },
    {
      idPendaftar: "4102541240",
      nama: "ANDI MUHAMMAD RIFALDI",
      periode: "2025 Ganjil",
      gelombang: "Gelombang 2",
      jalurPendaftaran: "SELEKSI MANDIRI",
      sistemKuliah: "Reguler",
    },
    {
      idPendaftar: "4102541241",
      nama: "ARIA MUHAMMAD RAMADHAN",
      periode: "2025 Ganjil",
      gelombang: "Gelombang 1",
      jalurPendaftaran: "SELEKSI MANDIRI",
      sistemKuliah: "Reguler",
    },
    {
      idPendaftar: "4102541242",
      nama: "DEWOSONGO MUHAMMAD BILAL",
      periode: "2025 Ganjil",
      gelombang: "Gelombang 1",
      jalurPendaftaran: "BEASISWA KIP",
      sistemKuliah: "Reguler",
    },
  ];

  // Handle saat memilih pendaftar dari AutoComplete dropdown
  // Data TIDAK langsung ditampilkan sampai tombol Inquiry diklik
  const handleSelectPendaftar = (pendaftar: Pendaftar) => {
    setSelectedPendaftar(pendaftar);
    setSearchValue(`${pendaftar.idPendaftar} - ${pendaftar.nama}`);
  };

  // Handle klik tombol Inquiry: baru menampilkan data pendaftar dan tagihan formulir
  const handleInquiry = () => {
    if (selectedPendaftar) {
      setInquiredPendaftar(selectedPendaftar);
    } else if (searchValue.trim()) {
      const found = pendaftarList.find(
        (p) =>
          p.idPendaftar.toLowerCase().includes(searchValue.toLowerCase()) ||
          p.nama.toLowerCase().includes(searchValue.toLowerCase())
      );
      setInquiredPendaftar(found || pendaftarList[0]);
    }
  };

  // Handle klik tombol Batal: mereset / refresh form dan tabel ke kondisi awal
  const handleReset = () => {
    setSearchValue("");
    setSelectedPendaftar(null);
    setInquiredPendaftar(null);
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

  // Data contoh tagihan formulir
  const formulirData = [
    {
      id: "1",
      kode: "INV/20251/0000038",
      periode: "20251",
      tanggal: "7 Januari 2025, 10:47:58",
      jatuhTempo: "31 Mei 2025, 23:59:59",
      jenis: "FRM - Formulir",
      nominal: 300000,
      nominalPotongan: 0,
      nominalBayar: 300000,
    },
  ];

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

      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 min-h-96 bg-white">
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
            onBayarTagihan={handleBayarTagihan}
          />
        </div>
      </div>
    </>
  );
}
