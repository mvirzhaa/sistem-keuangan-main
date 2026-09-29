import { IoMdAdd } from "react-icons/io";
import IconButton from "../../../../components/button/IconButton";
import FilterDataAturanPotonganCard from "../components/FilterDataAturanPotonganCard";
import { useState } from "react";
import AturanPotonganTable from "../components/AturanPotonganTable";

export default function AturanPotongaPage() {
  document.title = "Aturan Potongan";

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
        <h1 className="text-2xl font-medium">Aturan Potongan</h1>
      </div>
      <div>
        <FilterDataAturanPotonganCard />
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 px-4 py-4 sm:px-40 mt-4">
        <div className="flex justify-end mb-4">
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
        <div>
          <AturanPotonganTable
            showAddForm={showAddForm}
            onAddClose={handleAddClose}
          />
        </div>
      </div>
    </>
  );
}
