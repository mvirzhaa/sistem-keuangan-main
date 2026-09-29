import React from "react";
import InformationCard, { type FieldItem } from "../../../components/card/InformationCard";

export interface PendaftarData {
  idPendaftar?: string;
  nama?: string;
  periode?: string;
  gelombang?: string;
  jalurPendaftaran?: string;
  sistemKuliah?: string;
  [key: string]: any; // Untuk field tambahan
}

interface InformasiPendaftarCardProps {
  data?: PendaftarData;
  isLoading?: boolean;
  className?: string;
  customFields?: FieldItem[];
}

const InformasiPendaftarCard: React.FC<InformasiPendaftarCardProps> = ({ data, isLoading = false, className = "", customFields = [] }) => {
  // Membuat field items untuk pendaftar sesuai dengan gambar yang diberikan
  const fields: FieldItem[] = [
    { label: "ID Pendaftar", value: data?.idPendaftar, position: "left" },
    { label: "Periode", value: data?.periode, position: "left" },
    { label: "Jalur Pendaftaran", value: data?.jalurPendaftaran, position: "left" },

    { label: "Nama", value: data?.nama, position: "right" },
    { label: "Gelombang", value: data?.gelombang, position: "right" },
    { label: "Sistem Kuliah", value: data?.sistemKuliah, position: "right" },

    // Tambahkan custom fields jika ada
    ...customFields,
  ];

  return <InformationCard fields={fields} isLoading={isLoading} className={className} bgColorClass="bg-blue-50" borderColorClass="border-blue-400" labelColorClass="text-blue-700" />;
};

export default InformasiPendaftarCard;
