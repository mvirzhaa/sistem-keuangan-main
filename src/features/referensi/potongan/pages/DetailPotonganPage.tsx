import { IoMdArrowBack, IoMdSave } from "react-icons/io";
import IconButton from "../../../../components/button/IconButton";
import DetailPotonganForm from "../components/DetailPotonganForm";
import { useNavigate } from "react-router-dom";

export default function DetailPotonganPage() {
  document.title = "Detail Potongan";

  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Potongan</h1>
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        <div className="flex justify-end space-x-2">
          <IconButton
            icon={<IoMdArrowBack />}
            responsive={false}
            text="Kembali"
            variant="info"
            className="text-sm"
            onClick={() => {
              navigate(-1);
            }}
          />
          <IconButton
            icon={<IoMdSave />}
            responsive={false}
            text="Simpan"
            variant="success"
            className="text-sm"
            onClick={() => {
              // Logic to save the potongan details
            }}
          />
        </div>

        <div className="mt-8">
          <DetailPotonganForm onSave={() => {}} />
        </div>
      </div>
    </>
  );
}
