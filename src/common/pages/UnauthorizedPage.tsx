import { Link } from "react-router-dom";
import { IoMdArrowBack, IoMdWarning } from "react-icons/io";
import { ROUTES } from "../routes/routes";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
            <IoMdWarning className="h-8 w-8 text-red-600" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Akses Ditolak
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            Anda tidak memiliki izin untuk mengakses halaman ini. Silakan
            hubungi administrator jika Anda merasa ini adalah kesalahan.
          </p>

          {/* Error Code */}
          <div className="bg-gray-100 rounded-md p-3 mb-6">
            <p className="text-sm text-gray-500">Error Code: 403 - Forbidden</p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              to={ROUTES.DASHBOARD}
              className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <IoMdArrowBack className="mr-2 h-4 w-4" />
              Kembali ke Dashboard
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center w-full px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Kembali ke Halaman Sebelumnya
            </button>
          </div>
        </div>

        {/* Footer text */}
        <p className="mt-6 text-xs text-gray-500">
          Jika Anda merasa ini adalah kesalahan, silakan hubungi tim support.
        </p>
      </div>
    </div>
  );
}
