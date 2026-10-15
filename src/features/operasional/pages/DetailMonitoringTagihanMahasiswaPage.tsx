import React, { useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import DetailMonitoringTagihanMahasiswaTable, {
  type StudentDetailItem,
} from "../components/DetailMonitoringTagihanMahasiswaTable";

export default function DetailMonitoringTagihanMahasiswaPage() {
  document.title = "Detail Monitoring Tagihan Mahasiswa";
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Ambil data dari state navigasi atau query params
  const stateItem = location.state?.item;
  const paramId = searchParams.get("id");

  // Metadata detail
  const detail = useMemo(() => {
    if (stateItem) {
      return {
        id: stateItem.id || "1",
        unit: stateItem.unit || "S1 - Pendidikan Masyarakat",
        jalurPendaftaran: stateItem.jalurPendaftaran || "SELEKSI MANDIRI",
        sistemKuliah: stateItem.sistemKuliah || "Reguler",
        gelombang: stateItem.gelombang || "Gelombang 1",
        periodeMasuk: stateItem.periodeMasuk || "2023 Ganjil",
        periodeTagihan: stateItem.periodeTagihan || "2026 Genap",
        jumlahMahasiswa: stateItem.jumlahMahasiswa || 15,
      };
    }
    if (paramId === "1") {
      return {
        id: "1",
        unit: "S1 - Akuntansi",
        jalurPendaftaran: "Seleksi Mandiri PTS",
        sistemKuliah: "Reguler",
        gelombang: "Gelombang 1",
        periodeMasuk: "2017 Ganjil",
        periodeTagihan: "2026 Genap",
        jumlahMahasiswa: 29,
      };
    }
    // Default sesuai contoh gambar terbaru (S1 - Pendidikan Masyarakat)
    return {
      id: "2",
      unit: "S1 - Pendidikan Masyarakat",
      jalurPendaftaran: "SELEKSI MANDIRI",
      sistemKuliah: "Reguler",
      gelombang: "Gelombang 1",
      periodeMasuk: "2023 Ganjil",
      periodeTagihan: "2026 Genap",
      jumlahMahasiswa: 15,
    };
  }, [stateItem, paramId]);

  // Kolom akun berdasarkan program studi
  const accountColumns = useMemo(() => {
    if (detail.unit === "S1 - Akuntansi") {
      return ["1020", "1040"];
    }
    return ["SKS", "1020", "1040", "1050", "1210"];
  }, [detail.unit]);

  // Data daftar mahasiswa (menampilkan seluruh baris tanpa paginasi)
  const studentList: StudentDetailItem[] = useMemo(() => {
    if (detail.unit === "S1 - Akuntansi") {
      return [
        {
          id: "1",
          nim: "161103051139",
          nama: "MARYAM HINSANI",
          statusMahasiswa: "Lulus",
          statusSemester: "",
          semester: "",
          accounts: { "1020": null, "1040": null },
        },
        {
          id: "2",
          nim: "171103050232",
          nama: "VENI FADILAH",
          statusMahasiswa: "Lulus",
          statusSemester: "",
          semester: "",
          accounts: { "1020": null, "1040": null },
        },
        {
          id: "3",
          nim: "171103050233",
          nama: "DESI PATMALA",
          statusMahasiswa: "Drop Out / Dikeluarkan",
          statusSemester: "",
          semester: "",
          accounts: { "1020": null, "1040": null },
        },
        {
          id: "4",
          nim: "171103050234",
          nama: "REVITA REVANI",
          statusMahasiswa: "Mengundurkan Diri / Keluar",
          statusSemester: "",
          semester: "",
          accounts: { "1020": null, "1040": null },
        },
        {
          id: "5",
          nim: "171103050235",
          nama: "KARMILA",
          statusMahasiswa: "Lulus",
          statusSemester: "",
          semester: "",
          accounts: { "1020": null, "1040": null },
        },
        {
          id: "6",
          nim: "171103050236",
          nama: "MUHAMMAD RIZKY PRATAMA",
          statusMahasiswa: "Lulus",
          statusSemester: "",
          semester: "",
          accounts: { "1020": null, "1040": null },
        },
        {
          id: "7",
          nim: "171103050237",
          nama: "NITA NURAINI",
          statusMahasiswa: "Lulus",
          statusSemester: "",
          semester: "",
          accounts: { "1020": null, "1040": null },
        },
        {
          id: "8",
          nim: "171103050238",
          nama: "FAJAR RAMADHAN",
          statusMahasiswa: "Aktif",
          statusSemester: "",
          semester: "",
          accounts: { "1020": null, "1040": null },
        },
        {
          id: "9",
          nim: "171103050239",
          nama: "SITI AISYAH",
          statusMahasiswa: "Lulus",
          statusSemester: "",
          semester: "",
          accounts: { "1020": null, "1040": null },
        },
        {
          id: "10",
          nim: "171103050240",
          nama: "ANDI SAPUTRA",
          statusMahasiswa: "Drop Out / Dikeluarkan",
          statusSemester: "",
          semester: "",
          accounts: { "1020": null, "1040": null },
        },
        {
          id: "11",
          nim: "171103050241",
          nama: "BELLA SAFIRA",
          statusMahasiswa: "Lulus",
          statusSemester: "",
          semester: "",
          accounts: { "1020": null, "1040": null },
        },
        {
          id: "12",
          nim: "171103050242",
          nama: "EKA PUTRI LESTARI",
          statusMahasiswa: "Lulus",
          statusSemester: "",
          semester: "",
          accounts: { "1020": null, "1040": null },
        },
        {
          id: "13",
          nim: "171103050243",
          nama: "DIMAS ANGGARA",
          statusMahasiswa: "Mengundurkan Diri / Keluar",
          statusSemester: "",
          semester: "",
          accounts: { "1020": null, "1040": null },
        },
        {
          id: "14",
          nim: "171103050244",
          nama: "HANIFAH NURUL",
          statusMahasiswa: "Lulus",
          statusSemester: "",
          semester: "",
          accounts: { "1020": null, "1040": null },
        },
        {
          id: "15",
          nim: "171103050245",
          nama: "ILHAM MAULANA",
          statusMahasiswa: "Drop Out / Dikeluarkan",
          statusSemester: "",
          semester: "",
          accounts: { "1020": null, "1040": null },
        },
      ];
    }

    // Data untuk S1 - Pendidikan Masyarakat dan prodi lainnya (15 data lengkap sesuai gambar referensi)
    return [
      {
        id: "1",
        nim: "141101021264",
        nama: "FEBI KHOTIMAH",
        statusMahasiswa: "Drop Out / Dikeluarkan",
        statusSemester: "",
        semester: "",
        accounts: {
          SKS: null,
          "1020": null,
          "1040": null,
          "1050": null,
          "1210": null,
        },
      },
      {
        id: "2",
        nim: "151101020858",
        nama: "NURHASANAH",
        statusMahasiswa: "Drop Out / Dikeluarkan",
        statusSemester: "",
        semester: "",
        accounts: {
          SKS: null,
          "1020": null,
          "1040": null,
          "1050": null,
          "1210": null,
        },
      },
      {
        id: "3",
        nim: "151101020872",
        nama: "SITI KULSUM NOVIANTI",
        statusMahasiswa: "Drop Out / Dikeluarkan",
        statusSemester: "",
        semester: "",
        accounts: {
          SKS: null,
          "1020": null,
          "1040": null,
          "1050": null,
          "1210": null,
        },
      },
      {
        id: "4",
        nim: "151101020875",
        nama: "RATNA SARI",
        statusMahasiswa: "Drop Out / Dikeluarkan",
        statusSemester: "",
        semester: "",
        accounts: {
          SKS: null,
          "1020": null,
          "1040": null,
          "1050": null,
          "1210": null,
        },
      },
      {
        id: "5",
        nim: "161101020503",
        nama: "DEO MUBAROK",
        statusMahasiswa: "Drop Out / Dikeluarkan",
        statusSemester: "",
        semester: "",
        accounts: {
          SKS: null,
          "1020": null,
          "1040": null,
          "1050": null,
          "1210": null,
        },
      },
      {
        id: "6",
        nim: "161101021144",
        nama: "SITI ROINI",
        statusMahasiswa: "Drop Out / Dikeluarkan",
        statusSemester: "",
        semester: "",
        accounts: {
          SKS: null,
          "1020": null,
          "1040": null,
          "1050": null,
          "1210": null,
        },
      },
      {
        id: "7",
        nim: "161101021367",
        nama: "HABIB RUJHAN",
        statusMahasiswa: "Mengundurkan Diri / Keluar",
        statusSemester: "",
        semester: "",
        accounts: {
          SKS: null,
          "1020": null,
          "1040": null,
          "1050": null,
          "1210": null,
        },
      },
      {
        id: "8",
        nim: "161101021370",
        nama: "HIDAYATULLAH",
        statusMahasiswa: "Drop Out / Dikeluarkan",
        statusSemester: "",
        semester: "",
        accounts: {
          SKS: null,
          "1020": null,
          "1040": null,
          "1050": null,
          "1210": null,
        },
      },
      {
        id: "9",
        nim: "171101021401",
        nama: "ANISA FITRIANI",
        statusMahasiswa: "Drop Out / Dikeluarkan",
        statusSemester: "",
        semester: "",
        accounts: {
          SKS: null,
          "1020": null,
          "1040": null,
          "1050": null,
          "1210": null,
        },
      },
      {
        id: "10",
        nim: "171101021402",
        nama: "DIMAS PRASETYO",
        statusMahasiswa: "Mengundurkan Diri / Keluar",
        statusSemester: "",
        semester: "",
        accounts: {
          SKS: null,
          "1020": null,
          "1040": null,
          "1050": null,
          "1210": null,
        },
      },
      {
        id: "11",
        nim: "171101021403",
        nama: "RIZAL FAHREZI",
        statusMahasiswa: "Drop Out / Dikeluarkan",
        statusSemester: "",
        semester: "",
        accounts: {
          SKS: null,
          "1020": null,
          "1040": null,
          "1050": null,
          "1210": null,
        },
      },
      {
        id: "12",
        nim: "171101021404",
        nama: "NADIA PUTRI",
        statusMahasiswa: "Lulus",
        statusSemester: "",
        semester: "",
        accounts: {
          SKS: null,
          "1020": null,
          "1040": null,
          "1050": null,
          "1210": null,
        },
      },
      {
        id: "13",
        nim: "171101021405",
        nama: "FAJAR HIDAYAT",
        statusMahasiswa: "Lulus",
        statusSemester: "",
        semester: "",
        accounts: {
          SKS: null,
          "1020": null,
          "1040": null,
          "1050": null,
          "1210": null,
        },
      },
      {
        id: "14",
        nim: "171101021406",
        nama: "TIARA ANGGRAINI",
        statusMahasiswa: "Aktif",
        statusSemester: "",
        semester: "",
        accounts: {
          SKS: null,
          "1020": null,
          "1040": null,
          "1050": null,
          "1210": null,
        },
      },
      {
        id: "15",
        nim: "171101021407",
        nama: "YUSUF MAULANA",
        statusMahasiswa: "Drop Out / Dikeluarkan",
        statusSemester: "",
        semester: "",
        accounts: {
          SKS: null,
          "1020": null,
          "1040": null,
          "1050": null,
          "1210": null,
        },
      },
    ];
  }, [detail.unit]);

  return (
    <div className="w-full space-y-4">
      {/* Judul Halaman */}
      <h1 className="text-2xl font-medium text-gray-800 tracking-tight">
        Detail Monitoring Tagihan Mahasiswa
      </h1>

      {/* Card Wrapper dengan background putih dan border hijau di atas */}
      <div className="w-full bg-white rounded shadow-sm border-t-4 border-emerald-500 p-5 sm:p-6">
        {/* Tombol Kembali ke Daftar di Kanan Atas */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={() => navigate("/operasional/monitoring_tagihan_mahasiswa")}
            className="px-3 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded text-xs font-semibold flex items-center space-x-1 cursor-pointer shadow-xs transition-colors"
          >
            <IoIosArrowBack size={15} />
            <span>Kembali ke Daftar</span>
          </button>
        </div>

        {/* Kotak Informasi Metadata dengan Garis Kiri Biru */}
        <div className="border-l-4 border-blue-200 bg-[#f0f7fe] p-4 sm:p-5 mb-4 text-[13px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2.5 gap-x-12">
            <div className="space-y-2">
              <div className="flex items-center gap-x-10">
                <span className="w-44 font-semibold text-[#517fa4]">
                  Periode Tagihan
                </span>
                <span className="text-[#333333] font-normal">
                  {detail.periodeTagihan}
                </span>
              </div>
              <div className="flex items-center gap-x-10">
                <span className="w-44 font-semibold text-[#517fa4]">
                  Program Studi
                </span>
                <span className="text-[#333333] font-normal">{detail.unit}</span>
              </div>
              <div className="flex items-center gap-x-10">
                <span className="w-44 font-semibold text-[#517fa4]">
                  Jalur Pendaftaran
                </span>
                <span className="text-[#333333] font-normal">
                  {detail.jalurPendaftaran}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-x-10">
                <span className="w-44 font-semibold text-[#517fa4]">
                  Periode Masuk
                </span>
                <span className="text-[#333333] font-normal">
                  {detail.periodeMasuk}
                </span>
              </div>
              <div className="flex items-center gap-x-10">
                <span className="w-44 font-semibold text-[#517fa4]">
                  Sistem Kuliah
                </span>
                <span className="text-[#333333] font-normal">
                  {detail.sistemKuliah}
                </span>
              </div>
              <div className="flex items-center gap-x-10">
                <span className="w-44 font-semibold text-[#517fa4]">
                  Gelombang
                </span>
                <span className="text-[#333333] font-normal">
                  {detail.gelombang}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Kotak Keterangan dengan Garis Kiri Biru */}
        <div className="border-l-4 border-blue-200 bg-[#f0f7fe] p-4 sm:p-5 mb-6 text-[13px] text-[#333333]">
          <h3 className="font-bold text-[#333333] mb-2 text-xs sm:text-[13px]">
            Keterangan
          </h3>
          <ul className="space-y-1.5 leading-relaxed text-xs sm:text-[13px]">
            <li className="flex items-center">
              <span className="mr-2 font-bold">•</span>
              <span className="text-[#f05545] font-bold mr-1.5">✖</span>
              <span>: Belum memiliki tagihan tetapi mempunyai tarif</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2 font-bold">•</span>
              <span>Nominal terisi : Mahasiswa sudah memiliki tagihan</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2 font-bold">•</span>
              <span>
                Status semester kosong : Mahasiswa tidak memiliki status semester
                di periode tagihan
              </span>
            </li>
          </ul>
        </div>

        {/* Komponen Tabel Mahasiswa (Semua data ditampilkan tanpa paginasi) */}
        <DetailMonitoringTagihanMahasiswaTable
          data={studentList}
          accountColumns={accountColumns}
        />
      </div>
    </div>
  );
}
