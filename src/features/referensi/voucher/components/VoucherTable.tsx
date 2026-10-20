import React, { useState } from "react";
import { IoTrash } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ListTable, {
  type Column,
} from "../../../../components/tables/ListTable";
import KonfirmasiModal from "../../../../components/modal/KonfirmasiModal";
import { ROUTES } from "../../../../common/routes/routes";

export interface Voucher {
  id: string;
  voucher: string;
  kodeVoucher: string;
  periodeAwal: string;
  periodeAkhir: string;
  tglExpired: string;
  nominal: number;
  anggaran?: number;
  realisasi?: number;
}

export const initialVouchers: Voucher[] = [
  {
    id: "1",
    voucher: "KIP Abah Sogir 30",
    kodeVoucher: "KIPSGRUIKA25",
    periodeAwal: "2025 Ganjil",
    periodeAkhir: "2025 Ganjil",
    tglExpired: "19 Jun 2025",
    nominal: 300000,
    anggaran: 9000000,
    realisasi: 0,
  },
  {
    id: "2",
    voucher: "KIP Aspirasi Nasdem 31",
    kodeVoucher: "KIPNSDMUIKA25",
    periodeAwal: "2025 Ganjil",
    periodeAkhir: "2025 Ganjil",
    tglExpired: "19 Jun 2025",
    nominal: 300000,
    anggaran: 9000000,
    realisasi: 0,
  },
  {
    id: "3",
    voucher: "KIP Aspirasi PKS 150 Kota Bogor",
    kodeVoucher: "KIPASPUIKA25",
    periodeAwal: "2025 Ganjil",
    periodeAkhir: "2025 Ganjil",
    tglExpired: "19 Jun 2025",
    nominal: 300000,
    anggaran: 9000000,
    realisasi: 0,
  },
  {
    id: "4",
    voucher: "KIP Aspirasi PKS 25 Kab. Bogor",
    kodeVoucher: "KIPKASP25",
    periodeAwal: "2025 Ganjil",
    periodeAkhir: "2025 Ganjil",
    tglExpired: "19 Jun 2025",
    nominal: 300000,
    anggaran: 9000000,
    realisasi: 0,
  },
  {
    id: "5",
    voucher: "KIP Khusus Kota Bekasi",
    kodeVoucher: "KIPBEKASI25",
    periodeAwal: "2025 Ganjil",
    periodeAkhir: "2025 Ganjil",
    tglExpired: "30 Jun 2025",
    nominal: 300000,
    anggaran: 9000000,
    realisasi: 0,
  },
  {
    id: "6",
    voucher: "KIP Khusus Kota Depok",
    kodeVoucher: "KIPDEPOK25",
    periodeAwal: "2025 Ganjil",
    periodeAkhir: "2025 Ganjil",
    tglExpired: "30 Jun 2025",
    nominal: 300000,
    anggaran: 9000000,
    realisasi: 0,
  },
  {
    id: "7",
    voucher: "KIP Sekolah Undangan",
    kodeVoucher: "KIPUIKA25",
    periodeAwal: "2025 Ganjil",
    periodeAkhir: "2025 Ganjil",
    tglExpired: "30 Jun 2025",
    nominal: 300000,
    anggaran: 9000000,
    realisasi: 0,
  },
  {
    id: "8",
    voucher: "KIP Sekolah Undangan",
    kodeVoucher: "KIP2025UIKAJ4Y4",
    periodeAwal: "2025 Ganjil",
    periodeAkhir: "2025 Ganjil",
    tglExpired: "18 Apr 2025",
    nominal: 300000,
    anggaran: 9000000,
    realisasi: 0,
  },
];

interface VoucherTableProps {
  data?: Voucher[];
  loading?: boolean;
  onView?: (item: Voucher) => void;
  onDelete?: (item: Voucher) => void;
  onSelectionChange?: (selectedItems: Voucher[]) => void;
}

const VoucherTable: React.FC<VoucherTableProps> = ({
  data: externalData,
  loading = false,
  onView,
  onDelete,
  onSelectionChange,
}) => {
  const navigate = useNavigate();
  const [internalData, setInternalData] = useState<Voucher[]>(initialVouchers);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Voucher | null>(null);

  const tableData = externalData || internalData;

  // Format currency
  const formatCurrency = (value: number): string => {
    return value.toLocaleString("id-ID");
  };

  // Handle voucher deletion trigger
  const handleDeleteClick = (item: Voucher) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      if (onDelete) {
        onDelete(itemToDelete);
      } else {
        setInternalData((prev) => prev.filter((d) => d.id !== itemToDelete.id));
      }
    }
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleView = (item: Voucher) => {
    if (onView) {
      onView(item);
    } else {
      navigate(ROUTES.REFERENSI.VOUCHER.DETAIL_VOUCHER, {
        state: { mode: "view", voucher: item },
      });
    }
  };

  // Define columns for ListTable
  const columns: Column<Voucher>[] = [
    {
      key: "voucher",
      header: "Voucher",
      width: "25%",
    },
    {
      key: "kodeVoucher",
      header: "Kode Voucher",
      width: "15%",
    },
    {
      key: "periodeAwal",
      header: "Periode Awal",
      width: "12%",
      className: "text-center",
    },
    {
      key: "periodeAkhir",
      header: "Periode Akhir",
      width: "12%",
      className: "text-center",
    },
    {
      key: "tglExpired",
      header: "Tgl. Expired",
      width: "12%",
      className: "text-center",
    },
    {
      key: "nominal",
      header: "Nominal",
      width: "12%",
      className: "text-right",
      render: (item) => formatCurrency(item.nominal),
    },
    {
      key: "aksi",
      header: "Aksi",
      width: "12%",
      className: "text-center",
      render: (item) => (
        <div className="flex justify-center space-x-1">
          <button
            className="p-1.5 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors"
            title="Lihat"
            onClick={(e) => {
              e.stopPropagation();
              handleView(item);
            }}
          >
            <IoMdEye size={16} />
          </button>

          <button
            className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            title="Hapus"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(item);
            }}
          >
            <IoTrash size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="overflow-x-auto text-xs">
        <ListTable
          data={tableData}
          columns={columns}
          rowKey={(item) => item.id}
          headerClassName="text-white"
          selectable={true}
          onSelectionChange={onSelectionChange}
          showFooter={true}
          loading={loading}
          emptyMessage="Tidak ada data voucher"
        />
      </div>

      <KonfirmasiModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi"
        message="Apakah anda yakin akan menghapus data ini?"
        cancelText="Batalkan"
        confirmText="Ya, Yakin"
      />
    </>
  );
};

export default VoucherTable;
