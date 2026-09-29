import React from "react";
import InformationCard, { type FieldItem } from "../../../components/card/InformationCard";

export interface MahasiswaData {
  nim?: string;
  nama?: string;
  periode?: string;
  gelombang?: string;
  jalurPendaftaran?: string;
  sistemKuliah?: string;
  fakultas?: string;
  programStudi?: string;
  [key: string]: any; // Untuk field tambahan
}

interface InformasiMahasiswaCardProps {
  data?: MahasiswaData;
  isLoading?: boolean;
  className?: string;
  customFields?: FieldItem[];
}

const InformasiMahasiswaCard: React.FC<InformasiMahasiswaCardProps> = ({ data, isLoading = false, className = "", customFields = [] }) => {
  // Membuat field items untuk mahasiswa
  const fields: FieldItem[] = [
    { label: "NIM", value: data?.nim, position: "left" },
    { label: "Periode", value: data?.periode, position: "left" },
    { label: "Jalur Pendaftaran", value: data?.jalurPendaftaran, position: "left" },
    { label: "Fakultas", value: data?.fakultas, position: "left" },

    { label: "Nama", value: data?.nama, position: "right" },
    { label: "Gelombang", value: data?.gelombang, position: "right" },
    { label: "Sistem Kuliah", value: data?.sistemKuliah, position: "right" },
    { label: "Program Studi", value: data?.programStudi, position: "right" },

    // Tambahkan custom fields jika ada
    ...customFields,
  ];

  return <InformationCard fields={fields} isLoading={isLoading} className={className} bgColorClass="bg-cyan-50" borderColorClass="border-cyan-400" labelColorClass="text-blue-800" />;
};

export default InformasiMahasiswaCard;
