import React, { useState } from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import Dropdown from "../../../components/inputs/Dropdown";

interface TagihanData {
  id: string;
  kode: string;
  kelompokTagihan: string;
  periode: string;
  inquiry: boolean;
  payment: boolean;
  reversal: boolean;
}

const PengaturanTagihanTable: React.FC = () => {
  // Sample data with state management
  const [tagihanData, setTagihanData] = useState<TagihanData[]>([
    {
      id: "1",
      kode: "01",
      kelompokTagihan: "Kuliah",
      periode: "2025 Ganjil",
      inquiry: true,
      payment: true,
      reversal: true,
    },
    {
      id: "2",
      kode: "02",
      kelompokTagihan: "Wisuda",
      periode: "2024 Genap",
      inquiry: true,
      payment: true,
      reversal: true,
    },
    {
      id: "3",
      kode: "03",
      kelompokTagihan: "Formulir",
      periode: "2025 Ganjil",
      inquiry: true,
      payment: true,
      reversal: true,
    },
    {
      id: "4",
      kode: "100",
      kelompokTagihan: "KIP Kuliah",
      periode: "2024 Genap",
      inquiry: true,
      payment: true,
      reversal: true,
    },
  ]);

  // Periode options for dropdowns
  const periodeOptions = [
    "2025 Ganjil",
    "2024 Genap",
    "2024 Ganjil",
    "2023 Genap",
  ];

  // Function to handle periode change
  const handlePeriodeChange = (id: string, value: string) => {
    setTagihanData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, periode: value } : item,
      ),
    );
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (
    id: string,
    field: "inquiry" | "payment" | "reversal",
    checked: boolean,
  ) => {
    setTagihanData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [field]: checked } : item,
      ),
    );
  };

  // Define columns for ListTable
  const columns: Column<TagihanData>[] = [
    {
      key: "kode",
      header: "Kode",
      width: "10%",
      className: "text-center",
    },
    {
      key: "kelompokTagihan",
      header: "Kelompok Tagihan",
      width: "25%",
    },
    {
      key: "periode",
      header: "Periode",
      width: "30%",
      render: (item) => (
        <Dropdown
          options={periodeOptions}
          defaultValue={item.periode}
          onChange={(value) => handlePeriodeChange(item.id, value)}
          className="w-full text-sm"
        />
      ),
    },
    {
      key: "inquiry",
      header: "Inquiry",
      width: "10%",
      className: "text-center",
      render: (item) => (
        <div className="flex justify-center">
          <label className="h-5 w-5 inline-flex items-center justify-center">
            <input
              type="checkbox"
              className="h-4 w-4 rounded bg-slate-200 border-slate-300 text-blue-900 focus:ring-blue-900"
              checked={item.inquiry}
              onChange={(e) =>
                handleCheckboxChange(item.id, "inquiry", e.target.checked)
              }
            />
          </label>
        </div>
      ),
    },
    {
      key: "payment",
      header: "Payment",
      width: "10%",
      className: "text-center",
      render: (item) => (
        <div className="flex justify-center">
          <label className="h-5 w-5 inline-flex items-center justify-center">
            <input
              type="checkbox"
              className="h-4 w-4 rounded bg-slate-200 border-slate-300 text-blue-900 focus:ring-blue-900"
              checked={item.payment}
              onChange={(e) =>
                handleCheckboxChange(item.id, "payment", e.target.checked)
              }
            />
          </label>
        </div>
      ),
    },
    {
      key: "reversal",
      header: "Reversal",
      width: "15%",
      className: "text-center",
      render: (item) => (
        <div className="flex justify-center">
          <label className="h-5 w-5 inline-flex items-center justify-center">
            <input
              type="checkbox"
              className="h-4 w-4 rounded bg-slate-200 border-slate-300 text-blue-900 focus:ring-blue-900"
              checked={item.reversal}
              onChange={(e) =>
                handleCheckboxChange(item.id, "reversal", e.target.checked)
              }
            />
          </label>
        </div>
      ),
    },
  ];

  return (
    <div className="text-xs">
      <ListTable
        data={tagihanData}
        columns={columns}
        rowKey={(item) => item.id}
        headerClassName="bg-blue-900 text-white"
        rowClassName={(item, index) =>
          index % 2 === 0 ? "bg-gray-50" : "bg-white"
        }
        showFooter={false}
        emptyMessage="Tidak ada data pengaturan tagihan"
      />
    </div>
  );
};

export default PengaturanTagihanTable;
