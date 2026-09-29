import React from "react";

interface Frekuensi {
  kode: string;
  nama: string;
  jumlahHari: number | null;
}

const FrekuensiTable: React.FC = () => {
  // Data frekuensi transaksi
  const frekuensiData: Frekuensi[] = [
    { kode: "KK", nama: "Tiap Transaksi", jumlahHari: null },
    { kode: "KL", nama: "Kelulusan", jumlahHari: null },
    { kode: "KS", nama: "Kuliah SKS", jumlahHari: null },
    { kode: "MC", nama: "Mahasiswa Cuti", jumlahHari: null },
    { kode: "PM", nama: "Pendaftaran", jumlahHari: null },
    { kode: "SL", nama: "Seleksi Pendaftaran", jumlahHari: null },
    { kode: "WB", nama: "Bulanan", jumlahHari: 30 },
    { kode: "WH", nama: "Harian", jumlahHari: 1 },
    { kode: "WM", nama: "Mingguan", jumlahHari: 7 },
    { kode: "WS", nama: "Semester", jumlahHari: 180 },
    { kode: "WT", nama: "Tahunan", jumlahHari: 365 },
  ];

  return (
    <div>
      <div className="overflow-x-auto flex justify-center">
        <table className="w-full sm:w-4/5 text-xs border-collapse shadow-md border-b-2 border-blue-900">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="py-3 px-4 text-center font-medium w-[20%] border border-gray-300">
                Kode
              </th>
              <th className="py-3 px-4 text-center font-medium w-[50%] border border-gray-300">
                Nama
              </th>
              <th className="py-3 px-4 text-center font-medium w-[30%] border border-gray-300">
                Jumlah Hari
              </th>
            </tr>
          </thead>
          <tbody>
            {frekuensiData.map((item, index) => (
              <tr
                key={item.kode}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-2.5 px-4 border border-gray-200 text-center">
                  {item.kode}
                </td>
                <td className="py-2.5 px-4 border border-gray-200 text-left">
                  {item.nama}
                </td>
                <td className="py-2.5 px-4 border border-gray-200 text-center">
                  {item.jumlahHari !== null ? item.jumlahHari : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FrekuensiTable;
