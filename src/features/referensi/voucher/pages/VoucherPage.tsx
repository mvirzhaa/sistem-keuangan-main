import { IoMdSearch, IoMdRefresh, IoMdAdd, IoMdTrash } from "react-icons/io";
import IconButton from "../../../../components/button/IconButton";
import Dropdown from "../../../../components/inputs/Dropdown";
import TextField from "../../../../components/inputs/TextField";
import VoucherTable from "../components/VoucherTable";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../common/routes/routes";

export default function VoucherPage() {
  document.title = "Voucher - Daftar Voucher";

  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Voucher</h1>
        <p className="text-sm text-gray-500 mb-1">Daftar Voucher</p>
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        <div className="flex flex-col sm:flex-row space-y-2  justify-between mb-4">
          <div className="flex flex-col sm:flex-row space-x-8 ">
            <Dropdown
              options={["-- Semua --", "NIM", "Nama"]}
              className="mr-4 mb-2 sm:mb-0 w-40 sm:w-full text-xs"
            />
            <div className="flex space-x-0.5 items-center">
              <TextField
                placeholder="Cari Voucher"
                className="w-full sm:w-80"
              />
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
              onClick={() => navigate(ROUTES.REFERENSI.VOUCHER.DETAIL_VOUCHER)}
            />
            <IconButton
              icon={<IoMdTrash />}
              responsive={false}
              text="Hapus"
              variant="danger"
              className="text-sm"
            />
          </div>
        </div>
        <div className="mt-4">
          <VoucherTable />
        </div>
      </div>
    </>
  );
}
