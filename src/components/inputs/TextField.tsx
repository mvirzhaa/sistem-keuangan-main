import React, {
  type InputHTMLAttributes,
  forwardRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";

interface TextFieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "className" | "onChange"
  > {
  label?: string;
  error?: string;
  helper?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  inputClassName?: string;
  onIconClick?: () => void;
  // Enhanced onChange handler that provides the value directly
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  // New onEnter handler
  onEnter?: (value: string) => void;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      error,
      helper,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = "",
      containerClassName = "",
      inputClassName = "",
      onIconClick,
      disabled,
      onChange,
      onEnter,
      ...rest
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [currentValue, setCurrentValue] = useState(
      rest.value || rest.defaultValue || "",
    );

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (rest.onFocus) {
        rest.onFocus(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (rest.onBlur) {
        rest.onBlur(e);
      }
    };

    // Custom onChange handler
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setCurrentValue(newValue);

      if (onChange) {
        onChange(newValue, e);
      }
    };

    // Handle key down events, specifically for Enter key
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      // Check if Enter was pressed and we have an onEnter handler
      if (e.key === "Enter" && onEnter) {
        onEnter(e.currentTarget.value);
      }

      // Forward the event to any existing onKeyDown handler
      if (rest.onKeyDown) {
        rest.onKeyDown(e as any);
      }
    };

    return (
      <div className={`${fullWidth ? "w-full" : ""} ${containerClassName}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {rest.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div
          className={`relative rounded-md ${
            fullWidth ? "w-full" : ""
          } ${className}`}
        >
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={`
              block w-full px-3 py-1.5 text-sm
              ${leftIcon ? "pl-10" : ""}
              ${rightIcon ? "pr-10" : ""}
              ${
                disabled
                  ? "bg-gray-100 text-gray-500"
                  : "bg-white text-gray-900"
              }
              border rounded-md
              ${
                isFocused
                  ? "outline-none ring-1 ring-green-500 border-green-500"
                  : "border-gray-300"
              }
              ${error ? "border-red-500 ring-red-500" : ""}
              transition-all duration-200
              ${inputClassName}
            `}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            {...rest}
          />

          {rightIcon && (
            <div
              className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                onIconClick ? "cursor-pointer" : ""
              } text-gray-500`}
              onClick={onIconClick}
            >
              {rightIcon}
            </div>
          )}
        </div>

        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        {!error && helper && (
          <p className="mt-1 text-xs text-gray-500">{helper}</p>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";

export default TextField;
