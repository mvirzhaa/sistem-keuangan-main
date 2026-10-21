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
  selectedIds?: string[];
  onToggleSelect?: (id: string) => void;
  onView?: (item: AkademikTableRow) => void;
  onDelete?: (id: string) => void;
}

const PengaturanAturanAkademikTable: React.FC<
  PengaturanAturanAkademikTableProps
> = ({ data, selectedIds = [], onToggleSelect, onView, onDelete }) => {
  const columns: Column<AkademikTableRow>[] = React.useMemo(
    () => [
      {
        key: "checkbox",
        header: "",
        width: "4%",
        className: "text-center",
        render: (item) => (
          <input
            type="checkbox"
            checked={selectedIds.includes(item.id)}
            onChange={() => onToggleSelect && onToggleSelect(item.id)}
            className="form-checkbox h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
        ),
      },
      {
        key: "jenisTagihan",
        header: "Jenis Tagihan",
        width: "28%",
        render: (item) => (
          <div className="py-1">
            <span className="font-bold text-gray-800 text-xs sm:text-sm">
              {item.jenisTagihan}
            </span>
            {item.keteranganTagihan && (
              <div className="text-[11px] text-gray-600 flex items-center gap-1.5 mt-0.5">
                <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-gray-800 text-white text-[9px] font-bold shrink-0">
                  !
                </span>
                <span>{item.keteranganTagihan}</span>
              </div>
            )}
          </div>
        ),
      },
      {
        key: "syaratCicilan",
        header: "Syarat Cicilan",
        width: "28%",
        render: (item) => (
          <div className="py-1">
            <span className="text-gray-800 text-xs font-normal">
              {item.syaratCicilan}
            </span>
            {item.syaratCicilanTambahan && (
              <div className="text-[11px] text-gray-600 flex items-center gap-1.5 mt-0.5">
                <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-gray-800 text-white text-[9px] font-bold shrink-0">
                  !
                </span>
                <span>{item.syaratCicilanTambahan}</span>
              </div>
            )}
          </div>
        ),
      },
      {
        key: "pembayaranMinimal",
        header: "Pembayaran Minimal",
        width: "15%",
        className: "font-bold text-center text-gray-800",
        render: (item) => <span>{item.pembayaranMinimal}</span>,
      },
      {
        key: "status",
        header: "Status",
        width: "12%",
        className: "text-center",
        render: (item) => (
          <span
            className={`px-2.5 py-1 rounded text-[11px] font-medium text-white inline-block ${
              item.status === "Aktif" ? "bg-[#00a65a]" : "bg-[#dd4b39]"
            }`}
          >
            {item.status}
          </span>
        ),
      },
      {
        key: "aksi",
        header: "Aksi",
        width: "13%",
        className: "text-center",
        render: (item) => (
          <div className="flex gap-1.5 justify-center">
            <button
              type="button"
              className="bg-[#00c0ef] hover:bg-[#00a7d0] text-white p-1.5 rounded transition-colors cursor-pointer"
              title="Lihat"
              onClick={() => onView && onView(item)}
            >
              <IoMdEye size={16} />
            </button>
            <button
              type="button"
              className="bg-[#dd4b39] hover:bg-[#c9302c] text-white p-1.5 rounded transition-colors cursor-pointer"
              title="Hapus"
              onClick={() => onDelete && onDelete(item.id)}
            >
              <IoMdTrash size={16} />
            </button>
          </div>
        ),
      },
    ],
    [onView, onDelete],
  );

  return (
    <div className="text-xs w-full overflow-x-auto">
      <ListTable
        data={data}
        columns={columns}
        rowKey={(item) => item.id}
        headerClassName="text-white text-xs"
        rowClassName={(_, idx) => (idx % 2 === 0 ? "bg-white" : "bg-gray-50")}
        showFooter={false}
        emptyMessage="Data kosong"
      />
    </div>
  );
};

export default PengaturanAturanAkademikTable;
