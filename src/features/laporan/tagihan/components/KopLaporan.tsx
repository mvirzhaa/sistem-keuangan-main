import React from "react";

interface KopLaporanProps {
  title?: string;
  periode?: string;
  className?: string;
}

export const KopLaporan: React.FC<KopLaporanProps> = ({
  title = "TAGIHAN MAHASISWA",
  periode = "2026 GENAP",
  className = "",
}) => {
  return (
    <div className={`w-full mb-6 ${className}`}>
      {/* Header Container dengan Logo & Identitas Kampus */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 pb-3">
        {/* Logo UIKA */}
        <div className="flex-shrink-0">
          <img
            src="/images/logo-uika.png"
            alt="Logo Universitas Ibn Khaldun Bogor"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
          />
        </div>

        {/* Teks Identitas Kampus */}
        <div className="text-center">
          <h2 className="text-base sm:text-xl font-bold tracking-wide text-gray-900 uppercase">
            UNIVERSITAS IBN KHALDUN BOGOR
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 mt-0.5">
            Jl KH Sholeh Iskandar KM 2 Kedung Badak Bogor
          </p>
          <p className="text-[11px] sm:text-xs text-gray-600 mt-0.5">
            Website : uika-bogor.ac.id/ e-Mail :mail@uika-bogor.ac.id / Telepon :0251-8356884
          </p>
        </div>
      </div>

      {/* Garis Ganda Pembatas KOP (Thick & Thin Double Border) */}
      <div className="w-full border-b-[3px] border-double border-gray-900 my-1"></div>

      {/* Judul Laporan */}
      <div className="text-center pt-3 pb-1">
        <h3 className="text-xs sm:text-sm font-bold text-gray-900 tracking-wider uppercase">
          {title} {periode ? `PERIODE ${periode.toUpperCase()}` : ""}
        </h3>
      </div>
    </div>
  );
};

export default KopLaporan;
