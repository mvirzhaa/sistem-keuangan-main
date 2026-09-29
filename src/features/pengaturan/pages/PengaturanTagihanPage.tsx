import { IoMdSave } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import PengaturanTagihanTable from "../components/PengaturanTagihanTable";

export default function PengaturanTagihanPage() {
  document.title = "Pengaturan - Tagihan";

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Pengaturan</h1>
        <p className="text-sm text-gray-500 mb-1">Tagihan</p>
      </div>

      <InformationCard />

      <div>
        <div className="flex justify-end mb-4">
          <IconButton
            icon={<IoMdSave />}
            text="Simpan Pengaturan"
            variant="success"
          />
        </div>
        <PengaturanTagihanTable />
      </div>
    </>
  );
}

function InformationCard() {
  return (
    <div className="border border-cyan-200 bg-cyan-50 rounded-lg p-4 mb-6 text-xs">
      <div className="flex items-start">
        <div className="flex-shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center mr-3">
          <span className="font-bold">i</span>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 mb-1">Informasi Penting!</h3>
          <p className="text-gray-800">
            Mulai periode <span className="font-bold">2024/2025 Ganjil</span>,
            periode yang bisa dipilih adalah periode yang tanggal pembayaran
            tidak kosong.
          </p>
          <p className="text-gray-800">
            Untuk mengatur tanggal pembayaran{" "}
            <a href="#" className="text-green-600 hover:underline">
              di sini
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
