import { useState } from "react";
import AturanAkademikMenu, {
  type MenuItem,
} from "../components/AturanAkademikMahasiswaMenu";
import IconButton from "../../../components/button/IconButton";
import { IoMdAdd, IoMdTrash } from "react-icons/io";
import PengaturanAturanAkademikTable from "../components/PengaturanAturanAkademikTable";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../common/routes/routes";

export default function PengaturanAturanAkademikPage() {
  document.title = "Pengaturan - Aturan Akademik";

  const navigate = useNavigate();

  const mahasiswaMenu: MenuItem[] = [
    { label: "Mengambil Cuti", value: "cuti", isActive: false },
    { label: "Melihat KHS", value: "khs", isActive: false },
    {
      label: "Pengambilan KRS reguler (Gasal/Genap)",
      value: "krs_reguler",
      isActive: true,
    },
    {
      label: "Pengambilan KRS Semester Pendek",
      value: "krs_pendek",
      isActive: true,
    },
    { label: "Presensi mahasiswa", value: "presensi", isActive: false },
    { label: "Mengambil Proposal", value: "proposal", isActive: false },
    { label: "Mengambil Skripsi", value: "skripsi", isActive: false },
    { label: "Mengikuti UAS", value: "uas", isActive: true },
    { label: "Mengikuti UTS", value: "uts", isActive: true },
  ];

  const pendaftarMenu: MenuItem[] = [
    { label: "Daftar Ulang", value: "daftar-ulang", isActive: true },
    {
      label: "Generate Mahasiswa",
      value: "generate-mahasiswa",
      isActive: false,
    },
  ];

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Pengaturan</h1>
        <p className="text-sm text-gray-500 mb-1">Aturan Akademik</p>
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 px-4 py-4 mt-4">
        <div className="flex justify-end space-x-2">
          <IconButton
            text="Tambah"
            icon={<IoMdAdd />}
            variant="success"
            onClick={() => navigate(ROUTES.PENGATURAN.DETAIL_ATURAN_AKADEMIK)}
          />
          <IconButton text="Hapus" icon={<IoMdTrash />} variant="danger" />
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center">
          <div className="flex flex-col space-y-8">
            <AturanAkademikMenu
              title="MAHASISWA"
              items={mahasiswaMenu}
              onItemClick={(value) => {}}
            />
            <AturanAkademikMenu
              title="PENDAFTAR"
              items={pendaftarMenu}
              onItemClick={(value) => {}}
            />
          </div>
          <div>
            <TableSection />
          </div>
        </div>
      </div>
    </>
  );
}

function TableSection() {
  const dummyAkademikTableData = [
    {
      id: "1",
      jenisTagihan: "Uang Gedung Tahap 1",
      keteranganTagihan: "Hanya Periode Saat Ini",
      syaratCicilan: "Semua Cicilan",
      pembayaranMinimal: "100.00%",
      status: "Aktif" as "Aktif",
    },
    {
      id: "2",
      jenisTagihan: "Uang Gedung Tahap 2",
      keteranganTagihan: "Hanya Periode Saat Ini",
      syaratCicilan: "Semua Cicilan",
      pembayaranMinimal: "100.00%",
      status: "Aktif" as "Aktif",
    },
    {
      id: "3",
      jenisTagihan: "SPP",
      keteranganTagihan: "Periode Saat Ini dan Sebelumnya",
      syaratCicilan: "Semua Cicilan",
      pembayaranMinimal: "100.00%",
      status: "Aktif" as "Aktif",
    },
    {
      id: "4",
      jenisTagihan: "Heregistrasi",
      keteranganTagihan: "Hanya Periode Saat Ini",
      syaratCicilan: "Semua Cicilan",
      syaratCicilanTambahan: "Memeriksa bulan sesuai urutan cicilan",
      pembayaranMinimal: "100.00%",
      status: "Tidak Aktif" as "Tidak Aktif",
    },
    {
      id: "5",
      jenisTagihan: "UPM (Uang Pembinaan Mahasiswa)",
      keteranganTagihan: "Hanya Periode Saat Ini",
      syaratCicilan: "Semua Cicilan",
      syaratCicilanTambahan: "Memeriksa bulan sesuai urutan cicilan",
      pembayaranMinimal: "100.00%",
      status: "Tidak Aktif" as "Tidak Aktif",
    },
  ];
  return (
    <div>
      <div className="">
        <h2 className="text-lg font-semibold text-blue-900 mb-2 border-b-2 border-b-blue-900">
          Universitas Ibn Khaldun Bogor
        </h2>
      </div>
      <div>
        <PengaturanAturanAkademikTable
          data={dummyAkademikTableData}
          onView={(id) => console.log("View", id)}
          onDelete={(id) => console.log("Delete", id)}
        />
      </div>
    </div>
  );
}
