import FrekuensiTable from "../components/FrekuensiTable";

export default function FrekuensiPage() {
  document.title = "Referensi - Frekuensi";

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Frekuensi</h1>
      </div>
      <div className="shadow-md rounded-md overflow-hidden border-t-4 border-t-green-600 p-4">
        <FrekuensiTable />
      </div>
    </>
  );
}
