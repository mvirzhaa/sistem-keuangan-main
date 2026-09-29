import AturanAkademikTable from "../components/AturanAkademikTable";

export default function AturanAkademikPage() {
  document.title = "Aturan Akademik";

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Aturan Akademik</h1>
      </div>

      <div className="container shadow-lg rounded border-t-green-800 border-t-4 px-4 py-4 sm:px-40 mt-4">
        <AturanAkademikTable />
      </div>
    </>
  );
}
