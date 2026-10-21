import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdSave } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import PengaturanTagihanTable from "../components/PengaturanTagihanTable";
import { ROUTES } from "../../../common/routes/routes";

export default function PengaturanTagihanPage() {
  document.title = "Pengaturan - Tagihan";
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleSave = () => {
    setShowSuccessAlert(true);
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Pengaturan</h1>
        <p className="text-sm text-gray-500 mb-1">Tagihan</p>
      </div>

      {/* Alert Banner Notifikasi Sukses */}
      {showSuccessAlert && (
        <div className="bg-[#dff0d8] border border-[#d6e9c6] text-[#3c763d] px-4 py-3 rounded mb-4 flex justify-between items-center text-xs sm:text-sm shadow-xs transition-all">
          <span>Pengaturan berhasil</span>
          <button
            type="button"
            onClick={() => setShowSuccessAlert(false)}
            className="text-[#3c763d] hover:text-green-900 font-bold text-lg leading-none cursor-pointer opacity-70 hover:opacity-100"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
      )}

      <div className="container bg-white shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-2">
        <InformationCard />

        <div>
          <div className="flex justify-end mb-4">
            <IconButton
              icon={<IoMdSave />}
              text="Simpan Pengaturan"
              variant="success"
              onClick={handleSave}
            />
          </div>
          <PengaturanTagihanTable />
        </div>
      </div>
    </>
  );
}

function InformationCard() {
  return (
    <div className="border border-cyan-400 bg-cyan-50 rounded-lg p-4 mb-4 text-xs">
      <div className="flex items-start">
        <div className="flex-shrink-0 w-5 h-5 bg-cyan-600 text-white rounded-full flex items-center justify-center mr-3 font-bold text-sm">
          !
        </div>
        <div>
          <h3 className="font-bold text-gray-800 mb-1">Informasi Penting!</h3>
          <p className="text-gray-800">
            Mulai periode <span className="font-bold">2026/2027 Ganjil</span>,
            periode yang bisa dipilih adalah periode yang tanggal pembayaran
            tidak kosong.
          </p>
          <p className="text-gray-800">
            Untuk mengatur tanggal pembayaran{" "}
            <Link
              to={ROUTES.PENGATURAN.PERIODE_PEMBAYARAN}
              className="text-green-600 hover:underline font-medium"
            >
              di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
