import React, { useState } from "react";
import { IoPencil, IoTrash } from "react-icons/io5";
import { IoMdSave, IoMdClose } from "react-icons/io";
import ListTable, {
  type Column,
} from "../../../../components/tables/ListTable";
import Dropdown from "../../../../components/inputs/Dropdown";
import TextField from "../../../../components/inputs/TextField";

interface PromoEdufin {
  id: string;
  no: number;
  channel: string;
  namaPromo: string;
  deskripsi: string;
  tglMulai: string;
  tglSelesai: string;
  aktif: boolean;
  isAddForm?: boolean;
}

interface PromoEdufinTableProps {
  onAddClick?: () => void;
  showAddForm?: boolean;
}

const PromoEdufinTable: React.FC<PromoEdufinTableProps> = ({
  onAddClick,
  showAddForm: externalShowAddForm,
}) => {
  const [internalShowAddForm, setInternalShowAddForm] = useState(false);
  const showAddForm =
    externalShowAddForm !== undefined
      ? externalShowAddForm
      : internalShowAddForm;

  const [newPromo, setNewPromo] = useState<Partial<PromoEdufin>>({
    channel: "-- Semua Channel --",
    namaPromo: "",
    deskripsi: "",
    tglMulai: "",
    tglSelesai: "",
    aktif: true,
  });

  // Sample data
  const [promoEdufinData, setPromoEdufinData] = useState<PromoEdufin[]>([
    {
      id: "1",
      no: 1,
      channel: "Tokopedia",
      namaPromo: "TOPEDSEVIMA",
      deskripsi: `Hai Mahasiswa Pengguna Siakad 👋
Sekarang channel pembayaran Tokopedia sedang ada promo loh!
Yukk segera melakukan pembayaran melalui Tokopedia.
Untuk syarat & ketentuan bisa di klik pada link berikut ya:
http://sevi.ma/TOPED9SK

Selamat mencoba!!`,
      tglMulai: "1 Sep 2024",
      tglSelesai: "30 Sep 2024",
      aktif: true,
    },
  ]);

  // Channel options
  const channelOptions = [
    "-- Semua Channel --",
    "Tokopedia",
    "OVO",
    "BPRS Amanah Ummah",
    "Bank Syariah Indonesia",
  ];

  const handleInputChange = (field: keyof PromoEdufin, value: any) => {
    setNewPromo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving new promo:", newPromo);
    // Add the new promo to your data array
    if (newPromo.channel && newPromo.namaPromo) {
      setPromoEdufinData((prev) => [
        ...prev,
        {
          id: `${prev.length + 1}`,
          no: prev.length + 1,
          channel:
            newPromo.channel === "-- Semua Channel --"
              ? ""
              : newPromo.channel || "",
          namaPromo: newPromo.namaPromo || "",
          deskripsi: newPromo.deskripsi || "",
          tglMulai: newPromo.tglMulai || "",
          tglSelesai: newPromo.tglSelesai || "",
          aktif: newPromo.aktif || false,
        },
      ]);
    }

    // Reset form
    setNewPromo({
      channel: "-- Semua Channel --",
      namaPromo: "",
      deskripsi: "",
      tglMulai: "",
      tglSelesai: "",
      aktif: true,
    });

    setInternalShowAddForm(false);
    if (onAddClick) onAddClick();
  };

  const handleCancel = () => {
    setNewPromo({
      channel: "-- Semua Channel --",
      namaPromo: "",
      deskripsi: "",
      tglMulai: "",
      tglSelesai: "",
      aktif: true,
    });
    setInternalShowAddForm(false);
    if (onAddClick) onAddClick();
  };

  // Prepare data for ListTable
  const tableData = React.useMemo(() => {
    if (!showAddForm) return promoEdufinData;

    // Add a virtual "form" row at the top
    return [
      {
        id: "add-form",
        no: promoEdufinData.length + 1,
        channel: "",
        namaPromo: "",
        deskripsi: "",
        tglMulai: "",
        tglSelesai: "",
        aktif: false,
        isAddForm: true,
      } as PromoEdufin,
      ...promoEdufinData,
    ];
  }, [promoEdufinData, showAddForm]);

  // Define columns for ListTable
  const columns: Column<PromoEdufin>[] = [
    {
      key: "no",
      header: "No",
      width: "5%",
      render: (item) => {
        return item.isAddForm ? promoEdufinData.length + 1 : item.no;
      },
    },
    {
      key: "channel",
      header: "Channel",
      width: "15%",
      render: (item) => {
        if (item.isAddForm) {
          return (
            <Dropdown
              options={channelOptions}
              defaultValue={newPromo.channel}
              onChange={(value) => handleInputChange("channel", value)}
              className="w-full text-xs"
            />
          );
        }
        return item.channel;
      },
    },
    {
      key: "namaPromo",
      header: "Nama Promo",
      width: "15%",
      render: (item) => {
        if (item.isAddForm) {
          return (
            <TextField
              value={newPromo.namaPromo || ""}
              onChange={(e) => handleInputChange("namaPromo", e)}
              placeholder="Nama Promo"
              className="w-full text-xs"
            />
          );
        }
        return item.namaPromo;
      },
    },
    {
      key: "deskripsi",
      header: "Deskripsi",
      width: "30%",
      render: (item) => {
        if (item.isAddForm) {
          return (
            <textarea
              value={newPromo.deskripsi || ""}
              onChange={(e) => handleInputChange("deskripsi", e.target.value)}
              placeholder="Deskripsi promo"
              className="w-full h-24 p-2 border rounded text-xs"
            />
          );
        }
        return <div className="whitespace-pre-line">{item.deskripsi}</div>;
      },
    },
    {
      key: "tglMulai",
      header: "Tgl. Mulai",
      width: "10%",
      render: (item) => {
        if (item.isAddForm) {
          return (
            <TextField
              type="date"
              value={newPromo.tglMulai || ""}
              onChange={(e) => handleInputChange("tglMulai", e)}
              placeholder="dd-mm-yy"
              className="w-full text-xs"
            />
          );
        }
        return item.tglMulai;
      },
    },
    {
      key: "tglSelesai",
      header: "Tgl. Selesai",
      width: "10%",
      render: (item) => {
        if (item.isAddForm) {
          return (
            <TextField
              type="date"
              value={newPromo.tglSelesai || ""}
              onChange={(e) => handleInputChange("tglSelesai", e)}
              placeholder="dd-mm-yy"
              className="w-full text-xs"
            />
          );
        }
        return item.tglSelesai;
      },
    },
    {
      key: "aktif",
      header: "Aktif",
      width: "5%",
      className: "text-center",
      render: (item) => {
        if (item.isAddForm) {
          return (
            <div className="flex justify-center">
              <input
                type="checkbox"
                checked={newPromo.aktif || false}
                onChange={(e) => handleInputChange("aktif", e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>
          );
        }
        return item.aktif ? (
          <span className="text-green-600 text-xl">✓</span>
        ) : null;
      },
    },
    {
      key: "aksi",
      header: "Aksi",
      width: "10%",
      className: "text-center",
      render: (item) => {
        if (item.isAddForm) {
          return (
            <div className="flex justify-center space-x-1">
              <button
                className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600"
                title="Simpan"
                onClick={handleSave}
              >
                <IoMdSave size={16} />
              </button>
              <button
                className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                title="Batal"
                onClick={handleCancel}
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
        );
      },
    },
  ];

  return (
    <div className="shadow-md rounded-md overflow-hidden text-xs">
      <ListTable
        data={tableData}
        columns={columns}
        rowKey={(item) => item.id}
        headerClassName="bg-blue-900 text-white"
        rowClassName={(item) => (item.isAddForm ? "bg-blue-50" : "")}
        showFooter={true}
        emptyMessage="Tidak ada data promo"
        className="min-w-full border-collapse"
      />
    </div>
  );
};

export default PromoEdufinTable;
