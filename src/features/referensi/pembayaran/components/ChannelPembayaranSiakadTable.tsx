import React, { useState } from "react";
import ListTable, {
  type Column,
} from "../../../../components/tables/ListTable";
import TextField from "../../../../components/inputs/TextField";
import { IoMdCheckmark, IoMdClose, IoMdSave } from "react-icons/io";
import { IoPencil, IoTrash } from "react-icons/io5";

interface ChannelPembayaranSiakad {
  id: string;
  kode: string;
  nama: string;
  logo: string;
  aktif: boolean;
}

interface ChannelPembayaranSiakadTableProps {
  onAddClick?: () => void;
  showAddForm?: boolean;
}

const ChannelPembayaranSiakadTable: React.FC<ChannelPembayaranSiakadTableProps> = ({
  onAddClick,
  showAddForm: externalShowAddForm,
}) => {
  const [internalShowAddForm, setInternalShowAddForm] = useState(false);
  const showAddForm =
    externalShowAddForm !== undefined
      ? externalShowAddForm
      : internalShowAddForm;

  const [newChannel, setNewChannel] = useState<
    Partial<ChannelPembayaranSiakad>
  >({
    kode: "",
    nama: "",
    logo: "",
    aktif: true,
  });

  // Sample data from the image
  const channelData: ChannelPembayaranSiakad[] = [
    {
      id: "1",
      kode: "01",
      nama: "Bank Syariah Indonesia",
      logo: "bank_BSI.png",
      aktif: true,
    },
    {
      id: "2",
      kode: "02",
      nama: "BPRS Amanah Ummah",
      logo: "bank_amanah Ummah",
      aktif: true,
    },
    {
      id: "3",
      kode: "03",
      nama: "Tokopedia",
      logo: "bank_tokped.png",
      aktif: true,
    },
    {
      id: "4",
      kode: "ACH",
      nama: "Bank Aceh",
      logo: "bank_aceh.png",
      aktif: false,
    },
    {
      id: "5",
      kode: "BCA",
      nama: "Bank Central Asia",
      logo: "bank_bca.png",
      aktif: false,
    },
    {
      id: "6",
      kode: "BTS",
      nama: "BTN Syariah",
      logo: "bank_btnsyariah.png",
      aktif: false,
    },
    {
      id: "7",
      kode: "KSR",
      nama: "Kasir BASK UiKA",
      logo: "bank_Bask",
      aktif: true,
    },
    {
      id: "8",
      kode: "MUA",
      nama: "Bank Muamalat",
      logo: "bank_muamalat.png",
      aktif: true,
    },
    {
      id: "9",
      kode: "NAG",
      nama: "Bank Nagari",
      logo: "bank_nagari.png",
      aktif: false,
    },
    { id: "10", kode: "OVO", nama: "OVO", logo: "bank_OVO", aktif: true },
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setNewChannel((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving new channel:", newChannel);
    setNewChannel({
      kode: "",
      nama: "",
      logo: "",
      aktif: true,
    });
    setInternalShowAddForm(false);
    if (onAddClick) onAddClick();
  };

  const handleCancel = () => {
    setNewChannel({
      kode: "",
      nama: "",
      logo: "",
      aktif: true,
    });
    setInternalShowAddForm(false);
    if (onAddClick) onAddClick();
  };

  // Custom header renderer with an input form in the first row
  const renderTableWithAddForm = () => {
    return (
      <table className="min-w-full border-collapse">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="py-2 px-3 text-left border border-slate-300 w-[15%]">
              Kode
            </th>
            <th className="py-2 px-3 text-left border border-slate-300 w-[35%]">
              Nama Channel Pembayaran Siakad
            </th>
            <th className="py-2 px-3 text-left border border-slate-300 w-[30%]">
              Logo
            </th>
            <th className="py-2 px-3 text-center border border-slate-300 w-[10%]">
              Aktif
            </th>
            <th className="py-2 px-3 text-center border border-slate-300 w-[10%]">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Add Form Row */}
          {showAddForm && (
            <tr className="border-b bg-gray-50">
              <td className="p-2 border border-slate-300">
                <input
                  type="text"
                  value={newChannel.kode || ""}
                  onChange={(e) => handleInputChange("kode", e.target.value)}
                  placeholder="Kode"
                  className="w-full p-1.5 border rounded"
                />
              </td>
              <td className="p-2 border border-slate-300">
                <input
                  type="text"
                  value={newChannel.nama || ""}
                  onChange={(e) => handleInputChange("nama", e.target.value)}
                  placeholder="Nama Channel"
                  className="w-full p-1.5 border rounded"
                />
              </td>
              <td className="p-2 border border-slate-300">
                <input
                  type="text"
                  value={newChannel.logo || ""}
                  onChange={(e) => handleInputChange("logo", e.target.value)}
                  placeholder="Logo"
                  className="w-full p-1.5 border rounded"
                />
              </td>
              <td className="p-2 border border-slate-300 text-center">
                <input
                  type="checkbox"
                  checked={newChannel.aktif || false}
                  onChange={(e) => handleInputChange("aktif", e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </td>
              <td className="p-2 border border-slate-300">
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
              </td>
            </tr>
          )}

          {/* Data Rows */}
          {channelData.map((item, index) => (
            <tr
              key={item.id}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="p-2 border border-slate-300">{item.kode}</td>
              <td className="p-2 border border-slate-300">{item.nama}</td>
              <td className="p-2 border border-slate-300">{item.logo}</td>
              <td className="p-2 border border-slate-300 text-center">
                {item.aktif ? (
                  <span className="text-green-600 text-xl">✓</span>
                ) : (
                  <span className="text-red-600 text-xl">✗</span>
                )}
              </td>
              <td className="p-2 border border-slate-300">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="shadow-md rounded-md overflow-hidden text-xs">
      {renderTableWithAddForm()}
    </div>
  );
};

export default ChannelPembayaranSiakadTable;
