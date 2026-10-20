import React, { useState } from "react";
import ListTable, {
  type Column,
} from "../../../../components/tables/ListTable";
import { IoPencil, IoTrash } from "react-icons/io5";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import AkunTransaksiFormRow from "./AkunTransaksiFormRow";

export interface AkunTransaksi {
  id: string;
  kode: string;
  nama: string;
  kelompok: string;
  jenisBiaya: string;
  frekuensi: string;
  event: string;
  mahasiswa: boolean;
  pendaftar: boolean;
  generateKuliah: boolean;
  sevimaPay: boolean;
}

interface AkunTransaksiTableProps {
  data: AkunTransaksi[];
  onSelectionChange?: (selectedItems: AkunTransaksi[]) => void;
  isAdding?: boolean;
  onSaveAdd?: (newItem: AkunTransaksi) => void;
  onCancelAdd?: () => void;
  onUpdateItem?: (updatedItem: AkunTransaksi) => void;
  onDeleteItem?: (item: AkunTransaksi) => void;
}

const AkunTransaksiTable: React.FC<AkunTransaksiTableProps> = ({
  data,
  onSelectionChange = () => {},
  isAdding = false,
  onSaveAdd,
  onCancelAdd,
  onUpdateItem,
  onDeleteItem,
}) => {
  // State for which row is currently being edited in-place
  const [editingId, setEditingId] = useState<string | null>(null);

  // Define columns
  const columns: Column<AkunTransaksi>[] = [
    {
      key: "kode",
      header: "Kode",
      width: "8%",
    },
    {
      key: "nama",
      header: "Nama Jenis Tagihan",
      width: "20%",
    },
    {
      key: "kelompok",
      header: "Kelompok",
      width: "10%",
    },
    {
      key: "jenisBiaya",
      header: "Jenis Biaya Neofeeder",
      width: "12%",
    },
    {
      key: "frekuensi",
      header: "Frekuensi",
      width: "10%",
    },
    {
      key: "event",
      header: "Event",
      width: "8%",
    },
    {
      key: "mahasiswa",
      header: "Mahasiswa",
      width: "8%",
      render: (item) => (
        <div className="flex justify-center">
          {item.mahasiswa ? (
            <span className="text-green-600 text-xl">
              <IoMdCheckmark />
            </span>
          ) : (
            <span className="text-red-600 text-xl">
              <IoMdClose />
            </span>
          )}
        </div>
      ),
    },
    {
      key: "pendaftar",
      header: "Pendaftar",
      width: "8%",
      render: (item) => (
        <div className="flex justify-center">
          {item.pendaftar ? (
            <span className="text-green-600 text-xl">
              <IoMdCheckmark />
            </span>
          ) : (
            <span className="text-red-600 text-xl">
              <IoMdClose />
            </span>
          )}
        </div>
      ),
    },
    {
      key: "generateKuliah",
      header: "Generate Kuliah?",
      width: "10%",
      render: (item) => (
        <div className="flex justify-center">
          {item.generateKuliah ? (
            <span className="text-green-600 text-xl">
              <IoMdCheckmark />
            </span>
          ) : (
            <span className="text-red-600 text-xl">
              <IoMdClose />
            </span>
          )}
        </div>
      ),
    },
    {
      key: "sevimaPay",
      header: "EduFin?",
      width: "8%",
      render: (item) => (
        <div className="flex justify-center">
          {item.sevimaPay ? (
            <span className="text-green-600 text-xl">
              <IoMdCheckmark />
            </span>
          ) : (
            <span className="text-red-600 text-xl">
              <IoMdClose />
            </span>
          )}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Aksi",
      width: "8%",
      render: (item) => (
        <div className="flex justify-center space-x-1">
          <button
            type="button"
            onClick={() => setEditingId(item.id)}
            className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600 cursor-pointer"
            title="Edit"
          >
            <IoPencil size={16} />
          </button>
          <button
            type="button"
            onClick={() => onDeleteItem?.(item)}
            className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
            title="Hapus"
          >
            <IoTrash size={16} />
          </button>
        </div>
      ),
    },
  ];

  // Custom row render for in-place inline editing
  const renderCustomRow = (
    item: AkunTransaksi,
    _index: number,
    isSelected: boolean,
    toggleSelect: () => void,
  ) => {
    if (editingId === item.id) {
      return (
        <AkunTransaksiFormRow
          key={item.id}
          initialData={item}
          isEdit={true}
          isSelected={isSelected}
          onToggleSelect={toggleSelect}
          onSave={(updated) => {
            onUpdateItem?.(updated);
            setEditingId(null);
          }}
          onCancel={() => setEditingId(null)}
        />
      );
    }
    return undefined;
  };

  return (
    <div className="shadow-md rounded-md overflow-hidden text-xs">
      <ListTable
        data={data}
        columns={columns}
        rowKey={(item) => item.id}
        selectable={true}
        onSelectionChange={onSelectionChange}
        topRow={
          isAdding ? (
            <AkunTransaksiFormRow
              isEdit={false}
              onSave={(newItem) => onSaveAdd?.(newItem)}
              onCancel={() => onCancelAdd?.()}
            />
          ) : undefined
        }
        customRow={renderCustomRow}
        emptyMessage="Data kosong"
        className="w-full"
        headerClassName="text-white"
      />
    </div>
  );
};

export default AkunTransaksiTable;
