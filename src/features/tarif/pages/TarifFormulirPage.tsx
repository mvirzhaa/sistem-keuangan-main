import { IoMdAdd, IoMdCopy, IoMdSearch } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import FilterDataTarifFormulirCard from "../components/FilterDataTarifFormulirCard";
import TarifFormulirTable from "../components/TarifFormulirTable";

export default function TarifFormulirPage() {
  document.title = "Tarif - Formulir Pendaftaran";

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Tarif</h1>
        <p className="text-sm text-gray-500 mb-1">Formulir Pendaftaran</p>
      </div>
      <div>
        <FilterDataTarifFormulirCard />
      </div>

      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        <div className="flex space-x-0.5 items-center justify-end">
          <IconButton icon={<IoMdCopy />} variant="warning" text="Salin Data" />
          <IconButton icon={<IoMdAdd />} variant="success" text="Tambah" />
        </div>

        <div className="mt-4">
          <TarifFormulirTable data={[]} />
        </div>
      </div>
    </>
  );
}
