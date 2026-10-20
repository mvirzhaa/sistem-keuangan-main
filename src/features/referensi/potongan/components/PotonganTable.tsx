import React from "react";
import { IoTrash } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import ListTable, {
  type Column,
} from "../../../../components/tables/ListTable";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../common/routes/routes";

export interface Potongan {
  id: string;
  namaBeasiswa: string;
  periodeAwal: string;
  periodeAkhir: string;
  nominalBeasiswa: number;
  anggaran: number;
  jumlahPenerima: number;
  realisasi: number;
  memotongTagihan: boolean;
  tipePotongan: string;
  rekanan?: string;
  jenisPotongan?: string;
}

export const defaultPotonganList: Potongan[] = [
  {
    id: "1",
    namaBeasiswa: "Beasiswa Hafidz 30 Juz 2025 Skema Diamond",
    periodeAwal: "2025 Ganjil",
    periodeAkhir: "2025 Genap",
    nominalBeasiswa: 18000000,
    anggaran: 5000000000,
    jumlahPenerima: 7,
    realisasi: 101200000,
    memotongTagihan: true,
    tipePotongan: "Potongan Rata",
    rekanan: "Universitas Ibn Khaldun",
    jenisPotongan: "Beasiswa",
  },
  {
    id: "2",
    namaBeasiswa: "Beasiswa Hafidz 30 Juz 2025 Skema Gold",
    periodeAwal: "2025 Ganjil",
    periodeAkhir: "2025 Genap",
    nominalBeasiswa: 13500000,
    anggaran: 5000000000,
    jumlahPenerima: 1,
    realisasi: 7300000,
    memotongTagihan: true,
    tipePotongan: "Potongan Rata",
    rekanan: "Universitas Ibn Khaldun",
    jenisPotongan: "Beasiswa",
  },
  {
    id: "3",
    namaBeasiswa: "Beasiswa Hafidz 30 Juz 2025 Skema Platinum",
    periodeAwal: "2025 Ganjil",
    periodeAkhir: "2025 Genap",
    nominalBeasiswa: 15000000,
    anggaran: 5000000000,
    jumlahPenerima: 3,
    realisasi: 29900000,
    memotongTagihan: true,
    tipePotongan: "Potongan Rata",
    rekanan: "Universitas Ibn Khaldun",
    jenisPotongan: "Beasiswa",
  },
  {
    id: "4",
    namaBeasiswa: "Beasiswa Hafidz 30 Juz 2025 Skema Silver",
    periodeAwal: "2025 Ganjil",
    periodeAkhir: "2025 Genap",
    nominalBeasiswa: 11500000,
    anggaran: 5000000000,
    jumlahPenerima: 9,
    realisasi: 78500000,
    memotongTagihan: true,
    tipePotongan: "Potongan Rata",
    rekanan: "Universitas Ibn Khaldun",
    jenisPotongan: "Beasiswa",
  },
];

interface PotonganTableProps {
  data?: Potongan[];
  selectable?: boolean;
  onSelectionChange?: (selectedItems: Potongan[]) => void;
  onViewDetail?: (item: Potongan) => void;
  onDeleteItem?: (item: Potongan) => void;
}

const PotonganTable: React.FC<PotonganTableProps> = ({
  data,
  selectable = true,
  onSelectionChange,
  onViewDetail,
  onDeleteItem,
}) => {
  const navigate = useNavigate();
  const currentData = data !== undefined ? data : defaultPotonganList;

  // Format currency
  const formatCurrency = (value: number): string => {
    return value.toLocaleString("id-ID");
  };

  // Define columns for ListTable
  const columns: Column<Potongan>[] = [
    {
      key: "namaBeasiswa",
      header: "Nama Beasiswa",
      width: "20%",
    },
    {
      key: "periodeAwal",
      header: "Periode Awal",
      width: "10%",
      render: (item) => item.periodeAwal,
    },
    {
      key: "periodeAkhir",
      header: "Periode Akhir",
      width: "10%",
      render: (item) => item.periodeAkhir,
    },
    {
      key: "nominalBeasiswa",
      header: "Nominal Beasiswa",
      width: "10%",
      render: (item) => formatCurrency(item.nominalBeasiswa),
    },
    {
      key: "anggaran",
      header: "Anggaran",
      width: "10%",
      render: (item) => formatCurrency(item.anggaran),
    },
    {
      key: "jumlahPenerima",
      header: "Jumlah Penerima",
      width: "8%",
      className: "text-center",
      render: (item) => item.jumlahPenerima,
    },
    {
      key: "realisasi",
      header: "Realisasi",
      width: "10%",
      render: (item) => formatCurrency(item.realisasi),
    },
    {
      key: "memotongTagihan",
      header: "Memotong Tagihan?",
      width: "10%",
      className: "text-center",
      render: (item) => (
        <span
          className={item.memotongTagihan ? "text-green-600" : "text-red-600"}
        >
          {item.memotongTagihan ? "✓" : "✕"}
        </span>
      ),
    },
    {
      key: "tipePotongan",
      header: "Tipe Potongan",
      width: "12%",
      render: (item) => item.tipePotongan,
    },
    {
      key: "aksi",
      header: "Aksi",
      width: "10%",
      className: "text-center",
      render: (item) => (
        <div className="flex justify-center space-x-1">
          <button
            type="button"
            className="p-1.5 bg-sky-500 text-white rounded hover:bg-sky-600 cursor-pointer shadow-xs"
            title="Lihat Detail"
            onClick={() => {
              if (onViewDetail) {
                onViewDetail(item);
              } else {
                navigate(ROUTES.REFERENSI.POTONGAN.DETAIL_POTONGAN, {
                  state: { item, mode: "view" },
                });
              }
            }}
          >
            <IoEyeSharp size={16} />
          </button>
          <button
            type="button"
            className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer shadow-xs"
            title="Hapus"
            onClick={() => {
              if (onDeleteItem) {
                onDeleteItem(item);
              }
            }}
          >
            <IoTrash size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto text-xs">
      <ListTable
        data={currentData}
        columns={columns}
        rowKey={(item) => item.id}
        selectable={selectable}
        onSelectionChange={onSelectionChange}
        headerClassName="text-white text-xs"
        showFooter={true}
        emptyMessage="Tidak ada data potongan"
      />
    </div>
  );
};

export default PotonganTable;
