import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdSearch, IoMdRefresh } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import PengaturanPeriodePembayaranTable from "../components/PengaturanPeriodePembayaranTable";
import { ROUTES } from "../../../common/routes/routes";

export default function PengaturanPeriodePembayaranPage() {
  document.title = "Pengaturan - Periode Pembayaran";

  const [filterField, setFilterField] = useState("-- Semua --");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedFilter, setAppliedFilter] = useState({
    field: "-- Semua --",
    query: "",
  });

  const handleSearch = () => {
    setAppliedFilter({
      field: filterField,
      query: searchQuery.trim(),
    });
  };

  const handleReset = () => {
    setFilterField("-- Semua --");
    setSearchQuery("");
    setAppliedFilter({
      field: "-- Semua --",
      query: "",
    });
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Pengaturan</h1>
        <p className="text-sm text-gray-500 mb-1">Periode Pembayaran</p>
      </div>
      <div>
        <InformationCard />
      </div>
      <div className="container bg-white shadow-lg rounded border-t-green-800 border-t-4 px-4 py-4 mt-4">
        <div className="flex flex-col sm:flex-row space-x-8 mb-4">
          <Dropdown
            options={["-- Semua --", "Kode", "Nama Periode"]}
            value={filterField}
            defaultValue={filterField}
            onChange={(val) => setFilterField(val)}
            className="mr-4 mb-2 sm:mb-0 w-40 text-xs"
          />
          <div className="flex space-x-0.5 items-center">
            <TextField
              placeholder="Cari Pengaturan Periode"
              className="w-full sm:w-80"
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              onEnter={handleSearch}
            />
            <IconButton
              icon={<IoMdSearch />}
              variant="success"
              onClick={handleSearch}
              title="Cari"
            />
            <IconButton
              icon={<IoMdRefresh />}
              variant="info"
              onClick={handleReset}
              title="Reset"
            />
          </div>
        </div>
        <div>
          <PengaturanPeriodePembayaranTable
            filterField={appliedFilter.field}
            searchQuery={appliedFilter.query}
          />
        </div>
      </div>
    </>
  );
}

function InformationCard() {
  return (
    <div className="border border-cyan-200 bg-cyan-50 rounded-lg p-4 mb-6 text-xs">
      <div className="flex items-start">
        <div className="flex-shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center mr-3">
          <span className="font-bold">i</span>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 mb-1">Informasi Penting!</h3>

          <p className="text-gray-800">
            Setelah mengisi tanggal pembayaran, pastikan aturan tagihan sudah
            terisi{" "}
            <Link
              to={ROUTES.PENGATURAN.TAGIHAN}
              className="text-green-600 hover:underline font-semibold"
            >
              di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
