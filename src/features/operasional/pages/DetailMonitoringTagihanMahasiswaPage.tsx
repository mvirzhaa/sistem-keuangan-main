import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import DetailMonitoringTagihanMahasiswaTable, {
  type StudentDetailItem,
} from "../components/DetailMonitoringTagihanMahasiswaTable";
import operasionalApi from "../services/operasional.api";

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
    // Default sesuai contoh (S1 - Pendidikan Masyarakat)
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

  // State data detail mahasiswa dari Mock JSON API (dengan cache per unit)
  const cacheKey = "cached_detail_monitoring_tagihan_mahasiswa_" + detail.unit;
  const [studentList, setStudentList] = useState<StudentDetailItem[]>(() => {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [];
  });
  const [loading, setLoading] = useState(false);

  const fetchDetailData = useCallback(async (retryCount = 0) => {
    setLoading(true);
    try {
      const response = await operasionalApi.getDetailMonitoringTagihanMahasiswa({
        unit: detail.unit,
      });
      const list = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : Array.isArray((response as any)?.data?.data)
        ? (response as any).data.data
        : [];

      if (list.length > 0) {
        setStudentList(list);
        try {
          localStorage.setItem(cacheKey, JSON.stringify(list));
        } catch {}
      } else if (retryCount < 2) {
        setTimeout(() => fetchDetailData(retryCount + 1), 600);
      }
    } catch (err) {
      console.error("Gagal memuat detail tagihan mahasiswa:", err);
      if (retryCount < 2) {
        setTimeout(() => fetchDetailData(retryCount + 1), 800);
      }
    } finally {
      setLoading(false);
    }
  }, [detail.unit, cacheKey]);

  useEffect(() => {
    fetchDetailData();
  }, [fetchDetailData]);

  return (
    <div className="w-full space-y-4">
      {/* Judul Halaman */}
      <h1 className="text-xl sm:text-2xl font-medium text-gray-800 tracking-tight">
        Detail Monitoring Tagihan Mahasiswa
      </h1>

      {/* Card Wrapper dengan background putih dan border hijau di atas */}
      <div className="w-full bg-white rounded shadow-sm border-t-4 border-t-emerald-600 p-4 sm:p-5">
        {/* Tombol Kembali ke Daftar di Kanan Atas */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={() => navigate("/operasional/monitoring_tagihan_mahasiswa")}
            className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded text-xs font-semibold flex items-center space-x-1 cursor-pointer shadow-xs transition-colors"
          >
            <IoIosArrowBack size={15} />
            <span>Kembali ke Daftar</span>
          </button>
        </div>

        {/* Kotak Informasi Metadata dengan Garis Kiri Biru */}
        <div className="border-l-4 border-blue-200 bg-[#f0f7fe] p-3 sm:p-4 mb-4 text-[13px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-12">
            <div className="space-y-1.5">
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
            <div className="space-y-1.5">
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
        <div className="border-l-4 border-blue-200 bg-[#f0f7fe] p-3 sm:p-4 mb-5 text-[13px] text-[#333333]">
          <h3 className="font-bold text-[#333333] mb-1.5 text-xs">
            Keterangan
          </h3>
          <ul className="space-y-1 leading-relaxed text-[13px]">
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

        {/* Komponen Tabel Mahasiswa Menggunakan DetailMonitoringTagihanMahasiswaTable */}
        <div className="w-full">
          <DetailMonitoringTagihanMahasiswaTable
            data={studentList}
            accountColumns={accountColumns}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
