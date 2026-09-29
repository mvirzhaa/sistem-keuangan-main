import { IoMdSearch, IoMdRefresh, IoMdAdd } from "react-icons/io";
import IconButton from "../../../../components/button/IconButton";
import Dropdown from "../../../../components/inputs/Dropdown";
import TextField from "../../../../components/inputs/TextField";
import FilterDataPromoEdufinCard from "../components/FilterDataPromoEdufinCard";
import PromoEdufinTable from "../components/PromoEdufinTable";
import { useState } from "react";

export default function PromoEdufinPage() {
  document.title = "Promo Edufin";
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleAddFormClose = () => {
    setShowAddForm(false);
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Promo Edufin</h1>
      </div>
      <div>
        <FilterDataPromoEdufinCard />
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        <div className="flex flex-col sm:flex-row space-y-2  justify-between mb-4">
          <div className="flex flex-col sm:flex-row space-x-8 ">
            <Dropdown
              options={["-- Semua --", "NIM", "Nama"]}
              className="mr-4 mb-2 sm:mb-0 w-40 sm:w-full text-xs"
            />
            <div className="flex space-x-0.5 items-center">
              <TextField
                placeholder="Cari Promo Edufin"
                className="w-full sm:w-80"
              />
              <IconButton icon={<IoMdSearch />} variant="success" />
              <IconButton icon={<IoMdRefresh />} variant="info" />
            </div>
          </div>
          <div className="flex space-x-2">
            <IconButton
              icon={<IoMdRefresh />}
              responsive={false}
              text="Sync Promo Edufin"
              variant="info"
              className="text-sm"
              onClick={() => {
                // navigate(ROUTES.TARIF.DETAIL_TARIF_TAGIHAN);
              }}
            />
            <IconButton
              icon={<IoMdAdd />}
              responsive={false}
              text="Tambah"
              variant="success"
              className="text-sm"
              onClick={() => {
                handleAddClick();
              }}
            />
          </div>
        </div>
        <div>
          <PromoEdufinTable
            showAddForm={showAddForm}
            onAddClick={handleAddFormClose}
          />
        </div>
      </div>
    </>
  );
}
