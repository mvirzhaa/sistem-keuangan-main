import React from "react";

export interface StudentDetailItem {
  id: string;
  nim: string;
  nama: string;
  statusMahasiswa: string;
  statusSemester?: string;
  semester?: string | number;
  accounts: Record<string, string | null>;
}

interface DetailMonitoringTagihanMahasiswaTableProps {
  data: StudentDetailItem[];
  accountColumns: string[];
  loading?: boolean;
}

const DetailMonitoringTagihanMahasiswaTable: React.FC<
  DetailMonitoringTagihanMahasiswaTableProps
> = ({ data, accountColumns, loading = false }) => {
  return (
    <div className="w-full overflow-x-auto relative">
      {loading && (
        <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
      )}
      <table className="w-full border-collapse border border-gray-200 text-[13px] text-left">
        <thead>
          <tr className="bg-[#004e82] text-white">
            <th
              rowSpan={2}
              className="py-2.5 px-3 border border-[#14568e] text-center w-12 font-bold"
            >
              No
            </th>
            <th
              rowSpan={2}
              className="py-2.5 px-4 border border-[#14568e] text-center font-bold"
            >
              Mahasiswa
            </th>
            <th
              rowSpan={2}
              className="py-2.5 px-3 border border-[#14568e] text-center w-52 font-bold"
            >
              Status Mahasiswa
            </th>
            <th
              rowSpan={2}
              className="py-2.5 px-3 border border-[#14568e] text-center w-32 font-bold"
            >
              Status Semester
            </th>
            <th
              rowSpan={2}
              className="py-2.5 px-3 border border-[#14568e] text-center w-28 font-bold"
            >
              Semester
            </th>
            <th
              colSpan={accountColumns.length}
              className="py-2 px-3 border border-[#14568e] text-center font-bold"
            >
              Jenis Akun
            </th>
          </tr>
          <tr className="bg-[#004e82] text-white">
            {accountColumns.map((col) => (
              <th
                key={col}
                className="py-2 px-3 border border-[#14568e] text-center w-16 font-bold"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={5 + accountColumns.length}
                className="py-8 text-center text-gray-500 border border-gray-200"
              >
                Tidak ada data mahasiswa
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"
                } hover:bg-sky-50/50 transition-colors`}
              >
                <td className="py-2.5 px-3 border border-gray-200 text-center text-gray-700">
                  {index + 1}
                </td>
                <td className="py-2.5 px-4 border border-gray-200 text-gray-800">
                  {item.nim} - {item.nama}
                </td>
                <td className="py-2.5 px-3 border border-gray-200 text-center text-gray-700">
                  {item.statusMahasiswa}
                </td>
                <td className="py-2.5 px-3 border border-gray-200 text-center text-gray-500">
                  {item.statusSemester || ""}
                </td>
                <td className="py-2.5 px-3 border border-gray-200 text-center text-gray-500">
                  {item.semester || ""}
                </td>
                {accountColumns.map((col) => (
                  <td
                    key={col}
                    className="py-2.5 px-3 border border-gray-200 text-center"
                  >
                    {item.accounts[col] ? (
                      <span className="text-gray-800 font-medium">
                        {item.accounts[col]}
                      </span>
                    ) : (
                      <span className="text-[#f05545] font-bold text-sm">
                        ✖
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DetailMonitoringTagihanMahasiswaTable;
