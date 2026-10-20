import React, { useState } from "react";
import { IoPencil, IoTrash } from "react-icons/io5";
import ListTable, {
  type Column,
} from "../../../../components/tables/ListTable";
import PromoEdufinFormRow from "./PromoEdufinFormRow";

export interface PromoEdufin {
  id: string;
  no: number;
  channel: string;
  namaPromo: string;
  deskripsi: string;
  tglMulai: string;
  tglSelesai: string;
  aktif: boolean;
}

interface PromoEdufinTableProps {
  data: PromoEdufin[];
  isAdding?: boolean;
  onSaveAdd?: (newItem: PromoEdufin) => void;
  onCancelAdd?: () => void;
  onUpdateItem?: (updatedItem: PromoEdufin) => void;
  onDeleteItem?: (item: PromoEdufin) => void;
}

const PromoEdufinTable: React.FC<PromoEdufinTableProps> = ({
  data,
  isAdding = false,
  onSaveAdd,
  onCancelAdd,
  onUpdateItem,
  onDeleteItem,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  // Define columns for ListTable
  const columns: Column<PromoEdufin>[] = [
    {
      key: "no",
      header: "No",
      width: "5%",
      className: "text-center",
      render: (item) => item.no,
    },
    {
      key: "channel",
      header: "Channel",
      width: "15%",
      render: (item) => item.channel,
    },
    {
      key: "namaPromo",
      header: "Nama Promo",
      width: "15%",
      render: (item) => item.namaPromo,
    },
    {
      key: "deskripsi",
      header: "Deskripsi",
      width: "35%",
      render: (item) => (
        <div className="whitespace-pre-line leading-relaxed">
          {item.deskripsi}
        </div>
      ),
    },
    {
      key: "tglMulai",
      header: "Tgl. Mulai",
      width: "10%",
      render: (item) => item.tglMulai,
    },
    {
      key: "tglSelesai",
      header: "Tgl. Selesai",
      width: "10%",
      render: (item) => item.tglSelesai,
    },
    {
      key: "aktif",
      header: "Aktif",
      width: "5%",
      className: "text-center",
      render: (item) =>
        item.aktif ? (
          <span className="text-green-600 font-bold text-lg leading-none">
            ✓
          </span>
        ) : null,
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
            className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600 cursor-pointer transition-colors"
            title="Edit"
            onClick={() => setEditingId(item.id)}
          >
            <IoPencil size={16} />
          </button>
          <button
            type="button"
            className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer transition-colors"
            title="Hapus"
            onClick={() => onDeleteItem?.(item)}
          >
            <IoTrash size={16} />
          </button>
        </div>
      ),
    },
  ];

  // Custom row render for in-place inline editing
  const renderCustomRow = (item: PromoEdufin) => {
    if (editingId === item.id) {
      return (
        <PromoEdufinFormRow
          key={item.id}
          initialData={item}
          isEdit={true}
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
    <div className="rounded-md overflow-hidden text-xs">
      <ListTable
        data={data}
        columns={columns}
        rowKey={(item) => item.id}
        headerClassName="text-white"
        showFooter={true}
        emptyMessage="Data kosong"
        className="min-w-full border-collapse"
        topRow={
          isAdding ? (
            <PromoEdufinFormRow
              nextNo={data.length + 1}
              isEdit={false}
              onSave={(newItem) => onSaveAdd?.(newItem)}
              onCancel={() => onCancelAdd?.()}
            />
          ) : undefined
        }
        customRow={renderCustomRow}
      />
    </div>
  );
};

export default PromoEdufinTable;
