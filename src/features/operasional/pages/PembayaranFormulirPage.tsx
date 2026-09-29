import { useState } from "react";
import HighlightText from "../../../components/highlightText/HighLightText";
import AutoComplete from "../../../components/inputs/AutoComplete";
import IconButton from "../../../components/button/IconButton";
import { IoMdRefresh, IoMdSearch } from "react-icons/io";
import InformasiPendaftarCard from "../components/InformasiPendaftarCard";
import TagihanFormulirTable from "../components/TagihanFormulirTable";

// Tipe untuk data mahasiswa
interface Student {
  nim: string;
  name: string;
  fullName: string; // nama lengkap dengan gelar, dll
}

export default function PembayaranFormulirPage() {
  document.title = "Pembayaran - Formulir";

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

  // Data contoh
  const formulirData = [
    {
      id: "1",
      kode: "INV/20251/0000038",
      periode: "20251",
      tanggal: "7 Januari 2025, 10:47:58",
      jatuhTempo: "31 Mei 2025, 23:59:59",
      jenis: "FRM - Formulir",
      nominal: 300000,
      nominalPotongan: 0,
      nominalBayar: 300000,
    },
  ];

  // Di dalam component
  const handleBayarTagihan = (selectedItems: any, paymentData: any) => {
    console.log("Items yang dibayar:", selectedItems);
    console.log("Data pembayaran:", paymentData);
    // Kirim ke API
  };
  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium ">Pembayaran</h1>
        <p className="text-sm text-gray-500 mb-1">Formulir</p>
      </div>

      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 min-h-96">
        <div className="flex justify-center space-x-1 mb-4">
          <AutoComplete
            data={students}
            value={searchValue}
            onChange={setSearchValue}
            onSelect={handleSelectStudent}
            getOptionLabel={(student) => `${student.nim} ${student.name} ${student.fullName}`}
            renderOption={renderStudentOption}
            className="w-lg"
            placeholder="Masukkan kode / nama pendaftar"
          />
          <IconButton icon={<IoMdSearch />} text="Inquiry" variant="primary" />
          <IconButton icon={<IoMdRefresh />} text="Batal" variant="warning" onClick={() => console.log("Reset clicked")} />
        </div>
        <div className="mb-4">
          <InformasiPendaftarCard />
        </div>
        <div className="text-xs">
          <TagihanFormulirTable data={selectedStudent ? formulirData : []} onBayarTagihan={handleBayarTagihan} />
        </div>
      </div>
    </>
  );
}
