import React from "react";

interface FormFieldRowProps {
  id?: string;
  label: React.ReactNode;
  required?: boolean;
  alignCenter?: boolean;
  children: React.ReactNode;
  onLabelClick?: () => void;
}

export const FormFieldRow: React.FC<FormFieldRowProps> = ({
  id,
  label,
  required = false,
  alignCenter = false,
  children,
  onLabelClick,
}) => {
  return (
    <div
      className={`flex flex-col sm:flex-row ${
        alignCenter ? "sm:items-center" : "sm:items-start"
      } py-1`}
    >
      <label
        htmlFor={id}
        onClick={onLabelClick}
        className={`w-full sm:w-56 text-sm font-semibold text-[#1e3a8a] ${
          alignCenter ? "" : "pt-2"
        } shrink-0 cursor-pointer select-none`}
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="w-full max-w-xl">{children}</div>
    </div>
  );
};
