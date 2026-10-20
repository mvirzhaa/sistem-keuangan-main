import React, { useState } from "react";
import { IoMdAdd, IoMdClose, IoMdSave } from "react-icons/io";
import { IoPencil, IoTrash } from "react-icons/io5";
import SearchableDropdown from "../../../../components/inputs/SearchableDropdown";
import ListTable, {
  type Column,
} from "../../../../components/tables/ListTable";
import KonfirmasiModal from "../../../../components/modal/KonfirmasiModal";
import MetodePembayaranSiakadFormRow from "./MetodePembayaranSiakadFormRow";

export interface MetodePembayaran {
  id: string;
  kode: string;
  nama: string;
  jenis: string;
  isDefault: boolean;
  isParent: boolean;
  parentId?: string;
  hasLogo?: boolean;
  isAddForm?: boolean;
}

const initialMetodePembayaranData: MetodePembayaran[] = [
  {
    id: "1",
    kode: "01",
    nama: "Bank Syariah Indonesia",
    jenis: "OFFLINE",
    isDefault: true,
    isParent: true,
  },
  {
    id: "2",
    kode: "",
    nama: "BPRS Amanah Ummah",
    jenis: "",
    isDefault: false,
    isParent: false,
    parentId: "1",
    hasLogo: true,
  },
  {
    id: "3",
    kode: "",
    nama: "OVO",
    jenis: "",
    isDefault: false,
    isParent: false,
    parentId: "1",
    hasLogo: true,
  },
  {
    id: "4",
    kode: "",
    nama: "Kasir BASK UiKA",
    jenis: "",
    isDefault: false,
    isParent: false,
    parentId: "1",
    hasLogo: true,
  },
  {
    id: "5",
    kode: "",
    nama: "Bank Syariah Indonesia",
    jenis: "",
    isDefault: false,
    isParent: false,
    parentId: "1",
    hasLogo: true,
  },
  {
    id: "6",
    kode: "02",
    nama: "Kasir BASK UiKA",
    jenis: "OFFLINE",
    isDefault: true,
    isParent: true,
  },
  {
    id: "7",
    kode: "03",
    nama: "Bank Amanah Ummah",
    jenis: "OFFLINE",
    isDefault: true,
    isParent: true,
  },
  {
    id: "8",
    kode: "04",
    nama: "Host to Host",
    jenis: "H2H",
    isDefault: false,
    isParent: true,
  },
  {
    id: "9",
    kode: "06",
    nama: "Deposit",
    jenis: "DEPOSIT",
    isDefault: false,
    isParent: true,
  },
  {
    id: "10",
    kode: "07",
    nama: "SIMPONI",
    jenis: "ONLINE",
    isDefault: false,
    isParent: true,
  },
  {
    id: "11",
    kode: "",
    nama: "MPN G3",
    jenis: "",
    isDefault: false,
    isParent: false,
    parentId: "10",
  },
];

