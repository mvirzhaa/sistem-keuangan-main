import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../../components/inputs/Dropdown";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdSave } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
import { useReferensiStore } from "../../../common/stores/referensiStore";
import transaksiApi, {
  type VATagihanItem,
  type VirtualAccountData,
} from "../services/transaksi.api";
import { apiService } from "../../../common/services/apiService";
import { ROUTES } from "../../../common/routes/routes";

interface StudentOption {
  id?: string;
  nim: string;
  nama: string;
  programStudi?: string;
  fakultas?: string;
}

const defaultStudentOptions: StudentOption[] = [
  {
    nim: "231106040904",
    nama: "RIANDI SIDDIK HARAHAP",
    programStudi: "Teknik Informatika",
  },
  {
    nim: "241105012115",
    nama: "SYITS AHMAD YASIR",
    programStudi: "Pendidikan Agama Islam",
  },
  {
    nim: "251105020005",
    nama: "MUHAMMAD RA'SYAD",
    programStudi: "Teknik Informatika",
  },
  {
    nim: "231106020993",
    nama: "AGUN",
    programStudi: "Teknik Informatika",
  },
  {
    nim: "231104010484",
    nama: "ADELIA FAKHIRA",
    programStudi: "Manajemen",
  },
];

export default function DataTransaksiVAForm() {
  const navigate = useNavigate();
  const { data: referensi, fetchReferensi } = useReferensiStore();

  useEffect(() => {
    fetchReferensi();
  }, [fetchReferensi]);

  // Students list from server
  const [students, setStudents] = useState<StudentOption[]>(defaultStudentOptions);
  const [studentInput, setStudentInput] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<StudentOption | null>(null);
  const [showStudentDropdown, setShowStudentDropdown] = useState<boolean>(false);

  // Form Fields
  const [penerimaTagihan, setPenerimaTagihan] = useState<string>("Mahasiswa");
  const [metodePembayaran, setMetodePembayaran] = useState<string>(
    "-- Tentukan Mahasiswa terlebih dahulu --"
  );
  const [kelompokTagihan, setKelompokTagihan] = useState<string>(
    "-- Pilih Kelompok Tagihan --"
  );
  const [tanggalJatuhTempo, setTanggalJatuhTempo] = useState<string>("");

  // State Table Tagihan (Gambar 2)
  const [showTagihan, setShowTagihan] = useState<boolean>(false);
  const [tagihanList, setTagihanList] = useState<VATagihanItem[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Load students from API
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const res = await apiService.get<any[]>("/students");
        if (res && res.data && res.data.length > 0) {
          setStudents(res.data);
        }
      } catch (err) {
        // Fallback to default options
        console.warn("Using default student list:", err);
      }
    };
    loadStudents();
  }, []);

  // Filter students based on input
  const filteredStudents = students.filter(
    (s) =>
      s.nim.toLowerCase().includes(studentInput.toLowerCase()) ||
      s.nama.toLowerCase().includes(studentInput.toLowerCase())
  );

  // Options dari referensi store
  const penerimaOptions = referensi.penerima?.length
    ? referensi.penerima
    : ["Mahasiswa", "Pendaftar"];

  const metodePembayaranOptions = selectedStudent
    ? referensi.metodePembayaran?.filter(
        (m) => m !== "-- Semua Metode Pembayaran --"
      ) || [
        "Bank Muamalat",
        "Shopee",
        "Tokopedia",
        "Transfer",
        "QRIS",
        "Virtual Account",
      ]
    : ["-- Tentukan Mahasiswa terlebih dahulu --"];

  const kelompokOptions = [
    "-- Pilih Kelompok Tagihan --",
    ...(referensi.kelompok?.filter(
      (k) =>
        k !== "-- Semua --" &&
        k !== "-- Semua Kelompok --" &&
        k !== "-- Pilih Kelompok Tagihan --"
    ) || [
      "01 - Kuliah",
      "UKT",
      "SPP",
      "Denda",
      "Wisuda",
      "Praktikum",
    ]),
  ];

  // Handle select student
  const handleSelectStudent = (student: StudentOption) => {
    setSelectedStudent(student);
    setStudentInput(`${student.nim} - ${student.nama}`);
    setShowStudentDropdown(false);

    // Otomatis aktifkan metode pembayaran ke Bank Muamalat sesuai Gambar 2
    setMetodePembayaran("Bank Muamalat");
    setKelompokTagihan("01 - Kuliah");
  };

  // Format rupiah
  const formatCurrency = (val: number | undefined | null) => {
    if (val === undefined || val === null) return "0";
    return val.toLocaleString("id-ID");
  };

  // Handle click Tampilkan Tagihan (Gambar 2)
  const handleTampilkanTagihan = () => {
    // Jika belum memilih mahasiswa, pilih RIANDI SIDDIK HARAHAP sebagai default (Gambar 2)
    if (!selectedStudent) {
      const defaultStudent =
        students.find((s) => s.nim === "231106040904") || students[0];
      if (defaultStudent) {
        setSelectedStudent(defaultStudent);
        setStudentInput(`${defaultStudent.nim} - ${defaultStudent.nama}`);
        setMetodePembayaran("Bank Muamalat");
        setKelompokTagihan("01 - Kuliah");
      }
    }

    // Tagihan sesuai Gambar 2
    const bills: VATagihanItem[] = [
      {
        kodeTagihan: "INV/20261/0030730",
        jenisTagihan: "SKS - SKS",
        periode: "20261",
        bulan: "",
        angsuran: 1,
        nominal: 1200000,
        denda: 0,
        potongan: 0,
        sisaTagihan: 1200000,
      },
      {
        kodeTagihan: "INV/20261/0030731",
        jenisTagihan: "1210 - Ujian Akhir Semester",
        periode: "20261",
        bulan: "",
        angsuran: 1,
        nominal: 600000,
        denda: 0,
        potongan: 0,
        sisaTagihan: 600000,
      },
    ];

    setTagihanList(bills);
    setShowTagihan(true);
  };

  // Handle click Generate VA
  const handleGenerateVA = async () => {
    const student =
      selectedStudent ||
      students.find((s) => s.nim === "231106040904") ||
      students[0];

    const currentBills =
      tagihanList.length > 0
        ? tagihanList
        : [
            {
              kodeTagihan: "INV/20261/0030730",
              jenisTagihan: "SKS - SKS",
              periode: "20261",
              bulan: "",
              angsuran: 1,
              nominal: 1200000,
              denda: 0,
              potongan: 0,
              sisaTagihan: 1200000,
              jumlahBayar: 1200000,
            },
            {
              kodeTagihan: "INV/20261/0030731",
              jenisTagihan: "1210 - Ujian Akhir Semester",
              periode: "20261",
              bulan: "",
              angsuran: 1,
              nominal: 600000,
              denda: 0,
              potongan: 0,
              sisaTagihan: 600000,
              jumlahBayar: 600000,
            },
          ];

    const totalNominal = currentBills.reduce((acc, curr) => acc + curr.nominal, 0);

    setIsGenerating(true);
    try {
      const newVA: Partial<VirtualAccountData> = {
        kodeVA: student.nim || "70990600000" + Math.floor(Math.random() * 90000 + 10000),
        nim: student.nim,
        nama: student.nama,
        channel: metodePembayaran !== "-- Tentukan Mahasiswa terlebih dahulu --" ? metodePembayaran : "Bank Muamalat",
        tglJatuhTempo: "21 Okt 2026, 23:59:59",
        nominal: totalNominal,
        bayar: null,
        tglBayar: null,
        status: "AKTIF",
        penerimaTagihan,
        kelompokTagihan: kelompokTagihan !== "-- Pilih Kelompok Tagihan --" ? kelompokTagihan : "01 - Kuliah",
        metodePembayaran: metodePembayaran !== "-- Tentukan Mahasiswa terlebih dahulu --" ? metodePembayaran : "Bank Muamalat",
        prodi: student.programStudi || "Teknik Informatika",
        tglVA: "18 Oktober 2026, 10:00:00",
        paymentUrl: "",
        tagihanList: currentBills,
      };

      await transaksiApi.createVirtualAccount(newVA);
      navigate(ROUTES.TRANSAKSI.VIRTUAL_ACCOUNT);
    } catch (err) {
      console.error("Gagal membuat Virtual Account:", err);
      // Fallback navigate anyway
      navigate(ROUTES.TRANSAKSI.VIRTUAL_ACCOUNT);
    } finally {
      setIsGenerating(false);
    }
  };

  // Table columns untuk Gambar 2
  const columns: Column<VATagihanItem>[] = [
    {
      key: "kodeTagihan",
      header: "Kode Tagihan",
      sortable: true,
      className: "font-mono text-xs text-gray-800",
    },
    {
      key: "jenisTagihan",
      header: "Jenis Tagihan",
      sortable: true,
      className: "text-xs text-gray-800",
    },
    {
      key: "periode",
      header: "Periode",
      sortable: true,
      className: "text-center text-xs text-gray-800",
    },
    {
      key: "bulan",
      header: "Bulan",
      sortable: true,
      className: "text-center text-xs text-gray-800",
      render: (item) => item.bulan || "",
    },
    {
      key: "angsuran",
      header: "Angsuran",
      sortable: true,
      className: "text-center text-xs text-gray-800",
      render: (item) => item.angsuran || 1,
    },
    {
      key: "nominal",
      header: "Nominal",
      sortable: true,
      className: "text-right text-xs text-gray-800",
      render: (item) => formatCurrency(item.nominal),
    },
    {
      key: "denda",
      header: "Denda",
      sortable: true,
      className: "text-center text-xs text-gray-800",
      render: (item) => item.denda || 0,
    },
    {
      key: "potongan",
      header: "Potongan",
      sortable: true,
      className: "text-center text-xs text-gray-800",
      render: (item) => item.potongan || 0,
    },
    {
      key: "sisaTagihan",
      header: "Sisa Tagihan",
      sortable: true,
      className: "text-right text-xs text-gray-800",
      render: (item) => formatCurrency(item.sisaTagihan),
    },
  ];

  const totalNominal = tagihanList.reduce((acc, curr) => acc + (curr.nominal || 0), 0);
  const totalSisa = tagihanList.reduce((acc, curr) => acc + (curr.sisaTagihan || 0), 0);

  const footerRow = (
    <tr className="font-bold text-gray-900 border border-slate-300 bg-white">
      <td className="p-2 border border-slate-300 text-left font-bold text-xs" colSpan={5}>
        Total
      </td>
      <td className="p-2 border border-slate-300 text-right font-bold text-xs">
        {formatCurrency(totalNominal)}
      </td>
      <td className="p-2 border border-slate-300 text-center font-bold text-xs">0</td>
      <td className="p-2 border border-slate-300 text-center font-bold text-xs">0</td>
      <td className="p-2 border border-slate-300 text-right font-bold text-xs">
        {formatCurrency(totalSisa)}
      </td>
    </tr>
  );

  return (
    <div className="w-full">
      {/* Form Grid (Gambar 1) */}
      <div className="max-w-3xl mx-auto space-y-4 py-2">
        {/* Penerima Tagihan */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="w-52 text-blue-600 font-semibold text-sm mb-1 sm:mb-0">
            Penerima Tagihan
          </label>
          <div className="flex-1">
            <Dropdown
              options={penerimaOptions}
              value={penerimaTagihan}
              defaultValue="Mahasiswa"
              onChange={(val) => setPenerimaTagihan(val)}
              className="w-full text-sm"
            />
          </div>
        </div>

        {/* Mahasiswa* */}
        <div className="flex flex-col sm:flex-row sm:items-center relative">
          <label className="w-52 text-blue-600 font-semibold text-sm mb-1 sm:mb-0">
            Mahasiswa<span className="text-red-500">*</span>
          </label>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Cari Mahasiswa"
              value={studentInput}
              onChange={(e) => {
                setStudentInput(e.target.value);
                setShowStudentDropdown(true);
              }}
              onFocus={() => setShowStudentDropdown(true)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 bg-white"
            />

            {/* Dropdown Suggestions */}
            {showStudentDropdown && filteredStudents.length > 0 && (
              <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-56 overflow-y-auto">
                {filteredStudents.map((student) => (
                  <div
                    key={student.nim}
                    onClick={() => handleSelectStudent(student)}
                    className="px-3 py-2 text-sm text-gray-800 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <span className="font-semibold text-blue-700">{student.nim}</span>
                    {" - "}
                    <span>{student.nama}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Metode Pembayaran* */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="w-52 text-blue-600 font-semibold text-sm mb-1 sm:mb-0">
            Metode Pembayaran<span className="text-red-500">*</span>
          </label>
          <div className="flex-1">
            <Dropdown
              options={metodePembayaranOptions}
              value={metodePembayaran}
              defaultValue={metodePembayaran}
              onChange={(val) => setMetodePembayaran(val)}
              className="w-full text-sm"
            />
          </div>
        </div>

        {/* Kelompok Tagihan */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="w-52 text-blue-600 font-semibold text-sm mb-1 sm:mb-0">
            Kelompok Tagihan
          </label>
          <div className="flex-1">
            <Dropdown
              options={kelompokOptions}
              value={kelompokTagihan}
              defaultValue="-- Pilih Kelompok Tagihan --"
              onChange={(val) => setKelompokTagihan(val)}
              className="w-full text-sm"
            />
          </div>
        </div>

        {/* Tanggal Jatuh Tempo */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="w-52 text-blue-600 font-semibold text-sm mb-1 sm:mb-0">
            Tanggal Jatuh Tempo
          </label>
          <div className="flex-1 relative">
            <div className="relative flex items-center">
              <input
                type="text"
                value={tanggalJatuhTempo}
                onChange={(e) => setTanggalJatuhTempo(e.target.value)}
                placeholder="dd-mm-yyyy"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:border-blue-500 bg-white pr-10"
              />
              <div className="absolute right-3 text-gray-500 pointer-events-none">
                <IoCalendarOutline size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons (Gambar 1) */}
        <div className="flex justify-center items-center space-x-3 pt-4">
          <button
            type="button"
            onClick={handleTampilkanTagihan}
            className="bg-[#00c0ef] hover:bg-[#00acd6] text-white px-5 py-2.5 rounded text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
          >
            <IoSearchOutline size={18} />
            Tampilkan Tagihan
          </button>
          <button
            type="button"
            onClick={handleGenerateVA}
            disabled={isGenerating}
            className="bg-[#00a65a] hover:bg-[#008d4c] text-white px-5 py-2.5 rounded text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-xs transition-colors disabled:opacity-50"
          >
            <IoMdSave size={18} />
            {isGenerating ? "Menyimpan..." : "Generate VA"}
          </button>
        </div>
      </div>

      {/* Daftar Tagihan Virtual Account (Gambar 2) */}
      {showTagihan && (
        <div className="mt-8 border-t-2 border-green-700 pt-4">
          <h2 className="text-xl font-bold text-green-700 mb-3">
            Daftar Tagihan Virtual Account
          </h2>

          <div className="w-full overflow-x-auto">
            <ListTable
              data={tagihanList}
              columns={columns}
              rowKey={(item) => item.kodeTagihan}
              showFooter={false}
              footerRow={footerRow}
              className="w-full text-xs"
              headerClassName="text-xs bg-[#0c4a6e] text-white"
            />
          </div>
        </div>
      )}
    </div>
  );
}
