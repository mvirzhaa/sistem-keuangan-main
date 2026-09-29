import React from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoMdEye, IoMdTrash } from "react-icons/io";

export interface AkademikTableRow {
  id: string;
  jenisTagihan: string;
  keteranganTagihan?: string;
  syaratCicilan: string;
  syaratCicilanTambahan?: string;
  pembayaranMinimal: string;
  status: "Aktif" | "Tidak Aktif";
}

interface PengaturanAturanAkademikTableProps {
  data: AkademikTableRow[];
  onView?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const columns: Column<AkademikTableRow>[] = [
  {
    key: "checkbox",
    header: "",
    width: "4%",
    className: "text-center",
    render: (item) => <input type="checkbox" />,
  },
  {
    key: "jenisTagihan",
    header: "Jenis Tagihan",
    width: "25%",
    render: (item) => (
      <div className="font-bold text-blue-900">
        {item.jenisTagihan}
        {item.keteranganTagihan && (
          <div className="text-xs font-normal text-gray-700 flex items-center mt-1">
            <span className="mr-1">ⓘ</span>
            {item.keteranganTagihan}
          </div>
        )}
      </div>
    ),
  },
  {
    key: "syaratCicilan",
    header: "Syarat Cicilan",
    width: "25%",
    render: (item) => (
      <div>
        {item.syaratCicilan}
        {item.syaratCicilanTambahan && (
          <div className="text-xs text-gray-700 flex items-center mt-1">
            <span className="mr-1">ⓘ</span>
            {item.syaratCicilanTambahan}
          </div>
        )}
      </div>
    ),
  },
  {
    key: "pembayaranMinimal",
    header: "Pembayaran Minimal",
    width: "15%",
    className: "font-bold text-center",
    render: (item) => <span>{item.pembayaranMinimal}</span>,
  },
  {
    key: "status",
    header: "Status",
    width: "15%",
    className: "text-center",
    render: (item) => (
      <span
        className={`px-2 py-1 rounded text-xs font-bold ${
          item.status === "Aktif"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {item.status}
      </span>
    ),
  },
  {
    key: "aksi",
    header: "Aksi",
    width: "10%",
    className: "text-center",
    render: (
      item,
      _index,
      context?: {
        onView?: (id: string) => void;
        onDelete?: (id: string) => void;
      },
    ) => (
      <div className="flex gap-2 justify-center">
        <button
          className="bg-blue-400 hover:bg-blue-600 text-white p-2 rounded"
          title="Lihat"
          onClick={() => context?.onView && context.onView(item.id)}
        >
          <IoMdEye />
        </button>
        <button
          className="bg-red-400 hover:bg-red-600 text-white p-2 rounded"
          title="Hapus"
          onClick={() => context?.onDelete && context.onDelete(item.id)}
        >
          <IoMdTrash />
        </button>
      </div>
    ),
  },
];

const PengaturanAturanAkademikTable: React.FC<
  PengaturanAturanAkademikTableProps
> = ({ data, onView, onDelete }) => {
  // Pass onView and onDelete to render function via props
  const columnsWithProps = columns.map((col) => ({
    ...col,
    render: col.render
      ? (item: AkademikTableRow, index: number) => col.render!(item, index)
      : undefined,
  }));

  return (
    <div className="text-xs w-full">
      <ListTable
        data={data}
        columns={columnsWithProps}
        rowKey={(item) => item.id}
        headerClassName="bg-blue-900 text-white text-xs"
        rowClassName={(_, idx) => (idx % 2 === 0 ? "bg-white" : "bg-gray-50")}
        showFooter={false}
        emptyMessage="Tidak ada data pengaturan akademik"
      />
    </div>
  );
};

export default PengaturanAturanAkademikTable;
