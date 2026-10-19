import React, { useState, useEffect } from "react";
import { IoMdArrowDropdown, IoMdArrowDropright, IoMdClose } from "react-icons/io";
import { BiCheckCircle, BiCross, BiPencil } from "react-icons/bi";

// Tipe data untuk item kolom kode pembayaran
interface TagihanColumn {
  code: string;
  name: string;
}

// Tipe data untuk item tagihan
interface TagihanItem {
  id: string;
  name: string;
  type: "universitas" | "fakultas" | "program";
  values: Record<string, number>; // Nilai untuk setiap kode pembayaran
  totalTagihan: number;
  denda: number;
  potongan: number;
  lunas: number;
  jumlahTagihan: number;
  children?: TagihanItem[];
}

interface TagihanMahasiswaTableProps {
  data: TagihanItem[];
  columns: TagihanColumn[];
  onDetail?: (item: TagihanItem) => void;
  onGenerate?: (item: TagihanItem) => void;
  onCancel?: (item: TagihanItem) => void;
  onApprove?: (item: TagihanItem) => void;
  onRemove?: (item: TagihanItem) => void;
  loading?: boolean;
  className?: string;
}

const TagihanMahasiswaTable: React.FC<TagihanMahasiswaTableProps> = ({
  data,
  columns,
  onDetail,
  onGenerate,
  onCancel,
  onApprove,
  onRemove,
  loading = false,
  className = "",
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Format number to currency
  const formatCurrency = (value: number) => {
    if (value === 0) return "0,00";
    return value
      .toLocaleString("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace(".", ",");
  };

  const toggleExpand = (itemId: string) => {
    const newExpandedItems = new Set(expandedItems);
    if (expandedItems.has(itemId)) {
      newExpandedItems.delete(itemId);
    } else {
      newExpandedItems.add(itemId);
    }
    setExpandedItems(newExpandedItems);
  };

  const isExpanded = (itemId: string) => {
    return expandedItems.has(itemId);
  };

  const renderRows = (items: TagihanItem[], level = 0) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isItemExpanded = isExpanded(item.id);
      const showChildren = hasChildren && isItemExpanded;

      // Determine indentation and expand/collapse icon
      const indent = level * 20; // 20px indent per level
      const itemStyle = {
        paddingLeft: `${indent}px`,
      };

      return (
        <React.Fragment key={item.id}>
          <tr className={`${item.type === "program" ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
            {/* Program Studi column with expand/collapse */}
            <td className="border border-slate-300 p-2">
              <div className={`flex items-center ${hasChildren ? "cursor-pointer hover:bg-gray-200 rounded p-1" : ""}`} style={itemStyle} onClick={hasChildren ? () => toggleExpand(item.id) : undefined}>
                {hasChildren ? (
                  <span className="mr-1 flex-shrink-0">{isItemExpanded ? <IoMdArrowDropdown size={20} /> : <IoMdArrowDropright size={20} />}</span>
                ) : (
                  <span className="w-6"></span> // Spacer when no children
                )}
                <span className="font-medium">{item.name}</span>
              </div>
            </td>

            {/* Payment code columns */}
            {columns.map((column) => (
              <td key={`${item.id}-${column.code}`} className="border border-slate-300 p-2 text-right">
                {formatCurrency(item.values[column.code] || 0)}
              </td>
            ))}

            {/* Total columns */}
            <td className="border border-slate-300 p-2 text-right">{formatCurrency(item.totalTagihan)}</td>
            <td className="border border-slate-300 p-2 text-right">{formatCurrency(item.denda)}</td>
            <td className="border border-slate-300 p-2 text-right">{formatCurrency(item.potongan)}</td>
            <td className="border border-slate-300 p-2 text-right">{formatCurrency(item.lunas)}</td>
            <td className="border border-slate-300 p-2 text-center">{item.jumlahTagihan}</td>

            {/* Actions column */}
            <td className="border border-slate-300 p-1 text-center">
              {item.type !== "program" && (
                <div className="flex justify-center items-center space-x-1.5 py-1">
                  {(onDetail || onGenerate) && (
                    <button
                      type="button"
                      onClick={() => (onDetail ? onDetail(item) : onGenerate?.(item))}
                      className="p-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors shadow-xs cursor-pointer"
                      title="Detail Monitoring Generate Tagihan"
                    >
                      <BiPencil size={18} />
                    </button>
                  )}

                  {(onGenerate || onApprove) && (
                    <button
                      type="button"
                      onClick={() => onGenerate ? onGenerate(item) : onApprove?.(item)}
                      className="p-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors shadow-xs cursor-pointer"
                      title="Generate Tagihan Mahasiswa"
                    >
                      <BiCheckCircle size={18} />
                    </button>
                  )}

                  {(onCancel || onRemove) && (
                    <button
                      type="button"
                      onClick={() => (onCancel ? onCancel(item) : onRemove?.(item))}
                      className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow-xs cursor-pointer"
                      title="Batalkan Tagihan Mahasiswa"
                    >
                      <IoMdClose size={18} />
                    </button>
                  )}
                </div>
              )}
            </td>
          </tr>

          {/* Render children if expanded */}
          {showChildren && renderRows(item.children!, level + 1)}
        </React.Fragment>
      );
    });
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full border-collapse text-xs">
        <thead>
          <tr className="bg-blue-900 text-white text-center">
            <th rowSpan={2} className="border border-slate-300 p-2 w-48">
              Program Studi
            </th>
            <th colSpan={columns.length} className="border border-slate-300 p-2">
              Total Tagihan Per Jenis
            </th>
            <th colSpan={3} className="border border-slate-300 p-2">
              Total
            </th>
            <th rowSpan={2} className="border border-slate-300 p-2">
              Lunas
            </th>
            <th rowSpan={2} className="border border-slate-300 p-2">
              Jumlah Tagihan
            </th>
            <th rowSpan={2} className="border border-slate-300 p-2">
              Aksi
            </th>
          </tr>
          <tr className="bg-blue-900 text-white text-center">
            {/* Payment code column headers */}
            {columns.map((column) => (
              <th key={column.code} className="border border-slate-300 p-2">
                {column.code}
              </th>
            ))}
            <th className="border border-slate-300 p-2">Tagihan</th>
            <th className="border border-slate-300 p-2">Denda</th>
            <th className="border border-slate-300 p-2">Potongan</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 7} className="p-4 text-center border border-slate-300">
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 7} className="p-4 text-center border border-slate-300">
                Tidak ada data tagihan
              </td>
            </tr>
          ) : (
            renderRows(data)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TagihanMahasiswaTable;
