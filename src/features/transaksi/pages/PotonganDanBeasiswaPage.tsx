import { IoMdCheckmark, IoMdClose, IoMdRefresh, IoMdSearch } from "react-icons/io";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import FilterDataPotonganDanBeasiswaCard from "../components/FilterDataPotonganDanBeasiswaCard";
import IconButton from "../../../components/button/IconButton";
import PotonganDanBeasiswaTable, { type PotonganDanBeasiswaData } from "../components/PotonganDanBeasiswaTable";

const data: PotonganDanBeasiswaData[] = [
  {
    id: "1",
    no: 1,
    nim: "22110501479",
    nama: "MUHAMMAD ULIL ALBAB",
    angkatan: "20221",
    programStudi: "S1 - Pendidikan Agama Islam",
    sumber: "Baznas Pusat",
    beasiswa: "BCB (Beasiswa Cendikia Baznas) 2024",
    periode: "2024 Genap",
    nominal: 3000000,
    digunakan: 2850000,
  },
  {
    id: "2",
    no: 2,
    nim: "21105030210",
    nama: "MUHAMMAD FAKHRI IMRON",
    angkatan: "20211",
    programStudi: "S1 - Komunikasi dan Penyiaran Islam",
    sumber: "Baznas Pusat",
    beasiswa: "BCB (Beasiswa Cendikia Baznas) 2023",
    periode: "2024 Genap",
    nominal: 3000000,
    digunakan: 0,
  },
];

export default function PotonganDanBeasiswaPage() {
  document.title = "Penerima Potongan dan Beasiswa";

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Penerima Potongan & Beasiswa</h1>
      </div>
      <div>
        <FilterDataPotonganDanBeasiswaCard />
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        <div className="flex flex-col sm:flex-row space-y-2  justify-between mb-4">
          <div className="flex flex-col sm:flex-row space-x-8 ">
            <Dropdown options={["-- Semua --", "NIM", "Nama"]} className="mr-4 mb-2 sm:mb-0 w-40 sm:w-full text-xs" />
            <div className="flex space-x-0.5 items-center">
              <TextField placeholder="Cari Penerima Potongan & Beasiswa" className="w-full sm:w-80" />
              <IconButton icon={<IoMdSearch />} variant="success" />
              <IconButton icon={<IoMdRefresh />} variant="info" />
            </div>
          </div>
          <div className="flex space-x-2">
            <IconButton
              icon={<IoMdCheckmark />}
              responsive={false}
              text="Generate"
              variant="info"
              className="text-sm"
              onClick={() => {
                // navigate(ROUTES.TRANSAKSI.DATA_TRANSAKSI_VA);
              }}
            />
            <IconButton icon={<IoMdClose />} responsive={false} text="Batalkan VA" variant="danger" className="text-sm" onClick={() => {}} />
          </div>
        </div>
        <PotonganDanBeasiswaTable
          data={data}
          onView={() => {
            // @TODO : Buat halaman Detail penerima potongan dan beasiswa
          }}
        />
      </div>
    </>
  );
}
