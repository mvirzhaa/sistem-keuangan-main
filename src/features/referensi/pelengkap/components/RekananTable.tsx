import React, { useState } from "react";
import { IoPencil, IoTrash } from "react-icons/io5";
import { IoMdSave, IoMdClose } from "react-icons/io";
import ListTable, {
  type Column,
} from "../../../../components/tables/ListTable";
import TextField from "../../../../components/inputs/TextField";

interface Rekanan {
  id: string;
  no: number;
  nama: string;
  kota: string;
  telepon: string;
  alamatEmail: string;
  isAddForm?: boolean;
  isEditing?: boolean;
}

interface RekananTableProps {
  showAddForm?: boolean;
  onAddClose?: () => void;
}

const RekananTable: React.FC<RekananTableProps> = ({
  showAddForm = false,
  onAddClose,
}) => {
  // Sample data
  const [rekananData, setRekananData] = useState<Rekanan[]>([
    {
      id: "1",
      no: 1,
      nama: "Baznas Jawa Barat",
      kota: "Jawa Barat",
      telepon: "",
      alamatEmail: "",
    },
    {
      id: "2",
      no: 2,
      nama: "Baznas Pusat",
      kota: "Pusat",
      telepon: "",
      alamatEmail: "",
    },
    {
      id: "3",
      no: 3,
      nama: "Fakultas Ekonomi dan Bisnis",
      kota: "Kota Bogor",
      telepon: "",
      alamatEmail: "",
    },
    {
      id: "4",
      no: 4,
      nama: "PUSLAPDIK",
      kota: "D.K.I Jakarta",
      telepon: "",
      alamatEmail: "",
    },
    {
      id: "5",
      no: 5,
      nama: "Pancakarsa",
      kota: "Kabupaten Bogor",
      telepon: "",
      alamatEmail: "",
    },
    {
      id: "6",
      no: 6,
      nama: "Pemerintah Kota Bogor",
      kota: "Kota Bogor",
      telepon: "",
      alamatEmail: "",
    },
    {
      id: "7",
      no: 7,
      nama: "UPZ",
      kota: "D.K.I Jakarta",
      telepon: "",
      alamatEmail: "",
    },
    {
      id: "8",
      no: 8,
      nama: "Universitas Ibn Khaldun",
      kota: "Kota Bogor",
      telepon: "",
      alamatEmail: "",
    },
  ]);

  // Form data for adding new rekanan
  const [newRekanan, setNewRekanan] = useState<Partial<Rekanan>>({
    nama: "",
    kota: "",
    telepon: "",
    alamatEmail: "",
  });

  // For editing existing rows
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Rekanan>>({});

  // Handle input changes for new rekanan
  const handleNewInputChange = (field: keyof Rekanan, value: string) => {
    setNewRekanan((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle input changes for editing rekanan
  const handleEditInputChange = (field: keyof Rekanan, value: string) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle save for new rekanan
  const handleSaveNew = () => {
    if (newRekanan.nama && newRekanan.kota) {
      const nextNo =
        rekananData.length > 0
          ? Math.max(...rekananData.map((item) => item.no)) + 1
          : 1;

      // Add new rekanan
      setRekananData((prev) => [
        ...prev,
        {
          id: `${Date.now()}`,
          no: nextNo,
          nama: newRekanan.nama || "",
          kota: newRekanan.kota || "",
          telepon: newRekanan.telepon || "",
          alamatEmail: newRekanan.alamatEmail || "",
        },
      ]);

      // Reset form
      setNewRekanan({
        nama: "",
        kota: "",
        telepon: "",
        alamatEmail: "",
      });

      // Close form
      if (onAddClose) onAddClose();
    }
  };

  // Handle cancel for new rekanan
  const handleCancelNew = () => {
    setNewRekanan({
      nama: "",
      kota: "",
      telepon: "",
      alamatEmail: "",
    });

    if (onAddClose) onAddClose();
  };

  // Start editing a row
  const handleStartEdit = (item: Rekanan) => {
    setEditingRowId(item.id);
    setEditFormData({
      nama: item.nama,
      kota: item.kota,
      telepon: item.telepon,
      alamatEmail: item.alamatEmail,
    });
  };

  // Save edited data
  const handleSaveEdit = () => {
    if (editingRowId) {
      setRekananData((prev) =>
        prev.map((item) =>
          item.id === editingRowId
            ? {
                ...item,
                nama: editFormData.nama || item.nama,
                kota: editFormData.kota || item.kota,
                telepon: editFormData.telepon || item.telepon,
                alamatEmail: editFormData.alamatEmail || item.alamatEmail,
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

  // Handle delete
  const handleDelete = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setRekananData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Prepare data for ListTable
  const tableData = React.useMemo(() => {
    if (!showAddForm) return rekananData;

    // Add a virtual "form" row at the top
    return [
      {
        id: "add-form",
        no: 0,
        nama: "",
        kota: "",
        telepon: "",
        alamatEmail: "",
        isAddForm: true,
      } as Rekanan,
      ...rekananData,
    ];
  }, [rekananData, showAddForm]);

  // Define columns for ListTable
  const columns: Column<Rekanan>[] = [
    {
      key: "no",
      header: "No",
      width: "5%",
      className: "text-center",
      render: (item) => {
        if (item.isAddForm) return "";
        return item.no;
      },
    },
    {
      key: "nama",
      header: "Nama",
      width: "25%",
      render: (item) => {
        if (item.isAddForm) {
          return (
            <TextField
              value={newRekanan.nama || ""}
              onChange={(e) => handleNewInputChange("nama", e)}
              placeholder="Nama Rekanan"
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
      key: "kota",
      header: "Kota",
      width: "20%",
      render: (item) => {
        if (item.isAddForm) {
          return (
            <TextField
              value={newRekanan.kota || ""}
              onChange={(e) => handleNewInputChange("kota", e)}
              placeholder="Kota"
              className="w-full text-xs"
            />
          );
        }

        if (item.id === editingRowId) {
          return (
            <TextField
              value={editFormData.kota || ""}
              onChange={(e) => handleEditInputChange("kota", e)}
              className="w-full text-xs"
            />
          );
        }

        return item.kota;
      },
    },
    {
      key: "telepon",
      header: "Telepon",
      width: "15%",
      render: (item) => {
        if (item.isAddForm) {
          return (
            <TextField
              value={newRekanan.telepon || ""}
              onChange={(e) => handleNewInputChange("telepon", e)}
              placeholder="Nomor Telepon"
              className="w-full text-xs"
            />
          );
        }

        if (item.id === editingRowId) {
          return (
            <TextField
              value={editFormData.telepon || ""}
              onChange={(e) => handleEditInputChange("telepon", e)}
              className="w-full text-xs"
            />
          );
        }

        return item.telepon;
      },
    },
    {
      key: "alamatEmail",
      header: "Alamat Email",
      width: "20%",
      render: (item) => {
        if (item.isAddForm) {
          return (
            <TextField
              value={newRekanan.alamatEmail || ""}
              onChange={(e) => handleNewInputChange("alamatEmail", e)}
              placeholder="Email"
              className="w-full text-xs"
            />
          );
        }

        if (item.id === editingRowId) {
          return (
            <TextField
              value={editFormData.alamatEmail || ""}
              onChange={(e) => handleEditInputChange("alamatEmail", e)}
              className="w-full text-xs"
            />
          );
        }

        return item.alamatEmail;
      },
    },
    {
      key: "aksi",
      header: "Aksi",
      width: "15%",
      className: "text-center",
      render: (item) => {
        if (item.isAddForm) {
          return (
            <div className="flex justify-center space-x-1">
              <button
                className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600"
                title="Simpan"
                onClick={handleSaveNew}
              >
                <IoMdSave size={16} />
              </button>
              <button
                className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
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
                className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600"
                title="Simpan"
                onClick={handleSaveEdit}
              >
                <IoMdSave size={16} />
              </button>
              <button
                className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                title="Batal"
                onClick={handleCancelEdit}
              >
                <IoMdClose size={16} />
              </button>
            </div>
          );
        }

        return (
          <div className="flex justify-center space-x-1">
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
              onClick={() => handleDelete(item.id)}
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
        emptyMessage="Tidak ada data rekanan"
      />
    </div>
  );
};

export default RekananTable;
