import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { IoMdArrowBack, IoMdPrint } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import InformationCard, { type FieldItem } from "../../../components/card/InformationCard";
import operasionalApi from "../services/operasional.api";

export interface MahasiswaTercekalItem {
  id: string;
  kodeProdi?: string;
  nim: string;
  nama: string;
  status: string;
  sks: number;
  jenisTagihan: string;
}

export default function DetailMonitoringMahasiswaTercekalAturanAkademikPage() {
  document.title = "Detail Monitoring Mahasiswa Tercekal Aturan Akademik";
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Ambil data item prodi & filters dari state navigasi atau query param
  const stateItem = location.state?.item;
  const stateFilters = location.state?.filters;
  const paramId = searchParams.get("id");

  // Metadata detail prodi & filter
  const detail = useMemo(() => {
    if (stateItem) {
      return {
        id: stateItem.id || "1",
        kodeProdi: stateItem.kodeProdi || "86131",
        namaProgram: stateItem.namaProgram || "S2 - Pendidikan Agama Islam (S2)",
        angkatan: stateItem.angkatan || "2026 Ganjil",
        periodeAkademik:
          stateFilters?.periodeAkademik && stateFilters.periodeAkademik !== "-- Semua --"
            ? stateFilters.periodeAkademik
            : stateItem.periodeAkademik || stateFilters?.periodeAkademik || "-- Semua --",
        aturanAkademik: stateFilters?.aturanAkademik || stateItem.aturanAkademik || "KHS - Melihat KHS",
        jumlahTercekal: stateItem.jumlahMahasiswaTercekal ?? 0,
      };
    }

    if (paramId === "2") {
      return {
        id: "2",
        kodeProdi: "55201",
        namaProgram: "S1 - Teknik Informatika",
        angkatan: "2026 Ganjil",
        periodeAkademik: "-- Semua --",
        aturanAkademik: "KHS - Melihat KHS",
        jumlahTercekal: 3,
      };
    }

    // Default data sesuai contoh referensi (S2 - Pendidikan Agama Islam)
    return {
      id: "1",
      kodeProdi: "86131",
      namaProgram: "S2 - Pendidikan Agama Islam (S2)",
      angkatan: "2026 Ganjil",
      periodeAkademik: "-- Semua --",
      aturanAkademik: "KHS - Melihat KHS",
      jumlahTercekal: 0,
    };
  }, [stateItem, stateFilters, paramId]);

  // State data mahasiswa tercekal dari JSON backend
  const cacheKey = "cached_detail_mahasiswa_tercekal_" + detail.kodeProdi;
  const [studentList, setStudentList] = useState<MahasiswaTercekalItem[]>(() => {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [];
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchStudentList = useCallback(async (retryCount = 0) => {
    setLoading(true);
    try {
      const response = await operasionalApi.getDetailMonitoringMahasiswaTercekal({
        kodeProdi: detail.kodeProdi,
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
      } else {
        setStudentList(list);
      }
    } catch (err) {
      console.error("Gagal memuat mahasiswa tercekal:", err);
      if (retryCount < 2) {
        setTimeout(() => fetchStudentList(retryCount + 1), 800);
      }
    } finally {
      setLoading(false);
    }
  }, [detail.kodeProdi, cacheKey]);

  useEffect(() => {
    fetchStudentList();
  }, [fetchStudentList]);

  // Field untuk InformationCard
  const infoFields: FieldItem[] = [
    {
      label: "Program Studi",
      value: detail.namaProgram,
      position: "left",
    },
    {
      label: "Periode Akademik",
      value: detail.periodeAkademik,
      position: "left",
    },
    {
      label: "Aturan Akademik",
      value: detail.aturanAkademik,
      position: "right",
    },
    {
      label: "Angkatan",
      value: detail.angkatan,
      position: "right",
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full">
      {/* Judul Halaman */}
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-xl sm:text-2xl font-medium text-gray-800">
          Detail Monitoring Mahasiswa Tercekal Aturan Akademik
        </h1>
      </div>

      {/* Card Utama */}
      <div className="bg-white rounded-md shadow-md border-t-4 border-t-emerald-600 p-4 sm:p-5 mb-8">
        {/* Header Action Buttons (Kembali ke Daftar & Cetak) */}
        <div className="flex justify-end items-center gap-2 mb-4">
          <IconButton
            icon={<IoMdArrowBack size={16} />}
            text="Kembali ke Daftar"
            variant="info"
            responsive={false}
            onClick={() => navigate(-1)}
          />
          <IconButton
            icon={<IoMdPrint size={16} />}
            text="Cetak"
            variant="info"
            responsive={false}
            onClick={handlePrint}
          />
        </div>

        {/* Informasi Aturan & Program Studi */}
        <div className="mb-5">
          <InformationCard
            fields={infoFields}
            bgColorClass="bg-[#f0f6fe]"
            borderColorClass="border-[#84b5ea]"
            labelColorClass="text-[#517fa4]"
            className="rounded-sm text-[13px]"
          />
        </div>

        {/* Tabel Mahasiswa Tercekal */}
        <div className="w-full overflow-x-auto border border-gray-200 rounded-sm relative">
          {loading && (
            <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
          )}
          <table className="w-full border-collapse text-[13px] text-left">
            <thead>
              <tr className="bg-[#004e82] text-white">
                <th className="py-2.5 px-3 border border-[#14568e] text-center w-12 font-bold">
                  No
                </th>
                <th className="py-2.5 px-4 border border-[#14568e] text-center w-40 font-bold">
                  NIM
                </th>
                <th className="py-2.5 px-4 border border-[#14568e] font-bold">
                  Nama Mahasiswa
                </th>
                <th className="py-2.5 px-3 border border-[#14568e] text-center w-32 font-bold">
                  Status
                </th>
                <th className="py-2.5 px-3 border border-[#14568e] text-center w-24 font-bold">
                  SKS
                </th>
                <th className="py-2.5 px-4 border border-[#14568e] text-center font-bold">
                  Jenis Tagihan
                </th>
              </tr>
            </thead>
            <tbody>
              {studentList.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-gray-500 bg-white"
                  >
                    Tidak ada data mahasiswa tercekal
                  </td>
                </tr>
              ) : (
                studentList.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"
                    } hover:bg-sky-50/50 transition-colors border-b border-gray-200`}
                  >
                    <td className="py-2.5 px-3 border-r border-gray-200 text-center text-gray-700">
                      {index + 1}
                    </td>
                    <td className="py-2.5 px-4 border-r border-gray-200 text-center font-medium text-gray-800">
                      {item.nim}
                    </td>
                    <td className="py-2.5 px-4 border-r border-gray-200 text-gray-800">
                      {item.nama}
                    </td>
                    <td className="py-2.5 px-3 border-r border-gray-200 text-center">
                      <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 border-r border-gray-200 text-center text-gray-700">
                      {item.sks}
                    </td>
                    <td className="py-2.5 px-4 text-gray-800">
                      {item.jenisTagihan}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
