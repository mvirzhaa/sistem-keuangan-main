interface JenisTransaksi {
  kode: string;
  nama: string;
  formatKode: string;
}

export default function JenisTransaksiPage() {
  document.title = "Referensi - Jenis Transaksi";

  // Data jenis transaksi
  const jenisTransaksiList: JenisTransaksi[] = [
    {
      kode: "DEP",
      nama: "Deposit",
      formatKode: "DEP/{{periode}}/{{urutan}}",
    },
    {
      kode: "PAY",
      nama: "Pembayaran",
      formatKode: "PAY/{{periode}}/{{urutan}}",
    },
    {
      kode: "INV",
      nama: "Tagihan",
      formatKode: "INV/{{periode}}/{{urutan}}",
    },
  ];

  return (
    <div className="container mx-auto ">
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Jenis Transaksi</h1>
      </div>

      <div className="shadow-md rounded-md overflow-hidden border-t-4 border-t-green-600 px-4 sm:px-32 py-4">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-b-2 border-blue-900 ">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="py-3 px-4 text-center w-1/6">Kode</th>
                <th className="py-3 px-4 text-center w-1/3">Nama</th>
                <th className="py-3 px-4 text-center">Format Kode Transaksi</th>
              </tr>
            </thead>
            <tbody>
              {jenisTransaksiList.map((jenis, index) => (
                <tr
                  key={jenis.kode}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="py-3 px-4 border-t text-center">
                    {jenis.kode}
                  </td>
                  <td className="py-3 px-4 border-t text-center">
                    {jenis.nama}
                  </td>
                  <td className="py-3 px-4 border-t text-center">
                    {jenis.formatKode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Format explanation */}
        <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mt-4">
          <h3 className="font-medium mb-2">Format Pengkodean Transaksi</h3>
          <div className="flex flex-wrap">
            <div className="mr-10">
              <span className="font-medium">Urutan : </span>
              <span className="text-blue-600">{"{urutan}"}</span>
            </div>
            <div>
              <span className="font-medium">Periode : </span>
              <span className="text-blue-600">{"{periode}"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
