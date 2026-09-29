import { IoMdSearch, IoMdRefresh } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import FilterDataTarifMataKuliahCard from "../components/FIlterDataTarifMataKuliahCard";
import TarifMataKuliahTable from "../components/TarifMataKuliahTable";

export default function TarifMataKuliahPage() {
  document.title = "Tarif -  Mata Kuliah";

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Tarif</h1>
        <p className="text-sm text-gray-500 mb-1">Mata Kuliah</p>
      </div>
      <div>
        <FilterDataTarifMataKuliahCard />
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        <div className="flex flex-col sm:flex-row space-x-8 mb-4 ">
          <Dropdown
            options={["-- Semua --", "NIM", "Nama"]}
            className="mr-4 mb-2 sm:mb-0 text-xs"
          />
          <div className="flex space-x-0.5 items-center">
            <TextField placeholder="Cari Tarif" className="w-full sm:w-80" />
            <IconButton icon={<IoMdSearch />} variant="success" />
            <IconButton icon={<IoMdRefresh />} variant="info" />
          </div>
        </div>
        <div className="mb-4">
          <TarifMataKuliahTable data={[]} />
        </div>
      </div>
    </>
  );
}
