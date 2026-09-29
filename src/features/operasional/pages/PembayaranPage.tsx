import { useState, type JSX } from "react";
import AutoComplete from "../../../components/inputs/AutoComplete";
import Dropdown from "../../../components/inputs/Dropdown";
import { IoMdRefresh, IoMdSearch } from "react-icons/io";
import { IoList } from "react-icons/io5";
import InformasiMahasiswaCard from "../components/InformasiMahasiswaCard";
import TagihanTable from "../components/TagihanTable";
import IconButton from "../../../components/button/IconButton";
import HighlightText from "../../../components/highlightText/HighLightText";

// Tipe untuk data mahasiswa
interface Student {
  nim: string;
  name: string;
  fullName: string; // nama lengkap dengan gelar, dll
}

export default function PembayaranPage() {
  document.title = "Pembayaran - Tagihan";

  const handleUserTypeChange = (value: string) => {
    console.log("Selected user type:", value);
    // TODO: Lakukan logika lain sesuai kebutuhan
  };

  const [searchValue, setSearchValue] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Data contoh
  const students: Student[] = [
    { nim: "E31E020302", name: "MUHAMMAD RIZAL", fullName: "AGUS MUHAMMAD RIZAL" },
    { nim: "2410205105", name: "MUHAMMAD RIDWAN", fullName: "AHID MUHAMMAD RIDWAN" },
    { nim: "2211050313", name: "MUHAMMAD JABAR", fullName: "AL HAFIZ MUHAMMAD JABAR" },
    { nim: "E21E040081", name: "MUHAMMAD FAJAR", fullName: "ANDI MUHAMMAD FAJAR" },
    { nim: "2411050121", name: "MUHAMMAD FARID AR", fullName: "ANDI MUHAMMAD FARID AR" },
    { nim: "1811060113", name: "MUHAMMAD RIFALDI", fullName: "ANDI MUHAMMAD RIFALDI" },
    { nim: "7001000065", name: "MUHAMMAD YUSHARD", fullName: "ANDI MUHAMMAD YUSHARD" },
    { nim: "0821541048", name: "MUHAMMAD RAMADHAN", fullName: "ARIA MUHAMMAD RAMADHAN" },
    { nim: "1711051208", name: "MUHAMMAD BILAL", fullName: "DEWOSONGO MUHAMMAD BILAL" },
  ];

  const sampleTagihanData = [
    {
      kodeTagihan: "INV/20242/002574",
      periode: "20242",
      jenisTagihanKode: "1090",
      jenisTagihanDesc: "Cicilan Ke-1",
      nominal: 1000000.0,
      denda: 0.0,
      potongan: 0.0,
      pembayaran: 0.0,
      subTotal: 1000000.0,
    },
    // Tambahkan data tagihan lainnya jika diperlukan
  ];

  // Handle selection
  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setSearchValue(`${student.nim} - ${student.fullName}`);
  };

  // Render opsi dengan format khusus
  const renderStudentOption = (student: Student, inputValue: string) => {
    return (
      <div>
        <div className="flex">
          <span className="mr-2">{student.nim} - </span>
          <HighlightText text={student.fullName} searchTerm={inputValue} highlightClassName="font-bold text-blue-800" />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium ">Pembayaran</h1>
        <p className="text-sm text-gray-500 mb-1">Tagihan</p>
      </div>

      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 min-h-96">
        <div className="flex flex-col sm:flex-row justify-center space-x-1 mb-4 space-y-2 sm:space-y-0">
          <Dropdown options={["Mahasiswa", "Pendaftar"]} defaultValue="Mahasiswa" onChange={handleUserTypeChange} className="w-64 mr-4" />

          <div className="flex space-x-1">
            <AutoComplete
              data={students}
              value={searchValue}
              onChange={setSearchValue}
              onSelect={handleSelectStudent}
              getOptionLabel={(student) => `${student.nim} ${student.name} ${student.fullName}`}
              renderOption={renderStudentOption}
              className="w-lg"
            />
            <IconButton icon={<IoMdSearch />} text="Inquiry" variant="primary" onClick={() => console.log("Inquiry clicked")} />
            <IconButton icon={<IoMdRefresh />} variant="warning" onClick={() => console.log("Reset clicked")} />
            <IconButton icon={<IoList />} variant="info" onClick={() => console.log("List clicked")} />
          </div>
        </div>
        <div className="mb-4">
          <InformasiMahasiswaCard />
        </div>
        <div className="text-xs">
          <TagihanTable data={selectedStudent ? sampleTagihanData : []} loading={false} />
        </div>
      </div>
    </>
  );
}
