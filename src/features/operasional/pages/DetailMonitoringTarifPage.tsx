import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { ROUTES } from "../../../common/routes/routes";
import operasionalApi from "../services/operasional.api";

export interface TarifJenisAkunItem {
  id: string;
  monitoringTarifId?: string;
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

  // Metadata detail monitoring tarif sesuai data yang diklik atau default
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

  // State data detail tarif dari mock JSON (dengan cache agar selalu tampil instan)
  const [daftarAkun, setDaftarAkun] = useState<TarifJenisAkunItem[]>(() => {
    try {
      const cached = localStorage.getItem("cached_detail_monitoring_tarif");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetailTarif = async (retryCount = 0) => {
      setLoading(true);
      try {
        const response = await operasionalApi.getDetailMonitoringTarif(
          stateItem?.id,
        );
        const list = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
          ? response.data
          : Array.isArray((response as any)?.data?.data)
          ? (response as any).data.data
          : [];

        if (list.length > 0) {
          setDaftarAkun(list);
          try {
            localStorage.setItem(
              "cached_detail_monitoring_tarif",
              JSON.stringify(list),
            );
          } catch {}
        } else if (retryCount < 2) {
          setTimeout(() => fetchDetailTarif(retryCount + 1), 600);
        }
      } catch (err) {
        console.error("Gagal memuat detail monitoring tarif:", err);
        if (retryCount < 2) {
          setTimeout(() => fetchDetailTarif(retryCount + 1), 800);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetailTarif();
  }, [stateItem?.id]);

  const handleAturTarif = (akunItem: TarifJenisAkunItem) => {
    navigate(ROUTES.TARIF.DETAIL_TARIF_TAGIHAN, {
      state: {
        item: akunItem,
        headerInfo: detail,
      },
    });
  };

  // Definisi Kolom untuk ListTable Reusable
  const columns: Column<TarifJenisAkunItem>[] = [
    {
      key: "jenisAkun",
      header: "Jenis Akun",
      sortable: true,
      className: "py-2.5 px-4 text-gray-800 font-normal text-[13px]",
      headerClassName: "text-center text-[13px] py-2.5 px-4 font-bold",
      width: "45%",
    },
    {
      key: "nominalTarif",
      header: "Nominal Tarif",
      sortable: true,
      className: "py-2.5 px-4 text-right text-gray-800 font-normal text-[13px]",
      headerClassName: "text-center text-[13px] py-2.5 px-4 font-bold",
      width: "20%",
    },
    {
      key: "status",
      header: "Status",
      className: "py-2.5 px-3 text-center text-[13px]",
      headerClassName: "text-center text-[13px] py-2.5 px-3 font-bold",
      width: "20%",
      render: (akun) =>
        akun.status === "belum_dibuat" ? (
          <span className="inline-block bg-[#f39c12] text-white text-xs font-medium px-2.5 py-0.5 rounded shadow-xs whitespace-nowrap">
            Tarif belum di buat
          </span>
        ) : (
          <span className="inline-block bg-[#00a65a] text-white text-xs font-medium px-2.5 py-0.5 rounded shadow-xs whitespace-nowrap">
            Tarif sudah ada
          </span>
        ),
    },
    {
      key: "aksi",
      header: "Aksi",
      className: "py-2.5 px-3 text-center text-[13px]",
      headerClassName: "text-center text-[13px] py-2.5 px-3 font-bold",
      width: "15%",
      render: (akun) =>
        akun.status === "belum_dibuat" ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleAturTarif(akun);
            }}
            className="bg-[#00c0ef] hover:bg-[#00acd6] active:bg-[#0097be] text-white text-xs font-medium px-3 py-1.5 rounded shadow-xs transition-colors cursor-pointer"
          >
            Atur Tarif
          </button>
        ) : null,
    },
  ];

  return (
    <div className="w-full">
      {/* Header Judul Halaman */}
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-xl sm:text-2xl font-medium text-gray-800">
          Detail Monitoring Tarif
        </h1>
      </div>

      {/* Card Utama */}
      <div className="bg-white rounded shadow-sm border-t-4 border-t-emerald-600 p-4 sm:p-5 mb-8">
        {/* Tombol Aksi Kanan Atas: Kembali ke Daftar */}
        <div className="flex justify-end items-center mb-4">
          <IconButton
            icon={<IoMdArrowBack size={16} />}
            text="Kembali ke Daftar"
            variant="info"
            responsive={false}
            onClick={() => navigate(-1)}
          />
        </div>

        {/* Informasi Header 2 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 text-[13px] border-b border-gray-100 pb-4 mb-5">
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

        {/* Tabel Detail Tarif Jenis Akun Menggunakan ListTable Reusable */}
        <div className="w-full">
          <ListTable<TarifJenisAkunItem>
            data={daftarAkun}
            columns={columns}
            rowKey={(item) => item.id}
            loading={loading}
            pageSize={9999}
            className="w-full text-[13px]"
            headerClassName="text-[13px] font-bold"
            showFooter={false}
            emptyMessage="Belum ada data tarif jenis akun"
          />
        </div>
      </div>
    </div>
  );
}
