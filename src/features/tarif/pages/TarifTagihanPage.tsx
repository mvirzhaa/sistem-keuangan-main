import {
  IoMdSearch,
  IoMdRefresh,
  IoMdCheckmark,
  IoMdClose,
  IoMdAdd,
  IoMdRemove,
} from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import FilterDataTarifTagihanCard from "../components/FilterDataTarifTagihanCard";
import { IoCloudUpload, IoCopy, IoTrash } from "react-icons/io5";
import TarifTagihanTable from "../components/TarifTagihanTable";
import { ROUTES } from "../../../common/routes/routes";
import { useNavigate } from "react-router-dom";

const data = [
  {
    id: "1",
    periodeMasuk: "2024 Genap",
    gelombang: "Gelombang 1",
    jalurPendaftaran: "Seleksi Mandiri PTS",
    sistemKuliah: "Reguler",
    programStudi: "S1 - Kesehatan Masyarakat",
    jenisAkun: "SPP",
    nominalTarif: 2000000,
    cicilan: "Sekali Bayar",
  },
  {
    id: "2",
    periodeMasuk: "2024 Genap",
    gelombang: "Gelombang 2",
    jalurPendaftaran: "Seleksi Mandiri PTS",
    sistemKuliah: "Reguler",
    programStudi: "S1 - Kesehatan Masyarakat",
    jenisAkun: "SPP",
    nominalTarif: 2000000,
    cicilan: "Sekali Bayar",
  },
];

export default function TarifTagihanPage() {
  document.title = "Tarif - Tarif Tagihan";

  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Tarif</h1>
        <p className="text-sm text-gray-500 mb-1">Tarif Tagihan</p>
      </div>
      <div>
        <FilterDataTarifTagihanCard />
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        <div className="flex flex-col sm:flex-row space-y-2  justify-between mb-4">
          <div className="flex flex-col sm:flex-row space-x-8 ">
            <Dropdown
              options={["-- Semua --", "NIM", "Nama"]}
              className="mr-4 mb-2 sm:mb-0 w-40 sm:w-full text-xs"
            />
            <div className="flex space-x-0.5 items-center">
              <TextField placeholder="Cari Tarif" className="w-full sm:w-80" />
              <IconButton icon={<IoMdSearch />} variant="success" />
              <IconButton icon={<IoMdRefresh />} variant="info" />
            </div>
          </div>
          <div className="flex space-x-2">
            <IconButton
              icon={<IoMdAdd />}
              responsive={false}
              text="Tambah"
              variant="success"
              className="text-sm"
              onClick={() => {
                navigate(ROUTES.TARIF.DETAIL_TARIF_TAGIHAN);
              }}
            />
            <IconButton
              icon={<IoTrash />}
              responsive={false}
              text="Hapus"
              variant="danger"
              className="text-sm"
              onClick={() => {}}
            />
            <IconButton
              icon={<IoCopy />}
              responsive={false}
              text="Salin Data"
              variant="warning"
              className="text-sm"
              onClick={() => {}}
            />
            <IconButton
              icon={<IoCloudUpload />}
              responsive={false}
              text="Import"
              variant="info"
              className="text-sm"
              onClick={() => {}}
            />
          </div>
        </div>
        <div>
          <TarifTagihanTable
            data={data}
            onDetail={() => {}}
            onDelete={() => {}}
          />
        </div>
      </div>
    </>
  );
}
