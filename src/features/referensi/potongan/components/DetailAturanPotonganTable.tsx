import React, { useState, useMemo } from "react";
import { IoPencil, IoTrash } from "react-icons/io5";
import { IoMdSave, IoMdClose } from "react-icons/io";
import Dropdown from "../../../../components/inputs/Dropdown";
import ListTable, { type Column } from "../../../../components/tables/ListTable";

export interface AturanPotonganItem {
  id: string;
  noUrut: number;
  jenisAkun: string;
  maksimalNominal: number;
  isButtonRow?: boolean;
  isAddingRow?: boolean;
}

interface DetailAturanPotonganTableProps {
  aturanList: AturanPotonganItem[];
  onAddAturan?: (item: Omit<AturanPotonganItem, "id">) => void;
  onUpdateAturan?: (id: string, updated: Partial<AturanPotonganItem>) => void;
  onDeleteAturan?: (id: string) => void;
  searchKeyword?: string;
  isReadOnly?: boolean;
}

const jenisAkunOptions = [
  "SPP",
  "SKS",
  "Ujian Akhir Semester",
  "Uang Gedung Tahap 2",
  "TA AWUN",
  "UKT",
  "Registrasi Ulang",
];

const formatCurrency = (val: number | string): string => {
  const num =
    typeof val === "string" ? parseFloat(val.replace(/[^\d]/g, "")) : val;
  if (isNaN(num)) return "0,00";
  return num.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const DetailAturanPotonganTable: React.FC<DetailAturanPotonganTableProps> = ({
  aturanList,
  onAddAturan,
  onUpdateAturan,
  onDeleteAturan,
  searchKeyword = "",
  isReadOnly = false,
}) => {
  // Adding state
  const [isAdding, setIsAdding] = useState(false);
  const [newJenisAkun, setNewJenisAkun] = useState("SPP");
  const [newMaksimalNominal, setNewMaksimalNominal] = useState("0");

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editJenisAkun, setEditJenisAkun] = useState("");
  const [editMaksimalNominal, setEditMaksimalNominal] = useState("0");

  // Filter based on search
  const filteredAturan = useMemo(() => {
    if (!searchKeyword.trim()) return aturanList;
    const q = searchKeyword.toLowerCase();
    return aturanList.filter((a) => a.jenisAkun.toLowerCase().includes(q));
  }, [aturanList, searchKeyword]);

  // Handle save new
  const handleSaveNew = () => {
    const nextNo =
      aturanList.length > 0
        ? Math.max(...aturanList.map((a) => a.noUrut)) + 1
        : 1;

    const nominal =
      parseFloat(newMaksimalNominal.replace(/[^\d]/g, "")) || 0;

    if (onAddAturan) {
      onAddAturan({
        noUrut: nextNo,
        jenisAkun: newJenisAkun,
        maksimalNominal: nominal,
      });
    }

    setIsAdding(false);
    setNewJenisAkun("SPP");
    setNewMaksimalNominal("0");
  };

  // Handle start edit
  const handleStartEdit = (item: AturanPotonganItem) => {
    setEditingId(item.id);
    setEditJenisAkun(item.jenisAkun);
    setEditMaksimalNominal(String(item.maksimalNominal));
  };

  // Handle save edit
  const handleSaveEdit = () => {
    if (!editingId) return;
    const nominal =
      parseFloat(editMaksimalNominal.replace(/[^\d]/g, "")) || 0;

    if (onUpdateAturan) {
      onUpdateAturan(editingId, {
        jenisAkun: editJenisAkun,
        maksimalNominal: nominal,
      });
    }

    setEditingId(null);
  };

  // Table rows data
  const tableData = useMemo(() => {
    const rows: AturanPotonganItem[] = [...filteredAturan];

    if (isAdding && !isReadOnly) {
      rows.push({
        id: "inline-add-row",
        noUrut:
          aturanList.length > 0
            ? Math.max(...aturanList.map((a) => a.noUrut)) + 1
            : 1,
        jenisAkun: newJenisAkun,
        maksimalNominal: 0,
        isAddingRow: true,
      });
    }

    if (!isReadOnly && !isAdding) {
      rows.push({
        id: "button-add-row",
        noUrut: 0,
        jenisAkun: "",
        maksimalNominal: 0,
        isButtonRow: true,
      });
    }

    return rows;
  }, [filteredAturan, isAdding, isReadOnly, aturanList, newJenisAkun]);

  const columns: Column<AturanPotonganItem>[] = [
    {
      key: "noUrut",
      header: "No. Urut",
      width: "10%",
      className: "text-center",
      render: (item) => {
        if (item.isButtonRow) return "";
        return item.noUrut;
      },
    },
    {
      key: "jenisAkun",
      header: "Jenis Akun",
      width: "45%",
      render: (item) => {
        if (item.isButtonRow) return "";
        if (item.isAddingRow) {
          return (
            <Dropdown
              options={jenisAkunOptions}
              value={newJenisAkun}
              onChange={(val) => setNewJenisAkun(val)}
              className="w-full text-xs"
            />
          );
        }
        if (item.id === editingId) {
          return (
            <Dropdown
              options={jenisAkunOptions}
              value={editJenisAkun}
              onChange={(val) => setEditJenisAkun(val)}
              className="w-full text-xs"
            />
          );
        }
        return item.jenisAkun;
      },
    },
    {
      key: "maksimalNominal",
      header: "Maksimal Nominal",
      width: "30%",
      className: "text-right",
      render: (item) => {
        if (item.isButtonRow) return "";
        if (item.isAddingRow) {
          return (
            <input
              type="text"
              value={newMaksimalNominal}
              onChange={(e) => setNewMaksimalNominal(e.target.value)}
              className="w-full border border-gray-300 rounded px-2.5 py-1 text-xs text-right focus:outline-none focus:border-blue-500"
              placeholder="0"
            />
          );
        }
        if (item.id === editingId) {
          return (
            <input
              type="text"
              value={editMaksimalNominal}
              onChange={(e) => setEditMaksimalNominal(e.target.value)}
              className="w-full border border-gray-300 rounded px-2.5 py-1 text-xs text-right focus:outline-none focus:border-blue-500"
            />
          );
        }
        return formatCurrency(item.maksimalNominal);
      },
    },
    {
      key: "aksi",
      header: "Aksi",
      width: "15%",
      className: "text-center",
      render: (item) => {
        if (item.isButtonRow) return "";
        if (item.isAddingRow) {
          return (
            <div className="flex justify-center space-x-1">
              <button
                type="button"
                onClick={handleSaveNew}
                className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer shadow-xs"
                title="Simpan"
              >
                <IoMdSave size={16} />
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer shadow-xs"
                title="Batal"
              >
                <IoMdClose size={16} />
              </button>
            </div>
          );
        }
        if (item.id === editingId) {
          return (
            <div className="flex justify-center space-x-1">
              <button
                type="button"
                onClick={handleSaveEdit}
                className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer shadow-xs"
                title="Simpan"
              >
                <IoMdSave size={16} />
              </button>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer shadow-xs"
                title="Batal"
              >
                <IoMdClose size={16} />
              </button>
            </div>
          );
        }
        if (isReadOnly) {
          return "-";
        }
        return (
          <div className="flex justify-center space-x-1">
            <button
              type="button"
              onClick={() => handleStartEdit(item)}
              className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600 cursor-pointer shadow-xs"
              title="Edit"
            >
              <IoPencil size={15} />
            </button>
            <button
              type="button"
              onClick={() => onDeleteAturan && onDeleteAturan(item.id)}
              className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer shadow-xs"
              title="Hapus"
            >
              <IoTrash size={15} />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="overflow-x-auto text-xs">
      <ListTable
        data={tableData}
        columns={columns}
        rowKey={(item) => item.id}
        headerClassName="text-white text-xs font-semibold"
        showFooter={false}
        emptyMessage=""
        customRow={(item) => {
          if (item.isButtonRow) {
            return (
              <tr key={item.id}>
                <td
                  colSpan={4}
                  className="p-3 border border-slate-300 bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setIsAdding(true)}
                    className="w-full py-2.5 border border-gray-300 rounded-md text-center text-sm font-semibold text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
                  >
                    Tambah Aturan
                  </button>
                </td>
              </tr>
            );
          }
          return null;
        }}
      />
    </div>
  );
};

export default DetailAturanPotonganTable;
