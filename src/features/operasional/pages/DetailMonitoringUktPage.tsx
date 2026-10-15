import React, { useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { IoMdArrowBack, IoMdPrint } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import InformationCard, { type FieldItem } from "../../../components/card/InformationCard";

export interface MahasiswaUktItem {
  id: string;
  nim: string;
  nama: string;
  kelompokUkt: string;
  nominalUkt: string;
  status: string;
}

export default function DetailMonitoringUktPage() {
  document.title = "Detail Monitoring UKT";
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Ambil state navigasi atau query param
  const stateItem = location.state?.item;
  const stateFilters = location.state?.filters;
  const paramId = searchParams.get("id");

  // Metadata detail
  const detail = useMemo(() => {
    if (stateItem) {
      return {
        id: stateItem.id || "1",
        programStudi: stateItem.programStudi || "S1 - Teknik Informatika",
        kelompokUkt: stateItem.kelompokUkt || "Kelompok UKT 1",
        kuota: stateItem.kuota ?? 50,
        penerima: stateItem.penerima ?? 45,
        periodeMasuk: stateFilters?.periodeMasuk || "2025 Genap",
        gelombang: stateFilters?.gelombang || "Gelombang 1",
        sistemKuliah: stateFilters?.sistemKuliah || "Reguler Sore",
        jalurPendaftaran:
          stateFilters?.jalurPendaftaran || "-- Semua Jalur Pendaftaran --",
      };
    }

    if (paramId === "2") {
      return {
        id: "2",
        programStudi: "S1 - Teknik Informatika",
        kelompokUkt: "Kelompok UKT 2",
        kuota: 40,
        penerima: 35,
        periodeMasuk: "2025 Genap",
        gelombang: "Gelombang 1",
        sistemKuliah: "Reguler Sore",
        jalurPendaftaran: "-- Semua Jalur Pendaftaran --",
      };
    }

    // Default data sesuai gambar referensi
    return {
      id: "1",
      programStudi: "S1 - Teknik Informatika",
      kelompokUkt: "Kelompok UKT 1",
      kuota: 50,
      penerima: 45,
      periodeMasuk: "2025 Genap",
      gelombang: "Gelombang 1",
      sistemKuliah: "Reguler Sore",
      jalurPendaftaran: "-- Semua Jalur Pendaftaran --",
    };
  }, [stateItem, stateFilters, paramId]);

  // Daftar data mahasiswa penerima UKT
  const studentList: MahasiswaUktItem[] = useMemo(() => {
    const isKelompok2 = detail.kelompokUkt.includes("2");

    if (isKelompok2) {
      return [
        {
          id: "1",
          nim: "241105010021",
          nama: "DIMAS PRAYOGA",
          kelompokUkt: "Kelompok UKT 2",
          nominalUkt: "Rp 3.500.000",
          status: "Aktif",
        },
        {
          id: "2",
          nim: "241105010034",
          nama: "ANISA MAHARANI",
          kelompokUkt: "Kelompok UKT 2",
          nominalUkt: "Rp 3.500.000",
          status: "Aktif",
        },
        {
          id: "3",
          nim: "241105010056",
          nama: "BAGAS WICAKSONO",
          kelompokUkt: "Kelompok UKT 2",
          nominalUkt: "Rp 3.500.000",
          status: "Aktif",
        },
        {
          id: "4",
          nim: "241105010072",
          nama: "CINTIA BELLA",
          kelompokUkt: "Kelompok UKT 2",
          nominalUkt: "Rp 3.500.000",
          status: "Aktif",
        },
      ];
    }

    return [
      {
        id: "1",
        nim: "241105010001",
        nama: "ADITYA PRATAMA",
        kelompokUkt: "Kelompok UKT 1",
        nominalUkt: "Rp 2.500.000",
        status: "Aktif",
      },
      {
        id: "2",
        nim: "241105010004",
        nama: "BELLA SAFITRI",
        kelompokUkt: "Kelompok UKT 1",
        nominalUkt: "Rp 2.500.000",
        status: "Aktif",
      },
      {
        id: "3",
        nim: "241105010009",
        nama: "DANIEL KURNIAWAN",
        kelompokUkt: "Kelompok UKT 1",
        nominalUkt: "Rp 2.500.000",
        status: "Aktif",
      },
      {
        id: "4",
        nim: "241105010015",
        nama: "ELVIRA ROSALINA",
        kelompokUkt: "Kelompok UKT 1",
        nominalUkt: "Rp 2.500.000",
        status: "Aktif",
      },
      {
        id: "5",
        nim: "241105010018",
        nama: "FAJAR HIDAYAT",
        kelompokUkt: "Kelompok UKT 1",
        nominalUkt: "Rp 2.500.000",
        status: "Aktif",
      },
    ];
  }, [detail.kelompokUkt]);

  // Field InformationCard
  const infoFields: FieldItem[] = [
    {
      label: "Program Studi",
      value: detail.programStudi,
      position: "left",
    },
    {
      label: "Periode Masuk",
      value: detail.periodeMasuk,
      position: "left",
    },
    {
      label: "Sistem Kuliah",
      value: detail.sistemKuliah,
      position: "left",
    },
    {
      label: "Gelombang",
      value: detail.gelombang,
      position: "left",
    },
    {
      label: "Kelompok UKT",
      value: detail.kelompokUkt,
      position: "right",
    },
    {
      label: "Jalur Pendaftaran",
      value: detail.jalurPendaftaran,
      position: "right",
    },
    {
      label: "Kuota",
      value: `${detail.kuota} Mahasiswa`,
      position: "right",
    },
    {
      label: "Penerima",
      value: `${detail.penerima} Mahasiswa`,
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
        <h1 className="text-2xl font-medium text-gray-800">
          Detail Monitoring UKT
        </h1>
      </div>

      {/* Card Utama */}
      <div className="bg-white rounded-md shadow-md border-t-4 border-t-emerald-600 p-5 sm:p-6 mb-8">
        {/* Header Action Buttons (Kembali ke Daftar & Cetak) */}
        <div className="flex justify-end items-center gap-2 mb-6">
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

        {/* Informasi Monitoring UKT */}
        <div className="mb-6">
          <InformationCard
            fields={infoFields}
            bgColorClass="bg-[#f0f6fe]"
            borderColorClass="border-[#84b5ea]"
            labelColorClass="text-[#517fa4]"
            className="rounded-sm"
          />
        </div>

        {/* Tabel Penerima UKT */}
        <div className="w-full overflow-x-auto border border-gray-200 rounded-sm">
          <table className="w-full border-collapse text-xs text-left">
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
                <th className="py-2.5 px-3 border border-[#14568e] text-center w-36 font-bold">
                  Kelompok UKT
                </th>
                <th className="py-2.5 px-3 border border-[#14568e] text-right w-36 font-bold">
                  Nominal UKT
                </th>
                <th className="py-2.5 px-3 border border-[#14568e] text-center w-32 font-bold">
                  Status Mahasiswa
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
                    Tidak ada data mahasiswa penerima UKT
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
                    <td className="py-2.5 px-3 border-r border-gray-200 text-center font-medium text-gray-700">
                      {item.kelompokUkt}
                    </td>
                    <td className="py-2.5 px-3 border-r border-gray-200 text-right font-medium text-gray-800">
                      {item.nominalUkt}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-100 text-emerald-800">
                        {item.status}
                      </span>
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
