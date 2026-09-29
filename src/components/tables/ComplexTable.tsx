import React, { type ReactNode } from "react";

export interface CellConfig {
  content: ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
  align?: "left" | "center" | "right";
}

export interface HeaderConfig {
  rows: CellConfig[][];
  className?: string;
}

export interface FooterConfig {
  cells: CellConfig[];
  className?: string;
}

export interface ColumnDef {
  id: string;
  header?: string | ReactNode;
  accessor?: (row: any, index: number) => ReactNode;
  className?: string;
  headerClassName?: string;
  width?: string;
}

interface ComplexTableProps {
  columns: ColumnDef[];
  data: any[];
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  emptyMessage?: string | ReactNode;
  footer?: FooterConfig[];
  summary?: ReactNode;
  complexHeader?: HeaderConfig;
  isSelectable?: boolean;
  selectedRows?: number[];
  onRowSelect?: (index: number) => void;
  id?: string;
  additionalContent?: ReactNode;
}

const ComplexTable: React.FC<ComplexTableProps> = ({
  columns,
  data,
  className = "",
  headerClassName = "",
  rowClassName = "",
  emptyMessage = "Tidak ada data",
  footer,
  summary,
  complexHeader,
  isSelectable,
  selectedRows = [],
  onRowSelect,
  id,
  additionalContent,
}) => {
  // Render complex header jika tersedia
  const renderComplexHeader = () => {
    if (!complexHeader) return null;

    return (
      <thead className={`bg-blue-900 text-white text-xs ${headerClassName}`}>
        {complexHeader.rows.map((row, rowIndex) => (
          <tr key={`complex-header-row-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <th
                key={`complex-header-cell-${rowIndex}-${cellIndex}`}
                className={`p-2 border-b border-r border-gray-300 ${cell.className || ""}`}
                colSpan={cell.colSpan}
                rowSpan={cell.rowSpan}
                style={{
                  textAlign: cell.align || "left",
                }}
              >
                {cell.content}
              </th>
            ))}
          </tr>
        ))}
      </thead>
    );
  };

  // Render header standar
  const renderStandardHeader = () => {
    return (
      <thead className={`bg-blue-800 text-white text-xs ${headerClassName}`}>
        <tr>
          {isSelectable && (
            <th className="p-2 border-b border-r border-gray-300 w-10">
              <input type="checkbox" onChange={() => {}} className="form-checkbox h-4 w-4" />
            </th>
          )}
          {columns.map((column, index) => (
            <th key={column.id || index} className={`p-2 border-b border-r border-gray-300 ${column.headerClassName || ""}`} style={{ width: column.width }}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  // Render baris data
  const renderRows = () => {
    if (data.length === 0) {
      return (
        <tr>
          <td colSpan={columns.length + (isSelectable ? 1 : 0)} className="text-center p-4 border-b border-gray-200">
            {emptyMessage}
          </td>
        </tr>
      );
    }

    return data.map((row, rowIndex) => (
      <tr key={`row-${rowIndex}`} className={`${rowClassName} ${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
        {isSelectable && (
          <td className="p-2 border-b border-r border-gray-300 text-center">
            <input type="checkbox" checked={selectedRows.includes(rowIndex)} onChange={() => onRowSelect && onRowSelect(rowIndex)} className="form-checkbox h-4 w-4" />
          </td>
        )}
        {columns.map((column, colIndex) => (
          <td key={`cell-${rowIndex}-${colIndex}`} className={`p-2 border-b border-r border-gray-300 ${column.className || ""}`}>
            {column.accessor ? column.accessor(row, rowIndex) : row[column.id] || ""}
          </td>
        ))}
      </tr>
    ));
  };

  // Render footer jika tersedia
  const renderFooter = () => {
    if (!footer) return null;

    return (
      <tfoot>
        {footer.map((footerRow, rowIndex) => (
          <tr key={`footer-row-${rowIndex}`} className={footerRow.className || ""}>
            {footerRow.cells.map((cell, cellIndex) => (
              <td
                key={`footer-cell-${rowIndex}-${cellIndex}`}
                className={`p-2 border-b border-r border-gray-300 ${cell.className || ""}`}
                colSpan={cell.colSpan}
                rowSpan={cell.rowSpan}
                style={{
                  textAlign: cell.align || "left",
                }}
              >
                {cell.content}
              </td>
            ))}
          </tr>
        ))}
      </tfoot>
    );
  };

  return (
    <div className="overflow-x-auto ">
      <table className={`w-full border-collapse border border-gray-300 ${className}`} id={id}>
        {complexHeader ? renderComplexHeader() : renderStandardHeader()}
        <tbody>{renderRows()}</tbody>
        {renderFooter()}
      </table>

      {summary && <div className="mt-2">{summary}</div>}
      {additionalContent}
    </div>
  );
};

export default ComplexTable;
