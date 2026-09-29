import React, { useState } from "react";
import { IoPencil, IoTrash } from "react-icons/io5";
import { IoMdSave, IoMdClose } from "react-icons/io";
import ListTable, {
  type Column,
} from "../../../../components/tables/ListTable";
import TextField from "../../../../components/inputs/TextField";
import Dropdown from "../../../../components/inputs/Dropdown";

interface AturanVoucher {
  id: string;
  jenisAkun: string;
  maksimalNominal: number;
  isAddForm?: boolean;
  isEditing?: boolean;
}

interface AturanVoucherTableProps {
  showAddForm?: boolean;
  onAddClose?: () => void;
}

const AturanVoucherTable: React.FC<AturanVoucherTableProps> = ({
  showAddForm = false,
  onAddClose,
}) => {
  // Sample data
  const [aturanVoucherData, setAturanVoucherData] = useState<AturanVoucher[]>([
    { id: "1", jenisAkun: "Formulir", maksimalNominal: 300000.0 },
  ]);

  // Form data for adding new aturan voucher
  const [newAturanVoucher, setNewAturanVoucher] = useState<
    Partial<AturanVoucher>
  >({
    jenisAkun: "",
    maksimalNominal: 0,
  });

  // For editing existing rows
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<AturanVoucher>>({});

  // Sample options for jenis akun dropdown
  const jenisAkunOptions = [
    "Formulir",
    "SPP",
    "SKS",
    "Ujian Akhir Semester",
    "Uang Gedung",
    "UKT",
    "Registrasi Ulang",
  ];

  // Handle input changes for new aturan voucher
  const handleNewInputChange = (field: keyof AturanVoucher, value: any) => {
    setNewAturanVoucher((prev) => ({
      ...prev,
      [field]: field === "maksimalNominal" ? parseFloat(value) : value,
    }));
  };

  // Handle input changes for editing aturan voucher
  const handleEditInputChange = (field: keyof AturanVoucher, value: any) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: field === "maksimalNominal" ? parseFloat(value) : value,
    }));
  };

  // Format currency
  const formatCurrency = (value: number): string => {
    return value.toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Handle save for new aturan voucher
  const handleSaveNew = () => {
    if (newAturanVoucher.jenisAkun) {
      // Add new aturan voucher
      setAturanVoucherData((prev) => [
        ...prev,
        {
          id: `${Date.now()}`,
          jenisAkun: newAturanVoucher.jenisAkun || "",
          maksimalNominal: newAturanVoucher.maksimalNominal || 0,
        },
      ]);

      // Reset form
      setNewAturanVoucher({
        jenisAkun: "",
        maksimalNominal: 0,
      });

      // Close form
      if (onAddClose) onAddClose();
    }
  };

  // Handle cancel for new aturan voucher
  const handleCancelNew = () => {
    setNewAturanVoucher({
      jenisAkun: "",
      maksimalNominal: 0,
    });

    if (onAddClose) onAddClose();
  };

  // Start editing a row
  const handleStartEdit = (item: AturanVoucher) => {
    setEditingRowId(item.id);
    setEditFormData({
      jenisAkun: item.jenisAkun,
      maksimalNominal: item.maksimalNominal,
    });
  };

  // Save edited data
  const handleSaveEdit = () => {
    if (editingRowId) {
      setAturanVoucherData((prev) =>
        prev.map((item) =>
          item.id === editingRowId
            ? {
                ...item,
                jenisAkun: editFormData.jenisAkun || item.jenisAkun,
                maksimalNominal:
                  editFormData.maksimalNominal !== undefined
                    ? editFormData.maksimalNominal
                    : item.maksimalNominal,
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
      setAturanVoucherData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Prepare data for ListTable
  const tableData = React.useMemo(() => {
    if (!showAddForm) return aturanVoucherData;

    // Add a virtual "form" row at the top
    return [
      {
        id: "add-form",
        jenisAkun: "",
        maksimalNominal: 0,
        isAddForm: true,
      } as AturanVoucher,
      ...aturanVoucherData,
    ];
  }, [aturanVoucherData, showAddForm]);

  // Define columns for ListTable
  const columns: Column<AturanVoucher>[] = [
    {
      key: "jenisAkun",
      header: "Jenis Akun",
      width: "40%",
      render: (item) => {
        if (item.isAddForm) {
          return (
            <Dropdown
              options={jenisAkunOptions}
              defaultValue={newAturanVoucher.jenisAkun || ""}
              onChange={(value) => handleNewInputChange("jenisAkun", value)}
              placeholder="Pilih jenis akun"
              className="w-full text-xs"
            />
          );
        }

        if (item.id === editingRowId) {
          return (
            <Dropdown
              options={jenisAkunOptions}
              defaultValue={editFormData.jenisAkun || ""}
              onChange={(value) => handleEditInputChange("jenisAkun", value)}
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
      width: "45%",
      className: "text-right",
      render: (item) => {
        if (item.isAddForm) {
          return (
            <TextField
              value={newAturanVoucher.maksimalNominal?.toString() || "0"}
              onChange={(e) => handleNewInputChange("maksimalNominal", e)}
              placeholder="0"
              className="w-full text-xs text-right"
            />
          );
        }

        if (item.id === editingRowId) {
          return (
            <TextField
              value={editFormData.maksimalNominal?.toString() || "0"}
              onChange={(e) => handleEditInputChange("maksimalNominal", e)}
              className="w-full text-xs text-right"
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
        showFooter={false}
        emptyMessage="Tidak ada data aturan voucher"
      />
    </div>
  );
};

export default AturanVoucherTable;
