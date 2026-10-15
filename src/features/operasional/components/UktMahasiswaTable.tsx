import React, { useState } from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { MdEdit } from "react-icons/md";
import { IoMdSave, IoMdRefresh } from "react-icons/io";

export interface UktMahasiswaData {
  id: string;
  nim: string;
  nama: string;
  programStudi: string;
  kelompokUkt: string;
  nominalUkt: number;
  valid: boolean;
  periode?: string;
  gelombang?: string;
  jalurPendaftaran?: string;
  sistemKuliah?: string;
  penerima?: string;
}

interface UktMahasiswaTableProps {
  data: UktMahasiswaData[];
  loading?: boolean;
  onEdit?: (mahasiswa: UktMahasiswaData) => void;
  onSaveRow?: (mahasiswa: UktMahasiswaData) => void;
  onSelectionChange?: (selectedItems: UktMahasiswaData[]) => void;
}

const UktMahasiswaTable: React.FC<UktMahasiswaTableProps> = ({
  data,
  loading = false,
  onSaveRow,
  onSelectionChange,
}) => {
  const [selectedItems, setSelectedItems] = useState<UktMahasiswaData[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<{
    kelompokUkt: string;
    nominalUkt: string;
    valid: boolean;
  }>({
    kelompokUkt: "",
    nominalUkt: "",
    valid: false,
  });

  const handleSelectionChange = (items: UktMahasiswaData[]) => {
    setSelectedItems(items);
    if (onSelectionChange) {
      onSelectionChange(items);
    }
  };

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString("id-ID")}`;
  };

  const handleStartEdit = (item: UktMahasiswaData) => {
    setEditingId(item.id);
    setEditFormData({
      kelompokUkt: item.kelompokUkt || "",
      nominalUkt: "",
      valid: item.valid,
    });
  };

  const handleSave = (item: UktMahasiswaData) => {
    let nominal = item.nominalUkt;
    if (editFormData.nominalUkt.trim() !== "") {
      nominal =
        parseInt(editFormData.nominalUkt.replace(/[^\d]/g, ""), 10) || 0;
    }

    const updated: UktMahasiswaData = {
      ...item,
      kelompokUkt: editFormData.kelompokUkt || item.kelompokUkt,
      nominalUkt: nominal,
      valid: editFormData.valid,
    };

    if (onSaveRow) {
      onSaveRow(updated);
    }
    setEditingId(null);
  };

  const handleResetOrCancel = () => {
    setEditingId(null);
  };

  const columns: Column<UktMahasiswaData>[] = [
    {
      key: "nim",
      header: "NIM",
      className: "text-left pl-3",
      headerClassName: "text-center",
      width: "130px",
    },
    {
      key: "nama",
      header: "Nama Mahasiswa",
      sortable: true,
      className: "text-left pl-3",
    },
    {
      key: "programStudi",
      header: "Program Studi",
      className: "text-left pl-3",
    },
    {
      key: "kelompokUkt",
      header: "Kelompok UKT",
      render: (item) => {
        if (editingId === item.id) {
          return (
            <div className="relative w-full">
              <select
                value={editFormData.kelompokUkt}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    kelompokUkt: e.target.value,
                  }))
                }
                className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs bg-white text-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer appearance-none pr-6 font-normal"
              >
                <option value="">-- Pilih Kelompok UKT --</option>
                <option value="Kelompok 1">Kelompok 1</option>
                <option value="Kelompok 2">Kelompok 2</option>
                <option value="Kelompok 3">Kelompok 3</option>
                <option value="Kelompok 4">Kelompok 4</option>
                <option value="Kelompok 5">Kelompok 5</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-gray-500">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          );
        }
        return item.kelompokUkt || "-";
      },
      className: "text-center",
      width: "180px",
    },
    {
      key: "nominalUkt",
      header: "Nominal UKT",
      render: (item) => {
        if (editingId === item.id) {
          return (
            <input
              type="text"
              value={editFormData.nominalUkt}
              placeholder="Kosongi Jika Nominal Sama"
              onClick={(e) => e.stopPropagation()}
              onChange={(e) =>
                setEditFormData((prev) => ({
                  ...prev,
                  nominalUkt: e.target.value,
                }))
              }
              className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs text-left focus:outline-none focus:border-blue-500 text-gray-800 placeholder:text-gray-400 font-normal"
            />
          );
        }
        return formatCurrency(item.nominalUkt);
      },
      className: "text-right pr-4 font-normal",
      width: "180px",
    },
    {
      key: "valid",
      header: "Valid?",
      render: (item) => {
        if (editingId === item.id) {
          return (
            <div className="flex justify-center items-center py-1">
              <input
                type="checkbox"
                checked={editFormData.valid}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    valid: e.target.checked,
                  }))
                }
                className="w-4 h-4 border border-gray-300 rounded text-blue-600 focus:ring-0 cursor-pointer"
              />
            </div>
          );
        }
        return item.valid ? (
          <span className="text-green-600 font-bold">✓</span>
        ) : (
          <span className="text-red-500 font-bold">✕</span>
        );
      },
      className: "text-center",
      width: "80px",
    },
    {
      key: "actions",
      header: "Aksi",
      render: (item) => {
        if (editingId === item.id) {
          return (
            <div className="flex justify-center items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSave(item);
                }}
                className="w-7 h-7 flex items-center justify-center bg-[#00a65a] hover:bg-[#008d4c] text-white rounded transition-colors cursor-pointer shadow-xs"
                title="Simpan"
              >
                <IoMdSave size={16} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleResetOrCancel();
                }}
                className="w-7 h-7 flex items-center justify-center bg-[#f39c12] hover:bg-[#e08e0b] text-white rounded transition-colors cursor-pointer shadow-xs"
                title="Batal / Reset"
              >
                <IoMdRefresh size={16} />
              </button>
            </div>
          );
        }

        return (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleStartEdit(item);
              }}
              className="p-1.5 bg-[#E08E0B] text-white rounded hover:bg-[#c97f09] transition-colors cursor-pointer shadow-xs"
              title="Edit Kelompok Mahasiswa"
            >
              <MdEdit size={16} />
            </button>
          </div>
        );
      },
      className: "text-center",
      width: "90px",
    },
  ];

  return (
    <ListTable
      data={data}
      columns={columns}
      rowKey={(item) => item.id}
      initialSortColumn="nama"
      pageSize={10}
      pageSizeOptions={[10, 25, 50, 100]}
      selectable={true}
      onSelectionChange={handleSelectionChange}
      className="w-full text-xs"
      headerClassName="text-sm font-medium"
      loading={loading}
      emptyMessage="Data kosong"
    />
  );
};

export default UktMahasiswaTable;
