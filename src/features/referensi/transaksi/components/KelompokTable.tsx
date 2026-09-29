import React, { useState } from "react";
import { IoSave, IoPencil, IoClose } from "react-icons/io5"; // Added IoClose icon
import Dropdown from "../../../../components/inputs/Dropdown";
import ListTable, {
  type Column,
} from "../../../../components/tables/ListTable";
import TextField from "../../../../components/inputs/TextField";

interface KelompokItem {
  id: string;
  kode: string;
  nama: string;
  jenisUser: string;
}

const KelompokTable: React.FC = () => {
  const [items, setItems] = useState<KelompokItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<KelompokItem>({
    id: "",
    kode: "",
    nama: "",
    jenisUser: "Mahasiswa",
  });

  const jenisUserOptions = ["Mahasiswa", "Dosen", "Karyawan", "Alumni"];

  // Handle adding new item
  const handleAddClick = () => {
    setIsAdding(true);
    setNewItem({
      id: `temp-${Date.now()}`,
      kode: "",
      nama: "",
      jenisUser: "Mahasiswa",
    });
  };

  // Handle saving new item
  const handleSave = () => {
    // Validate required fields
    if (!newItem.kode || !newItem.nama) {
      alert("Kode dan Nama harus diisi");
      return;
    }

    // Add the new item to the list
    setItems([...items, { ...newItem, id: `item-${Date.now()}` }]);
    setIsAdding(false);
  };

  // Handle canceling new item
  const handleCancel = () => {
    setIsAdding(false);
  };

  // Handle field changes for new item
  const handleChange = (field: keyof KelompokItem, value: string) => {
    setNewItem({
      ...newItem,
      [field]: value,
    });
  };

  // Define columns for the table
  const columns: Column<KelompokItem>[] = [
    {
      key: "kode",
      header: "Kode",
      width: "20%",
      render: (item) => {
        if (isAdding && item.id === newItem.id) {
          return (
            <TextField
              value={newItem.kode}
              onChange={(value) => handleChange("kode", value)}
              placeholder="Kode"
              className="w-full"
            />
          );
        }
        return item.kode;
      },
    },
    {
      key: "nama",
      header: "Nama",
      width: "40%",
      render: (item) => {
        if (isAdding && item.id === newItem.id) {
          return (
            <TextField
              value={newItem.nama}
              onChange={(value) => handleChange("nama", value)}
              placeholder="Nama"
              className="w-full"
            />
          );
        }
        return item.nama;
      },
    },
    {
      key: "jenisUser",
      header: "Jenis User",
      width: "25%",
      render: (item) => {
        if (isAdding && item.id === newItem.id) {
          return (
            <Dropdown
              options={jenisUserOptions}
              defaultValue={newItem.jenisUser}
              onChange={(value) => handleChange("jenisUser", value)}
              className="w-full"
            />
          );
        }
        return item.jenisUser;
      },
    },
    {
      key: "actions",
      header: "Aksi",
      width: "15%",
      className: "text-center",
      render: (item) => {
        if (isAdding && item.id === newItem.id) {
          return (
            <div className="flex justify-center space-x-1">
              <button
                onClick={handleSave}
                className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600"
                title="Simpan"
              >
                <IoSave size={16} />
              </button>
              <button
                onClick={handleCancel}
                className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                title="Batal"
              >
                <IoClose size={16} />
              </button>
            </div>
          );
        }
        return (
          <div className="flex justify-center space-x-1">
            <button
              className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600"
              title="Edit"
            >
              <IoPencil size={16} />
            </button>
          </div>
        );
      },
    },
  ];

  // Combine existing items with new item when adding
  const displayData = isAdding ? [...items, newItem] : items;

  return (
    <div className="shadow-md rounded-md overflow-hidden border-t-4 border-t-green-600 p-5 text-xs">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddClick}
          disabled={isAdding}
          className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-600 disabled:opacity-50"
        >
          <span className="mr-1">+</span> Tambah
        </button>
      </div>

      <ListTable
        data={displayData}
        columns={columns}
        rowKey={(item) => item.id}
        emptyMessage="Data kosong"
        className="w-full"
      />
    </div>
  );
};

export default KelompokTable;
