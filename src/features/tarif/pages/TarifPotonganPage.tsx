import {
  IoMdSearch,
  IoMdRefresh,
  IoMdCloudUpload,
  IoMdClose,
  IoMdAdd,
} from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import FilterDataTarifPotonganCard from "../components/FilterDataTarifPotonganCard";
import TarifPotonganTable from "../components/TarifPotonganTable";
import { useState } from "react";

export default function TarifPotonganPage() {
  document.title = "Tarif - Penerima Potongan";

  const [selectedItems, setSelectedItems] = useState([]);

  // Sample data
  const potonganData = [
    {
      id: "1",
      nim: "221105062581",
      nama: "SITI SALMA NURHOUIS",
      potongan: "Baznas Jawa Barat",
      periodeMulai: "2024 Genap",
      nominal: 1000000,
      isActive: true,
    },
    {
      id: "2",
      nim: "221105080770",
      nama: "SITI KOMARIAH",
      potongan: "Baznas Jawa Barat",
      periodeMulai: "2024 Genap",
      nominal: 1000000,
      isActive: true,
    },
  ];

  const handleEdit = (item: any) => {
    console.log("Edit item:", item);
    // Open edit form or modal
  };

  const handleDelete = (item: any) => {
    console.log("Delete item:", item);
    // Show confirmation modal before deleting
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Tarif</h1>
        <p className="text-sm text-gray-500 mb-1">Penerima Potongan</p>
      </div>

      <div className="mb-4">
        <FilterDataTarifPotonganCard />
      </div>

      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        <div className="flex flex-col sm:flex-row space-y-2  justify-between">
          <div className="flex flex-col sm:flex-row space-x-8 mb-4 ">
            <Dropdown
              options={["-- Semua --", "NIM", "Nama"]}
              className="mr-4 mb-2 sm:mb-0 text-xs"
            />
            <div className="flex space-x-0.5 items-center">
              <TextField
                placeholder="Cari Tarif Potongan"
                className="w-full sm:w-80"
              />
              <IconButton icon={<IoMdSearch />} variant="success" />
              <IconButton icon={<IoMdRefresh />} variant="info" />
            </div>
          </div>
          <div className="flex space-x-2 mb-4 sm:mb-0">
            <IconButton
              icon={<IoMdCloudUpload />}
              responsive={false}
              text="Upload Excel"
              variant="info"
              className="text-sm"
              onClick={() => {
                // navigate(ROUTES.TARIF.DETAIL_TARIF_TAGIHAN);
              }}
            />
            <IconButton
              icon={<IoMdClose />}
              responsive={false}
              text="Nonaktif"
              variant="warning"
              className="text-sm"
              onClick={() => {}}
            />
            <IconButton
              icon={<IoMdAdd />}
              responsive={false}
              text="Tambah"
              variant="success"
              className="text-sm"
              onClick={() => {}}
            />
          </div>
        </div>
        <div className="mb-4">
          <TarifPotonganTable
            data={potonganData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
}
