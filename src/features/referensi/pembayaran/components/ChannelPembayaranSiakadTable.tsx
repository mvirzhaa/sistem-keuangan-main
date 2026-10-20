import React, { useState } from "react";
import ListTable, {
  type Column,
} from "../../../../components/tables/ListTable";
import { IoPencil, IoTrash } from "react-icons/io5";
import ChannelPembayaranSiakadFormRow, {
  type ChannelPembayaranSiakad,
} from "./ChannelPembayaranSiakadFormRow";

export type { ChannelPembayaranSiakad };

interface ChannelPembayaranSiakadTableProps {
  data: ChannelPembayaranSiakad[];
  isAdding?: boolean;
  onSaveAdd?: (newItem: ChannelPembayaranSiakad) => void;
  onCancelAdd?: () => void;
  onUpdateItem?: (updatedItem: ChannelPembayaranSiakad) => void;
  onDeleteItem?: (item: ChannelPembayaranSiakad) => void;
}

const ChannelPembayaranSiakadTable: React.FC<
  ChannelPembayaranSiakadTableProps
> = ({
  data,
  isAdding = false,
  onSaveAdd,
  onCancelAdd,
  onUpdateItem,
  onDeleteItem,
}) => {
  // State for which row is currently being edited in-place
  const [editingId, setEditingId] = useState<string | null>(null);

  // Define columns matching Image 1
  const columns: Column<ChannelPembayaranSiakad>[] = [
    {
      key: "kode",
      header: "Kode",
      width: "12%",
    },
    {
      key: "nama",
      header: "Nama Channel Pembayaran Siakad",
      width: "38%",
    },
    {
      key: "logo",
      header: "Logo",
      width: "30%",
    },
    {
      key: "aktif",
      header: "Aktif",
      width: "10%",
      render: (item) => (
        <div className="flex justify-center items-center">
          {item.aktif ? (
            <span className="text-green-600 font-bold text-lg leading-none">
              ✓
            </span>
          ) : (
            <span className="text-red-600 font-bold text-lg leading-none">
              X
            </span>
          )}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Aksi",
      width: "10%",
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

  // Custom row render for in-place inline editing (Image 2)
  const renderCustomRow = (item: ChannelPembayaranSiakad) => {
    if (editingId === item.id) {
      return (
        <ChannelPembayaranSiakadFormRow
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
    <div className="shadow-md rounded-md overflow-hidden text-xs">
      <ListTable
        data={data}
        columns={columns}
        rowKey={(item) => item.id}
        emptyMessage="Data kosong"
        className="w-full"
        headerClassName="text-white"
        rowClassName={(item, index) =>
          index % 2 === 0 ? "bg-gray-50" : "bg-white"
        }
        topRow={
          isAdding ? (
            <ChannelPembayaranSiakadFormRow
              isEdit={false}
              onSave={(newItem) => onSaveAdd?.(newItem)}
              onCancel={() => onCancelAdd?.()}
            />
          ) : undefined
        }
        customRow={renderCustomRow}
        showFooter={false}
        pageSize={50}
      />
    </div>
  );
};

export default ChannelPembayaranSiakadTable;
