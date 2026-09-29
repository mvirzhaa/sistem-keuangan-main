import Dropdown from "../../../../components/inputs/Dropdown";
import KelompokTable from "../components/KelompokTable";

export default function KelompokPage() {
  document.title = "Referensi - Kelompok";

  const jenisTransaksiOptions = [
    "DEP - Deposit",
    "PAY - Pembayaran",
    "INV - Tagihan",
  ];

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Kelompok</h1>
      </div>
      <div className="shadow-md border-t-4 border-t-amber-500 rounded-md  p-5 text-xs mb-4">
        <div className="flex items-center mb-4">
          <label className="w-36 font-medium text-amber-600">
            Jenis Transaksi
          </label>
          <Dropdown
            options={jenisTransaksiOptions}
            defaultValue={jenisTransaksiOptions[0]}
            // onChange={(value) => handleFilterChange("jenisPotongan", value)}
            className="w-full"
          />
        </div>
      </div>
      <KelompokTable />
    </>
  );
}
