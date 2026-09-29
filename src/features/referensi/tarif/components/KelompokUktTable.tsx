import React, { useState } from "react";
import { IoPencil, IoTrash } from "react-icons/io5";
import { IoMdSave, IoMdClose } from "react-icons/io";
import ListTable, {
  type Column,
} from "../../../../components/tables/ListTable";
import TextField from "../../../../components/inputs/TextField";

interface KelompokUkt {
  id: string;
  kode: string;
  nama: string;
  kipKuliah: boolean;
  isAddForm?: boolean;
  isEditing?: boolean;
}

interface KelompokUktTableProps {
  showAddForm?: boolean;
  onAddClose?: () => void;
}

const KelompokUktTable: React.FC<KelompokUktTableProps> = ({
  showAddForm = false,
  onAddClose,
}) => {
  // Sample data
  const [kelompokUktData, setKelompokUktData] = useState<KelompokUkt[]>([
    { id: "1", kode: "01", nama: "KIP Kuliah", kipKuliah: true },
    { id: "2", kode: "02", nama: "Kelompok 2", kipKuliah: false },
    { id: "3", kode: "03", nama: "Kelompok 3", kipKuliah: false },
    { id: "4", kode: "04", nama: "Kelompok 4", kipKuliah: false },
    { id: "5", kode: "05", nama: "Kelompok 5", kipKuliah: true },
    { id: "6", kode: "AFUIK", nama: "Afirmasi UIKA Bogor", kipKuliah: false },
    {
      id: "7",
      kode: "AFUK2",
      nama: "Afirmasi UIKA Bogor Skema 2",
      kipKuliah: false,
    },
    { id: "8", kode: "Alumn", nama: "Alumni", kipKuliah: false },
    { id: "9", kode: "KIP", nama: "KIP Kuliah 2024", kipKuliah: true },
    { id: "10", kode: "KRJ", nama: "Kerja Sama", kipKuliah: false },
    { id: "11", kode: "Reg", nama: "Reguler", kipKuliah: false },
  ]);

  // Form data for adding new kelompok UKT
  const [newKelompokUkt, setNewKelompokUkt] = useState<Partial<KelompokUkt>>({
    kode: "",
    nama: "",
    kipKuliah: false,
  });

  // For editing existing rows
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<KelompokUkt>>({});

  // Handle input changes for new kelompok UKT
  const handleNewInputChange = (field: keyof KelompokUkt, value: any) => {
    setNewKelompokUkt((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle input changes for editing kelompok UKT
  const handleEditInputChange = (field: keyof KelompokUkt, value: any) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle save for new kelompok UKT
  const handleSaveNew = () => {
    if (newKelompokUkt.kode && newKelompokUkt.nama) {
      // Add new kelompok UKT
      setKelompokUktData((prev) => [
        ...prev,
        {
          id: `${prev.length + 1}`,
          kode: newKelompokUkt.kode || "",
          nama: newKelompokUkt.nama || "",
          kipKuliah: newKelompokUkt.kipKuliah || false,
        },
      ]);

      // Reset form
      setNewKelompokUkt({
        kode: "",
        nama: "",
        kipKuliah: false,
      });

      // Close form
      if (onAddClose) onAddClose();
    }
  };

  // Handle cancel for new kelompok UKT
  const handleCancelNew = () => {
    setNewKelompokUkt({
      kode: "",
      nama: "",
      kipKuliah: false,
    });

    if (onAddClose) onAddClose();
  };

  // Start editing a row
  const handleStartEdit = (item: KelompokUkt) => {
    setEditingRowId(item.id);
    setEditFormData({
      kode: item.kode,
      nama: item.nama,
      kipKuliah: item.kipKuliah,
    });
  };

  // Save edited data
  const handleSaveEdit = () => {
    if (editingRowId) {
      setKelompokUktData((prev) =>
        prev.map((item) =>
          item.id === editingRowId
            ? {
                ...item,
                kode: editFormData.kode || item.kode,
                nama: editFormData.nama || item.nama,
                kipKuliah:
                  editFormData.kipKuliah !== undefined
                    ? editFormData.kipKuliah
                    : item.kipKuliah,
              }
            : item,
        ),
      );
      setEditingRowId(null);
      setEditFormData({});
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingRowId(null);
    setEditFormData({});
  };

  // Prepare data for ListTable
  const tableData = React.useMemo(() => {
    if (!showAddForm) return kelompokUktData;

    // Add a virtual "form" row at the top
    return [
      {
        id: "add-form",
        kode: "",
        nama: "",
        kipKuliah: false,
        isAddForm: true,
      } as KelompokUkt,
      ...kelompokUktData,
    ];
  }, [kelompokUktData, showAddForm]);

  // Define columns for ListTable
  const columns: Column<KelompokUkt>[] = [
    {
      key: "kode",
      header: "Kode",
      width: "25%",
      render: (item) => {
        if (item.isAddForm) {
          return (
            <TextField
              value={newKelompokUkt.kode || ""}
              onChange={(e) => handleNewInputChange("kode", e)}
              placeholder="Kode"
              className="w-full text-xs"
            />
          );
        }

        if (item.id === editingRowId) {
          return (
            <TextField
              value={editFormData.kode || ""}
              onChange={(e) => handleEditInputChange("kode", e)}
              className="w-full text-xs"
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
        if (item.isAddForm) {
          return (
            <TextField
              value={newKelompokUkt.nama || ""}
              onChange={(e) => handleNewInputChange("nama", e)}
              placeholder="Nama"
              className="w-full text-xs"
            />
          );
        }

        if (item.id === editingRowId) {
          return (
            <TextField
              value={editFormData.nama || ""}
              onChange={(e) => handleEditInputChange("nama", e)}
              className="w-full text-xs"
            />
          );
        }

        return item.nama;
      },
    },
    {
      key: "kipKuliah",
      header: "KIP Kuliah?",
      width: "15%",
      className: "text-center",
      render: (item) => {
        if (item.isAddForm) {
          return (
            <div className="flex justify-center">
              <input
                type="checkbox"
                checked={newKelompokUkt.kipKuliah || false}
                onChange={(e) =>
                  handleNewInputChange("kipKuliah", e.target.checked)
                }
                className="h-5 w-5 text-green-600 border-gray-300 rounded"
              />
            </div>
          );
        }

        if (item.id === editingRowId) {
          return (
            <div className="flex justify-center">
              <input
                type="checkbox"
                checked={editFormData.kipKuliah || false}
                onChange={(e) =>
                  handleEditInputChange("kipKuliah", e.target.checked)
                }
                className="h-5 w-5 text-green-600 border-gray-300 rounded"
              />
            </div>
          );
        }

        return item.kipKuliah ? (
          <span className="text-green-600 text-xl">✓</span>
        ) : (
          <span className="text-red-600 text-xl">✕</span>
        );
      },
    },
    {
      key: "aksi",
      header: "Aksi",
      width: "20%",
      className: "text-center",
      render: (item) => {
        if (item.isAddForm) {
          return (
            <div className="flex justify-center space-x-1">
              <button
                className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600"
                title="Simpan"
                onClick={handleSaveNew}
              >
                <IoMdSave size={16} />
              </button>
              <button
                className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600"
                title="Batal"
                onClick={handleCancelNew}
              >
                <IoMdClose size={16} />
              </button>
            </div>
          );
        }

        if (item.id === editingRowId) {
          return (
            <div className="flex justify-center space-x-1">
              <button
                className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600"
                title="Simpan"
                onClick={handleSaveEdit}
              >
                <IoMdSave size={16} />
              </button>
              <button
                className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600"
                title="Batal"
                onClick={handleCancelEdit}
              >
                <IoMdClose size={16} />
              </button>
            </div>
          );
        }

        return (
          <div className="flex justify-center space-x-1 ">
            <button
              className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600"
              title="Edit"
              onClick={() => handleStartEdit(item)}
            >
              <IoPencil size={16} />
            </button>
            <button
              className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
              title="Hapus"
              onClick={() => {
                // Add delete logic here
                if (
                  window.confirm("Apakah Anda yakin ingin menghapus data ini?")
                ) {
                  setKelompokUktData((prev) =>
                    prev.filter((i) => i.id !== item.id),
                  );
                }
              }}
            >
              <IoTrash size={16} />
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
        headerClassName="bg-blue-900 text-white"
        rowClassName={(item) => {
          if (item.isAddForm) return "bg-blue-50";
          if (item.id === editingRowId) return "bg-yellow-50";
          return "";
        }}
        showFooter={true}
        emptyMessage="Tidak ada data kelompok UKT"
      />
    </div>
  );
};

export default KelompokUktTable;