const MetodePembayaranSiakadTable: React.FC = () => {
  const [data, setData] = useState<MetodePembayaran[]>(
    initialMetodePembayaranData,
  );
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({
    "1": true, // Default expanded for first item
    "10": true, // Default expanded for SIMPONI
  });

  const [addingChildTo, setAddingChildTo] = useState<string | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<string>("");

  // Edit inline and delete modal states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<MetodePembayaran | null>(
    null,
  );

  // Sample channel options for dropdown
  const channelOptions = [
    "-- Pilih Channel --",
    "BPRS Amanah Ummah",
    "OVO",
    "Kasir BASK UiKA",
    "Bank Syariah Indonesia",
    "MPN G3",
  ];

  // Generate display data for ListTable
  const generateDisplayData = () => {
    const displayData: MetodePembayaran[] = [];

    // Add parent items
    data
      .filter((item) => item.isParent)
      .forEach((parent) => {
        // Add parent row
        displayData.push(parent);

        // If expanded, add child form if needed
        if (expandedRows[parent.id]) {
          // Add form row if this parent is being edited
          if (addingChildTo === parent.id) {
            displayData.push({
              id: `add-form-${parent.id}`,
              kode: "",
              nama: "",
              jenis: "",
              isDefault: false,
              isParent: false,
              parentId: parent.id,
              isAddForm: true,
            });
          }

          // Add child items
          const children = data.filter((item) => item.parentId === parent.id);
          displayData.push(...children);
        }
      });

    return displayData;
  };

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddChild = (parentId: string) => {
    setAddingChildTo(parentId);
    setSelectedChannel("-- Pilih Channel --");

    // Ensure the parent row is expanded
    if (!expandedRows[parentId]) {
      setExpandedRows((prev) => ({
        ...prev,
        [parentId]: true,
      }));
    }
  };

  const handleSaveChild = () => {
    if (
      selectedChannel &&
      selectedChannel !== "-- Pilih Channel --" &&
      addingChildTo
    ) {
      const newChild: MetodePembayaran = {
        id: Date.now().toString(),
        kode: "",
        nama: selectedChannel,
        jenis: "",
        isDefault: false,
        isParent: false,
        parentId: addingChildTo,
        hasLogo: true,
      };
      setData((prev) => [...prev, newChild]);
    }
    setAddingChildTo(null);
  };

  const handleCancelAddChild = () => {
    setAddingChildTo(null);
  };

  // Inline edit handlers
  const handleSaveEdit = (updatedItem: MetodePembayaran) => {
    setData((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  // Delete modal handlers
  const handleDeleteClick = (item: MetodePembayaran) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      setData((prev) =>
        prev.filter(
          (item) =>
            item.id !== itemToDelete.id && item.parentId !== itemToDelete.id,
        ),
      );
      setItemToDelete(null);
    }
    setIsDeleteModalOpen(false);
  };

  // Define columns for ListTable
  const columns: Column<MetodePembayaran>[] = [
    {
      key: "metodePembayaran",
      header: "Metode Pembayaran",
      width: "50%",
      render: (item) => {
        // If this is the add form row
        if (item.isAddForm) {
          return (
            <div className="pl-6">
              <SearchableDropdown
                options={channelOptions}
                defaultValue="-- Pilih Channel --"
                onChange={setSelectedChannel}
                placeholder="-- Pilih Channel --"
                className="w-full"
              />
            </div>
          );
        }

        // If it's a parent row
        if (item.isParent) {
          return (
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => toggleRow(item.id)}
                className="mr-2 inline-block w-4 h-4 text-gray-600 focus:outline-none cursor-pointer"
              >
                {expandedRows[item.id] ? "▼" : "►"}
              </button>
              <span className="font-medium">
                {item.kode ? `${item.kode} - ` : ""}
                {item.nama}
              </span>
            </div>
          );
        }

        // Child row
        return (
          <div className="pl-6 flex items-center">
            {item.hasLogo && (
              <img
                src={`/logos/logo-${item.nama
                  .replace(/\s+/g, "-")
                  .toLowerCase()}.png`}
                alt={`Logo ${item.nama}`}
                className="h-5 mr-2"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            )}
            <span>{item.nama}</span>
          </div>
        );
      },
    },
    {
      key: "jenis",
      header: "Jenis",
      width: "20%",
    },
    {
      key: "isDefault",
      header: "Default?",
      width: "15%",
      className: "text-center",
      render: (item) => {
        if (item.isAddForm) return null;
        return item.isDefault ? (
          <div className="flex justify-center">
            <span className="text-green-600 font-bold text-lg leading-none">
              ✓
            </span>
          </div>
        ) : null;
      },
    },
    {
      key: "actions",
      header: "Aksi",
      width: "15%",
      className: "text-center",
      render: (item) => {
        // If this is the add form row
        if (item.isAddForm) {
          return (
            <div className="flex justify-center space-x-1">
              <button
                type="button"
                className="p-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white rounded cursor-pointer"
                title="Simpan"
                onClick={handleSaveChild}
              >
                <IoMdSave size={16} />
              </button>
              <button
                type="button"
                className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
                title="Batal"
                onClick={handleCancelAddChild}
              >
                <IoMdClose size={16} />
              </button>
            </div>
          );
        }

        // If it's a parent row
        if (item.isParent) {
          return (
            <div className="flex justify-center space-x-1">
              <button
                type="button"
                className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
                title="Tambah Channel"
                onClick={() => handleAddChild(item.id)}
              >
                <IoMdAdd size={16} />
              </button>
              <button
                type="button"
                className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600 cursor-pointer"
                title="Edit"
                onClick={() => setEditingId(item.id)}
              >
                <IoPencil size={16} />
              </button>
              <button
                type="button"
                className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                title="Hapus"
                onClick={() => handleDeleteClick(item)}
              >
                <IoTrash size={16} />
              </button>
            </div>
          );
        }

        // Child row
        return (
          <div className="flex justify-center space-x-1">
            <button
              type="button"
              className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600 cursor-pointer"
              title="Edit"
              onClick={() => setEditingId(item.id)}
            >
              <IoPencil size={16} />
            </button>
            <button
              type="button"
              className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
              title="Hapus"
              onClick={() => handleDeleteClick(item)}
            >
              <IoTrash size={16} />
            </button>
          </div>
        );
      },
    },
  ];

  // Custom row render for inline edit matching Gambar 1
  const renderCustomRow = (item: MetodePembayaran) => {
    if (editingId === item.id) {
      return (
        <MetodePembayaranSiakadFormRow
          key={item.id}
          initialData={item}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      );
    }
    return undefined;
  };

  // Row styling based on item type
  const getRowClassName = (item: MetodePembayaran) => {
    if (item.isAddForm) return "bg-blue-50";
    if (item.isParent) return "bg-gray-50";
    return "bg-white";
  };

  return (
    <>
      <div className="shadow-md rounded-md overflow-hidden text-xs">
        <ListTable
          data={generateDisplayData()}
          columns={columns}
          rowKey={(item) => item.id}
          headerClassName="text-white"
          rowClassName={getRowClassName}
          customRow={renderCustomRow}
          showFooter={false}
          emptyMessage="Tidak ada data"
          className="min-w-full border-collapse"
        />
      </div>

      {/* Delete Confirmation Modal matching Gambar 2 */}
      <KonfirmasiModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setItemToDelete(null);
          setIsDeleteModalOpen(false);
        }}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi"
        message="Apakah anda yakin akan menghapus data ini?"
        cancelText="Batalkan"
        confirmText="Ya, Yakin"
      />
    </>
  );
};

export default MetodePembayaranSiakadTable;
