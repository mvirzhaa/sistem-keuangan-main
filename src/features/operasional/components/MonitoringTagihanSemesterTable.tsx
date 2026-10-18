import React from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoEye } from "react-icons/io5";
import type { MahasiswaTagihanDetail } from "./DetailTagihanSemesterModal";

export interface MahasiswaSemesterItem extends MahasiswaTagihanDetail {
  sksSemester?: string;
  jenisTagihan?: string;
  tagihan?: string;
  denda?: string;
  potongan?: string;
  pembayaran?: string;
  statusKeuangan?: string;
  isTercekal?: boolean;
  periode?: string;
  tidakLolosAturan?: string;
}

interface MonitoringTagihanSemesterTableProps {
  data: MahasiswaSemesterItem[];
  selectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  onViewDetail: (item: MahasiswaSemesterItem) => void;
  loading?: boolean;
}

const MonitoringTagihanSemesterTable: React.FC<
  MonitoringTagihanSemesterTableProps
> = ({ data, onSelectionChange, onViewDetail, loading = false }) => {
  const handleSelectionChange = (items: MahasiswaSemesterItem[]) => {
    if (onSelectionChange) {
      onSelectionChange(items.map((item) => item.id));
    }
  };

  const columns: Column<MahasiswaSemesterItem>[] = [
    {
      key: "nama",
      header: "Mahasiswa",
      sortable: true,
      render: (item) => (
        <div>
          <div className="font-bold text-gray-900 uppercase">{item.nama}</div>
          <div className="text-gray-500 text-[11px]">{item.nim}</div>
        </div>
      ),
    },
    {
      key: "programStudi",
      header: "Program Studi",
      sortable: true,
      render: (item) => (
        <div>
          <div className="font-bold text-gray-900">{item.programStudi}</div>
          <div className="text-gray-600 text-[11px]">
            Angkatan : {item.angkatan}
          </div>
        </div>
      ),
    },
    {
      key: "statusKuliah",
      header: "Status Kuliah",
      sortable: true,
      className: "text-center",
      render: (item) => (
        <span className="inline-block bg-gray-400 text-white text-[11px] font-medium px-2 py-0.5 rounded shadow-xs whitespace-nowrap">
          {item.statusKuliah || "Tidak Memiliki AKM"}
        </span>
      ),
    },
    {
      key: "sksSemester",
      header: "SKS Semester",
      sortable: true,
      className: "text-center",
      render: (item) => item.sksSemester || "",
    },
    {
      key: "jenisTagihan",
      header: "Jenis Tagihan",
      sortable: true,
      className: "text-center",
      render: (item) => item.jenisTagihan || "",
    },
    {
      key: "tagihan",
      header: "Tagihan",
      sortable: true,
      className: "text-right font-mono",
      render: (item) => item.tagihan || "",
    },
    {
      key: "denda",
      header: "Denda",
      sortable: true,
      className: "text-right font-mono",
      render: (item) => item.denda || "",
    },
    {
      key: "potongan",
      header: "Potongan",
      sortable: true,
      className: "text-right font-mono",
      render: (item) => item.potongan || "",
    },
    {
      key: "pembayaran",
      header: "Pembayaran",
      sortable: true,
      className: "text-right font-mono",
      render: (item) => item.pembayaran || "",
    },
    {
      key: "statusKeuangan",
      header: "Status Keuangan",
      sortable: true,
      className: "text-center",
      render: (item) =>
        item.isTercekal ? (
          <span className="inline-block bg-[#f56954] text-white text-[11px] font-medium px-2 py-0.5 rounded shadow-xs whitespace-nowrap">
            Tercekal Keuangan
          </span>
        ) : (
          <span className="inline-block bg-gray-400 text-white text-[11px] font-medium px-2 py-0.5 rounded shadow-xs whitespace-nowrap">
            {item.statusKeuangan || "Tidak Ada Tagihan"}
          </span>
        ),
    },
    {
      key: "actions",
      header: "Aksi",
      className: "text-center",
      width: "70px",
      render: (item) => (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetail(item);
            }}
            className="p-1.5 bg-[#00c0ef] hover:bg-[#00acd6] text-white rounded shadow-xs transition-colors cursor-pointer inline-flex items-center justify-center"
            title="Lihat Detail Tagihan"
          >
            <IoEye size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <ListTable
      data={data}
      columns={columns}
      rowKey={(item) => item.id}
      initialSortColumn="nama"
      initialSortDirection="asc"
      pageSize={10}
      pageSizeOptions={[10, 25, 50, 100]}
      selectable={true}
      onSelectionChange={handleSelectionChange}
      className="w-full text-xs"
      headerClassName="text-xs"
      loading={loading}
      emptyMessage="Tidak ada data tagihan semester"
    />
  );
};

export default MonitoringTagihanSemesterTable;
