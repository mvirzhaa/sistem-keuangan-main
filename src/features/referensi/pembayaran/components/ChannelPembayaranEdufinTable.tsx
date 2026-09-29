import React from "react";
import ListTable, {
  type Column,
} from "../../../../components/tables/ListTable";

interface ChannelPembayaranEdufin {
  id: string;
  nama: string;
}

const ChannelPembayaranEdufinTable: React.FC = () => {
  // Sample data from the image
  const channelData: ChannelPembayaranEdufin[] = [
    { id: "1", nama: "VA BNI" },
    { id: "2", nama: "Indomaret" },
    { id: "3", nama: "BTN H2H" },
    { id: "4", nama: "CIMB Niaga H2H" },
    { id: "5", nama: "BSM H2H" },
    { id: "6", nama: "BRIVA Online" },
    { id: "7", nama: "Tokopedia" },
    { id: "8", nama: "Bank Riau H2H" },
    { id: "9", nama: "BRIVA API" },
    { id: "10", nama: "BSM Edupay" },
    { id: "11", nama: "BillPayment Mandiri" },
    { id: "12", nama: "Blibli" },
    { id: "13", nama: "Shopee" },
    { id: "14", nama: "Bank Ina" },
    { id: "15", nama: "LinkAja" },
    { id: "17", nama: "Bank Shinhan" },
  ];

  // Define columns
  const columns: Column<ChannelPembayaranEdufin>[] = [
    {
      key: "id",
      header: "ID Channel",
      width: "25%",
      className: "",
    },
    {
      key: "nama",
      header: "Nama Channel Pembayaran Edufin",
      width: "75%",
    },
  ];

  return (
    <div className="shadow-md rounded-md overflow-hidden text-xs">
      <ListTable
        data={channelData}
        columns={columns}
        rowKey={(item) => item.id}
        emptyMessage="Data kosong"
        className="w-full"
        headerClassName="bg-blue-900 text-white"
        rowClassName={(item, index) =>
          index % 2 === 0 ? "bg-gray-50" : "bg-white"
        }
        showFooter={false}
        pageSize={50}
      />
    </div>
  );
};

export default ChannelPembayaranEdufinTable;
