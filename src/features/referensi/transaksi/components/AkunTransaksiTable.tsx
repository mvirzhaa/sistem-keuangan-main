import React, { useState } from "react";
import ListTable, {
  type Column,
} from "../../../../components/tables/ListTable";
import { IoCheckmark, IoPencil, IoTrash } from "react-icons/io5";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

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
}

const AkunTransaksiTable: React.FC<AkunTransaksiTableProps> = ({
  data,
  onSelectionChange = () => {},
}) => {
  const [selectedItems, setSelectedItems] = useState<AkunTransaksi[]>([]);

  // Handle selection change
  const handleSelectionChange = (items: AkunTransaksi[]) => {
    setSelectedItems(items);
    onSelectionChange(items);
  };

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
              {" "}
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
              {" "}
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
      header: "SevimaPay?",
      width: "8%",
      render: (item) => (
        <div className="flex justify-center">
          {item.sevimaPay ? (
            <span className="text-green-600 text-xl">
              {" "}
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
            className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600"
            title="Edit"
          >
            <IoPencil size={16} />
          </button>
          <button
            className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
            title="Hapus"
          >
            <IoTrash size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="shadow-md rounded-md overflow-hidden text-xs">
      <ListTable
        data={data}
        columns={columns}
        rowKey={(item) => item.id}
        selectable={true}
        onSelectionChange={handleSelectionChange}
        emptyMessage="Data kosong"
        className="w-full"
        headerClassName="bg-blue-900 text-white"
      />
    </div>
  );
};

export default AkunTransaksiTable;
