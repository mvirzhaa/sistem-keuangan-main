import ListTable, {
  type Column,
} from "../../../../components/tables/ListTable";

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

  const columns: Column<JenisTransaksi>[] = [
    {
      key: "kode",
      header: "Kode",
      width: "20%",
      className: "text-center py-2.5",
      headerClassName: "text-center",
      sortable: true,
      render: (item) => item.kode,
    },
    {
      key: "nama",
      header: "Nama",
      width: "35%",
      className: "text-center py-2.5",
      headerClassName: "text-center",
      sortable: true,
      render: (item) => item.nama,
    },
    {
      key: "formatKode",
      header: "Format Kode Transaksi",
      width: "45%",
      className: "text-center py-2.5",
      headerClassName: "text-center",
      render: (item) => item.formatKode,
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Jenis Transaksi</h1>
      </div>

      <div className="shadow-md rounded-md overflow-hidden bg-white border-t-4 border-t-green-600 px-4 sm:px-32 py-4">
        {/* Table using ListTable */}
        <div className="overflow-x-auto text-sm">
          <ListTable
            data={jenisTransaksiList}
            columns={columns}
            rowKey={(item) => item.kode}
            headerClassName="text-xs text-white"
            rowClassName={(_item, index) =>
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            }
            showFooter={false}
            emptyMessage="Tidak ada data jenis transaksi"
          />
        </div>

        {/* Format explanation */}
        <div className="bg-yellow-50 border-l-4 border-yellow-600 p-3 mt-4 text-sm">
          <h3 className="font-semibold text-gray-800 mb-1.5 text-sm">
            Format Pengkodean Transaksi
          </h3>
          <div className="flex flex-wrap text-sm">
            <div className="mr-8">
              <span className="font-medium text-gray-700">Urutan : </span>
              <span className="text-blue-600 font-medium">{"{urutan}"}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Periode : </span>
              <span className="text-blue-600 font-medium">{"{periode}"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

