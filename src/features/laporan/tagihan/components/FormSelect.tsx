import React from "react";

export interface SelectOptGroup {
  label: string;
  options: string[];
}

interface FormSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options?: string[];
  optGroups?: SelectOptGroup[];
  placeholder?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  id,
  value,
  onChange,
  options,
  optGroups,
  placeholder,
}) => {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options &&
        options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      {optGroups &&
        optGroups.map((group) => (
          <optgroup key={group.label} label={group.label}>
            {group.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </optgroup>
        ))}
    </select>
  );
};
