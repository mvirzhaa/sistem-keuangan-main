import { IoMdArrowBack, IoMdSave, IoMdSearch } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import TextField from "../../../components/inputs/TextField";
import { useNavigate } from "react-router-dom";
import DetailTarifTagihanForm from "../components/DetailTarifTagihanForm";
import TabNavigation from "../../../components/navigation/TabNavigation";
import { useState } from "react";
import DistribusiTagihanPerSemesterTable from "../components/DistribusiTagihanPerSemesterTable";

export default function DetailTarifTagihanPage() {
  document.title = "Tarif - Detail Tarif Tagihan";
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("aturan-cicilan");

  // Tab items for navigation
  const tabItems = [
    { label: "Aturan Cicilan", value: "aturan-cicilan" },
    { label: "Distribusi Tagihan per Semester", value: "distribusi-tagihan" },
  ];

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Tarif</h1>
        <p className="text-sm text-gray-500 mb-1">Detail Tarif Tagihan</p>
      </div>
      <div className="container shadow-lg rounded border-t-amber-500 border-t-4 p-4">
        <div className="flex justify-between">
          <div className="flex space-x-0.5 items-center">
            <TextField placeholder="Cari Tarif" className="w-full sm:w-80" />
            <IconButton icon={<IoMdSearch />} variant="warning" />
          </div>
          <div className="flex space-x-0.5 items-center">
            <IconButton
              icon={<IoMdArrowBack />}
              text="Kembali ke Daftar"
              variant="info"
              onClick={() => navigate(-1)}
            />
            <IconButton icon={<IoMdSave />} text="Simpan" variant="warning" />
          </div>
        </div>
        <div className="mt-8">
          <DetailTarifTagihanForm />
        </div>

        {/* Tab navigation */}
        <div className="mt-8">
          <TabNavigation
            vertical={false}
            tabs={tabItems}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            className="border-b border-gray-200"
          />

          {/* Tab content */}
          <div className="mt-4 p-4">
            {activeTab === "aturan-cicilan" && (
              <div className="border-l-4 border-blue-200 bg-blue-100 p-4 ">
                <p className="text-xs">Tidak perlu mengatur aturan cicilan</p>
              </div>
            )}

            {activeTab === "distribusi-tagihan" && (
              <div>
                <div className="border-l-4 border-blue-200 bg-blue-100 p-4 mb-4">
                  <p className="text-xs">
                    Jika Nominal tarif per semester diisi maka nominal tarif dan
                    aturan cicilan di abaikan
                  </p>
                </div>
                <div>
                  <DistribusiTagihanPerSemesterTable
                    onDataChange={(data) => {
                      console.log("Distribusi tagihan updated:", data);
                      // Handle the updated data here
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
