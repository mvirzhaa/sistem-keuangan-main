import React, { useState, useEffect } from "react";
import {
  IoIosArrowUp,
  IoIosArrowDown,
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";
import { MdFirstPage, MdLastPage } from "react-icons/md";

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  render?: (item: T, index: number) => React.ReactNode;
  sortable?: boolean;
  className?: string;
  headerClassName?: string;
  width?: string;
}

interface ListTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey: (item: T) => string | number;
  initialSortColumn?: string;
  initialSortDirection?: "asc" | "desc";
  pageSize?: number;
  pageSizeOptions?: number[];
  onRowClick?: (item: T) => void;
  selectable?: boolean;
  onSelectionChange?: (selectedItems: T[]) => void;
  showFooter?: boolean;
  className?: string;
  headerClassName?: string;
  rowClassName?: (item: T, index: number) => string;
  emptyMessage?: string;
  loading?: boolean;
}

function ListTable<T>({
  data = [],
  columns,
  rowKey,
  initialSortColumn,
  initialSortDirection = "asc",
  pageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  onRowClick,
  selectable = false,
  onSelectionChange,
  showFooter = true,
  className = "",
  headerClassName = "",
  rowClassName,
  emptyMessage = "Tidak ada data",
  loading = false,
}: ListTableProps<T>) {
  // State for sorting
  const [sortColumn, setSortColumn] = useState<string | undefined>(
    initialSortColumn,
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    initialSortDirection,
  );

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);

  // State for selection
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set(),
  );
  const [selectAll, setSelectAll] = useState(false);

  // Reset pagination when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  // Reset selection when data changes
  useEffect(() => {
    setSelectedRows(new Set());
    setSelectAll(false);
  }, [data]);

  // Handle sorting
  const handleSort = (column: string, sortable?: boolean) => {
    if (!sortable) return;

    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return data;

    return [...data].sort((a, b) => {
      const valueA = (a as any)[sortColumn];
      const valueB = (b as any)[sortColumn];

      if (valueA === valueB) return 0;

      let comparison = 0;
      if (valueA > valueB) comparison = 1;
      else if (valueA < valueB) comparison = -1;

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [data, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / currentPageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * currentPageSize,
    currentPage * currentPageSize,
  );

  // Selection handlers
  const handleSelectRow = (rowId: string | number) => {
    const newSelectedRows = new Set(selectedRows);
    if (selectedRows.has(rowId)) {
      newSelectedRows.delete(rowId);
    } else {
      newSelectedRows.add(rowId);
    }
    setSelectedRows(newSelectedRows);

    if (onSelectionChange) {
      const selectedItems = sortedData.filter((item) =>
        newSelectedRows.has(rowKey(item)),
      );
      onSelectionChange(selectedItems);
    }
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    let newSelectedRows: Set<string | number>;
    if (newSelectAll) {
      newSelectedRows = new Set(sortedData.map((item) => rowKey(item)));
    } else {
      newSelectedRows = new Set();
    }
    setSelectedRows(newSelectedRows);

    if (onSelectionChange) {
      const selectedItems = newSelectAll ? [...sortedData] : [];
      onSelectionChange(selectedItems);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (currentPage >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  };

  return (
    <div className="flex flex-col">
      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className={`min-w-full border-collapse ${className}`}>
          <thead>
            <tr className={`bg-blue-900 text-white ${headerClassName}`}>
              {selectable && (
                <th className="p-2 text-center border border-slate-300 w-12">
                  <input
                    type="checkbox"
                    checked={selectAll && data.length > 0}
                    onChange={handleSelectAll}
                    className="form-checkbox h-4 w-4"
                  />
                </th>
              )}

              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`p-2 text-center border border-slate-300 ${
                    column.headerClassName || ""
                  } ${column.width ? `w-[${column.width}]` : ""}`}
                  onClick={() => handleSort(column.key, column.sortable)}
                  style={column.width ? { width: column.width } : {}}
                >
                  <div
                    className={`flex items-center justify-center ${
                      column.sortable ? "cursor-pointer" : ""
                    }`}
                  >
                    {column.header}
                    {column.sortable && sortColumn === column.key && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? (
                          <IoIosArrowUp />
                        ) : (
                          <IoIosArrowDown />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="p-4 text-center border border-slate-300"
                >
                  Loading...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="p-4 text-center border border-slate-300"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => {
                const id = rowKey(item);
                return (
                  <tr
                    key={id}
                    className={`border-b hover:bg-gray-50 ${
                      rowClassName ? rowClassName(item, index) : ""
                    }`}
                    onClick={onRowClick ? () => onRowClick(item) : undefined}
                  >
                    {selectable && (
                      <td className="p-2 text-center border border-slate-300">
                        <input
                          type="checkbox"
                          checked={selectedRows.has(id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleSelectRow(id);
                          }}
                          className="form-checkbox h-4 w-4"
                        />
                      </td>
                    )}

                    {columns.map((column) => (
                      <td
                        key={`${id}-${column.key}`}
                        className={`p-2 border border-slate-300 ${
                          column.className || ""
                        }`}
                      >
                        {column.render
                          ? column.render(item, index)
                          : (item as any)[column.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {showFooter && !loading && data.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 border-t border-gray-200 pt-2 text-sm">
          <div className="text-gray-700 mb-2 sm:mb-0 bg-gray-100 p-2 rounded">
            Hal {currentPage}/{totalPages} ({data.length} data,{" "}
            {(
              (((currentPage - 1) * currentPageSize) / data.length) *
              100
            ).toFixed(4)}{" "}
            detik)
          </div>

          <div className="flex items-center space-x-2">
            <div className="mr-4">
              <select
                value={currentPageSize}
                onChange={(e) => {
                  setCurrentPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded p-1"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size} baris
                  </option>
                ))}
              </select>
            </div>

            <div className="flex">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className={`p-2 border ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <MdFirstPage />
              </button>

              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`p-2 border-t border-b border-r ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <IoIosArrowBack />
              </button>

              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`p-2 min-w-[40px] border-t border-b border-r ${
                    pageNum === currentPage
                      ? "bg-blue-600 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className={`p-2 border-t border-b border-r ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <IoIosArrowForward />
              </button>

              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className={`p-2 border-t border-b border-r border-l-0 ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <MdLastPage />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListTable;
