import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-screen justify-center items-center h-screen">
      <h3 className="font-semibold">404 Not Found</h3>
      <p>Halaman tidak ditemukan</p>
      <button
        className="btn btn-primary mt-4 cursor-pointer underline"
        onClick={() => navigate(-1)}
      >
        Kembali
      </button>
    </div>
  );
}
