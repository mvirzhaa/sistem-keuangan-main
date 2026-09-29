import React from "react";

interface JenisTagihan {
  kode: string;
  nama: string;
  label?: string;
}

interface InformasiJenisTagihanCardProps {
  jenisTagihan: JenisTagihan[];
  className?: string;
}

const InformasiJenisTagihanCard: React.FC<InformasiJenisTagihanCardProps> = ({ jenisTagihan, className = "" }) => {
  // Mengelompokkan data ke dalam kolom
  const generateColumns = (data: JenisTagihan[]) => {
    const itemsPerColumn = Math.ceil(data.length / 4);
    const columns: JenisTagihan[][] = [[], [], [], []];

    data.forEach((item, index) => {
      const columnIndex = Math.floor(index / itemsPerColumn);
      if (columnIndex < 4) {
        columns[columnIndex].push(item);
      }
    });

    return columns;
  };

  const columns = generateColumns(jenisTagihan);

  return (
    <div className={`bg-amber-50 border-l-amber-400 border-l-4 p-4  ${className}`}>
      <h2 className="text-lg font-medium mb-2">Jenis Tagihan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column, colIndex) => (
          <div key={colIndex}>
            {column.map((item, itemIndex) => (
              <div key={`${colIndex}-${itemIndex}`} className="mb-1 text-sm">
                <span className="font-medium">{item.kode}</span> : {item.nama}
                {item.label && <span className="text-blue-700"> ({item.label})</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InformasiJenisTagihanCard;
