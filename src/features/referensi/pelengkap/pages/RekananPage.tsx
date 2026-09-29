import { IoMdSearch, IoMdRefresh, IoMdAdd } from "react-icons/io";
import IconButton from "../../../../components/button/IconButton";
import Dropdown from "../../../../components/inputs/Dropdown";
import TextField from "../../../../components/inputs/TextField";
import { useState } from "react";
import RekananTable from "../components/RekananTable";

export default function RekananPage() {
  document.title = "Rekanan";
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleAddClose = () => {
    setShowAddForm(false);
  };
  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Rekanan</h1>
      </div>

      <div className="container shadow-lg rounded border-t-green-800 border-t-4 px-4 py-4 mt-4">
        <div className="flex flex-col sm:flex-row space-y-2  justify-between mb-4">
          <div className="flex flex-col sm:flex-row space-x-8 ">
            <Dropdown
              options={["-- Semua --", "NIM", "Nama"]}
              className="mr-4 mb-2 sm:mb-0 w-40 sm:w-full text-xs"
            />
            <div className="flex space-x-0.5 items-center">
              <TextField
                placeholder="Cari Rekanan"
                className="w-full sm:w-80"
              />
              <IconButton icon={<IoMdSearch />} variant="success" />
              <IconButton icon={<IoMdRefresh />} variant="info" />
            </div>
          </div>
          <div className="flex space-x-2">
            <IconButton
              icon={<IoMdAdd />}
              responsive={false}
              text="Tambah"
              variant="success"
              className="text-sm"
              onClick={handleAddClick}
              disabled={showAddForm}
            />
          </div>
        </div>

        <div className="mt-4">
          <RekananTable showAddForm={showAddForm} onAddClose={handleAddClose} />
        </div>
      </div>
    </>
  );
}
