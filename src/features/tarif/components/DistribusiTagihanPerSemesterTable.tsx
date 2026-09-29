import { useState } from "react";
import TextField from "../../../components/inputs/TextField";

interface SemesterTarif {
  semester: number;
  nominalTarif: string;
  isActive: boolean;
}

interface DistribusiTagihanPerSemesterTableProps {
  onDataChange?: (data: SemesterTarif[]) => void;
  className?: string;
}

export default function DistribusiTagihanPerSemesterTable({
  onDataChange,
  className = "",
}: DistribusiTagihanPerSemesterTableProps) {
  // Initialize data for 14 semesters
  const [semesterData, setSemesterData] = useState<SemesterTarif[]>(
    Array.from({ length: 14 }, (_, i) => ({
      semester: i + 1,
      nominalTarif: "",
      isActive: false,
    })),
  );

  // Handle checkbox change
  const handleActiveChange = (semester: number, isChecked: boolean) => {
    const updatedData = semesterData.map((item) =>
      item.semester === semester ? { ...item, isActive: isChecked } : item,
    );
    setSemesterData(updatedData);

    if (onDataChange) {
      onDataChange(updatedData);
    }
  };

  // Handle nominal tarif change
  const handleTarifChange = (semester: number, value: string) => {
    const updatedData = semesterData.map((item) =>
      item.semester === semester ? { ...item, nominalTarif: value } : item,
    );
    setSemesterData(updatedData);

    if (onDataChange) {
      onDataChange(updatedData);
    }
  };

  // Format currency input
  const formatCurrency = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^\d]/g, "");
    // Return empty string if no value
    if (!numericValue) return "";
    // Format number with thousands separator
    return new Intl.NumberFormat("id-ID").format(parseInt(numericValue, 10));
  };

  return (
    <div className={`overflow-x-auto text-xs ${className}`}>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 text-center border border-slate-300 bg-blue-900 text-white w-1/3">
              Semester
            </th>
            <th className="p-2 text-center border border-slate-300 bg-blue-900 text-white w-1/2">
              Nominal Tarif
            </th>
            <th className="p-2 text-center border border-slate-300 bg-blue-900 text-white w-1/6">
              Aktif?
            </th>
          </tr>
        </thead>
        <tbody>
          {semesterData.map((item) => (
            <tr
              key={item.semester}
              className={item.semester % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="p-2 border border-slate-300">
                Semester {item.semester}
              </td>
              <td className="p-2 border border-slate-300">
                <TextField
                  type="number"
                  value={item.nominalTarif}
                  disabled={!item.isActive}
                  onChange={(e) => handleTarifChange(item.semester, e)}
                  placeholder={`Nominal Tarif Semester ${item.semester}`}
                  inputClassName="text-right"
                  fullWidth
                />
              </td>
              <td className="p-2 border border-slate-300 text-center">
                <input
                  type="checkbox"
                  checked={item.isActive}
                  onChange={(e) =>
                    handleActiveChange(item.semester, e.target.checked)
                  }
                  className="form-checkbox h-5 w-5"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
