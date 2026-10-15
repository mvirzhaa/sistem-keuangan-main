import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AutoComplete from "../../../components/inputs/AutoComplete";
import Dropdown from "../../../components/inputs/Dropdown";
import { IoMdRefresh, IoMdSearch } from "react-icons/io";
import { IoList } from "react-icons/io5";
import InformasiMahasiswaCard, {
  type MahasiswaData,
} from "../components/InformasiMahasiswaCard";
import TagihanTable from "../components/TagihanTable";
import IconButton from "../../../components/button/IconButton";
import HighlightText from "../../../components/highlightText/HighLightText";

interface Student extends MahasiswaData {
  nim: string;
  name: string;
  fullName: string;
}

export default function PembayaranPage() {
  document.title = "Pembayaran - Tagihan";
  const navigate = useNavigate();

  const [userType, setUserType] = useState("Mahasiswa");
  const [searchValue, setSearchValue] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [inquiredStudent, setInquiredStudent] = useState<Student | null>(null);

  // Data mahasiswa contoh (termasuk yang ada di foto referensi)
  const students: Student[] = [
    {
      nim: "231106040904",
      name: "RIANDI SIDDIK HARAHAP",
      fullName: "RIANDI SIDDIK HARAHAP",
      periode: "20231",
      gelombang: "Gelombang 1",
      jalurPendaftaran: "SELEKSI MANDIRI",
      sistemKuliah: "Reguler",
      fakultas: "Fakultas Teknik dan Sains",
      programStudi: "Teknik Informatika",
    },
    {
      nim: "E31E020302",
      name: "MUHAMMAD RIZAL",
      fullName: "AGUS MUHAMMAD RIZAL",
      periode: "20231",
      gelombang: "Gelombang 1",
      jalurPendaftaran: "SELEKSI MANDIRI",
      sistemKuliah: "Reguler",
      fakultas: "Fakultas Teknik dan Sains",
      programStudi: "Teknik Informatika",
    },
    {
      nim: "2410205105",
      name: "MUHAMMAD RIDWAN",
      fullName: "AHID MUHAMMAD RIDWAN",
      periode: "20241",
      gelombang: "Gelombang 1",
      jalurPendaftaran: "SELEKSI MANDIRI",
      sistemKuliah: "Reguler",
      fakultas: "Fakultas Ekonomi dan Bisnis",
      programStudi: "Manajemen",
    },
    {
      nim: "2211050313",
      name: "MUHAMMAD JABAR",
      fullName: "AL HAFIZ MUHAMMAD JABAR",
      periode: "20221",
      gelombang: "Gelombang 1",
      jalurPendaftaran: "SELEKSI MANDIRI",
      sistemKuliah: "Reguler",
      fakultas: "Fakultas Agama Islam",
      programStudi: "Pendidikan Agama Islam",
    },
  ];

  // Data tagihan presisi sesuai Gambar 3
  const sampleTagihanData = [
    {
      kodeTagihan: "INV/20261/0030731",
      periode: "20261",
      jenisTagihanKode: "1210",
      jenisTagihanDesc: "Cicilan Ke-1",
      nominal: 600000.0,
      denda: 0.0,
      potongan: 0.0,
      pembayaran: 0.0,
      subTotal: 600000.0,
    },
    {
      kodeTagihan: "INV/20261/0030730",
      periode: "20261",
      jenisTagihanKode: "SKS",
      jenisTagihanDesc: "Cicilan Ke-1",
      nominal: 1200000.0,
      denda: 0.0,
      potongan: 0.0,
      pembayaran: 0.0,
      subTotal: 1200000.0,
    },
  ];

  // Handle saat memilih mahasiswa dari AutoComplete dropdown
  // Catatan: data TIDAK langsung muncul sampai tombol Inquiry diklik (sesuai Gambar 2)
  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setSearchValue(`${student.nim} - ${student.fullName}`);
  };

  // Handle klik tombol Inquiry: baru memunculkan data mahasiswa dan tagihan (Gambar 3)
  const handleInquiry = () => {
    if (selectedStudent) {
      setInquiredStudent(selectedStudent);
    } else if (searchValue.trim()) {
      // Cari jika user mengetik NIM atau Nama secara manual
      const found = students.find(
        (s) =>
          s.nim.toLowerCase().includes(searchValue.toLowerCase()) ||
          s.fullName.toLowerCase().includes(searchValue.toLowerCase())
      );
      setInquiredStudent(found || students[0]);
    }
  };

  // Handle klik tombol Reset / Refresh: mengembalikan ke kondisi awal (Gambar 1)
  const handleReset = () => {
    setSearchValue("");
    setSelectedStudent(null);
    setInquiredStudent(null);
  };

  // Handle klik tombol List: navigasi ke /transaksi/pembayaran (Gambar 4)
  const handleNavigateToList = () => {
    navigate("/transaksi/pembayaran");
  };

  // Render opsi mahasiswa di AutoComplete dropdown
  const renderStudentOption = (student: Student, inputValue: string) => {
    return (
      <div className="flex items-center text-xs sm:text-sm">
        <span className="mr-1.5 font-medium text-gray-700">{student.nim} -</span>
        <HighlightText
          text={student.fullName}
          searchTerm={inputValue}
          highlightClassName="font-bold text-blue-800"
        />
      </div>
    );
  };

  return (
    <>
      {/* Page Title & Breadcrumb */}
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-800">Pembayaran</h1>
        <p className="text-sm text-gray-500 mb-1">Tagihan</p>
      </div>

      {/* Main Container Card */}
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 min-h-96 bg-white">
        {/* Filter / Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start space-y-2 sm:space-y-0 sm:space-x-3 mb-5">
          {/* User Type Dropdown */}
          <Dropdown
            options={["Mahasiswa", "Pendaftar"]}
            defaultValue="Mahasiswa"
            value={userType}
            onChange={setUserType}
            className="w-full sm:w-56"
          />

          {/* Search Input AutoComplete + Buttons Group */}
          <div className="flex items-center space-x-1.5 w-full sm:w-auto">
            <AutoComplete
              data={students}
              value={searchValue}
              onChange={setSearchValue}
              onSelect={handleSelectStudent}
              getOptionLabel={(student) =>
                `${student.nim} ${student.name} ${student.fullName}`
              }
              renderOption={renderStudentOption}
              placeholder="Masukkan NIM / Nama Mahasiswa"
              className="w-full sm:w-[420px]"
            />

            {/* Button 1: Inquiry */}
            <IconButton
              icon={<IoMdSearch size={18} />}
              text="Inquiry"
              variant="primary"
              onClick={handleInquiry}
            />

            {/* Button 2: Refresh & Reset */}
            <IconButton
              icon={<IoMdRefresh size={18} />}
              variant="warning"
              onClick={handleReset}
            />

            {/* Button 3: Navigasi ke Daftar Pembayaran */}
            <IconButton
              icon={<IoList size={18} />}
              variant="info"
              onClick={handleNavigateToList}
            />
          </div>
        </div>

        {/* Info Mahasiswa Card (Kosong jika belum inquiry, terisi saat sudah inquiry) */}
        <div className="mb-4">
          <InformasiMahasiswaCard data={inquiredStudent || undefined} />
        </div>

        {/* Tabel Tagihan Mahasiswa (Kosong jika belum inquiry, terisi saat sudah inquiry) */}
        <div className="text-xs">
          <TagihanTable
            data={inquiredStudent ? sampleTagihanData : []}
            loading={false}
          />
        </div>
      </div>
    </>
  );
}
