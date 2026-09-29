import { IoMdArrowBack, IoMdSave, IoMdSearch } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import TextField from "../../../components/inputs/TextField";
import { useNavigate } from "react-router-dom";
import DetailDepositForm from "../components/DetailDepositForm";

export default function DetailDepositPage() {
  document.title = "Transaksi - Detail Deposit Masuk";
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Transaksi</h1>
        <p className="text-sm text-gray-500 mb-1">Detail Deposit Masuk</p>
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4">
        <div className="flex justify-between">
          <div className="flex space-x-0.5 items-center">
            <TextField
              placeholder="Cari Transaksi"
              className="w-full sm:w-80"
            />
            <IconButton icon={<IoMdSearch />} variant="success" />
          </div>
          <div className="flex space-x-0.5 items-center">
            <IconButton
              icon={<IoMdArrowBack />}
              text="Kembali ke Daftar"
              variant="info"
              onClick={() => navigate(-1)}
            />
            <IconButton icon={<IoMdSave />} text="Simpan" variant="success" />
          </div>
        </div>
        <div className="mt-8">
          <DetailDepositForm />
        </div>
      </div>
    </>
  );
}
