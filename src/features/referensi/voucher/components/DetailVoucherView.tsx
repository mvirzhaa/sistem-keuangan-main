import React from "react";

export interface VoucherDetailData {
  id?: string;
  kodeVoucher: string;
  namaVoucher: string;
  periodeAwal: string;
  periodeAkhir: string;
  tglExpired: string;
  nominal: number;
  anggaran: number;
  realisasi: number;
  isUsed?: boolean;
}

interface DetailVoucherViewProps {
  data: VoucherDetailData;
}

const DetailVoucherView: React.FC<DetailVoucherViewProps> = ({ data }) => {
  // Format currency with two decimal places (e.g. 300000,00)
  const formatDecimal = (value: number): string => {
    return value.toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Format date display (e.g. "19 Jun 2025" -> "19 Juni 2025")
  const formatDateDisplay = (dateStr: string): string => {
    if (!dateStr) return "-";
    return dateStr
      .replace("Jun ", "Juni ")
      .replace("Jul ", "Juli ")
      .replace("Aug ", "Agustus ")
      .replace("Apr ", "April ");
  };

  return (
    <div className="py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        {/* Left Column */}
        <div className="flex flex-col">
          {/* Kode Voucher */}
          <div className="border-b border-gray-200 py-3 flex items-start">
            <div className="w-1/3">
              <span className="text-sm font-semibold text-blue-600">
                Kode Voucher
              </span>
            </div>
            <div className="w-2/3 flex flex-col">
              <span className="text-sm text-gray-800 font-medium">
                {data.kodeVoucher}
              </span>
              <span className="text-xs text-gray-500 mt-0.5">
                Kode voucher tidak dapat diubah karena sudah digunakan
              </span>
            </div>
          </div>

          {/* Nama Voucher */}
          <div className="border-b border-gray-200 py-3 flex items-center">
            <div className="w-1/3">
              <span className="text-sm font-semibold text-blue-600">
                Nama Voucher
              </span>
            </div>
            <div className="w-2/3">
              <span className="text-sm text-gray-800 font-medium">
                {data.namaVoucher}
              </span>
            </div>
          </div>

          {/* Periode Awal */}
          <div className="border-b border-gray-200 py-3 flex items-center">
            <div className="w-1/3">
              <span className="text-sm font-semibold text-blue-600">
                Periode Awal
              </span>
            </div>
            <div className="w-2/3">
              <span className="text-sm text-gray-800 font-medium">
                {data.periodeAwal}
              </span>
            </div>
          </div>

          {/* Periode Akhir */}
          <div className="border-b border-gray-200 py-3 flex items-center">
            <div className="w-1/3">
              <span className="text-sm font-semibold text-blue-600">
                Periode Akhir
              </span>
            </div>
            <div className="w-2/3">
              <span className="text-sm text-gray-800 font-medium">
                {data.periodeAkhir}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col">
          {/* Tgl. Expired */}
          <div className="border-b border-gray-200 py-3 flex items-center">
            <div className="w-1/3">
              <span className="text-sm font-semibold text-blue-600">
                Tgl. Expired
              </span>
            </div>
            <div className="w-2/3">
              <span className="text-sm text-gray-800 font-medium">
                {formatDateDisplay(data.tglExpired)}
              </span>
            </div>
          </div>

          {/* Nominal */}
          <div className="border-b border-gray-200 py-3 flex items-center">
            <div className="w-1/3">
              <span className="text-sm font-semibold text-blue-600">
                Nominal
              </span>
            </div>
            <div className="w-2/3">
              <span className="text-sm text-gray-800 font-medium">
                {formatDecimal(data.nominal)}
              </span>
            </div>
          </div>

          {/* Anggaran */}
          <div className="border-b border-gray-200 py-3 flex items-center">
            <div className="w-1/3">
              <span className="text-sm font-semibold text-blue-600">
                Anggaran
              </span>
            </div>
            <div className="w-2/3">
              <span className="text-sm text-gray-800 font-medium">
                {formatDecimal(data.anggaran)}
              </span>
            </div>
          </div>

          {/* Realisasi */}
          <div className="border-b border-gray-200 py-3 flex items-center">
            <div className="w-1/3">
              <span className="text-sm font-semibold text-blue-600">
                Realisasi
              </span>
            </div>
            <div className="w-2/3">
              <span className="text-sm text-gray-800 font-medium">
                {formatDecimal(data.realisasi)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailVoucherView;
