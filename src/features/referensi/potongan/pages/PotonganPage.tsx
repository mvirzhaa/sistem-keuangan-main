import {
  IoMdAdd,
  IoMdCloudUpload,
  IoMdRefresh,
  IoMdSearch,
  IoMdTrash,
} from "react-icons/io";
import IconButton from "../../../../components/button/IconButton";
import FilterDataPotonganCard from "../components/FilterDataPotonganCard";
import TextField from "../../../../components/inputs/TextField";
import Dropdown from "../../../../components/inputs/Dropdown";
import PotonganTable from "../components/PotonganTable";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../common/routes/routes";

export default function PotonganPage() {
  document.title = "Potongan";

  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Potongan</h1>
      </div>
      <div>
        <FilterDataPotonganCard />
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        <div className="flex flex-col sm:flex-row space-y-2  justify-between">
          <div className="flex flex-col sm:flex-row space-x-8 mb-4 ">
            <Dropdown
              options={["-- Semua --", "NIM", "Nama"]}
              className="mr-4 mb-2 sm:mb-0 text-xs"
            />
            <div className="flex space-x-0.5 items-center">
              <TextField
                placeholder="Cari Potongan"
                className="w-full sm:w-80"
              />
              <IconButton icon={<IoMdSearch />} variant="success" />
              <IconButton icon={<IoMdRefresh />} variant="info" />
            </div>
          </div>
          <div className="flex space-x-2 mb-4 sm:mb-0">
            <IconButton
              icon={<IoMdAdd />}
              responsive={false}
              text="Tambah"
              variant="success"
              className="text-sm"
              onClick={() => {
                navigate(ROUTES.REFERENSI.POTONGAN.DETAIL_POTONGAN);
              }}
            />
            <IconButton
              icon={<IoMdTrash />}
              responsive={false}
              text="Hapus"
              variant="danger"
              className="text-sm"
              onClick={() => {}}
            />

            <IconButton
              icon={<IoMdCloudUpload />}
              responsive={false}
              text="Import"
              variant="info"
              className="text-sm"
              onClick={() => {
                // navigate(ROUTES.TARIF.DETAIL_TARIF_TAGIHAN);
              }}
            />
          </div>
        </div>
        <div>
          <PotonganTable />
        </div>
      </div>
    </>
  );
}
