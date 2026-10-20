import React from "react";
import { useNavigate } from "react-router-dom";
import ListTable, {
  type Column,
} from "../../../../components/tables/ListTable";
import { IoEye } from "react-icons/io5";
import { ROUTES } from "../../../../common/routes/routes";

interface MetodePembayaranEdufin {
  id: string;
  metodePembayaran: string;
  nomorRekening: string;
  jenisPembayaran: string;
  prefixVA: string;
  idChannel: string;
  periodeMasuk: string;
  statusEdufin: boolean;
}

const MetodePembayaranEdufinTable: React.FC = () => {
  const navigate = useNavigate();
  // Sample data from the image
  const metodePembayaranData: MetodePembayaranEdufin[] = [
    {
      id: "1",
      metodePembayaran: "Bank Muamalat",
      nomorRekening: "--",
      jenisPembayaran: "Virtual Account",
      prefixVA: "709906",
      idChannel: "Muamalat",
      periodeMasuk: "Semua periode masuk dan seterusnya",
      statusEdufin: true,
    },
    {
      id: "2",
      metodePembayaran: "Tokopedia",
      nomorRekening: "--",
      jenisPembayaran: "Virtual Account",
      prefixVA: "",
      idChannel: "Tokopedia",
      periodeMasuk: "Semua periode masuk dan seterusnya",
      statusEdufin: true,
    },
    {
      id: "3",
      metodePembayaran: "Shopee",
      nomorRekening: "--",
      jenisPembayaran: "Virtual Account",
      prefixVA: "",
      idChannel: "Shopee",
      periodeMasuk: "Semua periode masuk dan seterusnya",
      statusEdufin: true,
    },
  ];

  // Define columns for ListTable
  const columns: Column<MetodePembayaranEdufin>[] = [
    {
      key: "metodePembayaran",
      header: "Metode Pembayaran",
      width: "18%",
      render: (item) => (
        <div>
          <div className="font-medium">{item.metodePembayaran}</div>
          <div className="text-gray-500 text-xs mt-0.5">
            Nomor Rekening: {item.nomorRekening}
          </div>
        </div>
      ),
    },
    {
      key: "jenisPembayaran",
      header: "Jenis Pembayaran",
      width: "16%",
    },
    {
      key: "prefixVA",
      header: "Prefix VA",
      width: "10%",
    },
    {
      key: "idChannel",
      header: "ID Channel",
      width: "12%",
    },
    {
      key: "periodeMasuk",
      header: "Periode Masuk",
      width: "25%",
    },
    {
      key: "statusEdufin",
      header: "Status Edufin",
      width: "12%",
      render: (item) => (
        <div className="flex items-center justify-center">
          {item.statusEdufin && (
            <>
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
              <span>Aktif</span>
            </>
          )}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Aksi",
      width: "7%",
      render: (item) => (
        <div className="flex justify-center">
          <button
            type="button"
            className="p-1.5 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors cursor-pointer"
            title="Lihat Detail"
            onClick={() =>
              navigate(
                ROUTES.REFERENSI.PEMBAYARAN
                  .DETAIL_PENGATURAN_METODE_PEMBAYARAN,
                { state: { item } },
              )
            }
          >
            <IoEye size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="shadow-md rounded-md overflow-hidden text-xs">
      <ListTable
        data={metodePembayaranData}
        columns={columns}
        rowKey={(item) => item.id}
        headerClassName="text-white"
        rowClassName={(item, index) =>
          index % 2 === 0 ? "bg-white" : "bg-gray-50"
        }
        showFooter={false}
        emptyMessage="Tidak ada data metode pembayaran"
        className="w-full"
      />
    </div>
  );
};

export default MetodePembayaranEdufinTable;
