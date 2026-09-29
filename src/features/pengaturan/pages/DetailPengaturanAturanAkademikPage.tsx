import { IoMdSearch, IoMdArrowBack, IoMdSave } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import TextField from "../../../components/inputs/TextField";
import { useNavigate } from "react-router-dom";
import DetailPengaturanAturanAkademikForm from "../components/DetailPengaturanAturanAkademikForm";

export default function DetailPengaturanAturanAkademikPage() {
  document.title = "Detail Pengaturan Aturan Akademik";

  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Pengaturan</h1>
        <p className="text-sm text-gray-500 mb-1">Detail Aturan Akademik</p>
      </div>

      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        <div className="flex flex-column sm:flex-row justify-between">
          <div className="flex space-x-0.5 items-center">
            <TextField
              placeholder="Cari Pengaturan"
              className="w-full sm:w-80"
              rightIcon={<IoMdSearch />}
            />
          </div>
          <div className="flex space-x-2">
            <IconButton
              icon={<IoMdArrowBack />}
              responsive={false}
              text="Kembali"
              variant="info"
              className="text-sm"
              onClick={() => navigate(-1)}
            />
            <IconButton
              icon={<IoMdSave />}
              responsive={false}
              text="Simpan"
              variant="success"
              className="text-sm"
            />
          </div>
        </div>
        <div>
          <DetailPengaturanAturanAkademikForm />
        </div>
      </div>
    </>
  );
}
