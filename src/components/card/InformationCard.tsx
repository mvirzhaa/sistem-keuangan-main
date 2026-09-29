import React, { type ReactNode } from "react";

export interface FieldItem {
  label: string;
  value?: ReactNode;
  position?: "left" | "right";
  loading?: boolean;
}

interface InformationCardProps {
  fields: FieldItem[];
  className?: string;
  borderColorClass?: string;
  bgColorClass?: string;
  labelColorClass?: string;
  emptyText?: string;
  isLoading?: boolean;
}

const InformationCard: React.FC<InformationCardProps> = ({ fields, className = "", borderColorClass = "border-cyan-400", bgColorClass = "bg-cyan-50", labelColorClass = "text-blue-800", emptyText = " ", isLoading = false }) => {
  // Memisahkan field berdasarkan posisi
  const leftFields = fields.filter((field) => field.position !== "right");
  const rightFields = fields.filter((field) => field.position === "right");

  // Render loading state atau value
  const renderValue = (field: FieldItem) => {
    if (isLoading || field.loading) {
      return <div className="animate-pulse bg-gray-200 h-4 w-24 rounded"></div>;
    }
    return field.value !== undefined && field.value !== null ? field.value : emptyText;
  };

  return (
    <div className={`w-full ${bgColorClass} border-s-4 ${borderColorClass} overflow-hidden text-sm font-medium p-4 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <div className="grid grid-cols-2">
          {leftFields.map((field, index) => (
            <React.Fragment key={`left-${index}`}>
              <div className={`p-1 font-medium ${labelColorClass}`}>{field.label}</div>
              <div className="p-1 font-normal">{renderValue(field)}</div>
            </React.Fragment>
          ))}
        </div>

        {rightFields.length > 0 && (
          <div className="grid grid-cols-2">
            {rightFields.map((field, index) => (
              <React.Fragment key={`right-${index}`}>
                <div className={`p-1 font-medium ${labelColorClass}`}>{field.label}</div>
                <div className="p-1 font-normal">{renderValue(field)}</div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InformationCard;
