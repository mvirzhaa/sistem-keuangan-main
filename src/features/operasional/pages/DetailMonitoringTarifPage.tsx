import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import { ROUTES } from "../../../common/routes/routes";

export interface TarifJenisAkunItem {
  id: string;
  jenisAkun: string;
  nominalTarif: string;
  status: "belum_dibuat" | "sudah_ada";
}

export default function DetailMonitoringTarifPage() {
  document.title = "Detail Monitoring Tarif";
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil data item dari state navigasi jika ada
  const stateItem = location.state?.item;

  // Metadata detail monitoring tarif sesuai data yang diklik atau default sesuai screenshot
  const detail = useMemo(() => {
    return {
      penerima: stateItem?.penerima || "Mahasiswa",
      periode: stateItem?.periode || "2026 Ganjil",
      jalurPendaftaran: stateItem?.jalurPendaftaran || "SELEKSI MANDIRI",
      sistemKuliah: stateItem?.sistemKuliah || "Reguler",
      gelombang: stateItem?.gelombang || "Gelombang 1",
      unit: stateItem?.unit || "S1 - Kesehatan Masyarakat",
    };
  }, [stateItem]);

  // Data daftar jenis akun sesuai screenshot
  const daftarAkun: TarifJenisAkunItem[] = useMemo(() => {
    return [
      {
        id: "1",
        jenisAkun: "UKT KIP Kuliah (A)",
        nominalTarif: "0,00",
        status: "belum_dibuat",
      },
      {
        id: "2",
        jenisAkun: "UKT KIP Kuliah (B)",
        nominalTarif: "0,00",
        status: "belum_dibuat",
      },
      {
        id: "3",
        jenisAkun: "UKT KIP Kuliah (C)",
        nominalTarif: "0,00",
        status: "belum_dibuat",
      },
      {
        id: "4",
        jenisAkun: "Uang Gedung Tahap 1",
        nominalTarif: "4.500.000,00",
        status: "sudah_ada",
      },
      {
        id: "5",
        jenisAkun: "Uang Gedung Tahap 2",
        nominalTarif: "4.500.000,00",
        status: "sudah_ada",
      },
      {
        id: "6",
        jenisAkun: "Wakaf Uang Tunai",
        nominalTarif: "0,00",
        status: "belum_dibuat",
      },
      {
        id: "7",
        jenisAkun: "TOEFL (Unit Pengembangan Bahasa)",
        nominalTarif: "0,00",
        status: "belum_dibuat",
      },
      {
        id: "8",
        jenisAkun: "SPP",
        nominalTarif: "2.500.000,00",
        status: "sudah_ada",
      },
    ];
  }, []);

  const handleAturTarif = (akunItem: TarifJenisAkunItem) => {
    navigate(ROUTES.TARIF.DETAIL_TARIF_TAGIHAN, {
      state: {
        item: akunItem,
        headerInfo: detail,
      },
    });
  };

  return (
    <div className="w-full">
      {/* Header Judul Halaman */}
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-normal text-gray-800">
          Detail Monitoring Tarif
        </h1>
      </div>

      {/* Card Utama */}
      <div className="bg-white rounded shadow-sm border-t-4 border-t-emerald-600 p-5 sm:p-6 mb-8">
        {/* Tombol Aksi Kanan Atas: Kembali ke Daftar */}
        <div className="flex justify-end items-center mb-6">
          <IconButton
            icon={<IoMdArrowBack size={16} />}
            text="Kembali ke Daftar"
            variant="info"
            responsive={false}
            onClick={() => navigate(-1)}
          />
        </div>

        {/* Informasi Header 2 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 text-sm border-b border-gray-100 pb-5 mb-6">
          {/* Baris 1: Penerima & Sistem Kuliah */}
          <div className="flex border-b border-gray-100 py-2">
            <span className="w-44 text-[#337ab7] font-semibold">Penerima</span>
            <span className="text-gray-800 font-normal">{detail.penerima}</span>
          </div>
          <div className="flex border-b border-gray-100 py-2">
            <span className="w-44 text-[#337ab7] font-semibold">
              Sistem Kuliah
            </span>
            <span className="text-gray-800 font-normal">
              {detail.sistemKuliah}
            </span>
          </div>

          {/* Baris 2: Periode & Gelombang */}
          <div className="flex border-b border-gray-100 py-2">
            <span className="w-44 text-[#337ab7] font-semibold">Periode</span>
            <span className="text-gray-800 font-normal">{detail.periode}</span>
          </div>
          <div className="flex border-b border-gray-100 py-2">
            <span className="w-44 text-[#337ab7] font-semibold">Gelombang</span>
            <span className="text-gray-800 font-normal">{detail.gelombang}</span>
          </div>

          {/* Baris 3: Jalur Pendaftaran & Unit */}
          <div className="flex border-b border-gray-100 py-2">
            <span className="w-44 text-[#337ab7] font-semibold">
              Jalur Pendaftaran
            </span>
            <span className="text-gray-800 font-normal">
              {detail.jalurPendaftaran}
            </span>
          </div>
          <div className="flex border-b border-gray-100 py-2">
            <span className="w-44 text-[#337ab7] font-semibold">Unit</span>
            <span className="text-gray-800 font-normal">{detail.unit}</span>
          </div>
        </div>

        {/* Sub-judul: Detail Tarif Jenis Akun */}
        <div className="mb-4">
          <h2 className="text-base sm:text-lg font-bold text-[#16a34a] border-b-2 border-[#16a34a] pb-1 inline-block w-full">
            Detail Tarif Jenis Akun
          </h2>
        </div>

        {/* Tabel Detail Tarif Jenis Akun */}
        <div className="w-full overflow-x-auto border border-gray-200 rounded-sm">
          <table className="w-full border-collapse text-xs text-left">
            <thead>
              <tr className="bg-[#004e82] text-white">
                <th className="py-2.5 px-4 font-semibold border-r border-[#003c64] text-center w-[45%]">
                  Jenis Akun
                </th>
                <th className="py-2.5 px-4 font-semibold border-r border-[#003c64] text-center w-[20%]">
                  Nominal Tarif
                </th>
                <th className="py-2.5 px-4 font-semibold border-r border-[#003c64] text-center w-[20%]">
                  Status
                </th>
                <th className="py-2.5 px-4 font-semibold text-center w-[15%]">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {daftarAkun.map((akun) => (
                <tr
                  key={akun.id}
                  className="hover:bg-gray-50/60 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-800 font-normal border-r border-gray-100">
                    {akun.jenisAkun}
                  </td>
                  <td className="py-3 px-6 text-right text-gray-800 font-normal border-r border-gray-100">
                    {akun.nominalTarif}
                  </td>
                  <td className="py-3 px-4 text-center border-r border-gray-100">
                    {akun.status === "belum_dibuat" ? (
                      <span className="inline-block bg-[#f39c12] text-white text-[11px] font-medium px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                        Tarif belum di buat
                      </span>
                    ) : (
                      <span className="inline-block bg-[#00a65a] text-white text-[11px] font-medium px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                        Tarif sudah ada
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {akun.status === "belum_dibuat" && (
                      <button
                        type="button"
                        onClick={() => handleAturTarif(akun)}
                        className="bg-[#00c0ef] hover:bg-[#00acd6] active:bg-[#0097be] text-white text-xs font-semibold px-3 py-1.5 rounded shadow-sm transition-colors cursor-pointer"
                      >
                        Atur Tarif
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
