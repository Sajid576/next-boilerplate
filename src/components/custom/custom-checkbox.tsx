/* eslint-disable react/display-name */
import { cn } from "@lib/utils";
import { forwardRef, HTMLProps } from "react";

interface CheckboxProps extends HTMLProps<HTMLInputElement> {
  id?: string;
  label: string;
  labelClassName?: string;
}

const CustomCheckbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, label, className,labelClassName, ...props }, ref) => {
    return (
      <div className={cn("checkbox-wrapper", className)}>
        <input
          type="checkbox"
          id={id}
          className="inp-cbx"
          ref={ref}
          {...props}
        />
        <label htmlFor={id} className={cn("cbx", labelClassName)}>
          <span>
            <svg viewBox="0 0 12 10" height="10px" width="12px">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </svg>
          </span>
          <span>{label}</span>
        </label>
      </div>
    );
  }
);

export default CustomCheckbox;
