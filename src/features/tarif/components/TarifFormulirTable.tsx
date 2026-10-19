import React, { useState } from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoSave, IoCalendarOutline } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";

export interface TarifFormulir {
  id: string;
  jenisAkun: string;
  jenisProgram: string;
  nominalTarif: number;
  tanggalAkhir: string;
  periode?: string;
  jalur?: string;
  gelombang?: string;
  sistemKuliah?: string;
}

interface TarifFormulirTableProps {
  data: TarifFormulir[];
  isAdding?: boolean;
  onSaveNewRow?: (newItem: TarifFormulir) => void;
  onCancelNewRow?: () => void;
  loading?: boolean;
  className?: string;
}

const TarifFormulirTable: React.FC<TarifFormulirTableProps> = ({
  data = [],
  isAdding = false,
  onSaveNewRow,
  onCancelNewRow,
  loading = false,
  className = "",
}) => {
  // State for new inline row
  const [newRow, setNewRow] = useState({
    jenisAkun: "Formulir",
    jenisProgram: "",
    nominalTarif: "",
    tanggalAkhir: "",
  });

  // Format currency
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("id-ID");
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleSave = () => {
    if (onSaveNewRow) {
      onSaveNewRow({
        id: String(Date.now()),
        jenisAkun: newRow.jenisAkun || "Formulir",
        jenisProgram: newRow.jenisProgram || "Sarjana (S1)",
        nominalTarif: Number(newRow.nominalTarif) || 0,
        tanggalAkhir:
          newRow.tanggalAkhir || new Date().toISOString().split("T")[0],
      });
    }
    setNewRow({
      jenisAkun: "Formulir",
      jenisProgram: "",
      nominalTarif: "",
      tanggalAkhir: "",
    });
  };

  const handleCancel = () => {
    if (onCancelNewRow) {
      onCancelNewRow();
    }
    setNewRow({
      jenisAkun: "Formulir",
      jenisProgram: "",
      nominalTarif: "",
      tanggalAkhir: "",
    });
  };

  // Define columns
  const columns: Column<TarifFormulir>[] = [
    {
      key: "jenisAkun",
      header: "Jenis Akun",
      sortable: true,
      className: "text-left",
    },
    {
      key: "jenisProgram",
      header: "Jenis Program",
      sortable: true,
      className: "text-left",
    },
    {
      key: "nominalTarif",
      header: "Nominal Tarif",
      sortable: true,
      className: "text-right",
      render: (item) => formatCurrency(item.nominalTarif),
    },
    {
      key: "tanggalAkhir",
      header: "Tanggal Akhir",
      sortable: true,
      className: "text-center",
      render: (item) => formatDate(item.tanggalAkhir),
    },
    {
      key: "actions",
      header: "Aksi",
      className: "text-center w-24",
      render: () => null,
    },
  ];

  // Top inline input row for "+ Tambah"
  const topRow = isAdding ? (
    <tr className="bg-gray-50 border-b border-slate-300">
      {/* Jenis Akun */}
      <td className="p-2 border border-slate-300">
        <select
          value={newRow.jenisAkun}
          onChange={(e) =>
            setNewRow({ ...newRow, jenisAkun: e.target.value })
          }
          className="relative z-10 w-full px-2 py-1.5 border border-gray-300 rounded text-xs bg-white text-gray-700 outline-none cursor-pointer"
        >
          <option value="Formulir">Formulir</option>
          <option value="Formulir S1 Reguler">Formulir S1 Reguler</option>
          <option value="Formulir S1 Mandiri">Formulir S1 Mandiri</option>
          <option value="Formulir S1 Kelas Karyawan">
            Formulir S1 Kelas Karyawan
          </option>
          <option value="Formulir Pascasarjana (S2)">
            Formulir Pascasarjana (S2)
          </option>
          <option value="Formulir Beasiswa Prestasi">
            Formulir Beasiswa Prestasi
          </option>
        </select>
      </td>

      {/* Jenis Program */}
      <td className="p-2 border border-slate-300">
        <select
          value={newRow.jenisProgram}
          onChange={(e) =>
            setNewRow({ ...newRow, jenisProgram: e.target.value })
          }
          className="relative z-10 w-full px-2 py-1.5 border border-gray-300 rounded text-xs bg-white text-gray-700 outline-none cursor-pointer"
        >
          <option value="">-- Pilih Program --</option>
          <option value="Sarjana (S1)">Sarjana (S1)</option>
          <option value="Magister (S2)">Magister (S2)</option>
          <option value="Diploma (D3)">Diploma (D3)</option>
          <option value="Doktor (S3)">Doktor (S3)</option>
          <option value="Profesi">Profesi</option>
        </select>
      </td>

      {/* Nominal Tarif */}
      <td className="p-2 border border-slate-300">
        <input
          type="text"
          value={newRow.nominalTarif}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "");
            setNewRow({ ...newRow, nominalTarif: val });
          }}
          placeholder=""
          className="relative z-10 w-full px-2 py-1.5 border border-gray-300 rounded text-xs bg-white text-right outline-none"
        />
      </td>

      {/* Tanggal Akhir */}
      <td className="p-2 border border-slate-300">
        <div className="relative flex items-center border border-gray-300 rounded bg-white overflow-hidden text-xs">
          <span className="p-1.5 text-gray-500 bg-gray-50 border-r border-gray-300 flex items-center justify-center pointer-events-none">
            <IoCalendarOutline size={15} />
          </span>
          <input
            type="date"
            value={newRow.tanggalAkhir}
            onChange={(e) =>
              setNewRow({ ...newRow, tanggalAkhir: e.target.value })
            }
            className="relative w-full px-2 py-1 text-xs outline-none bg-transparent cursor-pointer"
            placeholder="dd-mm-yyyy"
          />
        </div>
      </td>

      {/* Aksi */}
      <td className="p-2 border border-slate-300 text-center">
        <div className="relative z-10 flex items-center justify-center space-x-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSave();
            }}
            className="p-1.5 bg-[#00a65a] hover:bg-[#008d4c] active:bg-[#00733e] text-white rounded cursor-pointer transition-colors shadow-sm"
            title="Simpan"
          >
            <IoSave size={16} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCancel();
            }}
            className="p-1.5 bg-[#f39c12] hover:bg-[#e08e0b] active:bg-[#d68000] text-white rounded cursor-pointer transition-colors shadow-sm"
            title="Batal"
          >
            <IoMdRefresh size={16} />
          </button>
        </div>
      </td>
    </tr>
  ) : null;

  return (
    <div className={className}>
      <ListTable
        data={data}
        columns={columns}
        rowKey={(item) => item.id}
        selectable={false}
        topRow={topRow}
        pageSize={10}
        pageSizeOptions={[10, 25, 50, 100]}
        initialSortColumn="jenisAkun"
        initialSortDirection="asc"
        loading={loading}
        emptyMessage="Data kosong"
        className="text-xs"
      />
    </div>
  );
};

export default TarifFormulirTable;
