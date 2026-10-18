import React from "react";
import BaseModal from "../../../components/modal/BaseModal";

export interface ItemTagihanDetail {
  kodeTagihan: string;
  cicilan: string;
  bulan: string;
  nominal: string;
  denda: string;
  potongan: string;
  bayar: string;
  sisaTagihan: string;
  status: string;
  pembayaran: string;
}

export interface MahasiswaTagihanDetail {
  id: string;
  nim: string;
  nama: string;
  programStudi: string;
  angkatan: string;
  noTelepon?: string;
  email?: string;
  statusKuliah: string;
  sksSemester?: string;
  statusTagihan: string;
  tagihanHarusDibayar?: string;
  tagihanList?: ItemTagihanDetail[];
}

interface DetailTagihanSemesterModalProps {
  isOpen: boolean;
  onClose: () => void;
  mahasiswa: MahasiswaTagihanDetail | null;
  periode?: string;
}

const DetailTagihanSemesterModal: React.FC<DetailTagihanSemesterModalProps> = ({
  isOpen,
  onClose,
  mahasiswa,
  periode = "2026 Ganjil",
}) => {
  if (!isOpen || !mahasiswa) return null;

  const tagihanList = mahasiswa.tagihanList || [];

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      maxWidth="max-w-5xl"
      className="p-5 sm:p-6"
    >
      {/* Header Modal */}
      <div className="border-b-2 border-[#004e82] pb-2 mb-4">
        <h2 className="text-lg font-bold text-[#004e82]">
          Daftar Tagihan Periode {periode}
        </h2>
      </div>

      {/* Informasi Mahasiswa Box (Background Biru Muda) */}
      <div className="bg-[#f0f6fe] border border-[#cce0f5] rounded-sm p-4 mb-5 text-xs sm:text-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          {/* Baris 1: NIM & Nama */}
          <div className="flex items-center">
            <span className="w-36 text-[#337ab7] font-semibold">NIM</span>
            <span className="text-gray-800 font-normal">{mahasiswa.nim}</span>
          </div>
          <div className="flex items-center">
            <span className="w-36 text-[#337ab7] font-semibold">Nama</span>
            <span className="text-gray-800 font-normal">{mahasiswa.nama}</span>
          </div>

          {/* Baris 2: Program Studi & Angkatan */}
          <div className="flex items-center">
            <span className="w-36 text-[#337ab7] font-semibold">
              Program Studi
            </span>
            <span className="text-gray-800 font-normal">
              {mahasiswa.programStudi}
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-36 text-[#337ab7] font-semibold">
              Angkatan
            </span>
            <span className="text-gray-800 font-normal">
              {mahasiswa.angkatan}
            </span>
          </div>

          {/* Baris 3: No. Telepon & Email (Warna Hijau) */}
          <div className="flex items-center">
            <span className="w-36 text-[#337ab7] font-semibold">
              No. Telepon
            </span>
            <span className="text-emerald-600 font-medium">
              {mahasiswa.noTelepon || "082118829239"}
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-36 text-[#337ab7] font-semibold">Email</span>
            <span className="text-emerald-600 font-medium">
              {mahasiswa.email || "fikriahdika02@gmail.com"}
            </span>
          </div>

          {/* Baris 4: Status Kuliah & SKS Semester */}
          <div className="flex items-center">
            <span className="w-36 text-[#337ab7] font-semibold">
              Status Kuliah
            </span>
            <span>
              <span className="inline-block bg-gray-400 text-white text-[11px] font-medium px-2 py-0.5 rounded shadow-xs">
                {mahasiswa.statusKuliah || "Tidak Memiliki AKM"}
              </span>
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-36 text-[#337ab7] font-semibold">
              SKS Semester
            </span>
            <span className="text-gray-800 font-normal">
              {mahasiswa.sksSemester || "-"}
            </span>
          </div>

          {/* Baris 5: Status Tagihan & Tagihan Harus Dibayar */}
          <div className="flex items-center">
            <span className="w-36 text-[#337ab7] font-semibold">
              Status Tagihan
            </span>
            <span>
              <span className="inline-block bg-gray-400 text-white text-[11px] font-medium px-2 py-0.5 rounded shadow-xs">
                {mahasiswa.statusTagihan || "Tidak Ada Tagihan"}
              </span>
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-36 text-[#337ab7] font-semibold">
              Tagihan Harus Dibayar
            </span>
            <span className="text-gray-800 font-normal">
              {mahasiswa.tagihanHarusDibayar || "-"}
            </span>
          </div>
        </div>
      </div>

      {/* Tabel Tagihan */}
      <div className="w-full overflow-x-auto border-t border-[#004e82]">
        <table className="w-full border-collapse text-xs text-left">
          <thead>
            <tr className="bg-[#004e82] text-white">
              <th className="py-2 px-3 font-semibold text-center border-r border-[#003c64] whitespace-nowrap">
                Kode Tagihan
              </th>
              <th className="py-2 px-3 font-semibold text-center border-r border-[#003c64] whitespace-nowrap">
                Cicilan
              </th>
              <th className="py-2 px-3 font-semibold text-center border-r border-[#003c64] whitespace-nowrap">
                Bulan
              </th>
              <th className="py-2 px-3 font-semibold text-center border-r border-[#003c64] whitespace-nowrap">
                Nominal
              </th>
              <th className="py-2 px-3 font-semibold text-center border-r border-[#003c64] whitespace-nowrap">
                Denda
              </th>
              <th className="py-2 px-3 font-semibold text-center border-r border-[#003c64] whitespace-nowrap">
                Potongan
              </th>
              <th className="py-2 px-3 font-semibold text-center border-r border-[#003c64] whitespace-nowrap">
                Bayar
              </th>
              <th className="py-2 px-3 font-semibold text-center border-r border-[#003c64] whitespace-nowrap">
                Sisa Tagihan
              </th>
              <th className="py-2 px-3 font-semibold text-center border-r border-[#003c64] whitespace-nowrap">
                Status
              </th>
              <th className="py-2 px-3 font-semibold text-center whitespace-nowrap">
                Pembayaran
              </th>
            </tr>
          </thead>
          <tbody>
            {tagihanList.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="py-3 px-4 text-center text-gray-500 font-normal border-b-2 border-[#004e82] bg-white"
                >
                  Tidak ada tagihan
                </td>
              </tr>
            ) : (
              tagihanList.map((tagihan, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-2 px-3 text-center border-r border-gray-100">
                    {tagihan.kodeTagihan}
                  </td>
                  <td className="py-2 px-3 text-center border-r border-gray-100">
                    {tagihan.cicilan}
                  </td>
                  <td className="py-2 px-3 text-center border-r border-gray-100">
                    {tagihan.bulan}
                  </td>
                  <td className="py-2 px-3 text-right border-r border-gray-100">
                    {tagihan.nominal}
                  </td>
                  <td className="py-2 px-3 text-right border-r border-gray-100">
                    {tagihan.denda}
                  </td>
                  <td className="py-2 px-3 text-right border-r border-gray-100">
                    {tagihan.potongan}
                  </td>
                  <td className="py-2 px-3 text-right border-r border-gray-100">
                    {tagihan.bayar}
                  </td>
                  <td className="py-2 px-3 text-right border-r border-gray-100">
                    {tagihan.sisaTagihan}
                  </td>
                  <td className="py-2 px-3 text-center border-r border-gray-100">
                    <span className="inline-block bg-emerald-600 text-white text-[11px] px-2 py-0.5 rounded font-medium">
                      {tagihan.status}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    {tagihan.pembayaran}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Tombol Tutup di Pojok Kanan Bawah */}
      <div className="flex justify-end mt-5">
        <button
          type="button"
          onClick={onClose}
          className="bg-[#00c0ef] hover:bg-[#00acd6] active:bg-[#0097be] text-white px-4 py-2 rounded font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
        >
          <span className="text-sm font-black leading-none">✕</span>
          <span>Tutup</span>
        </button>
      </div>
    </BaseModal>
  );
};

export default DetailTagihanSemesterModal;
