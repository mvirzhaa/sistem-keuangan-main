import React from "react";

export interface JenisTagihanItem {
  kode: string;
  nama: string;
  label?: string;
}

interface InformasiJenisTagihanCardProps {
  jenisTagihan: JenisTagihanItem[];
  className?: string;
}

const InformasiJenisTagihanCard: React.FC<InformasiJenisTagihanCardProps> = ({
  jenisTagihan,
  className = "",
}) => {
  return (
    <div
      className={`bg-amber-50/70 border-l-[#f39c12] border-l-4 p-5 rounded-md ${className}`}
    >
      <h2 className="text-base font-bold text-gray-800 mb-3">Jenis Tagihan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-1.5">
        {jenisTagihan.map((item, index) => (
          <div
            key={`${item.kode}-${index}`}
            className="text-xs sm:text-[13px] text-gray-800 leading-snug py-0.5"
          >
            <span className="font-semibold text-gray-900">{item.kode}</span>
            {" : "}
            <span>{item.nama}</span>
            {item.label && <span> ({item.label})</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InformasiJenisTagihanCard;
