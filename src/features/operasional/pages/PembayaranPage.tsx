import { useState, useEffect } from "react";
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
import { operasionalApi } from "../services/operasional.api";

export interface Student extends MahasiswaData {
  id?: string;
  nim: string;
  nama: string;
  name?: string;
  fullName?: string;
}

export default function PembayaranPage() {
  document.title = "Pembayaran - Tagihan";
  const navigate = useNavigate();

  const [userType, setUserType] = useState("Mahasiswa");
  const [searchValue, setSearchValue] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [inquiredStudent, setInquiredStudent] = useState<Student | null>(null);
  const [tagihanData, setTagihanData] = useState<any[]>([]);
  const [loadingTagihan, setLoadingTagihan] = useState(false);

  // Server-side search ke database (mock json server) dengan debounce saat user mengetik
  useEffect(() => {
    const handler = setTimeout(async () => {
      const query = searchValue.trim();
      try {
        const response = await operasionalApi.getStudents(query || undefined);
        if (response && response.data && Array.isArray(response.data)) {
          setStudents(response.data);
        }
      } catch (err) {
        console.error("Gagal melakukan pencarian mahasiswa:", err);
      }
    }, 250);

    return () => clearTimeout(handler);
  }, [searchValue]);

  // Handle saat tipe pengguna diganti
  const handleUserTypeChange = (type: string) => {
    setUserType(type);
    if (type === "Pendaftar") {
      navigate("/operasional/pembayaran_formulir");
    }
  };

  // Handle saat memilih mahasiswa dari AutoComplete dropdown
  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    const displayName = student.nama || student.fullName || student.name || "";
    setSearchValue(`${student.nim} - ${displayName}`);
  };

  // Handle klik tombol Inquiry: ambil data tagihan mahasiswa dari server
  const handleInquiry = async () => {
    let target = selectedStudent;
    if (!target && searchValue.trim()) {
      const cleanInput = searchValue.trim().toLowerCase();
      const nimCandidate = searchValue.split(" - ")[0].trim().toLowerCase();
      target =
        students.find(
          (s) =>
            s.nim.toLowerCase() === nimCandidate ||
            s.nim.toLowerCase().includes(cleanInput) ||
            (s.nama && s.nama.toLowerCase().includes(cleanInput)) ||
            (s.fullName && s.fullName.toLowerCase().includes(cleanInput)) ||
            (s.name && s.name.toLowerCase().includes(cleanInput))
        ) || null;

      // Jika belum ditemukan di list saat ini, lakukan pencarian query langsung ke database/server
      if (!target) {
        try {
          const res = await operasionalApi.getStudents(nimCandidate || cleanInput);
          if (res.data && res.data.length > 0) {
            target = res.data[0];
          }
        } catch (e) {
          console.error("Gagal mencari data mahasiswa:", e);
        }
      }
    }

    if (target) {
      const completeTarget: Student = {
        ...target,
        nama: target.nama || target.fullName || target.name || "",
      };
      setInquiredStudent(completeTarget);
      setLoadingTagihan(true);
      try {
        const res = await operasionalApi.getTagihanPembayaran(target.nim);
        setTagihanData(res.data || []);
      } catch (err) {
        console.error("Gagal mengambil data tagihan dari server:", err);
        setTagihanData([]);
      } finally {
        setLoadingTagihan(false);
      }
    }
  };

  // Handle klik tombol Reset / Refresh: mengembalikan ke kondisi awal
  const handleReset = () => {
    setSearchValue("");
    setSelectedStudent(null);
    setInquiredStudent(null);
    setTagihanData([]);
  };

  // Handle klik tombol List: navigasi ke /transaksi/pembayaran
  const handleNavigateToList = () => {
    navigate("/transaksi/pembayaran");
  };

  // Render opsi mahasiswa di AutoComplete dropdown
  const renderStudentOption = (student: Student, inputValue: string) => {
    const displayName = student.nama || student.fullName || student.name || "";
    return (
      <div className="flex items-center text-xs sm:text-sm">
        <span className="mr-1.5 font-medium text-gray-700">{student.nim} -</span>
        <HighlightText
          text={displayName}
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
      <div className="container shadow-lg rounded border-t-emerald-600 border-t-4 p-4 min-h-96 bg-white">
        {/* Filter / Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start space-y-2 sm:space-y-0 sm:space-x-3 mb-5">
          {/* User Type Dropdown */}
          <Dropdown
            options={["Mahasiswa", "Pendaftar"]}
            defaultValue="Mahasiswa"
            value={userType}
            onChange={handleUserTypeChange}
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
                `${student.nim} ${student.nama || student.fullName || student.name || ""}`
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
            data={inquiredStudent ? tagihanData : []}
            loading={loadingTagihan}
          />
        </div>
      </div>
    </>
  );
}
