import { IoMdArrowBack } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import DataTransaksiVAForm from "../components/DataTransaksiVAForm";
import { useNavigate } from "react-router-dom";

export default function DataTransaksiVAPage() {
  document.title = "Virtual Account - Data Transaksi VA";

  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Virtual Account</h1>
        <p className="text-sm text-gray-500 mb-1">Data Transaksi VA</p>
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        <div className="flex justify-end">
          <IconButton icon={<IoMdArrowBack />} text="Kembali ke Daftar" variant="info" onClick={() => navigate(-1)} />
        </div>
        <div className="flex justify-center mt-4">
          <DataTransaksiVAForm />
        </div>
      </div>
    </>
  );
}
